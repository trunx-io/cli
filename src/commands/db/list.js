const Command = require('../base.js');

class ListCommand extends Command {
  async run() {
    const { flags } = this.parse(ListCommand);

    this.functions.spinner('start', 'fetching wallets', flags.silent);
    var res = await this.functions.connectAndSend('listWallets', {});
    this.functions.spinner('stop', res.error);

    this.log(res);
    return res;
  }
}

ListCommand.hidden = false;

ListCommand.description = `List wallets in the TrunxIO wallet database`

ListCommand.flags = {
  ...Command.flags,
}

module.exports = ListCommand
