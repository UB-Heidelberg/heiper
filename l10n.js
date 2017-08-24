const traf = new(require('traf'))()
const l10nData = traf.parseFileSync(`${__dirname}/data/l10n.yml`)

const iso639_2_to_1 = {}
const iso639_1_to_2 = {}
;[
    ['de', 'ger'],
    ['en', 'eng'],
].forEach(([two, three]) => {
    iso639_1_to_2[two] = three
    iso639_2_to_1[three] = two
})

module.exports = function l10nFactory(lang, str) {
    if (str === undefined) return function l10n(str) {
        return l10nData[lang][str] || str
    }
    else return l10nData[lang][str] || str
}

Object.assign(module.exports, {iso639_2_to_1, iso639_1_to_2})
