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
                ENDPOINT_TEST: 'https://mds.test.datacite.org/metadata',
                FORCE_NEW_VERSION: false,
            },
            config
        })
    }

}
