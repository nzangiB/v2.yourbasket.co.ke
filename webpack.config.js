const path = require("path");

const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniSvgToDataURIPlugin = require("mini-svg-data-uri");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

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
  })
  // new HTMLWebpackPlugin({
  //   filename: "index.html",
  //   template: "./index.html",
  //   cache: true
  // })
  // new HTMLWebpackPlugin({
  // 	filename: 'error.html',
  // 	template: './error.html',
  // 	cache: true
  // })
];

module.exports = (env, argv) => {
  const NODE_ENV = argv.mode || process.env.NODE_ENV || "production";
  const PUBLIC_PATH = process.env.PUBLIC_PATH || "/";

  const devMode = NODE_ENV === "development";

  const configDefault = {
    context: path.join(__dirname, "src"),
    // entry: ['./scripts/main.js', './styles/main.scss'],
    entry: {
      main: {
        import: ["./scripts/main.js", "./styles/main.scss"],
        dependOn: ["polyfill", "handcrafted"]
      },
      handcrafted: [
        "whatwg-fetch",
        "whatwg-url",
        // '@wearearchangel/handcrafted'
        path.resolve("../handcrafted/packages/handcrafted")
      ],
      polyfill: "@next/polyfill-nomodule"
    },
    module: {
      rules: [
        {
          test: /\.(mjs|js|jsx|ts|tsx)$/,
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
          test: /\.(png|jpe?g|webp|gif|ico|svg)$/i,
          type: "asset",
          generator: { filename: "images/[name].[contenthash][ext]" }
        },
        // {
        // 	test: /\.svg/,
        // 	type: 'asset/inline',
        // 	generator: {
        // 		dataUrl: content => {
        // 			content = content.toString();
        // 			return MiniSvgToDataURIPlugin(content);
        // 		}
        // 	}
        // },
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
    optimization: {
      minimize: !devMode,
      minimizer: [
        !devMode && new CssMinimizerPlugin(),
        !devMode && new TerserPlugin({
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
        !devMode && new HTMLWebpackPlugin({
          filename: "index.html",
          template: "./index.html",
          minify: {
            removeAttributeQuotes: true,
            removeComments: true,
            collapseWhitespace: false,
            cache: true
          }
        })
      ].filter(Boolean),
      runtimeChunk: "single",
      usedExports: devMode
      // splitChunks: {
      //   // chunks: 'all',
      //   // 	maxSize: 200000,
      //   cacheGroups: {
      //     // 	common: {
      //     // 		test: /[\\/]node_modules[\\/]/,
      //     // 		priority: -5,
      //     // 		reuseExistingChunk: true,
      //     // 		chunks: 'initial',
      //     // 		name: 'common_app',
      //     // 		minSize: 0,
      //     // 	},
      //     // 	default: {
      //     // 		minChunks: 2,
      //     // 		priority: -20,
      //     // 		reuseExistingChunk: true,
      //     // 	},
      //     // 	defaultVendors: false,
      //     // 	reactPackage: {
      //     // 		test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
      //     // 		name: 'vendor_react',
      //     // 		chunks: 'all',
      //     // 		priority: 10,
      //     // 	},
      //     shared: {
      //       test: /[\\/]pages[\\/]/,
      //       name: "shared",
      //       minSize: 0,
      //       chunks: "all",
      //       priority: 5,
      //       reuseExistingChunk: true
      //     },
      //     account: {
      //       test: /[\\/]pages[\\/]account[\\/]/,
      //       name: "account",
      //       minSize: 0,
      //       chunks: "all",
      //       priority: 10,
      //       reuseExistingChunk: true
      //     },
      //     basket: {
      //       test: /[\\/]pages[\\/]basket[\\/]/,
      //       name: "basket",
      //       minSize: 0,
      //       chunks: "all",
      //       priority: 10,
      //       reuseExistingChunk: true
      //     },
      //     home: {
      //       test: /[\\/]pages[\\/]home[\\/]/,
      //       name: "home",
      //       minSize: 0,
      //       chunks: "all",
      //       priority: 10,
      //       reuseExistingChunk: true
      //     },
      //     products: {
      //       test: /[\\/]pages[\\/]products[\\/]/,
      //       name: "products",
      //       minSize: 0,
      //       chunks: "all",
      //       priority: 10,
      //       reuseExistingChunk: true
      //     }
      //   }
      // }
    },
    output: {
      filename: `scripts/${devMode ? "[name]" : `[name]-[contenthash]`}.js`,
      chunkFilename: `scripts/${devMode ? "[id]" : `[id]-[contenthash]`}.chunk.js`,
      path: path.resolve(devMode ? ".cache" : "dist"),
      publicPath: PUBLIC_PATH,
      clean: true
    },
    target: "browserslist",
    resolve: {
      preferRelative: true,
      extensions: [".js", ".jsx"],
      alias: {
        react: path.resolve("./node_modules/react"),
        "react-dom/client": path.resolve("./node_modules/react-dom/client.js"),
        "react-dom/server": path.resolve("./node_modules/react-dom/server.js")
        // '@wearearchangel/handcrafted': path.resolve('../handcrafted/packages/handcrafted')
      },
      cache: true
    }
  };

  const configByEnv = {
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
      plugins: plugins.concat([
        new HTMLWebpackPlugin({
          filename: "index.html",
          template: "./index.html",
          cache: true
        })
      ])
    },
    production: {
      mode: "production",
      plugins: plugins.concat([
        // new WorkboxPlugin.GenerateSW({
        //   clientsClaim: true,
        //   skipWaiting: true
        // })
      ])
    }
  };

  const config = { ...configDefault, ...configByEnv[NODE_ENV] };

  // Bundler Polyfill Issues - Webpack 5
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    buffer: require.resolve("buffer/"),
    crypto: false, // require.resolve("crypto-browserify") can be polyfilled here if needed
    stream: false, // require.resolve("stream-browserify") can be polyfilled here if needed
    assert: false, // require.resolve("assert") can be polyfilled here if needed
    http: false, // require.resolve("stream-http") can be polyfilled here if needed
    https: false, // require.resolve("https-browserify") can be polyfilled here if needed
    os: false, // require.resolve("os-browserify") can be polyfilled here if needed
    url: require.resolve("url"), // require.resolve("url") can be polyfilled here if needed
    zlib: false // require.resolve("browserify-zlib") can be polyfilled here if needed
  });
  config.resolve.symlinks = false;
  config.resolve.fallback = fallback;
  // config.plugins.push(
  //   new webpack.ProvidePlugin({
  //     process: "process/browser",
  //     Buffer: ["buffer", "Buffer"]
  //   })
  // );
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled"
    })
  );
  config.ignoreWarnings = [/Failed to parse source map/];
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false
    }
  });

  return config;
};
