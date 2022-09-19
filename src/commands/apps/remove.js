const Command = require('../base.js');

class RemoveCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(RemoveCommand);

    this.functions.spinner('start', 'updating apps', flags.silent);

    let res, found;

    res = await this.functions.connectAndSend('readStore', {
      tables: ['apps'],
    });
    if( res.error ) {
      this.log(res);
      return res;
    }

    for (let appUrl of argv) {
      found = res.data.apps.find((x) => { return x.url === appUrl });
      if(!found) continue;
      res = await this.functions.connectAndSend('removeObject', { _id: found._id, table: 'apps' });
      if ( res.error ) break;
    }

    this.functions.spinner('stop', res.error);

    // backup wallet database
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

RemoveCommand.hidden = false;

RemoveCommand.description = `Remove apps from the wallet database
The apps:remove command is used to remove apps from the wallet database
`

RemoveCommand.args = [
  {
    name: 'app url',
    required: false,
    description: 'url of the app to remove',
  }
]

RemoveCommand.flags = {
  ...Command.flags,
}

module.exports = RemoveCommand
