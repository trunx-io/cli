const Command = require('../base.js');

class StopCommand extends Command {
  async run() {
    const { flags } = this.parse(StopCommand)
    let res = await this.functions.connectAndSend('stopServer', {})
    this.log(res.data || { error: res.error });
    return res.data || { error: res.error };
  }
}

StopCommand.hidden = false;

StopCommand.description = `Stop the TrunxIO Wallet database service
The service:stop command will stop the detached TrunxIO Wallet database service.
`

StopCommand.flags = {
  ...Command.flags,
}

module.exports = StopCommand
