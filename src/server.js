const express = require('express')
const bodyParser = require('body-parser')

const validate = require('./validate')
const config = require('./config')

function createServer() {
    const app = express()
    app.use(bodyParser.json())

    Object.keys(config).forEach(pluginName => {
        Object.keys(config[pluginName]).forEach(profile => {
            console.log(`Setting up /${pluginName}/${profile}`)
            const plugin = new(require(`./plugin/${pluginName}`))(config[pluginName][profile])

            app.post(`/${pluginName}/${profile}`, (req, res, next) => {
                const input = req.body
                const invalid = validate(input)
                const opts = {
                    test: req.query.test && req.query.test.match(/true|1/),
                    dryRun: req.query.dryRun && req.query.dryRun.match(/true|1/),
                }
                if (invalid) return res.status(400).send({message: 'Validation failed', errors: invalid})
                else if (opts.dryRun) return res.status(200).send({valid:true})
                plugin.registerDOI(input, opts)
                    .then(({status, data}) => {
                        res.status(status).send({status, data})
                    })
                    .catch(({status, data}) => {
                        console.log({status, data})
                        res.status(status).send({message: `Plugin ${pluginName} failed to register DOI: ${input.doi}`, data})
                    })
            })

        })
    })

    return app
}

module.exports = {createServer}