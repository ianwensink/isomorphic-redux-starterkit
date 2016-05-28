module.exports = {
  context: `${__dirname}/src`,
  debug: true,
  entry: [],
  output: {
    path: `${__dirname}/dist`,
    filename: null
  },
  target: 'web',
  plugins: [],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
