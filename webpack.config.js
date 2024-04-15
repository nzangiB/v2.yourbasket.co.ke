const path = require("path");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniSvgToDataURIPlugin = require("mini-svg-data-uri");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const plugins = [
  new webpack.DefinePlugin({
    "process.env": JSON.stringify(process.env)
  }),
  new CopyPlugin({
    patterns: [
      ".htaccess",
      "robots.txt",
      "manifest.json",
      "manifest/**/*"
    ],
    options: {
      concurrency: 100
    }
  }),
  new MiniCssExtractPlugin({
    filename: "styles/[name].[contenthash].css",
    chunkFilename: "styles/[id].css"
  }),
  // new HTMLWebpackPlugin({
  //   filename: "index.html",
  //   template: "./index.html.js",
  //   cache: false
  // }),
  new HTMLWebpackPlugin({
    filename: "error.html",
    template: "./error.html.js",
    cache: false
  })
];

module.exports = (env, argv) => {
  const NODE_ENV = argv.mode || process.env.NODE_ENV || "production";
  const devMode = NODE_ENV !== "production";

  const configDefault = {
    context: path.join(__dirname, "src"),
    entry: [
      "./scripts/main.js",
      "./styles/main.scss"
    ],
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        },
        {
          test: /\.(htm|html)$/,
          use: ["html-loader"]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset",
          generator: { filename: "fonts/[name].[contenthash][ext]" }
        },
        {
          test: /\.(png|jpe?g|webp|gif|ico)$/i,
          type: "asset",
          generator: { filename: "images/[name].[contenthash][ext]" }
        },
        {
          test: /\.svg/,
          type: "asset/inline",
          generator: {
            dataUrl: content => {
              content = content.toString();
              return MiniSvgToDataURIPlugin(content);
            }
          }
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
      preferRelative: true,
      extensions: [".js", ".jsx", ".module.scss"],
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
      plugins: plugins.concat([
        new HTMLWebpackPlugin({
          template: "./index.html.js",
          favicon: "./favicon.ico",
          manifest: "./manifest.json",
          cache: false
        })
      ])
    },
    production: {
      mode: "production",
      optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin({
            // parallel: true,
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
          }),
          new HTMLWebpackPlugin({
            template: "./index.html.js",
            favicon: "./favicon.ico",
            manifest: "./manifest.json",
            minify: {
              removeAttributeQuotes: true,
              removeComments: true,
              collapseWhitespace: false,
              cache: false
            }
          })
        ],
        usedExports: true
      },
      plugins: plugins.concat([
        // new WorkboxPlugin.GenerateSW({
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
