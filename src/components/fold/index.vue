<template>
  <div class="subject bg_border" ref="parent" :style="{height : height + 'px'}">
    <div class="subject_title">
      <span>{{title}}</span>
      <p class="more" @click="unfold" v-show="text">{{ isClickMore ? "收起" : "更多"}}</p>
    </div>

    <div class="btn_gather clearFix" @click="(e)=>{getChildrenElement(e , cls , type)}">
      <div
        class="btn_item"
        v-for=" (item , index) in doMain"
        :key="item.name"
        :data-index="index"
        :data-id="item.id"
      >
        <span >{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name : "fold",
  data() {
    return {
      isClickMore: false
    };
  },
  props: {
    title: String,
    doMain: Array,
    cls: String,
    type: Number,
    text: {
      type: Boolean,
      default: true
    },
    height : {
      type : Number,
      default : 120
    }
  },
  methods: {
    unfold(e) {
      this.isClickMore = !this.isClickMore;
      let parent = this.$refs.parent;
      let height = parent.scrollHeight
      this.isClickMore
        ? parent.style.setProperty("height", height + 'px')
        : parent.style.setProperty("height", this.height + 'px');
    },
    getChildrenElement(e, className, type) {
      this.$emit("getChildrenElement", {
        e,
        className,
        type
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.subject {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-out;
  .subject_title {
    height: 28px;
    font-size: 13px;
    font-weight: 600;
    color: #000;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
     
    p {
      color: grey;
    }
  }
  .btn_gather {
    // height: 100px;
    //   overflow: hidden;
    .btn_item {
      width: 84px;
      height: 34px;
      margin-bottom: 8px;
      text-align: center;
      line-height: 34px;
      border: 2px solid #e8e8e8;
      border-left: 1px solid #e8e8e8;
      border-right: 1px solid #e8e8e8;
      margin-right: 10px;
      color: #4c4c4c;
      font-size: 12px;
      position: relative;
      float: left;
      text-justify: newspaper;
      word-break: break-all;

      span {
        pointer-events: none;
        position: absolute;
        display: block;
        width: 100%;
        text-align: center;
        line-height: 34px;
        height: 100%;
      }
    }
    .btn_item_active::after {
      content: "";
      border: 10px solid #4285f4;
      border-color: transparent #4285f4 #4285f4 transparent;
      position: absolute;
      right: 0;
      top: 39%;
    }
    .btn_item_active::before {
      content: "";
      width: 7px;
      height: 3px;
      border: 1px solid #fff;
      border-color: transparent transparent #fff #fff;
      position: absolute;
      right: 2px;
      top: 68%;
      z-index: 3;
      transform: rotate(-35deg);
    }
  }
}
.over_subject {
  height: auto !important;
}
</style>