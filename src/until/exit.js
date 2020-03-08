var plusReady = function(callback) {
  if (window.plus) {
    callback();
  } else {
    document.addEventListener("plusready", callback);
  }
};

plusReady(function() {
  var firstBack = 0;
  var timerId;
  var handleBack = function() {
    // var path = location.pathname;
    var hash = location.hash;
    var now =
      Date.now ||
      function() {
        return new Date().getTime();
      };  

    if (hash === "#/" || hash === "#/school" || hash === "#/mine" || hash === "#/classify") {
      clearTimeout(timerId);
      if (!firstBack) {
        firstBack = now();
        plus.nativeUI.toast("再按一次退出应用");
        timerId = setTimeout(function() {
          firstBack = 0;
        }, 2000);
      }else if (now() - firstBack < 2000) {
              plus.runtime.quit();
            }
    } else {
      // 根据实际需求选择相应的方法
      history.back();
    }
  };

  plus.key.addEventListener("backbutton", handleBack);
});
