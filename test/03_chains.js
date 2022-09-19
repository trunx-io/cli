const {expect, test} = require('@oclif/test');

describe('tests listing and adding chains', () => {
  test
  .stdout()
  .command(['chains:list', '--socketName', 'trunxio0'])
  .it('runs chains:list', ctx => {
    expect(ctx.stdout).to.contain('"chains": []')
  })

  test
  .stdout()
  .command(['chains:add', '-s', 'https://eos.greymass.com', '--socketName', 'trunxio0'])
  .it('runs chains:add', ctx => {
    expect(ctx.stdout).to.contain('"https://eos.greymass.com": "added to chain store"')
  })

  test
  .stdout()
  .command(['chains:add', 'https://eos.greymass.com', '--socketName', 'trunxio0'])
  .it('runs chains:add again same args', ctx => {
    expect(ctx.stdout).to.contain('"https://eos.greymass.com": "already exists in chain store"')
  })

  test
  .stdout()
  .command(['chains:list', '--socketName', 'trunxio0'])
  .it('runs chains:list', ctx => {
    expect(ctx.stdout).to.contain('"chain_id": "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"')
  })
})