const Command = require('../base.js');
const { isSocketListening } = require('@trunx-io/ipc-client')

class StartCommand extends Command {
  async run() {
    const { flags } = this.parse(StartCommand)
    const { getServiceInfo } = this.functions;

    const dataDir = flags.dataDir || this.path.join(require('os').homedir(), "trunxio");

    let res;
    if( await isSocketListening( this.socketName) ) {
      res = { running: true, message: 'TrunxIO Wallet service is already running' };
    } else {
      const { fork } = require('child_process');
      const servicePath = this.path.join(this.config.options.root, '..', '..', 'src', 'components', 'service.js');
      const service = fork(servicePath, [], { stdio: ['ipc','ignore','ignore'], env: { dataDir, socketName: this.socketName } });

      if(service.pid) {
        if(flags.background) {
          service.disconnect();
          service.unref();
        }
        res = { running: true, message: `Started TrunxIO Wallet service with PID: ${service.pid}`, dataDir };
      } else {
        res = { running: false, message: 'Unable to start the TrunxIO Wallet service' };
      }
    }

    this.log(res);
    return {data: res};
  }
}

StartCommand.hidden = false;

StartCommand.description = `Start the TrunxIO Wallet database service
The service:start command will start the TrunxIO Wallet service and return its PID.
`

StartCommand.flags = {
  ...Command.flags,
  dataDir: flags.string({ char: 'd', description: 'TrunxIO database service data directory' }),
  background: flags.boolean({ char: 'b', description: 'background process (detached)' }),
}

module.exports = StartCommand
