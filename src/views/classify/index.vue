<template>
  <div class="container">
    <main>还没有完成</main>
    <Footer />
  </div>
</template>
<script>
import Footer from "../../components/footer/index.vue";
export default {
  name : "classify",
  components: {
    Footer
  }
};
</script>
<style lang="scss" scoped>
main {
  height: 500px;
  flex: 1;
}

</style>