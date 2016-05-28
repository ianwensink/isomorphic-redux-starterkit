import express from 'express';
import webpack from 'webpack';
import compression from 'compression';
import config from '../webpack.config.client';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import React from 'react';
import routes from './routes.js';
import open from 'open';

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const app = express();

const compiler = webpack(config);

if (ENV !== 'production') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}
else {
  app.use(express.static(`${__dirname}`));
  app.use(compression());
}

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search);
    } else if (props) {
      const react = renderToString(<RouterContext { ...props } />);
      res.render('index', { app: react });
    } else {
      res.status(404).send('Not Found');
    }
  });
});

app.listen(PORT, error => {
  if (error) {
    console.log(error);
  } else if (ENV === 'production') {
    console.log(`Listening @ ${PORT}`);
  } else {
    console.log(`Listening @ ${PORT}`);
    open(`http://localhost:${PORT}`);
  }
});
