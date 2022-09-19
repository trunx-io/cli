const Command = require('../base.js');

class AddCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(AddCommand)

    this.functions.spinner('start', 'updating apps', flags.silent);

    let res;
    for (let data of argv) {
      data = JSON.parse(data);
      res = await this.functions.connectAndSend('addObject', { data, table: 'apps' });
      if( res.error ) break; // handle error from @trunx-io/service
    }

    this.functions.spinner('stop', res.error);

    // backup wallet database
    await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

AddCommand.hidden = false;

AddCommand.description = `Add apps to the wallet database
The apps:add command is used to add new apps to the current wallet database.\n
`

AddCommand.args = [
  {
    name: 'app',
    required: true,
    description: 'json string of the app to add',
  }
]

AddCommand.flags = {
  ...Command.flags,
}

module.exports = AddCommand
