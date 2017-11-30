const fetch = require('node-fetch')
const {envyLog} = require('envyconf')
const xsdValidate = require('./xsd')

module.exports = class BasePlugin {

  static authHeader(username, password) {
    return 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
  }

  constructor({template, xsdPath, configDefaults={}, config={}}) {
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

  validateXML(xml) {
    return xsdValidate(xml, this.xsdPath)
  }

  registerDOI(input, opts={}) {
    opts = Object.assign({
      useSandbox: false,
      validate: true,
    }, opts)
    const endpoint = this.config[`ENDPOINT${opts.useSandbox ? '_SANDBOX' : ''}`]
    const xml = this.template(input)
    const validateOrNot = opts.validate ? this.validateXML(xml) : Promise.resolve()
    const {USERNAME, PASSWORD} = this.config
    return new Promise((resolve, reject) => {
      validateOrNot
        .then(() => {
          console.log(`Registering ${input.doi} -> ${input.url} @ ${endpoint}`)
          return fetch(endpoint, {
            method: 'POST',
            body: xml,
            headers: {
              'Content-Type': 'application/xml',
              'Authorization': BasePlugin.authHeader(USERNAME, PASSWORD),
            }
          })
        })
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

