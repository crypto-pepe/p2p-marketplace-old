const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const sveltePreprocess = require("svelte-preprocess");

const gitRevisionPlugin = new GitRevisionPlugin();
const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    "build/bundle": ["./src/main.ts"],
  },
  resolve: {
    alias: {
      // process: "process/browser",
      svelte: path.dirname(require.resolve("svelte/package.json")),
    },
    extensions: [".mjs", ".js", ".ts", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
    fallback: {
      "node-fetch": false,
      util: false,
      fs: false,
      stream: false,
      zlib: false,
      http: false,
      https: false,
      path: false,
      worker_threads: false,
    },
  },
  output: {
    path: path.join(__dirname, "/public"),
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess({ sourceMap: !prod }),
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    gitRevisionPlugin,
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(gitRevisionPlugin.version()),
      COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
    }),
    // new webpack.NormalModuleReplacementPlugin(nodeProtocolRegex, (resource) => {
    //   resource.request = resource.request.replace(nodeProtocolRegex, "");
    // }),
  ],
  devtool: prod ? false : "source-map",
  devServer: {
    hot: true,
  },
};
