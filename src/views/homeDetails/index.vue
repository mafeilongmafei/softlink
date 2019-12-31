<template>
  <div class="container posi"  v-wechat-title="data.name">
    <main class="main">
      <header class="header">
        <img v-lazy="imgUrl + data.logo" alt />
      </header>
      <van-tabs
        v-model="active"
        sticky
        title-active-color="#4285f4"
        color="#4285f4"
        class="tabsMain"
      >
        <van-tab title="介绍">
          <section class="section">
            <h4>{{data.name}}</h4>
            <div class="teacher_name">{{data.teacher && data.teacher.name}}</div>
            <div class="info">
              <div class="price">
                <span>￥{{data.start_price}}</span>
              </div>
            </div>
          </section>
          <img v-lazy="imgUrl + data.course_desc" alt />
          <div class="btn">
            <van-button plain size="large" type="info" class="btn_item btn1" @click="showImg">立即关注</van-button>
            <van-button
              plain
              size="large"
              type="info"
              class="btn_item btn2"
              @click="show2 = true"
            >用户须知</van-button>
          </div>
        </van-tab>
        <van-tab title="目录"></van-tab>
        <van-tab title="评论"></van-tab>
      </van-tabs>

      <div class="nav_home" @click="()=>{this.$router.push({path : '/'})}">
        <i class="iconfont icon-shouye1"></i>
        <p>首页</p>
      </div>
    </main>
    <footer class="footer clearFix">
      <div class="icon_num">
        <div
          class="ico ico_jiangshi"
          @click="()=>{this.$router.push({path : 'teacherdetails' , query : {id : data.teacher_id}})}"
        >
          <i class="iconfont icon-jiangshi"></i>
          <p>讲师</p>
        </div>
        <div class="ico ico_collect" >
          <i class="iconfont icon-collect"></i>
          <p>收藏</p>
        </div>
      </div>
      <van-button color="#ffa100" type="primary" class="btn">立即购买</van-button>
    </footer>
    <!-- 两个遮罩层 -->
    <van-overlay :show="show" @click="showImg">
      <div class="wrapper">
        <div class="block block1">
          <img src="http://softlinkceshi.oss-cn-beijing.aliyuncs.com/appimages/erwe.jpg" alt />
          <p>长按识别二维码，关注「软连在线订阅号</p>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="show2" @click="show2 = false">
      <div class="wrapper">
        <div class="block">
          <div class="about-title">用户须知</div>
          <p>内容版权归软连在线所有，未经软连在线许可，任何单位和个人不得以任何形式复制、转载和使用课程内容。本商品为虚拟内容服务，一经购买成功，概不退款，请您理解。</p>
          <p class="btn" @click.stop="show2 = false">知道了</p>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { getLessonDetails  , getSchoolList} from "api/api.js";
import { setLocal, getLocal } from "../../until/Auth";
export default {
  data() {
    return {
      show: false, //遮罩层
      show2: false,
      active: 0, //选择哪个标签
      data: {},
      imgUrl: "http://softlinkceshi.oss-cn-beijing.aliyuncs.com/appimages/" //图片的服务器
    };
  },
  created() {
    this.getData(this.$route.query.id - 0);
  },
  methods: {
    async getData(id) {
      let data = await getLessonDetails(id);
      this.data = data.data;
    },
    showImg() {
      this.show = !this.show;
    },
    
  }
};
</script>
<style lang="scss" scoped>
.header {
  height: 195px;
  img {
    width: 100%;
    height: 100%;
  }
}
.main {
  flex: 1;
  overflow: auto;
  height: 200px;
  .van-tab__pane {
    width: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .section {
    box-sizing: border-box;
    height: 130px;
    border-top: 3px solid #dbe8fd;
    border-bottom: 3px solid #dbe8fd;
    padding-left: 16px;
    img {
      width: 100%;
      height: 100%;
    }

    h4 {
      font-size: 14px;
      padding-top: 25px;
    }
    .teacher_name {
      font-size: 13px;
      padding-top: 20px;
      padding-bottom: 10px;
      margin-bottom: 4px;
    }
    .info {
      color: #ffa100;
    }
  }
  .tabsMain {
    position: relative;

    .btn {
      width: 100%;
      position: absolute;
      top: 94%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .btn_item {
        width: 80%;
        border: 1px solid #fff;
        background: transparent;
        color: #fff;
      }
      .btn1 {
        margin-bottom: 10px;
      }
    }
  }
}
.footer {
  height: 50px;
  padding-left: 10px;
  .icon_num {
    width: 150px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .ico {
      width: 65px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 25px;
      p {
        font-size: 11px;
        color: #7e7e7e;
      }
    }
    .ico_jiangshi {
      font-size: 25px;
      color: #ffa100;
    }
    .ico_collect {
      color: #4285f4;
      font-size: 25px;
    }
  }
  .btn {
    float: right;
    width: 200px;
    height: 100%;
  }
}
.posi {
  position: relative;
}
.nav_home {
  position: fixed;
  top: 80%;
  left: 80%;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #1d385d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i {
    font-size: 18px;
    color: #fff;
  }
  p {
    font-size: 11px;
    color: #fff;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .block {
    width: 285px;
    height: 183px;
    background-color: #fff;
    img {
      width: 120px;
      height: 120px;
    }
    .about-title {
      padding: 18px;
      font-size: 15px;
      font-weight: 600;
      text-align: center;
    }
    p {
      padding: 0 18px;
      font-size: 13px;
      color: rgb(107, 107, 107);
      // line-height: 7px;
    }
    .btn {
      border-top: 1px solid #f2f2f2;
      color: #4285f4;
      font-size: 14px;
      margin-top: 20px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .block1 {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    p {
      padding: 0;
      text-align: center;
      padding-top: 16px;
    }
  }
}
</style>