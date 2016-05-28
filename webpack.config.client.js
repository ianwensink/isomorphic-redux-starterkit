require('babel-register')();

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const base = require('./webpack.config.base');
const clientConfig = Object.assign({}, base);

if (process.env.NODE_ENVIRONMENT !== 'production') {
  clientConfig.entry.push('webpack-hot-middleware/client?reload=true');
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}
else {
  clientConfig.plugins.push(
    new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  );
}

clientConfig.entry.push('./app');
clientConfig.target = 'web';
clientConfig.output.publicPath = '/';
clientConfig.output.filename = 'bundle.js';
clientConfig.module.loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(['css', 'sass'])
});

clientConfig.plugins.push(
  new CopyWebpackPlugin([{
    from: 'index.jade'
  }]),
  new ExtractTextPlugin('style.css')
);


module.exports = clientConfig;
