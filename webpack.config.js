import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
const __dirname = path.resolve();

export default {
  entry: "./src/index.js",
  plugins: [
    new HtmlWebpackPlugin({
      title: "demo",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "index.bundle.js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
};
