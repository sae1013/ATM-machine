const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode:'development',
  entry:'./index.ts',
  resolve: {
    extensions: ['.ts','.js']  
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
		filename: '[name].webpack.bundle.js',
    clean:true
  },
  devServer: { 
    static: {
      directory:path.join(__dirname,'dist'), 
    },
    compress: true,
    port: 3000
  },
  
  module: {
    rules:[
      {
        test: /\.html$/,
        use:[
          {
            loader:"html-loader",
            options:{minimize:true}
          }
        ]
      },
      {
        test: /\.(ts)$/,
        use: 'ts-loader',
        exclude: '/node_modules',
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
  ],
}