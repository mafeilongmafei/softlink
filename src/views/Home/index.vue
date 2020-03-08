<template>
  <div class="container">
    <Scroll class="ScrollWarper">
      <main class="main">
        <!-- 轮播 -->

        <header class="header">
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="carouse in carouselArr" :key="carouse.id">
              <img v-lazy="imgUrl + carouse.app_img" />
            </van-swipe-item>
          </van-swipe>
        </header>
        <section class="menu1 section">
          <a href class="menu1-item">
            <img src="../../assets/images/meu1.png" alt />
            <p>留学攻略</p>
          </a>
          <a href class="menu1-item">
            <img src="../../assets/images/menu2.png" alt />
            <p>限时免费</p>
          </a>
          <a href class="menu1-item">
            <img src="../../assets/images/menu3.png" alt />
            <p>明星学长</p>
          </a>
        </section>
        <section class="menu2 section">
          <a href class="men2-item">
            <img src="../../assets/images/menu4.png" alt />
          </a>
        </section>
        <section class="menu3 section">
          <div class="menu3-item">
            <img src="../../assets/images/menu5.png" alt />
            <div class="menu_direction">
              <h3 data-v-05e38dbe>GRE单词21天训练营</h3>
              <p data-v-05e38dbe>大家一起背单词，团购更优惠</p>
            </div>
          </div>
          <div class="menu3-item">
            <img src="../../assets/images/menu6.png" alt />
            <div class="menu_direction">
              <h3 data-v-05e38dbe>VIP督导课</h3>
              <p data-v-05e38dbe>1位语言导师+1位顾问，全方位跟进你的语言学习</p>
            </div>
          </div>
        </section>
        <!-- 精品推荐课列表 -->
        <article class="article">
          <section class="article_title">精品推荐课</section>
          <section class="course_list">
            <ul>
              <li
                class="course_item"
                v-for="item in obj.jp_course"
                :key="item.id"
                :data-id="item.id"
                @click="navDetails"
              >
                <img v-lazy="imgUrl + item.logo" alt />
                <div class="course_info">
                  <h3>{{ item.name }}</h3>
                  <div class="tag">
                    <div class="tag_item">{{ "套课: " + item.count + "时" }}</div>
                  </div>
                  <div class="price_info">
                    <div class="price">
                      <p>￥{{ item.zb_price }}</p>
                      <p>￥{{ item.price }}</p>
                    </div>
                    <div class="study">{{ item.sum_count }}人学习</div>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </article>
      </main>
    </Scroll>

    <Footer class="footer"></Footer>
  </div>
</template>
<script>
import { getCarousel, getLesson } from "api/api.js";
import { create } from "domain";
import Footer from "../../components/footer/index.vue";
import Scroll from "../../components/scroll/index.vue";
export default {
  name : "home",
  data() {
    return {
      carouselArr: [], //轮播arr
      imgUrl: "http://softlinkceshi.oss-cn-beijing.aliyuncs.com/appimages/", //图片的服务器
      obj: {} //首页列表数据
    };
  },
  created() {
    //得到轮播图片
    this.getCarouselImg();
    //精品推荐课
    this.getListLesson();
  },
  methods: {
    async getCarouselImg() {
      let CarouselArr = await getCarousel();
      this.carouselArr = CarouselArr.data.data;
    },
    async getListLesson() {
      let lesson = await getLesson();
      this.obj = lesson.data;
    },
    //跳转到详细页
    navDetails(e) {
      let id = e.currentTarget.dataset.id;
      this.$router.push({ path: "/prese", query: { id } });
    }
  },
  components: {
    Scroll,
    Footer
  }
};
</script>
<style lang="scss" scoped>
.main {
//   flex: 1;
//   overflow: auto;
  .header {
    //   @include bg-image("../../assets/images/banner");
    height: 155px;
    width: 100%;
    //   background-repeat: no-repeat;
    //   background-size: 100%;
    img {
      width: 100%;
      height: 100%;
    }
    .van-swipe {
      height: 155px;
    }
  }
  .section {
    height: 93px;
    border-bottom: 3px solid #f0f6fe;
  }
  .menu1 {
    display: flex;
    justify-content: space-around;
    .menu1-item {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 47.5px;
        height: 47.5px;
      }
      p {
        color: #333;
        font-size: 11px;
      }
    }
  }
  .menu2 {
    .men2-item {
      height: 100%;
      padding: 7px;
      box-sizing: border-box;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .menu3 {
    display: flex;
    padding-bottom: 5px;
    .menu3-item {
      width: 50%;
      padding-left: 6px;
      display: flex;
      padding-top: 17px;

      img {
        width: 27px;
        height: 27px;
        vertical-align: middle;
      }
      .menu_direction {
        padding-left: 6px;
        vertical-align: middle;
        p {
          font-size: 11px;
          line-height: 20px;
          padding-right: 9px;
        }
        h3 {
          font-size: 12px;
        }
      }
    }
    .menu3-item:first-child {
      border-right: 1px solid #f8f8f8;
    }
  }
  .article {
    padding: 21px 10px 0px 10px;

    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 25px;
      width: 3px;
      height: 16px;
      background-color: #4285f4;
    }
    .article_title {
      font-size: 16px;
      padding-left: 9px;
      padding-bottom: 10px;
    }
    .course_list {
      width: 100%;
      height: 100%;
      ul {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .course_item {
          width: 174px;
          height: 206px;
          padding-top: 8px;
          img {
            width: 100%;
            height: 108px;
          }
          .course_info {
            height: 88px;
            padding-top: 10px;
            h3 {
              font-size: 10px;
              color: #333;
            }
            .tag {
              display: flex;
              flex-wrap: wrap;
              height: 30px;
              align-items: center;

              .tag_item {
                font-size: 10px;
                color: #4285f4;
                border: 1px solid #abc9fa;
                align-items: center;
              }
            }
            .price_info {
              height: 40px;
              display: flex;
              justify-content: space-between;
              font-size: 9px;
              .price {
                p {
                  color: #ffa100;
                  font-size: 9px;
                }
              }
            }
            .study {
              color: #999999;
              font-size: 9px;
            }
          }
        }
      }
    }
  }
}



.mu-icon-button {
  width: 40px;
  height: 40px;
}

.ScrollWarper {
  width: 100%;
  position: relative;
  overflow: hidden;
   bottom: 52.98px;
  top: 0;
  left: 0;
  right: 0;
}
// .footer {
  
// }
</style>
