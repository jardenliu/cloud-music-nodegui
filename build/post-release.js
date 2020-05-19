const fs = require('fs')
const os = require('os')
const path = require('path')
var zip = require('bestzip')

const appName = '云音乐'
const appPath = 'cloud-music'

const platform = os.platform()

const bundleFileName = `cloud-music-${platform}-release.zip`

const buildPath = path.resolve(__dirname, `../deploy/${platform}/build`)
const rootPath = path.resolve(__dirname, `..`)

const target = path.resolve(buildPath, appName)

const newPath = path.resolve(buildPath, appPath)

const AppImageName = 'Application-x86_64.AppImage'

const bundleFiles = async source => {
  try {
    await zip({
      source,
      destination: bundleFileName,
      cwd: buildPath
    })
  } catch (err) {
    console.error(err.stack)
    process.exit(1)
  }
}

const main = async () => {
  if (platform === 'win32') {
    const isExist = fs.existsSync(target)
    if (isExist) {
      fs.renameSync(target, newPath)
    }
  }

  if (platform === 'linux') {
    fs.readFileSync(
      path.resolve(target, AppImageName),
      `${rootPath}/${AppImageName}`
    )
  }

  const sourceMap = {
    darwin: `${appName}.app`,
    win32: appPath,
    linux: appName
  }
  await bundleFiles(sourceMap[platform])

  fs.renameSync(
    path.resolve(buildPath, bundleFileName),
    `${rootPath}/${bundleFileName}`
  )
}

main()
