const { getOptions } = require('loader-utils');
const path = require('path')
const { given } = require('flooent')

module.exports = function seamlesslyLoader(source) {
  const { rcPath = path.cwd() } = getOptions(this);
  const seamlesslyRc = require(path.join(rcPath, '.seamlesslyrc.json'))

  const ext = given.string(seamlesslyRc.generatedRoutes[0].file).afterLast('.').valueOf()
  const requiredFilename = given.string(this.request).afterLast(path.sep).endWith(ext).valueOf()

  return seamlesslyRc.generatedRoutes
    .filter(route => route.file.endsWith(requiredFilename))
    .map(route => {
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