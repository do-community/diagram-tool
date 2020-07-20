const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  optimization: {
    minimize: true,
    minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', {
                  discardComments: {
                    removeAll: true,
                  },
                }],
                map: {
                  inline: false,
                },
            },
        }),
    ],
  },
  mode: 'production',
});
