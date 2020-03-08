var path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  devServer: {
    open: true,
    port: 8080,
    disableHostCheck: true,
    proxy: {
      "/app.php/": {
        target: process.env.VUE_APP_BASE_URL,
        changOrigin: true //是否跨域
      },
      "/index/": {
        target: process.env.VUE_APP_BASE_URL,
        changOrigin: true //是否跨域
      },
      "/admin.php/": {
        target: process.env.VUE_APP_BASE_URL,
        changOrigin: true //是否跨域
      }
    }
  },
  chainWebpack: config => {
    //第一个参数 别名  路径+
    config.resolve.alias
      .set("@", resolve("src"))
      .set("components", resolve("src/components/"))
      .set("assets", resolve("src/assets"))
      .set("views", resolve("src/views"))
      .set("api", resolve("src/request"));
  }
};
