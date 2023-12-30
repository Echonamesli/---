<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派/事件委托 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 动画的名字叫sort -->
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <!-- 给item类增加类名cur，鼠标当前在哪一个一级分类上，哪个一级分类就有cur类的样式 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"    
                :key="c1.categoryId"
                :class="{ cur: currentIndex === index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <!-- 绑定自定义属性data-categoryName 定义属性的时候前面加上data-才能被event.target.dataset函数获取 -->
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级、三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex === index ? 'block' : 'none',
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//该引入方式是把lodash全部功能函数引入
//import _ from 'lodash'
//最好的引入方式；按需引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  //组件挂载完毕：可以向服务器发请求
  data() {
    return {
      //存储用户鼠标移到哪一个一级分类上去, 初始值-1代表鼠标没有移到一级分类上
      currentIndex: -1,  
      //控制typeNav是显示还是隐藏
      show: true,
    };
  },
  mounted() {
    //当组件挂载完毕，如果当前不是Home路由组件，将typeNav隐藏
    if (this.$route.path !== "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会执行一次
      //注入一个参数state——即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    //鼠标经过修改响应式数据currentIndex属性
    //throttle回调函数别用箭头函数：可能出现上下文this
    changeIndex: throttle(function (index) {
      //index：鼠标移到某一个一级分类元素的索引值
      //正常（用户缓慢操作）：鼠标经过的每一个一级分类h3都会触发鼠标经过事件
      //非正常（用户操作很快）：只有部分h3触发，原因：用户行为过快，浏览器反应不过来，出现卡顿
      this.currentIndex = index;
    }, 50),

    goSearch(event) {
      //最好的解决方案：编程式导航+事件委派
      //此处的事件委派是把全部的子节点h3、dt、dl、em等的事件委派给父节点，而我们要的是a标签的子节点
      //存在另外一个问题：即使能确定点击的是a标签，如何区分是一级、二级、三级分类的标签 
      //解决：给a添加一个自定义属性data-categoryName属性 <a :data-categoryName="c1.categoryName">{{ c1.categoryName }}</a
      //a标签设置自定义属性，有自定义属性的才是a标签
      //获取当前触发这个事件的节点 节点有一个dataset属性，可以获取节点的自定义属性和属性值
      let element = event.target;
      //伪数组的获取：去除"data-"之后的名字,而且变量名的小驼峰要变成小写
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果标签身上有categoryname则一定是a标签
      if (categoryname) {
        //整理路由跳转的参数  以对象的形式
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {  //一级分类的a标签
          query.category1Id = category1id;
        } else if (category2id) {   //二级分类的a标签
          query.category2Id = category2id;
        } else {   //三级分类的a标签
          query.category3Id = category3id;
        }
        //判断如果路由跳转的时候带有params参数(搜索框的关键词比如：华为)要带过去
        if(this.$route.params){
          location.params = this.$route.params
        }
        //给location对象赋予query对象
        location.query = query;
        //路由跳转（只携带query参数） 等同于this.$router.push({name:"search",query:{categoryname: categoryname; category1Id: category1id}})
        this.$router.push(location);
      }
    },
    //鼠标离开的时候，让商品分类列表进行隐藏
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    //鼠标经过的时候，让商品分类列表进行显示
    enterShow() {
      if (this.$route.path !== "/home") {
        this.show = true;
      }
    },
  },
};
</script>

<style lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter{
      height: 0px;
    }
    //过渡动画结束状态（进入）
    .sort-enter-to{
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active{
      transition: all .5s linear;
    }
  }
}
</style>