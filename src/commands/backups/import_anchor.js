const Command = require('../base.js');

var CryptoJS = require('crypto-js');

function encryptAnchor(data, pass, iterations = 4500) {
  const keySize = 256;
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = CryptoJS.PBKDF2(pass, salt, {
    iterations,
    keySize: keySize / 4
  });
  const iv = CryptoJS.lib.WordArray.random(128 / 8);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return salt.toString() + iv.toString() + encrypted.toString();
}

function decryptAnchor(data, pass, iterations = 4500) {
  const keySize = 256;
  const salt = CryptoJS.enc.Hex.parse(data.substr(0, 32));
  const iv = CryptoJS.enc.Hex.parse(data.substr(32, 32));
  const encrypted = data.substring(64);
  const key = CryptoJS.PBKDF2(pass, salt, {
    iterations,
    keySize: keySize / 4
  });
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return decrypted;
}

class ImportAnchorCommand extends Command {
  async run() {
    const {args, flags} = this.parse(ImportAnchorCommand);

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

    var accounts, keys, chains;

    if( this.fs.existsSync(file) ) {
      var fileData = JSON.parse(JSON.parse(this.fs.readFileSync(file).toString())['persist:anchor-config']);
      var encryptedKeys = JSON.parse(fileData.storage).data;
      var decryptedKeys = JSON.parse(decryptAnchor(encryptedKeys, password).toString(CryptoJS.enc.Utf8));
      // keys = decryptedKeys.map((keyPair) => { return keyPair.key || keyPair.pubkey });
      accounts = JSON.parse(fileData.wallets).map((wallet) => { return {account_name: wallet.account, chain_id: wallet.chainId} })
      chains = JSON.parse(fileData.blockchains).filter((blockchain => {
          return [ ...new Set(accounts.map((account) => { return account.chain_id})) ].includes(blockchain.chainId)
      })).map((chain) => {return {server: chain.node}})

    } else {
      this.error(`unable to locate file: ${file}`);
    }

    let res, keys_result, accounts_result, chains_result;

    answers = await this.functions.prompt([
      {
        name: 'selectedChains',
        message: 'Select the chains to import from the list:',
        choices: chains.map((x) => {return {name: x.server, value: x.server}}),
        type: 'checkbox'
      },
      {
        name: 'selectedKeys',
        message: 'Select the keys to import from the list:',
        choices: decryptedKeys.map((x) => {return {name: x.pubkey, value: x.key}}),
        type: 'checkbox'
      },
      {
        name: 'selectedAccounts',
        message: 'Select the accounts to import from the list:',
        choices: this.functions.uniquify(accounts, ['account_name', 'chain_id']).map((x) => {return {name: `${x.account_name} - ${x.chain_id}`, value: x}}),
        type: 'checkbox'
      }
    ]);

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
      keys: keys_result,
      accounts: accounts_result,
      chains: chains_result,
    })

    return {data: {
      keys: keys_result,
      accounts: accounts_result,
      chains: chains_result }
    };

  }
}

ImportAnchorCommand.hidden = false;

ImportAnchorCommand.description = `Create a new database from an Anchor wallet backup
The backups:import command is used to create a new database from an Anchor wallet backup.
User will be required to enter the password used to create the backup archive in
order to import.
`

ImportAnchorCommand.args = [
  {
    name: 'file',
    required: true,
    description: 'location to the wallet archive to import',
  }
]

ImportAnchorCommand.flags = {
  ...Command.flags,
  password: flags.string({ char: 'p', description: 'password to encrypt the backup files with' }),
}

module.exports = ImportAnchorCommand
