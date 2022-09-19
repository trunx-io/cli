const Command = require('../base.js');

class ReadCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(ReadCommand);

    this.functions.spinner('start', 'fetching data', flags.silent);
    var res = await this.functions.connectAndSend('readStore', { tables: argv });
    this.functions.spinner('stop', res.error);

    if(!res.error && !flags.showPrivate && res.data) {
      // remove the privatKey from key response unless `showPrivate` flag specified
      if(res.data.keys) for(let key of res.data.keys) delete key.privatKey;
      // hide the wallets mnemonic value unless `--showPrivate` flag specified
      if(res.data.settings) res.data.settings = res.data.settings.filter((x) => {return x.name !== 'mnemonic'});
    }

    this.log(res);
    return res;
  }
}

ReadCommand.hidden = false;

ReadCommand.description = `Read full tables from the TrunxIO wallet database
Read full tables from the TrunxIO wallet database.\n
Use the --showPrivate flag if you wish to see sensitive data in output.
`

ReadCommand.args = [
  {
    name: 'table',
    required: true,
    description: 'name of table to read from database',
  }
]


ReadCommand.flags = {
  ...Command.flags,
}

module.exports = ReadCommand
