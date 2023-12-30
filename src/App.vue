<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
     <!-- 在Home、Search显示，在登录、注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入组件 index.vue是默认文件，在引入组件时可以省略不写index这个路径
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted(){
    //派发一个action，通知Vuex发请求，获取商品分类的三级列表的数据，存储于仓库当中
    //总结：需要多次复用的全局组件如果里面有发送请求的需求，就放到app里去发送请求 因为根组件的mounted只执行一次
    this.$store.dispatch("getCategoryList");
  }
};
</script>

<style scoped>

</style>
