const {expect, test} = require('@oclif/test');

describe('tests stopping and starting the TrunxIO Wallet service', () => {
  test
  .stdout()
  .command(['service:stop', '--socketName', 'trunxio0'])
  .it('runs service:stop', ctx => {
    expect(ctx.stdout).to.contain('"running": false')
  })
})