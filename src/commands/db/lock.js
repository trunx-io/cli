const Command = require('../base.js');

class LockCommand extends Command {
  async run() {
    const { flags } = this.parse(LockCommand);

    this.functions.spinner('start', 'locking wallet', flags.silent);
    var res = await this.functions.connectAndSend('lockWallet', {});
    this.functions.spinner('stop', res.error);

    this.log(res.data);
    return res.data;
  }
}

LockCommand.hidden = false;

LockCommand.description = `Lock wallet database
The db:lock command is used to lock a wallet file.
`

LockCommand.flags = {
  ...Command.flags,
}

module.exports = LockCommand
