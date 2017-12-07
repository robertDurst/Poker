const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './reactApp/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      {
       test: /\.css/,
       loader: ExtractTextPlugin.extract({
          use: "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
        })
     }
    ]
  },
  plugins: [
    new ExtractTextPlugin("webpack_styles.css")
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
  target: 'node'
};
