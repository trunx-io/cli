const {expect, test} = require('@oclif/test');

describe('tests listing and adding keys', () => {
  test
  .stdout()
  .command(['keys:list', '--socketName', 'trunxio0'])
  .it('runs keys:list', ctx => {
    expect(ctx.stdout).to.contain('"keys": []')
  })

  test
  .stdout()
  .command(['keys:add', '5JUzsJi7rARZy2rT5eHhcdUKTyVPvaksnEKtNWzyiBbifJA1dUW', '--socketName', 'trunxio0'])
  .it('runs keys:add', ctx => {
    expect(ctx.stdout).to.contain('"EOS6CRG7tXc9u2ySGqkH69JrwG4yXojkZBVUMLgUnKfM6uJpDUtKy": "added to key store"')
  })

  test
  .stdout()
  .command(['keys:add', '5JUzsJi7rARZy2rT5eHhcdUKTyVPvaksnEKtNWzyiBbifJA1dUW', '--socketName', 'trunxio0'])
  .it('runs keys:add again same args', ctx => {
    expect(ctx.stdout).to.contain('"EOS6CRG7tXc9u2ySGqkH69JrwG4yXojkZBVUMLgUnKfM6uJpDUtKy": "already exists in key store"')
  })

  test
  .stdout()
  .command(['keys:list', '--socketName', 'trunxio0'])
  .it('runs keys:list', ctx => {
    expect(ctx.stdout).to.contain('"EOS6CRG7tXc9u2ySGqkH69JrwG4yXojkZBVUMLgUnKfM6uJpDUtKy"')
  })
})