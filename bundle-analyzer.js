process.env.NODE_ENV = 'production';
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');
const webpackConfigProd = require('react-scripts/config/webpack.config.prod');

webpackConfigProd.resolve.modules.unshift(path.join(__dirname, 'src'));
webpackConfigProd.resolve.modules.unshift(path.join(__dirname, 'src/app'));
webpackConfigProd.plugins.push(
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'report.html'
  })
);

require('react-scripts/scripts/build');
