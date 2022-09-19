const { Command, flags } = require('@oclif/command');
global.flags = flags;

class Base extends Command {

  async init(){
    this.path = require('path');
    this.fs = require('fs-extra');
    this.emoji = require('node-emoji');

    const { flags } = this.parse(this.constructor)
    this.flags = flags;
    this.socketName = flags.socketName;
    this.userConfig = this.getUserConfig();
    this.functions = require('../components/common.js');
    this.createBackup = require('./backups/create.js');
  }

  getUserConfig() {
    let configFile = this.path.join(require('os').homedir(), 'trunxio', this.flags.configfile);
    if ( this.fs.existsSync(configFile) ) {
      return this.fs.readJSONSync(configFile);
    } else { return {}; }
  }

  setUserConfig(data) {
    let configFile = this.path.join(require('os').homedir(), 'trunxio', this.flags.configfile);
    try {
      this.fs.writeFileSync(configFile, JSON.stringify(data));
      return this.fs.readJSONSync(configFile);
    } catch(e) { return {}; }
  }

  log(msg, level="info") {
    if( this.flags.silent ) return;
    let obj = {};
    if(typeof msg === 'object') {
      if(msg.error || msg.data && msg.data.error) {
        obj["error"] = msg.error || msg.data.error;
      } else {
        obj["data"] = msg.data || msg;
      }
    } else {
      obj[level === 'error' ? 'error' : 'info'] = msg;
    }
    console.log(JSON.stringify(obj))
  }

}

Base.hidden = true;
Base.args = [];
Base.flags = {
  silent: flags.boolean({ description: 'silence all logs to stdout and stderr', hidden: true }),
  showPrivate: flags.boolean({ description: '[default: false] return the private key from database.', hidden: true }),
  socketName: flags.string({ description: 'the name of the socket to initialize', hidden: true, default: 'trunxio1' }),
  configfile: flags.string({ description: 'name of the user config file', hidden: true, default: 'config.json' }),
};

module.exports = Base;
