import axios from "axios";

var instance = axios.create({
  timeout: 5000,
  // baseURL : process.env.VUE_APP_BASE_URL
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
