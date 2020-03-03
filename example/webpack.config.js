var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    devtools: path.resolve(__dirname, 'src/devtools.ts'),
    background: path.resolve(__dirname, 'src/background.ts'),
    contentScript: path.resolve(__dirname, 'src/contentScript.ts'),
    injectible: path.resolve(__dirname, 'src/injectible.ts'),
    wolfsbane: path.resolve(__dirname, 'src/wolfsbane.ts')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {}
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CopyPlugin([{ from: '.', to: '../dist' }], { context: 'public' })
  ]
};
