const Command = require('../base.js');

class InitCommand extends Command {
  async run() {
    const { flags } = this.parse(InitCommand);

    var userConfig = this.userConfig;

    userConfig = {
      defaultKey: null,
      defaultAccount: null,
      defaultChainId: null,
      selectedWallet: "default",
      ...userConfig,
    }

    userConfig = this.setUserConfig(userConfig);

    this.log(userConfig);
    return userConfig;
  }
}

InitCommand.hidden = false;

InitCommand.description = `Init configuration file for the TrunxIO wallet
The config:init command is an interactive command used to create the initial
configuration for the TrunxIO wallet.
`

InitCommand.flags = {
  ...Command.flags,
}

module.exports = InitCommand
