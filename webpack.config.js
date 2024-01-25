const path = require("path");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const plugins = [
  new webpack.DefinePlugin({
    "process.env": JSON.stringify(process.env)
  }),
  new CopyPlugin({
    patterns: [
      ".htaccess",
      "manifest/**/*",
      "robots.txt"
    ],
    options: {
      concurrency: 100
    }
  }),
  new MiniCssExtractPlugin({
    filename: "styles/[name].[contenthash].css",
    chunkFilename: "styles/[id].css"
  }),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: "./index.html.js"
  })
];

const configDefault = {
  context: path.join(__dirname, "src"),
  entry: [
    "./scripts/main.js",
    "./styles/main.scss"
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: { filename: "fonts/[name].[contenthash].[ext]" }
      },
      {
        test: /\.(png|svg|jpe?g|webp|gif|ico)$/i,
        type: "asset/resource",
        generator: { filename: "images/[name].[contenthash].[ext]" }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          process.env.NODE_ENV === "development"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  output: {
    filename: `scripts/${devMode ? "[name]" : `[name]-[contenthash]`}.js`,
    chunkFilename: `scripts/${devMode ? "[id]" : `[id]-[contenthash]`}.chunk.js`,
    path: path.resolve(devMode ? ".cache" : "dist"),
    publicPath: "/"
  },
  target: "web"
};

const config = {
  development: {
    mode: "development",
    devtool: "source-map",
    devServer: {
      open: true,
      static: {
        directory: path.resolve(__dirname, "dist"),
        publicPath: "/",
        serveIndex: true
      },
      historyApiFallback: true
      // compress: true
    },
    optimization: {},
    plugins: plugins.concat([])
  },
  production: {
    mode: "production",
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({}), "...", new CssMinimizerPlugin()],
      usedExports: true
    },
    plugins: plugins.concat([
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      })
    ])
  }
};

module.exports = (env, argv) => {
  return ({
    ...configDefault,
    ...config[argv.mode || "production"]
  });
};
