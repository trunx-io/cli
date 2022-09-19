const Command = require('./base.js');
const { isSocketListening } = require('@trunx-io/ipc-client')

class StatusCommand extends Command {
  async run() {
    this.functions.spinner('start', 'fetching data', flags.silent);
    let res = await this.functions.connectAndSend('getLockTime', {});
    this.functions.spinner('stop');

    res = {
      ...res.data,
      serviceRunning: !!await isSocketListening(this.socketName),
    };

    this.log(res);
    return res;
  }
}

StatusCommand.hidden = false;

StatusCommand.description = `Output useful status information related to the TrunxIO Wallet
The status command will tell the user if the TrunxIO Wallet service is running,
if the wallet is unlocked, and which wallet is currently set as active.
`

StatusCommand.flags = {
  ...Command.flags,
}

module.exports = StatusCommand
