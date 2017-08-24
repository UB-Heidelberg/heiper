const Ajv = require('ajv')
const ajv = new Ajv({
    allErrors: true,
    useDefaults: true, // This will expand defaults defined in the schema in the data
})
const traf = new(require('traf'))()

const schemaJSON = traf.parseFileSync(`${__dirname}/data/schema.yml`)
const validate = ajv.compile(schemaJSON)

module.exports = function(input) {
    const valid = validate(input)
    return validate.errors
}

