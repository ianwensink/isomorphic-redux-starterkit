require('babel-register')();

const fs = require('fs');
const webpack = require('webpack');
const base = require('./webpack.config.base');
const serverConfig = Object.assign({}, base);

if (process.env.NODE_ENVIRONMENT !== 'production') {
}
else {
  serverConfig.plugins.push(
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

serverConfig.entry.push('./server');
serverConfig.target = 'node';
serverConfig.output.filename = 'server.bundle.js';

serverConfig.node = {
  __filename: false,
  __dirname: false
};

serverConfig.externals = fs.readdirSync(`${__dirname}/node_modules`)
  .concat(['react-dom/server'])
  .reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`
    return ext
  }, {}
)

module.exports = serverConfig;
