const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
  },
  devServer: {
    overlay: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      // {
      //   test: /\.json$/,
      //   loader: 'json-loader'
      // },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(eot|gif|otf|png|svg|ttf|woff|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [ 'file-loader' ],
      },
    ]
  },
  resolve: {
    symlinks: false,
    extensions: ['.vue', '.js', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  node: {
     fs: "empty"
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
