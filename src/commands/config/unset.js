const Command = require('../base.js');

class UnsetCommand extends Command {
  static strict = false;

  async run() {
    const { argv } = this.parse(UnsetCommand);

    var userConfig = this.userConfig;
    for ( let setting of argv ) {
      delete userConfig[setting];
    }
    this.setUserConfig(userConfig);

    this.log(userConfig);
    return userConfig;
  }
}

UnsetCommand.hidden = false;

UnsetCommand.description = `Unset TrunxIO wallet config values
The settings:unset command is used to unset TrunxIO wallet config values.
`

UnsetCommand.args = [
  {
    name: 'name',
    description: 'name of setting to unset in userConfig',
  }
]

UnsetCommand.flags = {
  ...Command.flags,
}

module.exports = UnsetCommand
