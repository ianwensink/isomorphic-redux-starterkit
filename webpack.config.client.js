require('babel-register')();

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import base from './webpack.config.base';
const config = Object.assign({}, base);

if (process.env.NODE_ENVIRONMENT !== 'production') {
  config.entry.push('webpack-hot-middleware/client?reload=true');
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
}
else {
  config.plugins.push(
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

config.entry.push('./app');
config.target = 'web';
config.output.publicPath = '/';
config.output.filename = 'bundle.js';
config.module.loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract(['css', 'sass'])
});

config.plugins.push(
  new CopyWebpackPlugin([{
    from: 'index.jade'
  }]),
  new ExtractTextPlugin('style.css')
)

export default config;
