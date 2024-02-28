const path = require("path");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const plugins = [
  new webpack.DefinePlugin({
    "process.env": JSON.stringify(process.env)
  }),
  new CopyPlugin({
    patterns: [".htaccess", "robots.txt", "manifest.json", "manifest/**/*", {
      from: "vendor/scripts",
      to: "scripts"
    }, { from: "vendor/styles", to: "styles" }],
    options: {
      concurrency: 100
    }
  }),
  new MiniCssExtractPlugin({
    filename: "styles/[name].[contenthash].css", chunkFilename: "styles/[id].css"
  }),
  new HtmlWebpackPlugin({
    filename: "index.html", template: "./index.html.js", cache: false
  }),
  new HtmlWebpackPlugin({
    filename: "error.html", template: "./error.html.js", cache: false
  })
];

module.exports = (env, argv) => {
  const NODE_ENV = argv.mode || process.env.NODE_ENV || "production";
  const devMode = NODE_ENV !== "production";

  const configDefault = {
    context: path.join(__dirname, "src"),
    entry: ["./scripts/main.js", "./styles/main.scss"],
    module: {
      rules: [
        {
          test: /\.(m?js|jsx)$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: "babel-loader"
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: { filename: "fonts/[name].[contenthash][ext]" }
        },
        {
          test: /\.(png|svg|jpe?g|webp|gif|ico)$/i,
          type: "asset/resource",
          generator: { filename: "images/[name].[contenthash][ext]" }
        },
        {
          test: /\.(sa|sc|c)ss$/i,
          use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, {
            loader: "css-loader", options: { modules: false, importLoaders: 1, sourceMap: true }
          }, {
            loader: "sass-loader", options: { sourceMap: true }
          }]
        }
      ]
    },
    output: {
      filename: `scripts/${devMode ? "[name]" : `[name]-[contenthash]`}.js`,
      chunkFilename: `scripts/${devMode ? "[id]" : `[id]-[contenthash]`}.chunk.js`,
      path: path.resolve(devMode ? ".cache" : "dist"),
      publicPath: "/",
      clean: true
    },
    target: "web",
    resolve: {
      fallback: {
        http: require.resolve("stream-http")
      },
      alias: {
        react: path.resolve("./node_modules/react")
      }
    }
  };

  const config = {
    development: {
      mode: "development",
      devtool: "source-map",
      devServer: {
        static: {
          directory: path.resolve(__dirname, "dist"),
          staticOptions: {
            redirect: true
          },
          publicPath: "/",
          serveIndex: true,
          watch: true
        },
        historyApiFallback: true,
        compress: true,
        hot: true
      },
      optimization: {},
      plugins: plugins.concat([])
    },
    production: {
      mode: "production",
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
          parallel: true,
          terserOptions: {
            format: {
              comments: false
            },
            mangle: false,
            keep_classnames: true,
            keep_fnames: true,
            // browser fixes
            ie8: true,
            safari10: true
          },
          extractComments: false
        }), "...", new CssMinimizerPlugin()],
        usedExports: true
      },
      plugins: plugins.concat([// new WorkboxPlugin.GenerateSW({
        //   clientsClaim: true,
        //   skipWaiting: true
        // })
      ])
    }
  };

  return ({
    ...configDefault,
    ...config[NODE_ENV]
  });
};
