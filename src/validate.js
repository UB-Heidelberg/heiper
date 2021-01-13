const Ajv = require('ajv').default
// Required vor v7 of ajv.
// See https://ajv.js.org/docs/validation.html#formats
// and https://github.com/ajv-validator/ajv/issues/1295
const addFormats = require('ajv-formats').default
const ajv = new Ajv({
    allErrors: true,
    useDefaults: true, // This will expand defaults defined in the schema in the data
})
addFormats(ajv)
const traf = new(require('traf'))()

const schemaJSON = traf.parseFileSync(`${__dirname}/../data/schema.yml`)
const validate = ajv.compile(schemaJSON)

module.exports = function(input) {
    validate(input)
    return validate.errors
}

