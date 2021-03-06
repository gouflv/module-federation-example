const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "development",
  entry: "./index",
  resolve: {
    extensions: [".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "lib",
      filename: "remoteEntry.js",
      library: { type: "var", name: "lib" },
      exposes: {
        "./components": "./components",
      },
      shared: {
        react: { singleton: true },
        "react-dom": { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  output: {
    chunkFilename: (pathData) => {
      return pathData.chunk.name === "remoteEntryVendors"
        ? "[name].[contenthash].js"
        : "[id].js";
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        remoteEntry: {
          name: "remoteEntryVendors",
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  devServer: {
    port: 3001,
  },
};
