import * as webpack from 'webpack';
import * as path from 'path';
import * as fs from 'fs';
import * as angularExternals from 'webpack-angular-externals';
import * as rxjsExternals from 'webpack-rxjs-externals';
import * as uglifyJSPlugin from 'uglifyjs-webpack-plugin';
const CopyWebpackPlugin = require('copy-webpack-plugin');

export default {
  entry: {
    'pdf-export.umd': './src/pdf-export/index.ts',
    'pdf-export.umd.min': './src/pdf-export/index.ts',
  },
  output: {
    path: path.join(__dirname, '../../publish'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'pdf-export'
  },
  resolve: {
    extensions: [ '.ts', '.js', '.json' ]
  },
  externals: [
    angularExternals(),
    rxjsExternals()
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: 'tsconfig.json'
            }
          },
          {
            loader: 'angular2-template-loader'
          }
        ],
        exclude: [
          /node_modules/,
          /\.(spec|e2e)\.ts$/
        ]
      },

      {
        test: /\.json$/,
        use: 'json-loader'
      },

      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },

      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader']
      },

      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, '../../src/pdf-export')
    ),

    new uglifyJSPlugin({
      include: /\.min\.js$/,
      sourceMap: true
    }),
    new CopyWebpackPlugin([
      { from: 'src/pdf-export/assets', to: 'assets' }
    ],
      undefined
    )

  ],
  target: 'node'
} as webpack.Configuration;
