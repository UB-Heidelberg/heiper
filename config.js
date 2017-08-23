module.exports = {

    l10n: {
        monograph:        {ger: 'Monographie',       eng: 'Monograph'},
        periodical:       {ger: 'Periodikum',        eng: 'Periodical'},
        multivolume_work: {ger: 'Mehrbändiges Werk', eng: 'Multivolume work'},
        manuscript:       {ger: 'Handschrift',       eng: 'Manuscript'},
        charter:          {ger: 'Urkunde',           eng: 'Charter'},
        issue:            {ger: 'Zeitschriftenheft', eng: 'Issue'},
        article:          {ger: 'Artikel',           eng: 'Article'}
    },

    // doi_resource_identifier_prefix: Prefix für internen Identifier (da|ra: resourceIdentifier). Das ist nicht der DOI-Prefix!
    doi_resource_identifer_prefix: 'diglit',

    // Registrierungsstelle.Mögliche Werte dara: da|ra (Default), datacite: DataCite
    doi_api_type: 'dara',
    //doi_api_type: 'datacite',

    // Template zur Erzeugung der DOI-Metadaten für die Registrierungs-API. Datei muss im Verzeichnis diglit/import/doi/etc liegen!
    doi_metadata_template: 'dara_doi.tt.xml',
    //doi_metadata_template: 'datacite_doi.tt.xml',

    doi_api_user: 'ubhd',
    //doi_api_user: 'gesis.ubhd',
    // doi_api_url: 'http://'.$doi_api_user.':'.$doi_api_pass.'@www.da-ra.de/dara/study/importXML?registration=true',
    //doi_api_url: 'https://'.$doi_api_user.':'.$doi_api_pass.'@mds.datacite.org',

    // Soll DOI bei Metadatenänderungen neu registriert werden?
    doi_reregister_metadata_change: 0,

    lang: [
        'bel',
        'bos',
        'cze',
        'dut',
        'eng',
        'est',
        'fin',
        'fre',
        'gre',
        'ger',
        'hrv',
        'hun',
        'ita',
        'lav',
        'lit',
        'nor',
        'pol',
        'rum',
        'rus',
        'slo',
        'slv',
        'spa',
        'srp',
        'swe',
        'ukr'
    ],

}
