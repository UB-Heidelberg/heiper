const handlebars = require('handlebars')
const fs = require('fs')
const l10n = require('./l10n')

handlebars.registerHelper('__',           (lang, str) => l10n(lang, str))
handlebars.registerHelper('trim',         (num, str)  => str.substring(0, parseInt(num)))
handlebars.registerHelper('iso639_1',     (lang)      => l10n.iso639_2_to_1[lang])
handlebars.registerHelper('iso639_2',     (lang)      => l10n.iso639_2_to_1[lang])
handlebars.registerHelper('year',         (date)      => date.substr(0, 4))
handlebars.registerHelper('monthyear',    (date)      => date.substr(0, 7))
handlebars.registerHelper('monthyearday', (date)      => date.substr(0, 10))
handlebars.registerHelper({
    eq:  function (v1, v2) { return v1 === v2; },
    ne:  function (v1, v2) { return v1 !== v2; },
    lt:  function (v1, v2) { return v1 < v2; },
    gt:  function (v1, v2) { return v1 > v2; },
    lte: function (v1, v2) { return v1 <= v2; },
    gte: function (v1, v2) { return v1 >= v2; },
    and: function (v1, v2) { return v1 && v2; },
    or:  function (v1, v2) { return v1 || v2; }
});

module.exports = function compileTemplate(path, helpers) {
    if (helpers) handlebars.registerHelper(helpers)
    const templateString = fs.readFileSync(path, {encoding: 'utf-8'})
    const template = handlebars.compile(templateString)
    return function runTemplate(...data) {
        return template(Object.assign({}, ...data, {
            _langs: ['eng', 'ger']
        }))
            // .replace(/\n+\s*/g, '')
    }
}
