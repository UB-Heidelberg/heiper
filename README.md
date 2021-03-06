# heiper

<!-- BEGIN-MARKDOWN-TOC -->
* [Installation](#installation)
* [Metadata schema](#metadata-schema)
* [Data model](#data-model)
	* [Plugins](#plugins)
	* [Profiles](#profiles)
	* [Configuration](#configuration)
* [Documentation / Specs](#documentation--specs)
	* [dara](#dara)

<!-- END-MARKDOWN-TOC -->

## Installation

```
sudo apt install xmllint
npm install
npm install -g pm2
pm2 start pm2.prod.yml
```


## Metadata schema

Expects resources to be described in a JSON object according to a [JSON schema](./schema.yml).

Languages are always specified in ISO639-2 format, i.e. three letters, e.g. `ger`, `eng`, `fre`.

Dates should be ISO 8601 profiles as defined by [RFC 3339 / 5.6](https://tools.ietf.org/html/rfc3339#section-5.6)

## Data model

### Plugins

A plugin represents a specific DOI registry with a specific API.

### Profiles

Profiles are configurations of plugins for specific uses. For example, one
institution might use the same registry with different prefixes for different
internal organizations (digital library, research data repository, journals...)

### Configuration

All configuration happens via environment variables.

```
HEIPER_<PLUGIN>_<PROFILE>_<VARNAME>="<VALUE>"
```

## Documentation / Specs

### dara

* [Specs for 3.1 Data Model](https://doi.org/10.4232/10.mdsdoc.3.1)
* [Specs for 4.0 Data Model](https://www.da-ra.de/fileadmin/media/da-ra.de/PDFs/FINAL_GESIS-Paper_25-2017.pdf)
