const path = require('path'); 
const webpack = require('webpack');

module.exports = {
     entry: './todoapp/static/js/index.js',
     output: {
         path: path.resolve(__dirname, 'todoapp/static/js'),
         filename: 'bundle.js'
     },
     plugins: [
        /* new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }), 
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        }), */
     ], 
    module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
  },
 };