const axios = require('axios')
const {envyConf} = require('envyconf')
const fs = require('fs')
const {exec} = require('child-process-promise')
const tempWrite = require('temp-write')

const daraAvailability = {
    download: 1,
    delivery: 2,
    onsite:   3,
    none:     4,
    unknown:  5,
}
const daraSupportedLanguage = new Set([
    'bel', 'bos', 'cze', 'dut', 'eng',
    'est', 'fin', 'fre', 'ger', 'gre',
    'hrv', 'hun', 'ita', 'lav', 'lit',
    'nor', 'pol', 'rum', 'rus', 'slo',
    'slv', 'spa', 'srp', 'swe', 'ukr'
])

module.exports = class DaraPlugin {

    constructor() {
        Object.assign(this, envyConf('HEIPER_DARA', {
            ENDPOINT_TEST: 'https://dara-test.gesis.org:8084/dara/study/importXML',
            ENDPOINT: 'https://www.da-ra.de/dara/study/importXML',
            USERNAME: 'testuser',
            PASSWORD: 'testpw',
        }))
        this.template = require('../template')(`${__dirname}/../data/dara.hbs.xml`, {
            daraAvailability: k => daraAvailability[k],
            daraSupportedLanguage: k => daraSupportedLanguage.has(k),
        })
    }

    _validate(xml) {
        const xsdPath = `${__dirname}/../data/dara-3.1.xsd`
        return new Promise((resolve, reject) => {
            let xmlPath;
            tempWrite(xml)
                .then(_xmlPath => {
                    xmlPath = _xmlPath
                    return exec(`xmllint --schema ${xsdPath} ${xmlPath}`)
                })
                .then(({stdout, stderr}) => resolve({status: 425, data: {stdout, stderr}}))
                .catch(err => reject(err))
                .then(() => fs.unlink(xmlPath, err => {}))
        })
    }

    registerDOI(input, opts={}) {
        opts = Object.assign({
            test: false,
            validate: true,
        }, opts)
        const endpoint = this[`ENDPOINT${opts.test ? '_TEST' : ''}`]
        const xml = this.template(input)
        return new Promise((resolve, reject) => {
            const validateOrNot = opts.validate ? this._validate(xml) : Promise.resolve()
            validateOrNot
                .then(() => {
                    // return axios.post(endpoint, xml, {auth: {username: this.USERNAME, password: this.PASSWORD}})
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
