// @ts-check

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv !== 'production';

const extractStyles = new MiniCssExtractPlugin({
  filename: 'h5p-course-presentation.css',
});

var config = {
  entry: {
    dist: './src/entries/dist.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'h5p-course-presentation.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: path.join(__dirname, 'src/fonts'),
        use: [
          {
            loader: 'file-loader?name=fonts/[name].[ext]',
          },
        ],
      },
    ],
  },
  plugins: [extractStyles],
};

if (isDev) {
  config.devtool = 'inline-source-map';
}

module.exports = config;
