import axios from "axios";

var instance = axios.create({
  timeout: 5000,
  baseURL : process.env.VUE_APP_BASE_URL
  // headers: {
  //   "Content-type": "application/x-www-form-urlencoded"
  // }
});



// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  response => {
    return response.data;
  },
  err => {
    return Promise.reject(err.response);
  }
);
let http = {};
http.get = function(url, options) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, options)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.log(e);
      });
  });
};

http.post = function(url, data, options) {
  return new Promise((resolve, reject) => {
    console.log(data)
    instance
      .post(url, data, options)
      .then(response => {
        resolve(response);
      })
      .catch(e => {
        console.log(e);
      });
  });
};

export default http;

{/* <script>
      document.addEventListener("plusready", function() {
        var webview = plus.webview.currentWebview();
        plus.key.addEventListener("backbutton", function() {
          webview.canBack(function(e) {
            if (e.canBack) {
              webview.back();
            } else {
              //webview.close(); //hide,quit
              //plus.runtime.quit();
              //首页返回键处理
              //处理逻辑：1秒内，连续两次按返回键，则退出应用；
              var first = null;
              plus.key.addEventListener(
                "backbutton",
                function() {
                  //首次按键，提示‘再按一次退出应用’
                  if (!first) {
                    first = new Date().getTime();
                    console.log("再按一次退出应用");
                    setTimeout(function() {
                      first = null;
                    }, 1000);
                  } else {
                    if (new Date().getTime() - first < 1500) {
                      plus.runtime.quit();
                    }
                  }
                },
                false
              );
            }
          });
        });
      });
    </script> */}
