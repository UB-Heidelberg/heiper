const Ajv = require('ajv')
const ajv = new Ajv({
    allErrors: true
})
const traf = new(require('traf'))()

const schemaJSON = traf.parseFileSync(`${__dirname}/data/schema.yml`)
const validate = ajv.compile(schemaJSON)

module.exports = function(input) {
    const valid = validate(input)
    if (!valid) {
        const err = new Error("Invalid data")
        err.errors = validate.errors
        throw err
    }
    return true
}

