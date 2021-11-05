const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const getRemoteLibUrl = () => {
  const { REMOTE_LIB_URL } = process.env;
  return `lib@${REMOTE_LIB_URL || "//localhost:3001/remoteEntry.js"}`;
};

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
      name: "app1",
      remotes: {
        lib: getRemoteLibUrl(),
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
  optimization: {
    minimize: false,
  },
  devServer: {
    port: 3002,
  },
};
