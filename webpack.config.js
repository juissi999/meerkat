const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }]
  },
  output: {
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      favicon: "./src/images/favicon.ico",
      filename: 'index.html'
    })
  ]
}
