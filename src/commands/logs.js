const Command = require('./base.js');
const Tail = require('tail').Tail;

class LogsCommand extends Command {
  async run() {
    const {args, flags} = this.parse(LogsCommand)

    var logFile = this.path.join(require('os').homedir(), 'trunxio', 'logs', 'cli.log');

    if ( this.fs.existsSync(logFile) ) {
      const readLastLines = require('read-last-lines');
      readLastLines.read(logFile, parseInt((flags.lines)))
        .then((lines) => {
          this.log(lines.replace(/\n$/,''));
          if ( flags.clear ) this.fs.writeFileSync(logFile, '');
        });

      if( flags.tail ) {
        let tail = new Tail(logFile);
        tail.on("line", (data) => { this.log(data) });
      }
    }
  }
}

LogsCommand.hidden = false;

LogsCommand.description = `View the TrunxIO wallet logs
The logs command will allow you to view the TrunxIO wallet logs.
`

LogsCommand.args = []

LogsCommand.flags = {
  ...Command.flags,
  clear: flags.boolean({ char: 'c', description: 'clear (delete) the log files after printing' }),
  lines: flags.string({ char: 'n', description: 'number of lines to output', default: '20' }),
  tail: flags.boolean({ char: 't', description: 'tail logs (keep process running and watch logs file)' }),
}

module.exports = LogsCommand
