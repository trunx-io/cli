const {expect, test} = require('@oclif/test');

describe('tests creating and unlocking database', () => {
  test
  .stdout()
  .command(['db:list', '--socketName', 'trunxio0'])
  .it('runs db:list', ctx => {
    expect(ctx.stdout).to.contain('"wallets": []')
  })

  test
  .stdout()
  .command(['db:unlock', '-w', 'testing', '-p', '73$71N6', '--socketName', 'trunxio0'])
  .it('creates and unlocks wallet database', ctx => {
    expect(ctx.stdout.replace(/(\s|\n)/g, '')).to.contain(JSON.stringify(
      {
        "data": {
          "keys": {
            "data": []
          },
          "accounts": {
            "data": []
          },
          "chains": {
            "data": []
          },
          "apps": {
            "data": []
          },
          "miners": {
            "data": []
          },
          "settings": {
            "data": [
              {
                "name": "autolock",
                "value": 600
              }
            ]
          }
        }
      }
    ))
  })

  test
  .stdout()
  .command(['config:get', '--socketName', 'trunxio0'])
  .it('runs config:get', ctx => {
    expect(ctx.stdout).to.contain('"selectedWallet": "testing"')
  })

})