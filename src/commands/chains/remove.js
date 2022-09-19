const Command = require('../base.js');

class RemoveCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(RemoveCommand);

    this.functions.spinner('start', 'updating chains', flags.silent);

    let res = await this.functions.connectAndSend('readStore', { tables: ['chains'] });
    if( res.error ) {
      this.log(res);
      return res;
    }

    for( let server of argv ) {
      let found = res.data.chains.find((x) => {return x.server === server});
      if( !found ) continue;
      res = await this.functions.connectAndSend('removeObject', { _id: found._id, table: 'chains' });
      if (res.error) break; // handle error from @trunx-io/service
    }

    this.functions.spinner('stop', res.error);

    // backup wallet database
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

RemoveCommand.hidden = false;

RemoveCommand.description = `Remove chains from the wallet database
The chains:remove command is used to remove chains from the wallet database
`

RemoveCommand.args = [
  {
    name: 'server',
    required: true,
    description: 'http(s) address for the api endpoint',
  }
]

RemoveCommand.flags = {
  ...Command.flags,
}

module.exports = RemoveCommand
