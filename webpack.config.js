const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "index.html", to: "index.html" },
        { from: "src/assets", to: "assets" },
      ],
    }),
  ],
};