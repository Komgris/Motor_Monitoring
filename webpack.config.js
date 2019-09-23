const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:[
          {loader: "babel-loader"},
        ]

      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test:/\.(jpg|png)$/,
        use:{
            loader:"url-loader",
        }
      },
      {
   type: 'javascript/auto',
   test: /\.txt$/,
   use: [ 'file-loader' ],
   include: /\.\/config/  // for e.g, but better to only copy particular JSON files (not all)
}
      
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
  ]
};