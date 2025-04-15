const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './assets/js/scripts.js', // Entry point untuk JavaScript
  output: {
    filename: 'bundle.js', // Output file JavaScript
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Gunakan `static.directory` sebagai pengganti `contentBase`
    },
    hot: true, // Aktifkan Hot Module Replacement (HMR)
    open: true, // Buka browser secara otomatis saat server dijalankan
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Path ke file template HTML
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'scripts', to: 'scripts' }, // Copy semua file dari folder scripts/ ke dist/scripts/
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // Handle file CSS
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
