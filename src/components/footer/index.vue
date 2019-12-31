<template>
  <footer class="footer">
    <router-link to="/" class="footer_item" exact>
      <div class="animate">
        <div class="war war1"></div>
        <div class="war war2"></div>
      </div>
      <div class="routerTive">
        <i class="iconfont icon-shouye1"></i>
        <p>首页</p>
      </div>
    </router-link>

    <router-link to="/classify" class="footer_item" exact>
      <div class="animate">
        <div class="war war1"></div>
        <div class="war war2"></div>
      </div>
      <div class="routerTive">
        <i class="iconfont icon-shangpinfenlei"></i>
        <p>分类</p>
      </div>
    </router-link>

    <router-link to="/school" class="footer_item" exact>
      <div class="animate">
        <div class="war war1"></div>
        <div class="war war2"></div>
      </div>
      <div class="routerTive">
        <i class="iconfont icon-yuanxiaoku_"></i>
        <p>院校库</p>
      </div>
    </router-link>

    <router-link to="/mine" class="footer_item" exact>
      <div class="animate">
        <div class="war war1"></div>
        <div class="war war2"></div>
      </div>
      <div class="routerTive">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
      </div>
    </router-link>
  </footer>
</template>
<script>
// <div class="mu-ripple-wrapper"></div>
export default {};
</script>
<style lang="scss" scoped>
.footer {
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .footer_item {
    width: 87.5px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    .animate {
      width: 100%;
      height: 100%;
      z-index: 2;
      position: absolute;
      overflow: hidden;

      .war {
        border-radius: 100%;
        padding: 80%;
        position: absolute;
        left: -28%;
        top: -80%;
        z-index: 1;
        opacity: 0;
      }
      .war1 {
        box-shadow: 0 0 120px 180px rgba(214, 213, 213, 0.479) inset;
        // -webkit-animation: dong 0.8s 0s ease-out;
      }
      .war2 {
        box-shadow: 0 0 120px 180px #8fb7d8 inset;
        // -webkit-animation: dong 0.5s 0.2s ease-out;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        font-size: 18px;
        color: #8f8f94;
      }
      p {
        font-size: 11px;
        color: #8f8f94;
      }
    }
  }
  .footer_item:active {
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    i {
      color: #2196f3;
    }
    p {
      color: #2196f3;
    }
  }
}

.ani {
  .war {
    border-radius: 100%;
    padding: 80%;
    position: absolute;
    left: -28%;
    top: -80%;
    z-index: 1;
    opacity: 0;
  }
  .war1 {
    box-shadow: 0 0 120px 180px rgba(214, 213, 213, 0.479) inset;
    -webkit-animation: dong 0.8s 0s ease-out;
  }
  .war2 {
    box-shadow: 0 0 120px 180px #8fb7d8 inset;
    -webkit-animation: dong 0.5s 0.2s ease-out;
  }
}

@keyframes dong {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>