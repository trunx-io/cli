const Command = require('../base.js');

class AddobjectCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(AddobjectCommand);

    this.functions.spinner('start', 'fetching data', flags.silent);

    let res;
    for (let data of argv) {
      data = JSON.parse(data);
      if (data._id) {
        res = {error: "object contains a protected property: '_id'"};
        break;
      }

      res = await this.functions.connectAndSend('addObject', {data, table: flags.table});
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

AddobjectCommand.hidden = false;

AddobjectCommand.description = `Add new object to the TrunxIO wallet database
Add new object to the TrunxIO wallet database.
`

AddobjectCommand.args = [
  {
    name: 'data',
    required: true,
    description: 'json string of the object to add',
  }
]


AddobjectCommand.flags = {
  ...Command.flags,
  table: flags.string({ char: 't', description: 'name of the table to remove object from', required: true }),
}

module.exports = AddobjectCommand
