require('babel-register')();

const fs = require('fs');
const webpack =  require('webpack');
const base = require('./webpack.config.base');
const config = Object.assign({}, base);

if (process.env.NODE_ENVIRONMENT !== 'production') {
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

config.entry.push('./server');
config.target = 'node';
config.output.filename = 'server.bundle.js';

config.node = {
  __filename: false,
  __dirname: false
};

config.externals = fs.readdirSync(`${__dirname}/node_modules`)
  .concat(['react-dom/server'])
  .reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`
    return ext
  }, {}
)

module.exports = config;
