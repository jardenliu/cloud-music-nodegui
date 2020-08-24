const { resolve } = require('path')
const { spawn } = require('child_process')
const { existsSync } = require('fs')
const rimraf = require('rimraf')

const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx'
const processConfig = {
  cwd: resolve(__dirname, '..'),
  stdio: 'inherit'
}

rimraf.sync(resolve(__dirname, '../dist'))
let isInitDist = false


const webProcess = spawn(npx, ['webpack', '--mode=development'], {
  cwd: resolve(__dirname, '..')
})

webProcess.stdout.on('data', function (data) {
  console.log(`${data}`)
  if (~data.indexOf(`Version: typescript`) && !isInitDist) {
    isInitDist=true
    let mainProcess = spawn(npx, ['qode', '--inspect', './dist/index.js'], processConfig)
  }
})
