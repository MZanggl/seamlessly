const { getOptions } = require('loader-utils');
const { readRcFile, getRoutesForFile } = require('../utils')

module.exports = function seamlesslyLoader(source) {
  const { rcPath } = getOptions(this);
  const seamlesslyRc = readRcFile(rcPath)
  const routesForFile = getRoutesForFile(seamlesslyRc, this.request)

  return routesForFile.map(route => {
      return `exports.${route.id} = function fetchFromBackend(...args) {
        return fetch('${seamlesslyRc.apiHost}/${seamlesslyRc.apiPrefix}/${route.endpoint}', {
          method: "${route.method}",
          body: JSON.stringify({ args }),
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json()).then(res => res.result)
      }`
    }).join('\n')
}