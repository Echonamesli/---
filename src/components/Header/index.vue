<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 如果没有用户名，则是未登录状态 -->
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式导航：务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <!-- 如果有用户名，则是已登录状态 -->
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <!-- 编程式导航 -->
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    //搜索按钮的回调函数：需要向search路由进行跳转
    goSearch() {
      //路由传递参数：
      //第一种形式：纯字符串   params参数（需要提前占位）：this.keyword   query参数：this.keyword.toUpperCase()
      //this.$router.push('/search/' + this.keyword + "?k=" + this.keyword.toUpperCase())
      //第二种形式：模板字符串
      //this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
      //第三种形式：对象
      //this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})

      /**************************************************************************  */
      //面试题 1.路由传递参数（对象写法）path是否可以结合params参数一起使用？
      //答：路由跳转传参的时候，对象的写法可以是name、path的形式，但是path这种写法是不能与params参数一起使用的
      //this.$router.push{path:'/search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}}

      //面试题 2.如何指定params参数可传可不传？
      //答：比如：配置路由的时候，占位了params参数，但是路由跳转的时候就不传递
      //路径会出现问题
      //本来应该跳转到http://localhost:8080/#/search?k=QWE
      //结果是http://localhost:8080/#/?k=QWE
      //this.$router.push({name:'search',query:{k:this.keyword.toUpperCase()}});

      //面试题 3.params参数可以传递可以不传递，但是如果传递是空串，如何解决？
      //使用undefined解决：params参数可以传递、不传递（空的字符串）
      //this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}})

      //面试题 4.路由组件能不能传递props数据？可以的，有三种写法 布尔值、对象、函数

      //点击搜索按钮的时候进行路由跳转，如果有query参数（点击过三级分类）也要带过去
      if (this.$route.query) {
        let location = {
          name: "search",
          params: { keyword: this.keyword || undefined },
        };
        location.query = this.$route.query;
        this.$router.push(location);
     }
    },
    //退出登录
    async logout(){
      try {
        //1、发请求通知服务器你要退出登陆了，让服务器清除数据（比如token）
        //2、清除项目当中的数据（userInfo、token）
        await this.$store.dispatch('userLogout')
        this.$router.push('/home')
      } catch (error) {
        
      }
    }
  },
  mounted(){
    //通过全局事件总线清除搜索框中的关键字
    this.$bus.$on("clear",()=>{
      this.keyword= ""
    })
  },
  computed:{
    //用户名信息
    userName(){
      return this.$store.state.user.userInfo.name
    }
  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>