const express = require('express')
const validate = require('./validate')
const l10n = require('./l10n')
const bodyParser = require('body-parser')

const plugins = {
    dara: new(require('./plugin/dara'))()
}

function createServer() {
    const app = express()
    app.use(bodyParser.json())

    app.post('/:plugin', (req, res, next) => {

        const pluginName = req.params.plugin
        const plugin = plugins[pluginName]
        if (!(pluginName in plugins))
            return res.status(400).send({
                message: `No such DOI registration plugin "${pluginName}"`
            })

        const input = req.body
        const invalid = validate(input)
        if (invalid)
            return res.status(400).send({
                message: 'Validation failed',
                errors: invalid
            })

        const opts = {
            test: req.query.test && req.query.test.match(/true|1/)
        }
        plugin.registerDOI(input, opts)
            .then(({status, data}) => {
                res.status(status).send({message: 'ok', data})
            })
            .catch(({status, data}) => {
                console.log({status, data})
                res.status(status).send({message: `Plugin ${pluginName} failed to register DOI: ${input.doi}`, data })
            })
    })

    return app
}

module.exports = {createServer}
