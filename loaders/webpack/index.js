const { getOptions } = require('loader-utils');
const path = require('path')

module.exports = function seamlesslyLoader(source) {
  const { rcPath = path.cwd() } = getOptions(this);
  const seamlesslyRc = require(path.join(rcPath, '.seamlesslyrc.json'))

  return seamlesslyRc.generatedRoutes.map(route => {
    return `exports.${route.endpoint} = function fetchFromBackend(...args) {
      return fetch('${seamlesslyRc.backendUrl}/${route.endpoint}', {
        method: "POST",
        body: JSON.stringify({ args }),
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json()).then(res => res.result)
    }`
  }).join('\n')
}