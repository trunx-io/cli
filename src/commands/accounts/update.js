const Command = require('../base.js');

class UpdateCommand extends Command {
  static strict = false;

  async run() {
    const { argv, flags } = this.parse(UpdateCommand);

    let chain_id, known_chains, chain, store, res;

    store = await this.functions.connectAndSend('readStore', { tables: ['accounts', 'chains'] });
    if( store.error ) {
      this.log(store);
      return store;
    }

    if( flags.chain_id ){
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
    if( !chain ) { this.log({error: `unable to locate chain with chain_id: ${chain_id}`}); return };

    this.functions.spinner('start', 'updating account', flags.silent);

    for( let account_name of argv ) {
      let account = store.data.accounts.find((x) => { return x.account_name === account_name && x.chain_id === chain_id });
      if( !account ) { res = {error: `unable to locate account with name: ${account_name}`}; break };

      res = await this.functions.fetchAccountData(account.account_name, chain);
      if ( res.error ) break; // handle error from querying chain for userInfo
      res = await this.functions.connectAndSend('updateObject', { _id: account._id, data: res, table: 'accounts' });
      if ( res.error ) break; // handle error from wallet-service
    }

    this.functions.spinner('stop', res.error);

    // backup wallet database
    if(!res.error) await this.createBackup.run(['--silent']);

    this.log(res);
    return res;
  }
}

UpdateCommand.hidden = false;

UpdateCommand.description = `Fetch account data from chain
The accounts:update command updates the account object with on chain data\n
Notes:
 - If --chain_id (-c) is not supplied the user will be prompted to select a known chain.
`

UpdateCommand.args = [
  {
    name: 'account_name',
    required: true,
    description: 'account name to add to the wallet database',
  }
]

UpdateCommand.flags = {
  ...Command.flags,
  chain_id: flags.string({ char: 'c', description: 'chain_id associated with the account' }),
}

module.exports = UpdateCommand
