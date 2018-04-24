const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {  
  entry: {
    app: './src/index.jsx',
  },
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              "presets": ["env", "react"],
              "plugins": ["babel-plugin-transform-class-properties"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      'src/index.html'
    ])
  ]
};
