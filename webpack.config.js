const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const conf = {
  entry: './src/index.js',
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
          use: ["css-loader", "sass-loader"]
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
			}
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/main.css"),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
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