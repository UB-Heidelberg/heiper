const traf = new(require('traf'))()
const l10nData = traf.parseFileSync(`${__dirname}/data/l10n.yml`)

module.exports = function l10nFactory(lang) {
    return function l10n(str) {
        return l10nData[lang][str] || str
    }
}
