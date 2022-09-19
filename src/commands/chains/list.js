const Command = require('../base.js');

class ListCommand extends Command {
  async run() {
    const { flags } = this.parse(ListCommand);

    this.functions.spinner('start', 'fetching chains', flags.silent);
    let res = await this.functions.connectAndSend('readStore', { tables: ['chains'] });
    this.functions.spinner('stop', res.error);
    if( res.error ) {
      this.log(res);
      return res;
    }

    this.log(res.data.chains);
    return res.data.chains;
  }
}

ListCommand.hidden = false;

ListCommand.description = `List chains that are in the wallet database
The chains:list command is used to list the existing chains in the wallet database
`

ListCommand.flags = {
  ...Command.flags,
}

module.exports = ListCommand
