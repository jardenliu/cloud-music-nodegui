const os = require('os')
const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env, argv) => {
  const config = {
    mode: 'production',
    entry: ['./src/index.tsx'],
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { cacheDirectory: true, cacheCompression: false }
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg|bmp|otf|ttf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: { publicPath: 'dist' }
            }
          ]
        },
        {
          test: /\.node/i,
          use: [
            {
              loader: 'native-addon-loader',
              options: { name: '[name]-[hash].[ext]' }
            }
          ]
        }
      ]
    },
    plugins: [new CleanWebpackPlugin()],
    resolve: {
      modules: [path.resolve('src'), path.resolve('node_modules')],
      alias: {
        assets: path.resolve('assets'),
        '@nodegui/plugin-title-bar':
          os.platform() === 'darwin'
            ? '@nodegui/plugin-title-bar'
            : path.resolve('build/noop.js')
      },
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
    }
  }

  if (argv.mode === 'development') {
    config.mode = 'development'
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.plugins.push(new ForkTsCheckerWebpackPlugin())
    config.devtool = 'source-map'
    config.watch = true
    config.entry.unshift('webpack/hot/poll?100')
  }

  return config
}
