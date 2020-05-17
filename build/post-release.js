const fs = require('fs')
const os = require('os')
const path = require('path')

const appName = '云音乐'
const appPath = 'cloud-music'

const target = path.resolve(__dirname, '../deploy/win32/build', appName)
const newPath = path.resolve(__dirname, '../deploy/win32/build', appPath)

if (os.platform() === 'win32') {
  const isExist = fs.existsSync(target)
  if (isExist) {
    fs.renameSync(target, newPath)
  }
}
