const path = require('path');
const isDevelopment = process.env.NODE_ENV !== 'production'
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   mode: isDevelopment ? 'development' : 'production',
   entry: [
      './src/js/index.js',
      './src/js/polyfills.js',
      './src/sass/main.scss',
      './src/sass/resume.scss'
   ],
   output: {
      path: __dirname + '/assets',
      filename: 'js/bundle.js'
   },
   optimization: {
      runtimeChunk: {
         name: entrypoint => `${entrypoint.name}`
      },
      namedModules: true,
      namedChunks: true
   },
   plugins: [
      new MiniCssExtractPlugin({
         // Options similar to the same options in webpackOptions.output
         // both options are optional
         filename: '/../_includes/[name].css',
         chunkFilename: '[id].css',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules\/(?!(error-overlay-webpack-plugin)\/).*/,
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
               }
            ]
         }
      ]
   },
   //plugins: [new ErrorOverlayPlugin()],
};