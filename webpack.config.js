const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin'); // Add TerserPlugin

module.exports = {
  optimization: {
    minimize: true, // Enable minimization
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: true, // Remove unused code
            dead_code: true, // Eliminate dead code
          },
        },
      }),
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static', // Generates a static HTML file for analysis
      reportFilename: 'bundle-report.html', // Output file for the report
      openAnalyzer: false, // Prevents auto-opening the report
    }),
  ],
};