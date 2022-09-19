const Command = require('../base.js');

class ListCommand extends Command {
  async run() {
    const { flags } = this.parse(ListCommand);

    this.functions.spinner('start', 'fetching keys', flags.silent);
    var res = await this.functions.connectAndSend('readStore', { tables: ['keys'] });
    this.functions.spinner('stop', res.error);
    if( res.error ) {
      this.log(res);
      return res;
    }

    // remove the privatKey from key response unless `showPrivate` flag specified
    if(!flags.showPrivate && res.data && res.data.keys) for(let key of res.data.keys) delete key.privatKey;

    this.log(res.data.keys);
    return res.data.keys;
  }
}

ListCommand.hidden = false;

ListCommand.description = `List keys that are in the TrunxIO wallet database
The keys:list command is used to list the existing keys in the TrunxIO wallet database
`

ListCommand.flags = {
  ...Command.flags,
}

module.exports = ListCommand
