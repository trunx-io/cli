const Command = require('../base.js');

class AddCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(AddCommand)

    this.functions.spinner('start', 'adding chain', flags.silent);

    let res;
    for (let server of argv) {
      const axios = require('axios');
      let chainInfo = await axios.post(server + '/v1/chain/get_info', {}, {timeout: 3000})
      let chain_id = chainInfo.data && chainInfo.data.chain_id;
      let chain_version = chainInfo.data && chainInfo.data.server_full_version_string || `${chainInfo.data.server_version_string}-${chainInfo.data.server_version}`;

      res = await this.functions.connectAndSend('addObject', {
        data: { server, chain_id, chain_version },
        table: 'chains',
      });

      if (res.error) break; // handle error from wallet-service
    }

    this.functions.spinner('stop', res.error);

    // backup wallet database
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

AddCommand.hidden = false;

AddCommand.description = `Add chains to the wallet database
The chains:add command is used to add new chains to the current wallet database.
`

AddCommand.args = [
  {
    name: 'server',
    required: true,
    description: 'http(s) address for the api endpoint',
  }
]

AddCommand.flags = {
  ...Command.flags,
}

module.exports = AddCommand
