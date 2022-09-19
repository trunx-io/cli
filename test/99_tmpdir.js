const {expect, test} = require('@oclif/test');

const fs = require('fs');

describe('delete temporary directory for testing', () => {
  test
  .stdout()
  .do(() => {
    if(fs.existsSync('./tmp/trunxio-test-tmp')) fs.rmdirSync('./tmp/trunxio-test-tmp', {recursive: true});
    console.log(fs.existsSync('./tmp/trunxio-test-tmp'));
  })
  .it('delete ./tmp/trunxio-test-tmp directory', ctx => {
    expect(ctx.stdout).to.contain('false')
  })
})