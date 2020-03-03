import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./until/plugins";
import "./assets/css/common.css";

import FastClick from "fastclick"
FastClick.attach(document.body);


(function() {
  var onPlusReady = function(callback, context = this) {
    if (window.plus) {
      callback.call(context);
    } else {
      document.addEventListener("plusready", callback.bind(context));
    }
  };
  Vue.mixin({
    beforeCreate: function() {
      // onPlusReady(function() {
      //   this.plusReady = true;
      // }, this);
    },
    methods: {
      onPlusReady: onPlusReady
    }
  });
})();



Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
