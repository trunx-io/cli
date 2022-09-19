const {expect, test} = require('@oclif/test');

describe('tests stopping and starting the TrunxIO Wallet service', () => {
  test
  .stdout()
  .command(['service:stop', '--configfile', 'trunxtest.json', '--socketName', 'trunxio0'])
  .it('runs service:stop', ctx => {
    expect(ctx.stdout).to.contain('"running": false')
  })

  test
  .stdout()
  .command(['service:status', '--configfile', 'trunxtest.json', '--socketName', 'trunxio0'])
  .it('runs service:status', ctx => {
    expect(ctx.stdout).to.contain('"running": false')
  })

  test
  .stdout()
  .command(['service:start', '-d', './tmp/trunxio-test-tmp', '-b', '--configfile', 'trunxtest.json', '--socketName', 'trunxio0'])
  .it('runs service:start', ctx => {
    expect(ctx.stdout).to.contain('"running": true')
  })

  test
  .stdout()
  .command(['service:start', '-b', '--configfile', 'trunxtest.json', '--socketName', 'trunxio0'])
  .it('runs service:start', ctx => {
    expect(ctx.stdout).to.contain('"message": "TrunxIO Wallet service is already running with PID')
  })
})