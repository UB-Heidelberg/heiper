const {exec} = require('child-process-promise')
const tempWrite = require('temp-write')
const fs = require('fs')

module.exports = function validateXsd(xml, xsdPath) {
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

