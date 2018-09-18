/* eslint import/no-extraneous-dependencies: 0 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const packageFile = require('./package.json');

const name = packageFile.name.split('/').pop();

module.exports = [
  {
    mode: 'development',
    entry: './src/index.umd.js',
    output: {
      library: 'RxMapBasicLib',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: `umd/${name}.src.js`,
      chunkFilename: 'umd/chunk/[name].src.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    plugins: [
      new CleanWebpackPlugin(['dist']),
    ],
  },
  {
    mode: 'production',
    entry: './src/index.umd.js',
    output: {
      library: 'RxMapBasicLib',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: `umd/${name}.min.js`,
      chunkFilename: 'umd/chunk/[name].min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    plugins: [],
  }];
