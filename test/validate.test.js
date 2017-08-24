const tap = require('tap')
const validate = require('../validate')

const fixtures = {
    valid: [
        require('./fixtures/sample1.json')
    ],
}

tap.test('validation', t => {
    let err
    t.ok(validate({}), '{} failed expectedly')
    err = validate(fixtures.valid[0])
    if (err) console.log(err)
    t.notOk(err, 'this should validate')
    t.end()
})
