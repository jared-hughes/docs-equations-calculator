const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    lib: './src/lib.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // output lib.js entry point to functions in variable AppLib
    libraryTarget: 'var',
    library: 'AppLib',
  },
  // devtool: 'cheap-source-map',
  plugins: [
    // clean /dist of any old files
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'appsscript.json' },
        { from: '.clasp.json' },
        { from: 'src/api.js' },
        { from: 'src/sidebar.html' },
      ]
    })
  ],
}
