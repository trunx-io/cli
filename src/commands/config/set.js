const Command = require('../base.js');

class SetCommand extends Command {
  static strict = false;

  async run() {
    const { argv } = this.parse(SetCommand)

    let userConfig = this.userConfig;
    for ( let setting of argv ) {
      setting = JSON.parse(setting);
      let name = Object.keys(setting)[0];
      let value = Object.values(setting)[0]
      userConfig[name] = value;
      // if changing selectedWallet; lock current wallet
      if(name === 'selectedWallet') await this.functions.connectAndSend('lockWallet', {});
    }
    userConfig = this.setUserConfig(userConfig);

    this.log(userConfig);
    return userConfig;
  }
}

SetCommand.hidden = false;

SetCommand.description = `Set TrunxIO wallet config values
The settings:set command is used to set TrunxIO wallet config values.
`

SetCommand.args = [
  {
    name: 'setting',
    description: 'JSON string of the setting object to add to the user config. required keys: name, value',
  }
]

SetCommand.flags = {
  ...Command.flags,
}

module.exports = SetCommand
