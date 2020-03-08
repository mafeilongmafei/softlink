<template>
  <div class="container">
    <main>
      <div v-if="!user.userInfo">
        <van-button
          v-for="(item , index) in data"
          :key="item.id"
          :data-id="index"
          @click="logo"
        >{{item.description + "登录"}}</van-button>
      </div>

      <div v-else class="user">
        <h2>{{ user.userInfo.nickname}}</h2>
        <img :src=" user.userInfo.headimgurl" alt />
      </div>
      <div>
        <!-- <van-button type="info" @click="login">qq登录</van-button> -->
        <span id="qqLoginBtn"></span>
      </div>
    </main>
    <Footer />
  </div>
</template>
<script>
import Footer from "../../components/footer/index.vue";
import { log } from "util";
import { getAccessToken, getOpenID } from "../../request/api";
export default {
  name : "mine",
  data() {
    return {
      data: [],
      auths: {},
      user: {},
      nav: false
    };
  },
  components: {
    Footer
  },
  mounted() {
    this.AppPlus();
    QC.Login({
      btnId: "qqLoginBtn", //插入按钮的节点id
       loginFun : (reqData, opts)=>{
         console.log(reqData, opts)
       }
    });
  },

  methods: {
    AppPlus() {
      let logo = document.getElementsByClassName("logo")[0];
      this.onPlusReady(() => {
        plus.oauth.getServices(
          sercices => {
            this.data = sercices;
            for (let i in sercices) {
              let sercice = sercices[i];
              this.auths[i] = sercice;
            }
          },
          e => {
            alert(e);
          }
        );
      }, this);
    },
    logo(e) {
      let id = e.currentTarget.dataset.id;

      var auth = this.auths[id];
      if (auth) {
        var w = null;
        if (plus.os.name == "Android") {
          w = plus.nativeUI.showWaiting();
        }
        document.addEventListener(
          "pause",
          function() {
            setTimeout(function() {
              w && w.close();
              w = null;
            }, 3000);
          },
          false
        );
        auth.login(
          () => {
            w && w.close();
            w = null;

            this.userinfo(auth);
          },
          function(e) {
            w && w.close();
            w = null;

            plus.nativeUI.alert(
              "详情错误信息请参考授权登录(OAuth)规范文档：http://www.html5plus.org/#specification#/specification/OAuth.html",
              null,
              "登录失败[" + e.code + "]：" + e.message
            );
          }
        );
      } else {
        plus.nativeUI.alert("无效的登录认证通道！", null, "登录");
      }
    },
    // 获取用户信息
    userinfo(a) {
      alert(a);
      this.user = a;
      a.getUserInfo(
        function() {},
        function(e) {
          plus.nativeUI.alert("获取用户信息失败！", null, "登录");
        }
      );
    },
    //qq登录
    login() {
      let appid = process.env.VUE_APP_APPID;
      let str = Math.random() + "";
      // window.location = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${appid}&redirect_uri=${this.urlencode(
      //   "http://localhost:8080/mine"
      // )}&state=${str}`;

      window.addEventListener("hashchange", this.parseUrl(), false);
    },
    urlencode(str) {
      str = (str + "").toString();
      return encodeURIComponent(str)
        .replace(/!/g, "%21")
        .replace(/'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/\*/g, "%2A")
        .replace(/%20/g, "+");
    },
    parseUrl() {
      let url = window.location.href;
      let param = url.split("?")[1];
      let paramArr = param.split("&");
      let paramObj = {};
      paramArr.forEach(val => {
        let keyArr = val.split("=");
        paramObj[keyArr[0]] = keyArr[1];
      });
      getAccessToken(
        paramObj.client_secret,
        paramObj.code,
        urlencode("http://localhost:8080/mine")
      )
        .then(res => {
          Notify({ type: "warning", message: res.access_token });
        })
        .catch(err => {
          Notify({ type: "warning", message: "登录失败,请重试" });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
main {
  height: 500px;
  flex: 1;
  overflow: auto;
  .user {
    margin: 100px auto;
  }
}
.btn {
  width: 100px;
  height: 200px;
}
</style>
