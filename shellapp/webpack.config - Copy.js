const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js', // or whatever your entry point is
    output: {
        path: __dirname + '/dist',
        publicPath: '/', 
      filename: 'bundle.js', // Ensure the file is named correctly
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'), // Serve static files from 'public'
      },
      port: 3000,
      open: true, // Automatically open browser
    },
  
    module: {
        rules: [
          // Babel loader for JavaScript (React JSX/ES6)
          {
            test: /\.jsx?$/,  // Match .js and .jsx files
            exclude: /node_modules/,  // Don't process files in node_modules
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],  // ES6+ and React JSX support
              },
            },
          },
          {
            test: /\.css$/, // Match .css
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.svg$/,  // Match .svg files
            type: 'asset/resource',  // Handle the SVG file as a resource
          }
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],  // Automatically resolve these extensions
      },
      plugins: [
        new ModuleFederationPlugin({
          name: "ShellApp",
          remotes: {
            OrdersApp: "OrdersApp@http://localhost:3001/remoteEntry.js"
            // PaymentsApp: "PaymentsApp@http://localhost:3002/remoteEntry.js",
          },
          shared: {
            react: { singleton: true },
            "react-dom": { singleton: true },
          },
        }),
      ],
};
