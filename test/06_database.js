const {expect, test} = require('@oclif/test');

describe('tests contents of database after test runs', () => {
  test
  .stdout()
  .command(['db:read', 'keys', 'accounts', 'chains', '--socketName', 'trunxio0'])
  .it('runs db:read', ctx => {
    expect(JSON.stringify(JSON.parse(ctx.stdout).keys[0].publicKey)).to.contain('EOS6CRG7tXc9u2ySGqkH69JrwG4yXojkZBVUMLgUnKfM6uJpDUtKy')
    expect(JSON.stringify(JSON.parse(ctx.stdout).chains[0].server)).to.contain('https://eos.greymass.com')
    expect(JSON.stringify(JSON.parse(ctx.stdout).accounts[0].account_name)).to.contain('eosio')
  })
})