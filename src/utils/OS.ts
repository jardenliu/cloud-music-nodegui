const OSUtils = require('node-os-utils')

export const isMac = () => {
  return OSUtils.os.platform() === 'darwin'
}

export const isLinux = () => {
  return OSUtils.os.platform() === 'linux'
}

export const isWin = () => {
  return OSUtils.os.platform() === 'win32'
}
