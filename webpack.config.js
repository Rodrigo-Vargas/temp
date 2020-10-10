const path = require('path');
const fs = require('fs');
const isProduction = process.env.NODE_ENV === 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
   mode: isProduction ? 'development' : 'production',
   entry: {
      index: path.resolve(__dirname, './src/js/index.js'),
      polyfills: path.resolve(__dirname, './src/js/polyfills.js'),
      //sw: path.resolve(__dirname, './src/js/sw.js'),
      main: path.resolve(__dirname, './src/sass/main.scss'),
      tailwind: path.resolve(__dirname, './src/sass/tailwind.scss'),
      resume: path.resolve(__dirname, './src/sass/resume.scss'),
   },
   devServer: {
      contentBase: path.join(__dirname, '_site'),
      contentBasePublicPath: '/',
      publicPath: '/dist/',
      port: 9000,
      watchContentBase: true,
      writeToDisk: true,
      hot: true,
      http2: true,
      https: {
         key: fs.readFileSync('./private.key'),
         cert: fs.readFileSync('./private.crt'),
         ca: fs.readFileSync('./private.pem'),
      }
   },
   devtool: 'source-map',
   output: {
      path: path.resolve(__dirname, './dist/'),
      filename: isProduction ? '[name].[hash].js' : '[name].js',
      chunkFilename: isProduction ? '[id].[hash].js' : '[id].js'
   },
   plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: isProduction ? '[name].[hash].css' : '[name].css'
      }),
      new ManifestPlugin({
         fileName: '../_data/manifest.yml',
         publicPath: '/dist/',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules\//,
            use:
            {
               loader: require.resolve('babel-loader'),
               options: {
                  presets: ['@babel/preset-env']
               }
            }
         },
         {
            test: /\.scss$/,
            use: [
               MiniCssExtractPlugin.loader,
               'css-loader',
               {
                  loader: 'sass-loader',
                  options: {
                     sourceMap: true
                  }
               },
               'postcss-loader'
            ]
         }
      ]
   }
};