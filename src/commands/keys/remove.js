const Command = require('../base.js');

class RemoveCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(RemoveCommand);

    let store = await this.functions.connectAndSend('readStore', { tables: ['keys'] });
    if ( store.error ) {
      this.log(store);
      return store;
    }

    this.functions.spinner('start', 'updating keys', flags.silent);

    let res = {};
    for ( let key of argv ) {
      const ecc = require('eosjs-ecc');
      let keyType = ecc.isValidPublic(key) ? 'public' :
        ecc.isValidPrivate(key) ? 'private' : null;
      let found = store.data.keys.find((x) => { return keyType === 'public' ? x.publicKey === key : x.privatKey === key });
      if(!found) continue;
      res = await this.functions.connectAndSend('removeObject', { _id: found._id, table: 'keys' });
      if ( res.error ) break;
    }

    this.functions.spinner('stop', res.error);

    // backup wallet database
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

RemoveCommand.hidden = false;

RemoveCommand.description = `Remove keys from the TrunxIO wallet database
The keys:remove command is used to remove new keys to the current TrunxIO wallet database.
`

RemoveCommand.args = [
  {
    name: 'key',
    required: true,
    description: 'pub/priv key to add to the TrunxIO wallet database',
  }
]

RemoveCommand.flags = {
  ...Command.flags,
}

module.exports = RemoveCommand
