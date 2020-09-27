// index.js

let express = require("express");
let app = express();

let webpack = require("webpack");
let webpackDevMiddleware = require("webpack-dev-middleware");

let webpackConfig = require("./webpack/webpack.config.dev.js");
let webpackCompiler = webpack(webpackConfig);
let webpackDevMiddlewareOptions = {
  publicPath: webpackConfig.output.publicPath
};

app.use(webpackDevMiddleware(webpackCompiler, webpackDevMiddlewareOptions));

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on ${port}`));
