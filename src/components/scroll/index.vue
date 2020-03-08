<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" :style="'display:' + isBlock ">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name :"scroll",
  props : {
    isY : {
      type : Boolean,
      default : true,
    },
     isBlock : {
        type : String,
        default : "block"
      }
  },
  mounted() {
     let bscroll = new BScroll(this.$refs.wrapper, {
       click: true,
       probeType : 1,
      pullUpLoad : true,
      scrollY: this.isY,
      scrollX : this.isY ? false : true
    });
   if (this.isY) {
       bscroll.on("scroll" , (positio)=>{
        // console.log(positio)
    })
    bscroll.on("pullingUp" , ()=>{
        // console.log("下拉加载")
        // setTimeout(() => {
        //     bscroll.finishPullUp();
        // }, 2000);
        this.$emit("pullUp" ,  bscroll.finishPullUp.bind(bscroll) , bscroll.refresh.bind(bscroll))

        
    })
   }
    
  }
};
</script>
<style scoped>

/* .content {
  块元素,子元素宽度无法撑开 , 得把他变成inline-block
  display: inline-block;
} */

</style>>
