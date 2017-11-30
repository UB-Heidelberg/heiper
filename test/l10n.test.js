const tap = require('tap')
const l10nFactory = require('../src/l10n')

tap.test('l10n', t => {
  const ger = l10nFactory('ger')
  const eng = l10nFactory('eng')
  t.equals(ger('article'), 'Artikel')
  t.equals(eng('article'), 'Article')
  t.end()
})
