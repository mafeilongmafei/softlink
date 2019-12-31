<template>
  <div class="container" v-wechat-title="data.teacher_data && data.teacher_data.title">
    <header class="header">
      <img alt :src="data.course && imgUrl + data.course[0].logo" lazy-load />
      <div class="teacherInfo">
        <div class="header_img">
          <img
            v-lazy="'http://softlinkceshi.oss-cn-beijing.aliyuncs.com/pcimg/yuanweb-liyangtian.jpg'"
            alt
          />
          <p>{{ data.teacher_data && data.teacher_data.name}}</p>
          <van-tag
            type="primary"
            plain
            class="tag"
            size="large"
            :data-id="data.teacher_data && data.teacher_data.id"
            @click="setData"
          >+关注</van-tag>
        </div>
        <p class="taeDecription">{{data.teacher_data && data.teacher_data.t_desc}}</p>
      </div>
    </header>
    <main class="main">
      <p class="main_title">精品课</p>
      <ul>
        <li
          class="list_item clearFix"
          v-for="item in data.course"
          :key="item.name"
          :data-id="item.id"
          @click="navto"
        >
          <img v-lazy="imgUrl + item.logo" lazy-load alt />
          <div class="description">
            <h2>{{item.name}}</h2>
            <p>{{ data.teacher_data && data.teacher_data.name}}</p>
            <p class="price">
              {{"￥" + item.price + " - ￥" + item.start_price}}
              <span>{{item.sum_count}}人学习</span>
            </p>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import { getLecturerInfo } from "api/api.js";
import { log } from "util";
import { setLocal, getLocal } from "../../until/Auth";

export default {
  data() {
    return {
      data: {},
      imgUrl: "http://softlinkceshi.oss-cn-beijing.aliyuncs.com/appimages/", //图片的服务器,
      id: null,
      isAttention : false //是否关注
      
    };
  },
  created() {
    this.getTeacherInfo();
  },
  methods: {
    async getTeacherInfo() {
      let id = this.$route.query.id;
      let res = await getLecturerInfo(id);
      this.data = res.data;
      this.id = res.data.teacher_data.id;
    },
    navto(e) {
      let id = e.currentTarget.dataset.id;
      this.$router.push({ path: "/prese", query: { id } });
    },
    setData(e) {
      let id = e.currentTarget.dataset.id;
      let minData = JSON.parse(getLocal("mine") || "{}");
      if (minData && Array.isArray(minData.teacher)) {
        minData.teacher.push(id - 0);
        minData.teacher = Array.from(new Set(minData.teacher));
      } else {
        minData = {};
        minData.teacher = [id];
      }
      setLocal("mine", JSON.stringify(minData));
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 154px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .teacherInfo {
    width: 350px;
    position: absolute;
    height: 189px;
    top: 65px;
    left: 50%;
    margin-left: -175px;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border: 2px solid #e7f0fe;
    border-radius: 5px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-bottom: 4px solid #e2ecfd;
    img {
      width: 66px;
      height: 66px;
      position: absolute;
      left: 50%;
      top: -33px;
      margin-left: -33px;
    }
    p {
      text-align: center;
      padding-top: 40px;
      padding-bottom: 6px;
    }
    .tag {
      margin-left: 5px;
      //   border-radius: 5px;
    }
    .taeDecription {
      padding: 10px 22px 0 22px;
      font-size: 13px;
      color: #666;
      line-height: 18px;
      text-align: center;
    }
  }
}
.main {
  //   flex: 1;
  overflow: auto;
  margin-top: 108px;
  border-top: 1.4px solid #e5e5e5;
  box-shadow: 0 0.267vw 2.667vw 0 rgba(66, 133, 244, 0.27);
  .main_title {
    padding-left: 15px;
    padding-top: 13px;
  }

  .list_item {
    padding: 18px 15px;
    height: 80px;
    border-bottom: 1.4px solid #e5e5e5;
    img {
      width: 113px;
      height: 72px;
      float: left;
    }
    .description {
      float: right;
      width: 210px;
      height: 72px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h2 {
        color: #333;
        font-size: 16px;
        font-weight: 400;
      }
      p {
        font-size: 11px;
      }
      .price {
        font-size: 14px;
        color: #ffa100;
        span {
          font-size: 13px;
          color: #908090;
        }
      }
    }
  }
}
</style>