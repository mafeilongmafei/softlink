<template>
  <div class="container ccc">
    <div class="header">
      <van-dropdown-menu class="menu">
        <van-dropdown-item
          v-model="value1"
          :options="threecate"
          class="menu_option"
          ref="dropdown_item"
          @open="showMenu"
          @change="menuSchool"
        />
        <p class="intro" @click="filterSchool">
          简介
          <i class="iconfont icon-jianjie"></i>
        </p>
        <p @click="filterData">
          筛选
          <i class="iconfont icon-shaixuan"></i>
        </p>
      </van-dropdown-menu>
    </div>
       <main class="main">
      <van-popup
        v-model="show"
        position="top"
        :style="{ width: '100%',height: '40%' }"
        get-container="header"
        class="shade"
      >
        <img src="http://softlinkceshi.oss-cn-beijing.aliyuncs.com/pcimg/the-times-logo.png" alt />
        <h3>英国院校排名</h3>
        <p>自2004年11月以来，《泰晤士高等教育》与国际高等教育研究机构——QS合作，在每年的秋季公布世界大学排名。《泰晤士高等教育》自2010年改为与加拿大汤森路透集团（Thomson Reuters，即路透社）合作，并在以往排名标准的基础上继续完善，推出了THE（Times Higher Education）World University Rankings《泰晤士高等教育》全球大学排名。排名主要依据经济活动与创新（如获得产业界研究经费指数），国际化程度（如国际学生与当地学生比例），制度化指标（如学校师资），研究指标。新标准主要包括教学能力（Teaching，占30%）、研究能力（Research，占30%）、论文引用（Citation，占32.5%）、商业融资（Industry Income，占2.5%）和国际化程度（International mix，占5%）5个大项和13个细分标准。新标准将重点放在大学的研究、教学品质及知识转移。</p>
      </van-popup>

      <van-popup
        v-model="show2"
        position="right"
        :style="{ height: '100%' , width : '85%' }"
        get-container="header"
        class="container_menu"
      >
        <div class="menu_filter">
          <div
            class="btn clearFix bg_border"
            v-if="twocate.length > 1"
            @click="(e)=>{getChildrenElement({e , className : 'right' , type : 1})}"
          >
            <div
              :class="index === 0 ? 'btn_item right' : 'btn_item'"
              v-for="(item , index) in twocate"
              :key="item.id + 'a'"
              :data-index="index"
              :data-id="item.id"
            >
              <span>{{item.name}}</span>
            </div>
          </div>

          <Fold
            v-if="twocate.length && twocate[index1].threecate.length"
            title="学科"
            cls="btn_item_active"
            :type="2"
            :doMain="twocate[index1].threecate"
            @getChildrenElement="getChildrenElement"
            :text="false"
          ></Fold>

          <Fold
            v-if="doMain1.length"
            title="大专业"
            cls="btn_item_active"
            :type="3 "
            :doMain="doMain1"
            @getChildrenElement="getChildrenElement"
          ></Fold>
          <Fold
            v-if="doMain2.length"
            title="小专业"
            cls="btn_item_active"
            :type="4"
            :doMain="doMain2"
            @getChildrenElement="getChildrenElement"
          ></Fold>

          <div class="ranking">
            <div class="ranking_title">排名</div>
            <div class="input_price">
              <input type="text" v-model="start_ranking" />
              <span></span>
              <input type="text" v-model="end_ranking" @change="setInputRank(false)"/>
            </div>
            <div
              class="btn_gather clearFix"
              @click="(e)=>{setInputRank({
                e , className : 'btn_item_active' , type : 4
              })}"
            >
              <div
                class="btn_item"
                v-for="(item ,index) in rankArr"
                :key="item + index + 3"
                v-show="index+1 !== rankArr.length"
                :data-rank="item+1 + '-' + rankArr[index+1]"
              >
                <span>{{item+1 + "-" + rankArr[index+1]}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="menu_filte_footer">
          <van-button type="default" class="menu_filte_footer_btn" @click="reset">重置</van-button>
          <van-button type="info" class="menu_filte_footer_btn" @click="ok">确认</van-button>
        </div>
      </van-popup>
      <Scroll class="Scroll" @pullUp="eventFunction">
      <ul class="school" ref="school" >
        

        <li
          class="school_list clearFix"
          v-for="school in data.school"
          :key="school.id"
          :data-id="school.id"
           @click="navToDetails" 
        >
        
          <div class="left">
            <div class="item_top clearFix">
              <img v-lazy="imgUrl + school.logo_img" />
              <div class="description">
                <h3>{{school.z_name}}</h3>
                <p>{{school.y_name}}</p>
              </div>
            </div>
            <div class="item_bottom">
              <p>{{school.c_from}}</p>
              <van-tag
                type="primary"
                plain
                v-for="tag in  school.label && school.label.split(',')"
                :key="tag"
              >{{tag}}</van-tag>
            </div>
          </div>
          <div class="right">
            <i class="iconfont icon-shu-copy"></i>
          </div>
        </li>
        <li class="school_list_loading">
          <div style="width:100%; textAlign:center" v-show="isPageEqualTotalPage !== page">
            <van-loading size="24px">加载中...</van-loading>
          </div>
          <p v-show="isPageEqualTotalPage == page">我也是有底线的</p>
        </li>

      </ul>
      </Scroll>
    </main>
   

    <Footer class="fs"/>
  </div>
</template>
<script>


import Fold from "../../components/fold/index";
// let page = 1;
import Footer from "../../components/footer/index.vue";
import Scroll from "../../components/scroll/index.vue"
import { getSchoolList, getStateSchool, geteducation } from "api/api.js";

export default {
  name :  "school",
  data() {
    return {
      show: false,
      show2: false,
      value1: 123, //下拉 菜单必须的给一个初始值
      value: 123, //保存初始值
      data: {},
      imgUrl: "http://softlinkceshi.oss-cn-beijing.aliyuncs.com/pcimg/", //图片的服务器
      switch: true, //请求是否完成
      isPageEqualTotalPage: false, //学校列表数据是否全部请求完了
      totalPage: 1, //总页数,
      threecate: [], //哪国学校,
      page: 1, //当前页数,
      country: 0, //哪国学校
      start_ranking: null,
      end_ranking: null,
      cate: 1,
      twocate: [], //各国学历层次,
      index1: 0, //切换用的index
      index2: 0, //切换用的index,
      index3: 0, //切换用的index,
      doMain1: [],
      doMain2: [],
      rankArr: [], //排名,
      isUpdateRankArr : true //排名是否更新
    };
  },
  components: {
    Footer,
    Fold,
    Scroll
  },
  created() {
    this.getSchoolData();
    this.getStateSchoolList();
    this.getEducationList(this.value1);
  },
  mounted() {},
  methods: {
    //1-3 做的都是避免下拉菜单栏和弹出框同时出现
    filterSchool() {
      this.show = !this.show;
      this.show2 = false;
      //通过获取下拉item的实例调用提供的api关闭菜单栏,避免下拉菜单栏和弹出框同时出现
      this.$refs.dropdown_item.toggle(false);
    },
    filterData() {
      this.show2 = true;
      this.show = false;
      this.$refs.dropdown_item.toggle(false);
    },
    showMenu() {
      this.show = false;
      this.show2 = false;
    },
    //获取学校列表
    async getSchoolData(callBack , cal) {
      let arr = [
        {
          key: "page",
          value: this.page
        },
        {
          key: "country",
          value: this.country
        },
        {
          key: "cate",
          value: this.cate
        },
        {
          key: "start_ranking",
          value: this.start_ranking
        },
        {
          key: "end_ranking",
          value: this.end_ranking
        }
      ];
      let res = await getSchoolList(arr);
      // this.unbind();

      if (this.page == 1 || !this.page) {
        this.data = res.data;
        this.totalPage = res.data.totalPage;
      } else {
        let countData = this.data.school.concat(res.data.school);
        this.data.school = countData;
        this.switch = true;
      }
      // this.isScrollBottom();
      this.isUpdateRankArr ?  this.rankArr = this.splitNumber(parseInt(res.data.count)) : "" 
      this.$nextTick(()=>{
        cal && cal() // DOM 结构发生变化后，重新初始化BScroll
        callBack && callBack()// 上拉加载动作完成后调用此方法告诉BScroll完成一次上拉动作
      })

    },
    //schoolList是否到底
    isScrollBottom() {
      //数据获取后 也就是dom更新后 在进行获取dom
      this.$nextTick(() => {
        let main = document.getElementsByClassName("main")[0];
        // main.addEventListener("scroll", this.eventFunction, false);
      });
    },
    //解绑
    unbind() {
      let main = document.getElementsByClassName("main")[0];
      removeEventListener("scroll", this.eventFunction, false);
    },
    //绑定执行的函数
    eventFunction(callBack , cal) {
      // let main = document.getElementsByClassName("main")[0];
      // let obj = this.$refs.school;
      // // //可视内容区高
      // let clientHeight = obj.clientHeight;
      // // //实际宽高
      // let scroll = obj.scrollHeight;
      // //溢出高度
      // let overflowHight = scroll - clientHeight;
      // // //滚动的距离
      // //为啥求的是main的滚动距离,因为子元素把父元素撑开了,求滚动就是求父元素
      // let scrollY = main.scrollTop;
      // if (scrollY > overflowHight - 50) {
        if (this.switch) {
          this.page = this.page + 1;
          this.switch = false;
          this.getSchoolData(callBack , cal);
        }
      // }
    },
    //获取哪国学校
    async getStateSchoolList() {
      let res = await getStateSchool();
      let threecates = res.data.twocate;
      threecates.forEach(item => {
        this.threecate.push({
          value: item.id - 0,
          text: item.name
          //  threecate : item.threecate
        });
      });
    },
    //菜单栏改变
    menuSchool(value) {
      let isEqual = this.value === value;
      isEqual
        ? ((this.cate = 1), (this.country = null))
        : ((this.cate = null), (this.country = this.value1));
      this.page = 1;
      this.getSchoolData();
      this.getEducationList(value);
    },
    //获取各国学历
    async getEducationList(id) {
      let res = await geteducation(id);
      let data = res.data.twocate;
      this.twocate = data;
    },
    //找到一个元素所有字节点
    getChildrenElement(ob) {
      this.rankArr = []
      this.start_ranking = null;
      this.end_ranking = null;
      this.page = 1;
      let { e, className, type } = ob;
      //当前元素没有的className时候才会添加
      let obj = e.target;
      let id = e.target.dataset.id - 0;
      if (!className || !id) {
        return;
      }
      let index = e.target.dataset.index;
      if (!obj.classList.contains(className)) {
        this.cutClassName(obj, className);
        switch (type) {
          case 1:
            this.index1 = index;
            this.doMain1 = [];
            this.doMain2 = [];
            break;
          case 2:
            this.index2 = index;
            let arr = this.twocate[this.index1].threecate[this.index2].forucate;
            this.doMain1 = arr;
            this.doMain2 = [];
            break;
          case 3:
            this.index3 = index;
            let arr2 = this.twocate[this.index1].threecate[this.index2]
              .forucate[this.index3].fivecate;
            this.doMain2 = arr2;
            break;
          case 4:
            break;
          default:
            break;
        }
        this.cate = id;
        
      this.isUpdateRankArr = true

        this.getSchoolData();
      }
    },
    //根据返回数量,动态生成可选择的数量
    splitNumber(number) {
      let n = 50;
      let n2 = 20;
      let arr = [];
      if (number > 50) {
        let j = parseInt(number / n);
        for (let i = 1; i <= j; i++) {
          arr.push(i * n);
        }
        arr.push(number);

        arr.unshift(n2);
      } else {
        if (number > n2) {
          arr.push(n2);
          arr.push(number);
        } else {
          arr.push(number);
        }
      }
      arr.unshift(0);
      return arr;
    },
    //切换class
    cutClassName(obj, className) {
      let allChildrenNode = obj.parentNode.children;
      let len = allChildrenNode.length;
      for (let i = 0; i < len; i++) {
        allChildrenNode[i].classList.remove(className);
      }
      obj.classList.add(className);
    },
    //排名
    setInputRank(ob) {
     if(ob){
        let { e, className } = ob;
      let obj = e.target;
      let rak = obj.dataset.rank;
      if (!rak) {
        return;
      }
      this.cutClassName(obj, className);
      let arr3 = rak.split("-");
      this.start_ranking = arr3[0] - 0;
      this.end_ranking = arr3[1] - 0;
      this.getSchoolData();
     }else {
       this.start_ranking = this.start_ranking == null ? 1 : this.start_ranking
       this.getSchoolData();
     }
     this.isUpdateRankArr = false
    },
    //重置
    reset() {
      this.page = 1;
      this.country = null;
      this.cate = 1;
      this.page = 1;
      this.start_ranking = null;
      this.end_ranking = null;
      this.doMain1 = [];
      this.doMain2 = [];
      this.index1 = 0;
      this.index2 = 0;
      this.getSchoolData();
    },
    //确认
    ok() {
      this.show2 = false;
    },
    //跳转到school详情页
    navToDetails(e) {
      let id = e.currentTarget.dataset.id
      debugger
      this.$router.push({ path : "schoolDetails" , query : {id}})

    }
  }
};
</script>
 <style lang="scss" scoped>
  @import "./index";

</style>