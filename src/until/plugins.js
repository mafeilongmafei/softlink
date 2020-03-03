import Vue from "vue";
import VueWechatTitle from "vue-wechat-title";



import gallery from "img-vuer";







import {
  DropdownMenu,
  DropdownItem,
  SwipeItem,
  Swipe,
  Tab,
  Tabs,
  Lazyload,
  Button,
  Overlay,
  Tag,
  Popup,
  Collapse,
  CollapseItem,
  Loading,
  Notify
} from "vant";
Vue.use(Lazyload, {
  loading:
    "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1147105645,2116899631&fm=26&gp=0.jpg"
});


Vue.use(Swipe).use(SwipeItem);
Vue.use(Tab).use(Tabs);
Vue.use(Button);
Vue.use(Overlay);
Vue.use(Tag);
Vue.use(Loading);

Vue.use(Popup);

Vue.use(DropdownMenu).use(DropdownItem);
Vue.use(VueWechatTitle);
Vue.use(Collapse).use(CollapseItem)
Vue.use(Notify);




Vue.use(gallery, {
  useCloseButton: false
});