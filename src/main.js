import Vue from 'vue'
import App from './App.vue'

//把三级联动组件、轮播图、分页器注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button, MessageBox } from 'element-ui';

//全局组件 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

//Element-ui不同组件有不同的注册方式：
//1、注册Element-ui为全局组件
Vue.component(Button.name, Button);
//2、把组件挂在原型上进行注册
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from './router'
//引入仓库
import store from '@/store'
//引入mock Sever.js——————mock模拟数据
import '@/mock/mockSever'

//引入swiper轮播图样式
import "swiper/css/swiper.css"

//统一引入api文件夹里面所有的请求函数
import * as API from './api'
//json和图片是默认对外暴露的，所以可以直接引入
import tylor from '@/assets/泰勒.gif'
//引入插件
import VueLazyload from 'vue-lazyload'
//注册插件
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading: tylor
})

Vue.config.productionTip = false
new Vue({
  render: h => h(App),

  //配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },

  //注册路由 底下的写法key和value一致 
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,  //即router:router

  //注册仓库:然后组件实例的身上会多一个$store属性
  store,
}).$mount('#app')
