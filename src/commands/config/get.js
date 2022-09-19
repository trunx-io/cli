const Command = require('../base.js');

class GetCommand extends Command {
  async run() {
    const { argv, flags } = this.parse(GetCommand);

    var data = {};

    if(argv.length > 0) {
      for (const name of argv) { if( data[name] ) data[name] = this.userConfig[name]; }
    } else {
      data = this.userConfig;
    }

    this.log(data);
    return { data };
  }
}

GetCommand.hidden = false;

GetCommand.description = `Get TrunxIO wallet config values
The settings:get command is used to get TrunxIO wallet config values.
`

GetCommand.args = [
  {
    name: 'name',
    description: '(optional) name of settings to filter by',
  }
]

GetCommand.flags = {
  ...Command.flags,
}

module.exports = GetCommand
