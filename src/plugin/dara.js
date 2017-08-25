const Plugin = require('../plugin')

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

module.exports = class DaraPlugin extends Plugin {

    constructor(config) {
        super({
            template: require('../template')(`${__dirname}/../../data/dara/dara.hbs.xml`, {
                daraAvailability: k => daraAvailability[k],
                daraSupportedLanguage: k => daraSupportedLanguage.has(k),
            }),
            xsdPath: `${__dirname}/../../data/dara/dara-3.1.xsd`,
            configDefaults: {
                ENDPOINT: 'https://www.da-ra.de/dara/study/importXML',
                ENDPOINT_TEST: 'https://dara-test.gesis.org:8084/dara/study/importXML',
                FORCE_NEW_VERSION: false,
                INTERNAL_IDENTIFIER_PREFIX: '',
            },
            config
        })
    }

}
