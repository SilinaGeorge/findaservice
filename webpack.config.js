var webpack = require("webpack");
var path = require("path");
var fs = require("fs");

var BUILD_DIR = path.resolve(__dirname, "./build");
var APP_DIR = path.resolve(__dirname, "./src/client");

const config = {
  devServer:{

    https: {
      key: fs.readFileSync('./server.key'),
      cert: fs.readFileSync('./server.crt')
    },
    port: 3000,       // ssl defult port number
/*      inline: true,

    historyApiFallback: true,
    publicPath: '/',
    contentBase: './build',
    disableHostCheck: true */
}, 
  entry: {
    main: APP_DIR + "/index.js"
  },
  output: {
    filename: "bundle.js",
    path: BUILD_DIR
  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /(\.css|.scss)$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["react", "env", "stage-0"] // Transpiles JSX and ES6
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|)$/,
        loader: "url-loader?limit=801902"
      }
    ]
  }
};

module.exports = config;
