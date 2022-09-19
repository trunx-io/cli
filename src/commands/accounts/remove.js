const Command = require('../base.js');

class RemoveCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(RemoveCommand);

    let chain_id, known_chains, chain, store, res;

    store = await this.functions.connectAndSend('readStore', { tables: ['accounts', 'chains'] });
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
          choices: known_chains.map((chain, index) => { return {name: chain.server, value: index } }),
          type: 'list',
          pageSize: 10
        }
      ]);
      chain_id = known_chains[answers.chain_id].chain_id;
    }

    chain = store.data.chains.find((x) => { return x.chain_id === chain_id });

    this.functions.spinner('start', 'updating accounts', flags.silent);

    for (let account_name of argv) {
      let account = store.data.accounts.find((x) => { return x.account_name === account_name && x.chain_id === chain_id });
      if( !account ) { res = { error: `unable to locate account with name: ${account_name}` }; break };
      res = await this.functions.connectAndSend('removeObject', { _id: account._id, table: 'accounts' });
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

RemoveCommand.description = `Remove accounts from the wallet database
The accounts:remove command is used to remove new accounts to the current wallet database.
`

RemoveCommand.args = [
  {
    name: 'account_name',
    required: true,
    description: 'account name to add to the wallet database',
  }
]

RemoveCommand.flags = {
  ...Command.flags,
  chain_id: flags.string({ char: 'c', description: 'chain_id associated with the account' }),
}

module.exports = RemoveCommand
