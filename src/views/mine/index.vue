<template>
  <div class="container"  >
    <main>
<p @click="showPopup">出现</p>
      <van-popup v-model="show"  @click="showPopup" position="right" :style="{ height: '100%' , width : '40%' }">出现</van-popup>
    </main>
    <Footer />
  </div>
</template>
<script>
import Footer from "../../components/footer/index.vue";
export default {
  data() {
    return {
      show: false
    };
  },
  components: {
    Footer
  },
  methods: {
    showPopup() {
      this.show = true;
      
    }
  }
};
</script>
<style lang="scss" scoped>
main {
  height: 500px;
  flex: 1;
}
</style>