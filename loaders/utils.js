const path = require('path')
const { given } = require('flooent')

exports.readRcFile = (rcPath = path.cwd()) => {
  return require(path.join(rcPath, '.seamlesslyrc.json'))
}

exports.getRoutesForFile = (seamlesslyRc, requiredModulePath) => {
  if (seamlesslyRc.generatedRoutes.length === 0) {
    console.error('.seamlesslyrc.json does not have any routes.')
    return []
  }

  const ext = given.string(seamlesslyRc.generatedRoutes[0].file).afterLast('.').valueOf()
  const filenameWithExt = given.string(requiredModulePath).afterLast(path.sep).endWith(ext).valueOf()
  const routesForFile = seamlesslyRc.generatedRoutes.filter(route => route.file.endsWith(filenameWithExt))

  if (routesForFile.length === 0) {
    console.error(`File ${filenameWithExt} does not have any routes (check .seamlesslyrc.json for available routes).`)
  }

  return routesForFile
}
