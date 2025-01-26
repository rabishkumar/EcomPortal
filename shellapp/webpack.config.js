const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Or 'auto' for Webpack to figure out automatically
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3000,
    hot: true,
    historyApiFallback: true, // For SPAs
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      name: "ShellApp",
      remotes: {
        OrdersApp: "OrdersApp@http://localhost:3001/remoteEntry.js",
        PaymentApp: "PaymentApp@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,  // Eagerly load react for both host and remote apps
          requiredVersion: '^17.0.0', // specify the correct version if needed
        },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: '^17.0.0',
        },
      },
    }),
  ],
  mode: 'development',
};
