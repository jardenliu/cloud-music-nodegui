const OSUtils = require('node-os-utils')

export const platform = OSUtils.os.platform()
export const isMac = platform === 'darwin'
export const isLinux = platform === 'linux'
export const isWin = platform === 'win32'
