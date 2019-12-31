import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("@/views/Home/index.vue");
const lessonDetails = () => import("views/homeDetails/index.vue");
const teacherDetails = () => import("views/teacherDetails/index.vue");

const mine = () => import("views/mine/index.vue");

const school = () => import("views/school/index.vue");
const classify = () => import("views/classify/index.vue");
const schoolDetails = () => import("../views/schoolDetails/index.vue");

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/prese",
      component: lessonDetails,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/teacherdetails",
      component: teacherDetails,
      meta: {
        title: "教师信息"
      }
    },
    {
      path: "/school",
      component: school,

      meta: {
        title: "院校库"
      }
    },
    {
      path: "/classify",
      component: classify,
      meta: {
        title: "分类"
      }
    },
    {
      path: "/mine",
      component: mine,
      meta: {
        title: "我的"
      }
    },
    {
      path: "/schoolDetails",
      component: schoolDetails,
      meta : {
        title : "学校详情"
      }
    }
  ],
  linkActiveClass: "Routeractive ani" //设置样式的class
});

export default router;
