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
            console.log("Request body:", JSON.stringify(req.body, null, 2));
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
              return plugin.registerDOI(input, opts)
            }))
              .then(registered => {res.status(201).send(registered)})
              .catch((err) => {
                let status = 400
                let data = err
                if ('status' in err) {
                  status = err.status
                  data = err.data
                }
                console.log(err)
                res.status(status).send(data)
              })
          })
        })
    })

    return app
}

module.exports = {createServer}
