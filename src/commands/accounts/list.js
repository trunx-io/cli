const Command = require('../base.js');

class ListCommand extends Command {
  async run() {
    const { flags } = this.parse(ListCommand)

    this.functions.spinner('start', 'fetching accounts', flags.silent);
    let res = await this.functions.connectAndSend('readStore', { tables: ['accounts'] });
    this.functions.spinner('stop', res.error);
    if(res.error) {
      this.log(res);
      return res;
    }

    if(flags.account_name && flags.chain_id) {
      res = res.data.accounts.filter((acct => {return acct.account_name === flags.account_name && acct.chain_id === flags.chain_id}));
    } else if(flags.account_name) {
      res = res.data.accounts.filter((acct => {return acct.account_name === flags.account_name}));
    } else if(flags.chain_id) {
      res = res.data.accounts.filter((acct => {return acct.chain_id === flags.chain_id}));
    } else {
      res = res.data.accounts;
    }

    this.log(res)
    return res;
  }
}

ListCommand.hidden = false;

ListCommand.description = `List accounts that are in the wallet database
The accounts:list command is used to list the existing accounts in the wallet database
`

ListCommand.flags = {
  ...Command.flags,
  account_name: flags.string({ char: 'a', description: 'list accounts matching this name' }),
  chain_id: flags.string({ char: 'c', description: 'list accounts associated with this chain_id' }),
}

module.exports = ListCommand
