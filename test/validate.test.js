const tap = require('tap')
const validate = require('../validate')

tap.test('validation', t => {
    try {
        validate({})
    } catch (err) {
        t.ok(true, 'failed expectedly')
    }
    validate({
        doi: '10.1234/567',
        url: 'http://ub/567',
        license: {
            ger: {
                url: 'http://no.no/ger',
                description: 'ALLES VERBOTTTEN',
            }
        },
        internalIdentifier: '567',
        publicationDate: '2000-01-01T00:00:00Z',
        lang: 'ger',
        title: {
            ger: 'foo'
        },
    })
    t.ok(true, 'validated as expected')
    t.end()
})
