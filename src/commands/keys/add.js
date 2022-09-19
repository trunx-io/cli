const Command = require('../base.js');
const ecc = require('eosjs-ecc');

class AddCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(AddCommand)

    this.functions.spinner('start', 'updating keys', flags.silent);

    let res = {};
    for ( let key of argv ) {
      let keyType, publicKey, privatKey;

      key = key.publicKey || key.privatKey || key;
      keyType = ecc.isValidPublic(key) ? 'public' :
        ecc.isValidPrivate(key) ? 'private' : null;

      if (!keyType) return "invalid key";

      if (keyType === 'private'){
        privatKey = key;
        publicKey = ecc.privateToPublic(privatKey);
      } else publicKey = key;

      res = await this.functions.connectAndSend('addObject', {
        data: {
          privatKey,
          publicKey,
          type: 'manual',
          private: keyType === 'private',
        },
        table: 'keys'
      });
      if ( res.error ) break;
    }

    this.functions.spinner('stop', res.error);

    // backup wallet database
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

AddCommand.hidden = false;

AddCommand.description = `Add keys to the TrunxIO wallet database
The keys:add command is used to add new keys to the current TrunxIO wallet database.
`

AddCommand.args = [
  {
    name: 'key',
    required: true,
    description: 'pub/priv key to add to the TrunxIO wallet database',
  }
]

AddCommand.flags = {
  ...Command.flags,
}

module.exports = AddCommand
