module.exports = {
  node: {
    crypto: true,
    fs: "empty",
    net: "empty",
    tls: "empty",
    dns: "empty",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-optional-chaining"],
          },
        },
      },
    ],
  },
};
