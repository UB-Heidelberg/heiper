const tap = require('tap')
const DaraPlugin = require('../src/plugin/dara')
const validate = require('../src/validate')

tap.test('dara plugin', t => {

  t.plan(3)

  const dara = new DaraPlugin({
    USERNAME: 'foo',
    PASSWORD: 'foo',
    DARA_VERSION: '3.1',
  })
  const input = require('./fixtures/anno2.json')
  t.notOk(validate(input), 'no errors in input')
  const xml = dara.template(input)
  t.ok(xml, 'produced xml')
  dara.validateXML(xml)
    .then(() => t.ok(true, "Validated XML for dara"))
    .catch(err => t.fail(err))
})

