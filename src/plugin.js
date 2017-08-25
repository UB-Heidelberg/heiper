const axios = require('axios')
const {envyConf} = require('envyconf')
const xsdValidate = require('./xsd')

module.exports = class DatacitePlugin {

    constructor({template, xsdPath, configDefaults, config}) {
        this.config = Object.assign({}, configDefaults, config)
        ;['USERNAME', 'PASSWORD'].forEach(required => { if (!(required in config)) throw new Error(`Missing '${required}' setting`) })
        this.template = template
        this.xsdPath = xsdPath
    }

    registerDOI(input, opts={}) {
        opts = Object.assign({
            test: false,
            validate: true,
        }, opts)
        const endpoint = this.config[`ENDPOINT${opts.test ? '_TEST' : ''}`]
        const xml = this.template(input)
        return new Promise((resolve, reject) => {
            const validateOrNot = opts.validate ? xsdValidate(xml, this.xsdPath) : Promise.resolve() 
            validateOrNot
                .then(() => {
                    const {USERNAME, PASSWORD} = this.config
                    // return axios.post(endpoint, xml, {auth: {username: USERNAME, password: PASSWORD}})
                    //     .catch(({response}) => {
                    //         const {status, data} = response
                    //         reject({status, data})
                    //     })
                    return reject({status: 499, data: {xml, endpoint}})
                })
                // .then(({status, data}) => resolve({status, data}))
                .catch(err => {
                    // return reject({status: 499, data: {xml, endpoint}})
                    //     .then(({status, data}) => resolve({status, data}))
                    console.log(err)
                })
        })

    }

}

