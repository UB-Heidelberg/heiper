const tap = require('tap')
const validate = require('../src/validate')

const fixtures = {
  valid: [
    require('./fixtures/anno.json'),
    require('./fixtures/anno2.json'),
    require('./fixtures/anno3.json')
  ],
}

tap.test('validate', t => {
  t.plan(1 + fixtures.valid.length)
  t.ok(validate({}), '{} (empty object) failed expectedly')

  fixtures.valid.map((fixture, i) => {
    const err = validate(fixture)
    if (err) console.log(err)
    t.notOk(err, `valid[${i}] should validate`)
  })
})
