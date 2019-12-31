<template>
  <div class="conta">
    <div class="header">
      <div class="header_top clearFix">
        <img v-lazy="imgUrl + data.logo_img" alt />
        <div class="description">
          <div class="title">{{data.z_name}}</div>
          <p>{{data.y_name}}</p>
        </div>
      </div>
      <div class="header_bottom">
        <p>{{data.desc}}</p>
      </div>
    </div>
    <div class="imgview">
      <!-- <h2>校园风光</h2> -->
      <div class="h2">校园风光</div>
      <div class="imgList ClearFix">
        <!-- 解决移动端图片刷新才能出现    初始化的太早 -->
        <swiper :options="swiperOption" v-if="list.length">
          <img v-gallery:group1 v-for="img in list" :src="imgUrl + img" :key="img" />
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import { getSchoolDetails } from "api/api.js";
// import "swiper/dist/css/swiper.css";
import { swiper } from "vue-awesome-swiper";
export default {
  data() {
    return {
      imgUrl: "http://softlinkceshi.oss-cn-beijing.aliyuncs.com/pcimg/", //图片的服务器,
      list: [],
      data: {},

      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    };
  },
  mounted() {
    this.getSchoolInfo();
  },
  methods: {
    async getSchoolInfo() {
      let id = this.$route.query.id;
      if (id) {
        let res = await getSchoolDetails(id);
        let data = res.data.details;
        let list = data.backimg && data.backimg.split(",");
        // this.list = list;
        list.forEach(item => {
          this.list.push(item);
        });
        this.data = data;
      }
    }
  },
  components: {
    swiper
  }
};
</script>
<style lang="scss" scoped>
.conta {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .h2 {
    padding-left: 10px;
    box-sizing: border-box;
    color: #333;
    font-size: 18px;
    padding-bottom: 13px;
    position: relative;
    font-weight: 800;
    &::after {
      content: "";
      width: 3px;
      height: 18px;
      background-color: #4285f4;
      position: absolute;
      left: 0;
      top: 4px;
    }
  }
  .header {
    padding: 21px 18px;
    box-sizing: border-box;
    border-bottom: 3.333vw solid #f5f5f5;
    .header_top {
      height: 65px;
      img {
        width: 132px;
        height: 65px;
        display: block;
        float: left;
        margin-right: 11px;
      }
      .description {
        height: 65px;
        float: left;
        .title {
          font-size: 22px;
          font-weight: 800;
          line-height: 36px;
        }
        p {
          color: #999;
        }
      }
    }
    .header_bottom {
      p {
        line-height: 23px;
        font-size: 15px;
        margin-top: 12px;
        color: #4c4c4c;
      }
    }
  }
  .imgview {
    height: 175px;
    padding-top: 22px;
    padding-left: 16px;
    box-sizing: border-box;
    border-bottom: 3.333vw solid #f5f5f5;
    overflow: hidden;

    .imgList {
      width: 375px;
      height: 82px;
      overflow: hidden;
      white-space: nowrap;
      img {
        width: 132px;
        height: 82px;
        margin-right: 9px;
      }
    }
  }
}
</style>