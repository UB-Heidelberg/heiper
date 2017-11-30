const tap = require('tap')
const DaraPlugin = require('../src/plugin/dara')
const validate = require('../src/validate')
const getDaraPlugin = (opts={}) => new DaraPlugin(Object.assign({
  USERNAME: 'foo',
  PASSWORD: 'foo',
}, opts))

tap.test('dara 3.1', t => {
  t.plan(3)
  const dara = getDaraPlugin({DARA_VERSION: '3.1'})
  const input = require('./fixtures/anno2.json')
  t.notOk(validate(input), 'no errors in input')
  const xml = dara.template(input)
  t.ok(xml, 'produced xml')
  dara.validateXML(xml)
    .then(() => t.ok(true, "Validated XML for dara"))
    .catch(err => t.fail(err))
})

tap.test('dara 3.6 (doesnt exist)', t => {
  t.plan(1)
  try {
    getDaraPlugin({DARA_VERSION: '3.6'})
    t.fail("This should not have worked :(")
  } catch (e) {
    t.ok(true, "Threw as epected")
  }
})

tap.test('dara 4.0', t => {
  t.plan(2)
  const dara = getDaraPlugin({DARA_VERSION: '4.0'})
  const input = require('./fixtures/anno2.json')
  const xml = dara.template(input)
  t.ok(xml, 'produced xml')
  dara.validateXML(xml)
    .then(() => t.ok(true, "Validated XML for dara"))
    .catch(err => t.fail(err))
})
