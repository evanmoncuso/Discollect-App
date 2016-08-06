var HtmlWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './app/scripts/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: [
          'babel-loader',
        ],
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node-modules/,
        loader: [
          'babel-loader'
        ],
        query: {
          presets: ['react']
        }
      }
    ],
  },
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
<<<<<<< 620c78a5f98106d16802b9d3b5bc26ef5f750c70
  plugins:[HTMLWebpackPluginConfig],
  devtool: '#source-map',
||||||| merged common ancestors
  plugins:[HTMLWebpackPluginConfig]
=======
  plugins:[HTMLWebpackPluginConfig],
  devtool: 'source-map'
>>>>>>> (feat) add sourcemap devtool to webpack.config
};
