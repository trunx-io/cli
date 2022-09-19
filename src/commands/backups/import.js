const Command = require('../base.js');

const fs = require('fs');
const tar = require('tar');
const path = require('path');

class ImportCommand extends Command {
  async run() {
    const {args, flags} = this.parse(ImportCommand);

    let { file } = args;

    let walletDir = path.join(require('os').homedir(), 'trunxio')
    let backupDir = flags.location || path.join(walletDir, 'backups');
    let newWalletDir = path.join(walletDir, 'wallets', flags.name);

    let res = {};
    if(fs.existsSync(newWalletDir))
      res = {error: 'wallet with this name exists. must choose unique wallet name for import.'};
    if(!fs.existsSync(file)) res = {error: `unable to locate wallet archive: ${file}`};

    if(res.error) {
      this.log(res);
      return res;
    }

    fs.mkdirSync(newWalletDir, {recursive: true});

    await tar.extract({
      file,
      cwd: newWalletDir,
    }).catch((ex) => this.error(ex))

    res = {data: 'successfully imported new wallet'};

    this.log(res);
    return res;
  }
}

ImportCommand.hidden = false;

ImportCommand.description = `Create a new database from a TrunxIO wallet backup
The backups:import command is used to create a new database from a TrunxIO wallet backup
`

ImportCommand.args = [
  {
    name: 'file',
    required: true,
    description: 'location to the wallet archive to import',
  }
]

ImportCommand.flags = {
  ...Command.flags,
  name: flags.string({ char: 'n', description: 'name of the new wallet', required: true }),
}

module.exports = ImportCommand
