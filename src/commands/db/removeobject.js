const Command = require('../base.js');

class RemoveobjectCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(RemoveobjectCommand);

    this.functions.spinner('start', 'fetching data', flags.silent);

    let res;

    for (let _id of argv) {
      res = await this.functions.connectAndSend('removeObject', { _id, table: flags.table });
      if (res.error) break; // handle error from @trunx-io/service
    }

    this.functions.spinner('stop', res.error);

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

    // backup wallet database
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

RemoveobjectCommand.hidden = false;

RemoveobjectCommand.description = `Remove an existing object from the TrunxIO wallet database
Remove an existing object from the TrunxIO wallet database.
`

RemoveobjectCommand.args = [
  {
    name: 'id',
    required: true,
    description: '_id of the object to remove',
  }
]


RemoveobjectCommand.flags = {
  ...Command.flags,
  table: flags.string({ char: 't', description: 'name of the table to remove object from', required: true }),
}

module.exports = RemoveobjectCommand
