const {expect, test} = require('@oclif/test');

describe('tests listing and adding accounts', () => {
  test
  .stdout()
  .command(['accounts:list', '--socketName', 'trunxio0'])
  .it('runs accounts:list', ctx => {
    expect(ctx.stdout).to.contain('"accounts": []')
  })

  test
  .stdout()
  .command(['accounts:add', 'eosio', '-c', 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', '--socketName', 'trunxio0'])
  .it('runs accounts:add', ctx => {
    expect(ctx.stdout).to.contain('"eosio:aca3..e906": "added to account store"')
  })

  test
  .stdout()
  .command(['accounts:add', 'eosio', '-c', 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906', '--socketName', 'trunxio0'])
  .it('runs accounts:add again same args', ctx => {
    expect(ctx.stdout).to.contain('"eosio:aca3..e906": "already exists in account store"')
  })

  test
  .stdout()
  .command(['accounts:list', '--socketName', 'trunxio0'])
  .it('runs accounts:list', ctx => {
    expect(ctx.stdout).to.contain('"account_name": "eosio"')
  })
})