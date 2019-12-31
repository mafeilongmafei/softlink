// module.exports = {
//   "plugins": {
//     "postcss-import": {},
//     "postcss-url": {},
//     // to edit target browsers: use "browserslist" field in package.json
//     // "autoprefixer": {},
//     "postcss-aspect-ratio-mini": {},
//     "postcss-px-to-viewport": {
//       viewportWidth: 375, // 设备独立像素
//       // viewportHeight: 667,      // 视口高度，根据750设备的宽度来指定，也可以不设置
//       unitPrecision: 3,       // 单位精度
//       viewportUnit: 'vw',     // 单位名称
//       selectorBlackList: ['.ignore', '.hairlines', '.van-', /^(.van)/, /^(.igno)/], // 拥有该类名的元素保留px单位
//       minPixeValue: 1,  // 小于或等于1px不转换为视窗单位，也可以设置为想要的值
//       mediaQuery: false // 是否允许在媒体查询中转换px
//     },
//     "postcss-write-svg": {
//       utf8: false
//     },
//     "postcss-cssnext": {},
//     "cssnano": {
//       preset: "advanced",
//       autoprefixer: false,
//       "postcss-zindex": false
//     },
//     "postcss-viewport-units": {}
//   }
// }



module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini": {}, 
      "postcss-write-svg": {
        utf8: false
      },
      "postcss-cssnext": {},
      "postcss-px-to-viewport": {
        viewportWidth: 375,     // (Number) The width of the viewport.
        unitPrecision: 3,       // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw',     // (String) Expected units.
        selectorBlackList: ['.ignore', '.hairlines'],  // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1,       // (Number) Set the minimum pixel value to replace.
        mediaQuery: false       // (Boolean) Allow px to be converted in media queries.
      }, 
      "postcss-viewport-units":{},
      "cssnano": {
        preset: "advanced",
        autoprefixer: false,
        "postcss-zindex": false
      },
  }
}



