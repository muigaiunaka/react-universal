const { join } = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rules = [{
  test: /.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
}, {
  test: /\.scss$/,
  exclude: /node_modules/,
  use: ExtractTextPlugin.extract({
    // include: [path.resolve(__dirname, 'reactwebapp', 'assets', 'scss')],
    fallback: 'style-loader',
    use: [{
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 2,
        modules: false,
        // outputPath: 'assets/css/',
        localIdentName: '[name]'
        // localIdentName: '[name]__[local]___[hash:base64:5]'
      },
    }, {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    }, {
      loader: 'sass-loader',
      options: {
        modules: false,
        sourceMap: true,
      },
    }],
  }),
}, {
  test: /\.css$/,
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 2,
      modules: true,
      localIdentName: '[name]__[local]___[hash:base64:5]'
    },
  }, {
    loader: 'postcss-loader',
  }],
}, {
  test: /\.svg$/,
  use: [{
      loader: "babel-loader"
    }, {
      loader: "react-svg-loader",
      options: {
        jsx: true // true outputs JSX tags
      },
    }]
}, {
  test: /\.(woff2|woff|ttf|eot|svg)(\?.*$|$)/,
  loader: 'file-loader?name=fonts/[name].[ext]',
  include: [
    join(__dirname, 'reactwebapp'),
    join(__dirname, 'node_modules'),
  ],
}, {
  test: /\.(jpg|jpeg|gif|png|ico)(\?.*$|$)$/,
  loader: 'file-loader?name=img/[name].[ext]',
  include: [
    join(__dirname, 'reactwebapp'),
    join(__dirname, 'node_modules'),
  ],
}];
module.exports = rules;