<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<style lang="scss">
#app {
  height: 100%;
}

.van-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 87 !important;
}
.menu {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  .van-dropdown-menu__item {
    flex: 0 1 auto !important;
    .van-dropdown-menu__title {
      position: relative;
      box-sizing: border-box;
      max-width: 100%;
      color: #4285f4;
      font-size: 11px;
      line-height: 18px;
      &::after {
        content: "" !important;
        border: none;
      }
    }
  }
}


</style>
