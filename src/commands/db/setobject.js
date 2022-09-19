const Command = require('../base.js');

class SetobjectCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(SetobjectCommand);

    this.functions.spinner('start', 'fetching data', flags.silent);

    let res;
    for (let data of argv) {
      data = JSON.parse(data);
      if(!data._id) {
        res = await this.functions.connectAndSend('addObject', { data: data, table: flags.table });
      } else {
        res = await this.functions.connectAndSend('updateObject', { _id: data._id, data: data, table: flags.table });
      }
      if (res.error) break; // handle error from @trunx-io/service
    }

    if(!res.error && !flags.showPrivate && res.data) {
      switch(flags.table) {
        // remove the privatKey from key response unless `showPrivate` flag specified
        case 'keys':
          for(let key of res.data.keys) delete key.privatKey;
          break;
        case 'settings':
          // hide the wallets mnemonic value unless `--showPrivate` flag specified
          res = res.data.settings.filter((x) => {return x.name !== 'mnemonic'});
          break;
        default:
      }
    }

    this.functions.spinner('stop', res.error);

    // backup wallet database
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

SetobjectCommand.hidden = false;

SetobjectCommand.description = `Add or update an object to the TrunxIO wallet database.
Add or update an object to the TrunxIO wallet database.\n
Notes:
  - This command will update an existing object in the database if data contains '_id' field.
`

SetobjectCommand.args = [
  {
    name: 'data',
    required: true,
    description: 'json string of the object to set',
  }
]


SetobjectCommand.flags = {
  ...Command.flags,
  table: flags.string({ char: 't', description: 'name of the table to set object in', required: true }),
}

module.exports = SetobjectCommand
