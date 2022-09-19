const Command = require('../base.js');

class DeriveCommand extends Command {
  async run() {
    const { args, flags } = this.parse(DeriveCommand);

    var res = {}, store, keys = [];

    let roles = {
      'owner': 0,
      'active': 1,
      'custom': 2
    }

    this.functions.spinner('start', 'updating keys', flags.silent);

    store = await this.functions.connectAndSend('readStore', { tables: ['keys','settings'] });
    if(store.error) {
      this.log(store);
      return store;
    }

    let mnemonic = store.data.settings.find((x) => {return x.name === 'mnemonic'}).value;
    if(!this.functions.validateMnemonic(mnemonic)) {
      res = {error: 'mnemonic phrase is not valid'};
      this.log(res);
      return res;
    }

    for(var i=0;i<parseInt(flags.count);i++) {
      let path = `${roles[args.role]}/${args.index + i}`;
      let childKey = this.functions.deriveKeyFromMnemonic(mnemonic, path);
      let keyObj = {
        path,
        type: 'hdkey',
        private: true,
        privatKey: childKey.privateKey,
        publicKey: childKey.publicKey,
      };
      let found = store.data.keys.find((x) => {return x.type === keyObj.type && x.path === keyObj.path})
      if(!found) keys.push(keyObj);
    }

    for( let data of keys ) {
      res = await this.functions.connectAndSend('addObject', { data, table: 'keys' });
      if ( res.error ) break;
    }

    store = await this.functions.connectAndSend('readStore', { tables: ['keys'] });
    res = store.error ? store : store.data;

    this.functions.spinner('stop', res.error);

    // remove the privatKey from key response unless `--showPrivate` flag specified
    if(!res.error && !flags.showPrivate && res.data) for(let key of res.data) delete key.privatKey;

    // backup wallet database
    // TODO: only run wallet backup if news keys were added
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

DeriveCommand.hidden = false;

DeriveCommand.description = `Create new public/private key pairs from the wallets mnemonic phrase
The keys:derive command is used to derive key pairs from the wallets mnemonic phrase`

DeriveCommand.args = [
  {
    name: 'role',
    description: 'the role of the key to derive',
    options: ['owner','active','custom'],
    default: 'owner'
  },
  {
    name: 'index',
    description: 'the derivation path of the first key',
    parse: x => parseInt(x),
    default: 0
  }
]

DeriveCommand.flags = {
  ...Command.flags,
  count: flags.integer({ char: 'c', description: 'the number of keys to generate', default: 1 }),
}

module.exports = DeriveCommand
