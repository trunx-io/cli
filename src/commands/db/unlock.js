const Command = require('../base.js');

class UnlockCommand extends Command {
  async run() {
    const { flags } = this.parse(UnlockCommand);
    let { password } = flags;
    let walletName = flags.walletName || this.userConfig.selectedWallet || 'default';

    if(!password) {
      var answers = await this.functions.prompt([
        {
          name: 'password',
          message: 'Enter the wallet password:',
          type: 'password',
          prefix: this.emoji.get('key')
        }
      ]);
      password = answers.password;
    }

    let res;
    let mnemonic = flags.mnemonic || this.functions.generateMnemonic();
    if(!this.functions.validateMnemonic(mnemonic)) {
      res = {error: 'mnemonic phrase is not valid'};
      this.log(res);
      return res;
    }

    // set selectedWallet in userConfig for subsequent logins
    this.setUserConfig({...this.userConfig, selectedWallet: walletName})

    this.functions.spinner('start', 'unlocking wallet', flags.silent);
    res = await this.functions.connectAndSend('unlockWallet', { password, mnemonic, walletName });
    this.functions.spinner('stop', res.error);

    // remove the privatKey from key response unless `showPrivate` flag specified
    if(!res.error && !flags.showPrivate && res.data) {
      // remove the privatKey from key response unless `showPrivate` flag specified
      if(res.data.keys.data)
        for(let key of res.data.keys.data) delete key.privatKey;
      // hide the wallets mnemonic value unless `--showPrivate` flag specified
      if(res.data.settings.data)
        res.data.settings.data = res.data.settings.data.filter((x) => {return x.name !== 'mnemonic'});
    }

    this.log(res);
    return res;
  }
}

UnlockCommand.hidden = false;

UnlockCommand.description = `Unlock TrunxIO wallet database
The unlock command is used to unlock the TrunxIO wallet database.\n
Use the --showPrivate flag if you wish to see private keys in output.
`

UnlockCommand.flags = {
  ...Command.flags,
  password: flags.string({ char: 'p', description: 'password to use to unlock the wallet file (if none, can be entered interactively)' }),
  mnemonic: flags.string({ char: 'm', description: 'mnemonic used to initialize the wallet (if none, random mnemonic will be used)' }),
  walletName: flags.string({ char: 'w', description: 'name of the wallet database to unlock' }),
}

module.exports = UnlockCommand
