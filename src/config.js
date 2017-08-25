const {envyConf} = require('envyconf')
const env = envyConf('HEIPER')
const config = {}
Object.keys(env).forEach(k => {
    if (k === 'DEBUG') return
    const [pluginName, profile] = k.split('_').map(x => x.toLowerCase())
    if (!(pluginName in config)) config[pluginName] = {}
    if (!(profile in config[pluginName])) config[pluginName][profile] = {}
    const varname = k.substr(`${pluginName}_${profile}_`.length)
    config[pluginName][profile][varname] = env[k]
})
module.exports = config
