const fetch = require('node-fetch')
const {envyLog} = require('envyconf')
const xsdValidate = require('./xsd')

function authHeader(username, password) {
  return 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
}

module.exports = class DatacitePlugin {

  constructor({template, xsdPath, configDefaults, config}) {
    this.config = Object.assign({}, configDefaults, config)
    ;[
      'USERNAME',
      'PASSWORD'
    ].forEach(required => {
      if (!(required in config))
        throw new Error(`Missing '${required}' setting`)
    })
    this.template = template
    this.xsdPath = xsdPath
    this.log = envyLog('HEIPER')
  }

  registerDOI(input, opts={}) {
    opts = Object.assign({
      test: false,
      validate: true,
    }, opts)
    const endpoint = this.config[`ENDPOINT${opts.test ? '_TEST' : ''}`]
    const xml = this.template(input)
    const validateOrNot = opts.validate ? xsdValidate(xml, this.xsdPath) : Promise.resolve()
    const {USERNAME, PASSWORD} = this.config
    return new Promise((resolve, reject) => {
      validateOrNot
        .then(() => fetch(endpoint, {
            method: 'POST',
            body: xml,
            headers: {
              'Content-Type': 'application/xml',
              'Authorization': authHeader(USERNAME, PASSWORD),
            }
        }))
        .then(res => {
          const {status} = res
          res.text().then(data => {
            console.log("RESP", {status, data})
            if (res.status >= 400) {
              reject({status, data})
            } else {
              resolve(res)
            }
          })
        })
    })

  }

}

