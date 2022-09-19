const Command = require('../base.js');

class ListCommand extends Command {
  async run() {
    const { flags } = this.parse(ListCommand);

    this.functions.spinner('start', 'fetching apps', flags.silent);
    var res = await this.functions.connectAndSend('readStore', { tables: ['apps'] });
    this.functions.spinner('stop', res.error);
    if( res.error ) {
      this.log(res);
      return res;
    }

    this.log(res);
    return res;
  }
}

ListCommand.hidden = false;

ListCommand.description = `List apps that are in the wallet database
The apps:list command is used to list the existing apps in the wallet database
`

ListCommand.flags = {
  ...Command.flags,
}

module.exports = ListCommand
