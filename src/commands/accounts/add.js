const Command = require('../base.js');

class AddCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(AddCommand);

    let chain_id, known_chains, chain, store, res;

    store = await this.functions.connectAndSend('readStore', { tables: ['chains'] });
    if( store.error ) {
      this.log(store);
      return store;
    }

    if(flags.chain_id){
      chain_id = flags.chain_id;
    } else {
      known_chains = store.data.chains.map((chain, index) => { return { index, ...chain } });
      var answers = await this.functions.prompt([
        {
          name: "chain_id",
          message: "No chain_id supplied (-c); select a server to fetch it:",
          choices: known_chains.map((chain, index) => { return { name: chain.server, value: index } }),
          type: 'list',
          pageSize: 10
        }
      ]);
      chain_id = known_chains[answers.chain_id].chain_id;
    }

    chain = store.data.chains.find((x) => { return x.chain_id === chain_id });

    this.functions.spinner('start', 'adding account(s)', flags.silent);

    for (let account_name of argv) {
      res = await this.functions.fetchAccountData(account_name, chain);
      if ( res.error ) break; // handle error from querying chain for userInfo
      res = await this.functions.connectAndSend('addObject', { data: res, table: 'accounts' });
      if ( res.error ) break; // handle error from wallet-service
    }

    this.functions.spinner('stop', res.error);

    // backup wallet database
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

AddCommand.hidden = false;

AddCommand.description = `Add accounts to the wallet database
The accounts:add command is used to add new accounts to the current wallet database.
`

AddCommand.args = [
  {
    name: 'account_name',
    required: true,
    description: 'account name to add to the wallet database',
  }
]

AddCommand.flags = {
  ...Command.flags,
  chain_id: flags.string({ char: 'c', description: 'chain_id associated with the account' }),
}

module.exports = AddCommand
