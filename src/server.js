const express = require('express')
const bodyParser = require('body-parser')

const validate = require('./validate')
const config = require('./config')

function createServer() {
    const app = express()
    app.use(bodyParser.json())
    app.use(require('morgan')('dev'))

    Object.keys(config).forEach(pluginName => {
        Object.keys(config[pluginName]).forEach(profile => {
            console.log(`Setting up /${pluginName}/${profile}`)
            const plugin = new(require(`./plugin/${pluginName}`))(config[pluginName][profile])

          app.post(`/${pluginName}/${profile}`, (req, res, next) => {
            const opts = {
              useSandbox: req.query.sandbox && req.query.sandbox.match(/true|1/),
              dryRun: req.query.dryRun && req.query.dryRun.match(/true|1/),
            }
            if (!Array.isArray(req.body)) {
              return res.status(400).send({error: "Must pass an array of JSON objects"})
            }
            Promise.all(req.body.map(input => {
              const invalid = validate(input)
              if (invalid) return Promise.reject({
                status: 415,
                data: {message: 'Validation failed', errors: invalid}
              })
              else if (opts.dryRun) return Promise.resolve({
                status: 200,
                data: {valid: ! invalid}
              })
              return new Promise((resolve, reject) => {
                plugin.registerDOI(input, opts)
                  .then(data => resolve(data))
                  .catch(reject)
              })
            }))
              .then(registered => {res.status(201).send(registered)})
              .catch(({status, data}) => res.status(status).send(data))
          })
        })
    })

    return app
}

module.exports = {createServer}
