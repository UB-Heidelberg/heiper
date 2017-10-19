const fetch = require('node-fetch')
const Plugin = require('../plugin')

module.exports = class DaraPlugin extends Plugin {

    constructor(config) {
        super({
            template: require('../template')(`${__dirname}/../../data/datacite/datacite.hbs.xml`, {
                dataciteType: (k) => "Text", // TODO hardcoded
            }),
            xsdPath: `${__dirname}/../../data/datacite/metadata40.xsd`,
            configDefaults: {
                ENDPOINT: 'https://mds.datacite.org/metadata',
                ENDPOINT_SANDBOX: 'https://mds.test.datacite.org/metadata',
                ENDPOINT_MINT: 'https://mds.datacite.org/doi',
                ENDPOINT_MINT_SANDBOX: 'https://mds.test.datacite.org/doi',
                FORCE_NEW_VERSION: false,
            },
            config
        })
    }

    registerDOI(input, opts={}) {
        const {USERNAME, PASSWORD} = this.config
        return super.registerDOI(input, opts)
            .then(({status, data}) => {
                console.log({status, data})
                const endpoint = this.config[`ENDPOINT_MINT${opts.useSandbox ? '_SANDBOX' : ''}`]
                const body = `doi=${input.doi}\nurl=${input.url}\n`
                console.log(`Registered metadata, now registering handle at ${endpoint}: ${body}`)
                return fetch(endpoint, {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'text/plain;charset=UTF-8',
                        'Authorization': Plugin.authHeader(USERNAME, PASSWORD),
                    }
                })
            })
            .then(resp => resp.text().then(data => Promise.resolve({status: resp.status, data})))
    }

}
