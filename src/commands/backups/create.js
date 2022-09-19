const Command = require('../base.js');

const fs = require('fs');
const tar = require('tar');
const path = require('path');

class CreateCommand extends Command {
  async run() {
    const { flags } = this.parse(CreateCommand);

    let walletDir = path.join(require('os').homedir(), 'trunxio')
    let backupDir = flags.location || path.join(walletDir, 'backups');
    let activeWalletDir = path.join(walletDir, 'wallets', this.userConfig['selectedWallet']);

    if(!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, {recursive: true})

    let walletFiles;
    if(fs.existsSync(activeWalletDir)) walletFiles = fs.readdirSync(activeWalletDir);
    var archiveName = `trunxio-backup-${this.userConfig['selectedWallet']}-${Date.now()}.tgz`;

    let res;

    if(walletFiles) {
      tar.create(
        {
          gzip: true,
          cwd: activeWalletDir,
          file: this.path.join(backupDir, archiveName),
        }, walletFiles
      ).then(_ => {
        res = {message: 'wallet backup created', path: this.path.join(backupDir, archiveName)};

      })
    } else {
      res = {error: "'selectedWallet' wallet does not exist"};
    }

    this.log(res)
    return res;
  }
}

CreateCommand.hidden = false;

CreateCommand.description = `Make a backup of the encrypted wallet database
The backups:create command is used to make a new backup of the encryoted wallet database.
Current wallet password will be required to access or import the backup.
`

CreateCommand.flags = {
  ...Command.flags,
  location: flags.string({ char: 'l', description: 'directory to save the wallet backup archive. default: $HOME/trunxio/backups' }),
}

module.exports = CreateCommand
