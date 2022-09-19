const {expect, test} = require('@oclif/test');

const fs = require('fs');

describe('create temporary directory for testing', () => {
  test
  .stdout()
  .do(() => {
    if(!fs.existsSync('./tmp/trunxio-test-tmp')) fs.mkdirSync('./tmp/trunxio-test-tmp', {recursive: true});
    console.log(fs.readdirSync('./tmp/trunxio-test-tmp'));
  })
  .it('create ./tmp/trunxio-test-tmp directory', ctx => {
    expect(ctx.stdout).to.contain('\n')
  })
})