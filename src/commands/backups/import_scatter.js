const Command = require('../base.js');

const bip39 = require('bip39');
const scrypt = require('scrypt-async');
const AES = require("aes-oop").default;
const ecc = require("eosjs-ecc");

const hashPassword = (password, salt) => {
  return new Promise(async resolve => {
    scrypt(password, salt, {
      N: 16384,
      r: 8,
      p: 1,
      dkLen: 16,
      encoding: 'hex'
    }, (derivedKey) => {
      resolve(derivedKey);
    })
  });
}

const passwordToSeed = async (password, salt) => {
  const hash = await hashPassword(password, salt);
  let mnemonic = bip39.entropyToMnemonic(hash);
  return bip39.mnemonicToSeedHex(mnemonic);
}

function bufferToHexPrivate(buffer){
  return ecc.PrivateKey.fromBuffer(Buffer.from(buffer)).toString()
}

function hexPrivateToBuffer(privateKey){
  return new ecc.PrivateKey(privateKey).toBuffer();
}

class ImportScatterCommand extends Command {
  async run() {
    const {args, flags} = this.parse(ImportScatterCommand);

    let { file } = args;
    let { password } = flags;

    if(!password) {
      var answers = await this.functions.prompt([
        {
          name: 'password',
          message: 'Enter password for the wallet backup:',
          type: 'password',
          prefix: this.emoji.get('key')
        }
      ]);
      password = answers.password;
    }

    let chains = [], accounts = [], keys = [];

    if( this.fs.existsSync(file) ) {
      var fileData;
      try{
        fileData = JSON.parse(this.fs.readFileSync(file).toString());
      } catch(e) {
        fileData = this.fs.readFileSync(file).toString().match(/(?<scatter>.*)\|SLT\|(?<salt>.*)$/);
      }

      let { salt, scatter } = fileData.groups ? fileData.groups : fileData;
      let seed = await passwordToSeed(password, salt);

      let decryptedScatter = AES.decrypt(scatter, seed);
      if (!decryptedScatter.hasOwnProperty('keychain')) this.error("keychain data not found in backup file");

      chains = decryptedScatter.settings.networks;
      let decryptedKeychain = AES.decrypt(decryptedScatter.keychain, seed);

      decryptedKeychain.keypairs.forEach((keypair) => {
        var dataBuffer = Buffer.from(AES.decrypt(keypair.privateKey, seed).data);
        keys.push(bufferToHexPrivate(dataBuffer))
      })

      accounts = decryptedKeychain.accounts.map((account) => {
        return {account_name: account.name, chain_id: account.networkUnique.split(':')[2]}
      })

      answers = await this.functions.prompt([
        {
          name: 'selectedChains',
          message: 'Select the chains to import from the list:',
          choices: chains.map((x) => {return {name: `${x.protocol}://${x.host}`, value: `${x.protocol}://${x.host}`}}),
          type: 'checkbox'
        },
        {
          name: 'selectedKeys',
          message: 'Select the keys to import from the list:',
          choices: keys.map((x) => {return {name: ecc.privateToPublic(x), value: x}}),
          type: 'checkbox'
        },
        {
          name: 'selectedAccounts',
          message: 'Select the accounts to import from the list:',
          choices: this.functions.uniquify(accounts, ['account_name', 'chain_id']).map((x) => {return {name: `${x.account_name} - ${x.chain_id}`, value: x}}),
          type: 'checkbox'
        }
      ]);

      let res, keys_result, accounts_result, chains_result;

      if(answers.selectedChains.length > 0) {
        this.functions.spinner('start', 'updating chains', flags.silent);
        res = await this.functions.connectAndSend('updateChains', {chains: answers.selectedChains, mode: 'add'});
        this.functions.spinner('stop');
        chains_result = res.data;
      }

      if(answers.selectedKeys.length > 0) {
        this.functions.spinner('start', 'updating keys', flags.silent);
        res = await this.functions.connectAndSend('updateKeys', {keys: answers.selectedKeys, mode: 'add'});
        this.functions.spinner('stop');
        keys_result = res.data;
      }

      if(answers.selectedAccounts.length > 0) {
        this.functions.spinner('start', 'updating accounts', flags.silent);
        res = await this.functions.connectAndSend('updateAccounts', {accounts: answers.selectedAccounts, mode: 'add'});
        this.functions.spinner('stop');
        accounts_result = res.data;
      }

      this.log({
        chains: chains_result,
        keys: keys_result,
        accounts: accounts_result,
      })

      return {data: {
        chains: chains_result,
        keys: keys_result,
        accounts: accounts_result }
      };

    } else {
      this.error(`unable to locate file: ${file}`);
      return {data: `unable to locate file: ${file}`};
    }

  }
}

ImportScatterCommand.hidden = false;

ImportScatterCommand.description = `Create a new database from an Scatter wallet backup
The backups:import command is used to create a new database from an Scatter wallet backup.
User will be required to enter the password used to create the backup archive in
order to import.
`

ImportScatterCommand.args = [
  {
    name: 'file',
    required: true,
    description: 'location to the wallet archive to import',
  }
]

ImportScatterCommand.flags = {
  ...Command.flags,
  password: flags.string({ char: 'p', description: 'password for decrypting the backup files with' }),
}

module.exports = ImportScatterCommand
