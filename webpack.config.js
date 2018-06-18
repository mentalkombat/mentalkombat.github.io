const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const conf = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'js/main.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
					use: ["css-loader", "sass-loader"],
					publicPath: '../'
        })
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img/'
						}
					}
				]
			},
			{
				test: /\.(woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'fonts/'
						}
					}
				]
			}
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/main.css"),
    new HtmlWebpackPlugin({
      template: 'index.html'
		}),
		new CleanWebpackPlugin(['dist'])
  ],
  devServer: {
    overlay: true
  }
};

module.exports = (env, options) => {
  conf.devtool = options.mode === 'production'
  ? false //'source-map'
  : 'eval-sourcemap';
  return conf;
}
