const Plugin = require('../plugin')
const fs = require('fs')

module.exports = class DummyPlugin extends Plugin {

  constructor(config={}) {
    super({config})
  }

  registerDOI(input, opts={}) {
    return new Promise((resolve, reject) => {
      const status = 201
      const data = `${input.doi}=${input.url}`
      fs.appendFile('/tmp/dois.txt', `${data}\n`, err => {
        if (err) return reject({status: 500, data: "Couldn't write to file"})
        return resolve({status, data})
      })
    })
  }

}
