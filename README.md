## 1:vue-cli脚手架初始化项目
    node_modules文件夹：项目依赖文件夹

    public文件夹：一般放置一些静态资源（图片），需要注意，放在public文件夹中的静态资源，webpack进行打包的时候，会原封不动打包到dist文件夹中。

    src文件夹（程序员源代码文件夹）：
        assets文件夹：一般也是放置静态资源（一般放置多个组件共用的静态资源），需要注意，放置在assets文件夹里面静态资源，在webpack打包的时候，webpack会把静态资源当作一个模块，打包进JS文件里面

        components文件夹：一般放置的是非路由组件（全局组件）

        App.vue：唯一的根组件
        main.js：程序入口文件，也是整个程序当中最先执行的文件

    babel.config.js:配置文件（babel相关）

    package.json文件：项目“身份证”，记录项目叫做什么，项目当中有哪些依赖，项目怎么运行

    package-lock-json：锁定安装版本的文件，保证包一致性版本

    readme.md：说明性文件

## 2:项目的其他配置
    2.1 项目运行起来的时候让浏览器自动打开
        在package.json文件中
        "scripts": {
         "serve": "vue-cli-service serve --open",
          "build": "vue-cli-service build",
          "lint": "vue-cli-service lint"
        },

    2.2 关闭eslint校验工具
        vue.config.js文件：需要对外暴露
            module.exports = {
            lintOnSave:false,
            }

    2.3 npm install 在安装依赖包的时候使用 --save-dev 和 --save都会讲信息写入package.json 中，区别

    --save 安装的会将信息写入dependencies中（项目发布之后还需要依赖的包如axiox , express等包，等项目上线以后还需使用）
    --save-dev 安装的会将信息写入devDependencies中（开发时依赖的包，等项目上线不会使用）
    
    npm install -g moduleName # -g 的意思是将模块安装到全局，不会在项目node_modules目录中保存模块包，不会将模块依赖写入devDependencies或dependencies节点

## 3：路由的配置
    vue-router  路由分为KV
    前端路由:
        K即为URL（网络资源定位符）
        V即为相应的路由组件

    确定项目结构顺序:上中下 -----只有中间部分的V在发生变化，中间部分应该使用的是路由组件

    两个非路由组件：Header 、Footer
    四个路由组件:Home、Search、Login（没有底部的Footer组件，带有二维码的）、Register（没有底部的Footer组件，带二维码的）

## 4.完成非路由组件Header与Footer业务
    1.书写静态页面(HTML+CSS)
    2.拆分组件
    3.获取服务器的数据动态展示
    4.完成相应的动态业务逻辑
    
    
## 5.非路由组件的搭建
    前台项目的结构与样式不需要自己写的，老师准备好了辉洪老师静态页面：结构 + 样式 +图片资源

    项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法

    1：安装less插件 less-loader@5
    切记less-loader安装5版本的，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义

    2:需要在style标签的身上加上lang="less",不添加样式不生效

    3.非路由组件使用分为几步:
            第一步：定义
            第二步：引入
            第三步：注册
            第四步:使用

## 6.路由组件的搭建
    npm run install vue-router@3  ps:使用vue2必须加@3

    在上面分析的时候，路由组件应该有四个：Home、Search、Login、Register

    components文件夹：经常放置的是非路由组件（共用全局组件）
    pages或者views文件夹：经常放置的是路由组件

    6.1配置路由
    项目当中配置的路由一般放置在router文件夹中
    6.2总结
    
        1.路由组件一般需要在router文件夹的js文件中注册（使用的即为组件的名字）（通过router-view展示）
        2.非路由组件在使用的时候一般都是以标签的形式使用，如<Header></Header>
        3.注册完路由，不管是路由组件、还是非路由组件，身上都有$route、$router属性
            $route:一般获取路由信息（路径、query、params等等）
            $router:一般进行编程式导航进行路由跳转（push、replace）

## 7.路由的跳转
    路由的跳转就两种形式：
    1）声明式导航（router-link：务必要有to属性）

    2）编程式导航——利用的是组件实例的$router.push||replace方法，可以实现路由的跳转
    编程式导航更好用：因为可以书写自己的业务逻辑

    编程式路由跳转到当前路由（参数不变），多次指定会抛出NavigationDuplicated的警告错误？
    --声明式导航没有这类问题的，因为vue-router底层已经处理好了

    --"vue-router": "^3.6.5"：最新的vue-router引入了promise  当传递参数多次且重复，会抛出异常，因此出现上面现象

    第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调函数，可以捕获到当前错误
    this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})

    第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

    this:当前组件实例vc————search
    this.$router:当前组件实例的一个属性，属性值为VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$route以及$router属性
    而push是VueRouter的实例对象的显示原型的一个方法

    第二种解决方案：重写VueRouter原型对象上的push方法来捕获错误
    在router文件夹里的index.js：
    //使用插件
    Vue.use(VueRouter)
    //先把VueRouter原型对象的push保存一份
    let originPush = VueRouter.push;  //此处originPush的this指向window
    //重写push与replace方法，以push方法为例
    //第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
    //第二个参数：成功回调
    //第三个参数：失败回调
    VueRouter.prototype.push = function(location,resolve,reject){
        if(resolve && reject){
            originPush.call(this,location,resolve,reject)  //改变this指向，使得指向VueRouter实例
            //call与apply区别：相同点：都可以调用函数一次，都可以篡改函数的上下文一次 不同点：call传递参数用逗号隔开，apply传递参数用数组
        }else{
            originPush.call(this,location,()=>{},(=>{}))
        }
    }

## 8.Footer组件显示与隐藏
    显示或者隐藏组件：v-if  或者 v-show

    v-if：会频繁操作dom元素，操作dom在节点上的有无
    v-show：操作样式display来决定有无

    Footer组件：在Home、Search显示Footer组件；在登录、注册的时候隐藏

    两种方法：
    8.1
        我们可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer组件的显示与隐藏
        <!-- 在Home、Search显示，在登录、注册隐藏 -->
        <Footer v-show="$route.path == '/home' || $route.path == '/Search'></Footer>

    8.2
        配置路由的时候，可以给路由添加路由元信息 meta:{show:true/false}
        <Footer v-show="$route.meta.show"></Footer>

## 9.路由的传参
    参数共两种：
    1) params参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
    
    2）query参数：不属于路径当中的一部分，类似于ajax中的queryString /home？k=v&kv=,不需要占位


    params参数（需要提前占位）：this.keyword   query参数：this.keyword.toUpperCase()

        {
            path: "/search/:keyword",  //params传递参数需要提前占位
            component: Search,
            meta:{show:true},
            name:"search"
        },

    路由传递参数的三种方式
    1）第一种形式：纯字符串形式    
    this.$router.push('/search/' + this.keyword + "?k=" + this.keyword.toUpperCase())

    2）第二种形式：模板字符串形式
    this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)

    3）第三种形式：对象形式（要求search路由组件要有name属性）
    this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}})

## 10.面试题
        1.路由传递参数（对象写法）path是否可以结合params参数一起使用?
        答：不可以；对象的写法可以是name、path的形式，但是path这种写法是不能与params参数一起使用的
        this.$router.push{path:'/search',params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}}   ————错误
        
        2.如何指定params参数可传可不传？
        ps：如果路由要求传递params，但是你就不传递params参数，则URL会有问题

        指定方法：在配置路由的时候，在占位的后面加上一个问号
        {
            path: "/search/:keyword?", //加?代表此params参数可传可不传
            component: Search,
            meta:{show:true},
            name:"search"
        },

        3.params参数可以传递可以不传递，但是如果传递是空串，如何解决？
        使用undefined解决：params参数可以传递、不传递（空的字符串）
        this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}})

        4.路由组件能不能传递props数据？


## 11.Home模块拆分
    1.静态页面（样式）
    2.拆分静态组件
    3.发请求获取服务器数据进行展示
    4.开发动态业务
    5.拆分组件：结构+样式+图片资源
    一共要拆分为七个组件

    11.1 TypeNav —— 三级联动组件——注册为全局组件
    11.2 其余静态组件 HTML——CSS——图片资源  缺一不可

## 12.axios二次封装
    XMLHttpRequest、fetch、JQ、axios
    12.1 为什么要进行二次封装
        请求拦截器、响应拦截器：请求拦截器——可以在发送请求之前处理一些业务；响应拦截器——可以处理一些事情

    12.2 项目中通常有个API文件夹——里面放着ajax.js

## 13.接口统一管理
    项目很小：完全可以在组件的生命周期函数中发送请求
    项目很大：axios.get('xxx')

    13.1跨域问题
    什么是跨域：协议、域名、端口号不同的请求，称之为跨域
    http://localhost:8080/#/home  ----前端项目本地服务器
    http://39.98.123.211  ----要获取资源的后台服务器
    跨域解决：JSONP、CROS、代理

## 14.进度条的使用
start：进度条开始
done：进度条结束
进度条颜色可以在nprogress.css里修改

## 15.vuex状态管理库
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。

15.1 书写任何项目都需要vuex？
    项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
    组件通信数据比较复杂，这种情况在使用vuex
    Vuex是插件，通过vuex仓库进行存储项目的数据
    Vuex核心概念:state、actions、mutations、getters、modules

15.2 vuex的基本使用

15.3 vuex实现模块式开发【modules】
    由于项目体积比较大，你向服务器发请求的接口过多，服务器返回的数据也会很多，如果还用以前的方式存储数据，导致vuex中的state数据格式比较复杂。采用vuex模块式管理数据。
    //模块式开发

        //state:仓库存储数据的地方
        const state = {
            //state中数据的默认初始值别瞎写,服务器返回是什么类型就写什么类型
            categoryList:[],  //home仓库中存储三级菜单的数据
        }
        //mutations:修改state的唯一手段
        const mutations = {
            CATEGORYLIST(state,categoryList){
                state.categoryList = categoryList
            }
        }
        //action:处理action，可以书写自己的业务逻辑，也可以处理异步 这里可以书写业务逻辑，但是不能修改state
        const actions = {
            //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
            async getCategoryList({commit}){
                let result = await reqgetCategoryList()
                if(result.code === 200){
                    commit('CATEGORYLIST',result.data.slice(0,16))
                }
            },
        }
        //getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
        const getters = {}

        //对外暴露
        export default{
            state,
            mutations,
            actions,
            getters
        }

## 16 完成TypeNav三级联动展示数据业务
16.1
    home模块当中，使用了一个功能三级联动功能---->[typeNav]
    在search模块当中，也使用三级联动的功能------->[typeNav]
    注意的事项
        1、以后在开发项目的时候，如果发现某一个组件在项目当中多个地方出现频繁的使用，咱们经常把这类的组件注册为全局组件。
        2、 注册全局组件的好处是什么：只需要注册一次，可以在程序任意地方使用
        3、咱们经常把项目中共用的全局组件放置于components里面，以后需要注意，项目当中全局组件（共用的组件）一般放置于components文件夹中
        4、全局组件只需要注册一次，就可以在项目当中任意的地方使用，注册全局组件一般是在入口文件（main.js）注册。

    16.2 完成一级分类动态添加背景颜色(鼠标移到某一个一级分类上它就会有相应的颜色)
    第一种方法：采用样式完成
                .item:hover{
                    background: skyblue;
                }
    第二种方法：通过js完成
                <!-- 一级分类 -->
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

                data(){
                    return {
                    //存储用户鼠标移到哪一个一级分类上去, 初始值-1代表当前鼠标没有移到任何一级分类上
                    currentIndex: -1,  
                    }
                };

                .cur {background-color: skyblue;}

    16.2 通过js控制二三级商品分类的显示与隐藏
        1、原方法
        &:hover {
            .item-list {
              display: block;
            }
          }
        2、采用js的方法
        :style="{display:currentIndex===index?'block':'none'}"

    16.3 演示卡顿现象
    正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）

    防抖：只执行最后一次！！
    前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发,只会执行最后一次

    节流：每隔一段时间最多执行一次！！只触发第一次，等待时间结束后才能触发下一次
    在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发

    //lodash插件：里面封装函数的防抖与节流的业务（闭包+延迟器）
    //lodash插件对外暴露一个_对象。该对象的debounce为防抖动函数，throttle函数为节流函数

    16.4 完成三级联动节流的操作
    import throttle from "lodash/throttle";
    changeIndex: throttle(function (index) {
      //index：鼠标移到某一个一级分类元素的索引值
      this.currentIndex = index;
    }, 50),

    16.5 完成三级联动组件的路由跳转与传递参数
    三级联动模块用户可以点击一级分类、二级分类或者三级分类
    点击的时候会从Home模块跳转到Search模块
    路由跳转的时候【home->search】：需要进行路由传递参数【分类的名字、一、二、三级分类的id】

    三级分类由于使用router-link的时候，会出现卡顿现象
    卡顿现象原因：
    router-link是一个组件：相当于VueComponent类的实例对象，一瞬间new VueComponent很多实例（1000+），很消耗内存，因此导致卡顿。

    因此采用编程式导航
    this.$router.push({name:"search",query:{categoryname: categoryname; category1Id: category1id}}) 

    <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">

    16.6 开发Search模块中的typeNav商品分类菜单（过渡动画效果）
    过渡动画：前提是组件或者元素要有v-if或者v-show指令
    <transition name="sort">
    。。。
    </transition>

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

    16.7 typeNav商品分类列表的性能优化
    项目：home切换到search或者search切换到home，你会发现一件事情，组件在频繁的向服务器发请求，
    获取三级联动的数据进行展示。
    项目中如果频繁的向服务器发请求，很耗性能的，因此咱们需要进行优化。

    为什么会频繁的向服务器发请求获取三级联动的数据?
    因为路由跳转的时候，组件会进行销毁的home组件的created：在向vuex派发action，因此频繁的获取三级联动的数据
    只需要发一次请求，获取到三级联动的数据即可，不需要多次。
    最终解决方案：在App.vue里发送请求（因为根组件的mounted只执行一次）

    16.8 合并params与query参数
        跳转到search界面有两种方式：1、点击三级分类中的某个商品——query 2、点击搜索按钮(搜索框内输入的关键词也要传递过去)——params
        都有点击的话要一起传递过去

## 17 开发Home首页当中的ListContainer组件（轮播图）与Floor组件（家用电器）
    由于服务器返回的数据（接口）只有商品分类菜单数据，对于ListContainer与Floor没有提供数据，所以要自行模拟数据

17.1 mock（模拟）数据
mock.js: 生成随机数据，拦截Ajax请求
mock只会自己在前台玩耍，它会被ajax拦截下来，不会向后台（服务器）发送请求
我们假装mock是服务器发回来的数据

17.2 mockjs使用步骤
    第一步:安装依赖包npm install mockjs

    第二步：在src文件夹下创建一个文件夹，文件夹mock文件夹。

    第三步:准备JSON数据（注意：数据拷贝完要格式化，一定不能留有空格）
        把mock数据需要的图片放置于public文件夹中！（public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中）
        比如:listContainer中的轮播图的数据
        [
            {id:1,imgUrl:'xxxxxxxxx'}, 
            {id:2,imgUrl:'xxxxxxxxx'}, 
            {id:3,imgUrl:'xxxxxxxxx'}, 
        ]

    第四步：在mock文件夹中创建一个mockSever.js文件
        注意：在mockSever.js文件当中对于banner.json||floor.json的数据它们虽然没有暴露，但是可以引入。
        对于webpack当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露。
        通过Mock.mock方法模拟出数据

    第五步：在入口文件中引入mockSever.js(至少需要执行一次，才能模拟数据)

    第六步:回到入口文件，引入mockSever.js
        mock需要的数据或者相关mock代码页书写完毕后，mockServe.js需要执行一次，
        如果不执行，和你没有书写一样的。

    第七步:在API文件夹中创建mockAjax.js  ——对于axios进行二次封装,暴露mockRequests,用于向模拟的数据发请求


17.3 mockjs模拟数据
    注意：因为后台老师没有给我们写好其他接口【老师们特意的：因为就是想练习mock数据】
    但是项目中mock数据，你就把他当中真实接口数据用就行。

    注意：mock（模拟数据）数据需要使用到mockjs模块，可以帮助我们模拟数据。
    注意：mockjs【并非mock.js mock-js】 http://mockjs.com/ 

 17.4 Swiper基本的使用

    swiper可以在移动端使用？还是PC端使用？
    答：swiper移动端可以使用，pc端也可以使用。

    swiper常用于哪些场景？
    常用的场景即为轮播图----【carousel:轮播图】
    swiper最新版本为7版本的，项目当中使用的是5版本

    https://www.swiper.com.cn/ 官网地址


17.6 Swiper使用步骤：
    安装Swiper插件：最新版本为8，安装的是swiper@5
    npm install --save swiper@5   

    注意：把首页当中轮播图拆分为一个共用的全局组件 Carousel ————！！！！(后面floor(家用电器)组件也用到了轮播图)

    1.1:swiper在Vue项目中使用 （开发ListContainer组件【首页banner图片】）
        提示：卸载插件，你可以不用删除node_modules文件夹，可以使用npm uninstall xxxx进行卸载

    1.2swiper安装到项目当中  import Swiper from "swiper";

    1.3在相应的组件引入swiper.css 
        但是需要注意，home模块很多组件都使用到swiper.css,没必要在每一个组件内部都引入样式一次，
        只需要在入口文件引入一次即可。 
        main.js中
            //引入swiper轮播图样式
            import "swiper/css/swiper.css"

    1.4:初始化swiper实例在哪里书写? 在mounted那里写为什么不行？
        在new Swiper实例之前，页面中的节点（结构）必须要有，如果把new Swiper实例放在mounted那里不行
        原因：结构还不完整，我们知道对于Vue一个组件而言，mounted[组件挂载完毕：相应的结构不就有了吗] 
        mounted-->组件挂载完毕（一般情况下），但是轮播图的每张图片是v-for出来的，前提是服务器的数据返回之后才能v-for才能生成节点 本质：获取服务器数据dispatch涉及到异步语句，导致v-for遍历的时候结构还不完整！

    1.5第一种解决方案，延迟器（不是完美的解决方案）
        同学的想法：都不是完美的【错误的想法】
        created里面：created执行与mounted执行，时间差可能2ms，白扯
        updated里面：如果组件有很多响应式（data），只要有一个属性值发生变化updated还会再次执行，再次初始化实例。
        总结：第一种解决方案可以通过延迟器（异步）去解决问题
        但是这种解决方案存在风险（无法确定用户请求到底需要多长时间），因此没办法确定延迟器时间。

    1.6:Swiper在Vue项目中使用完美解决方案——watch+nextTick
        第二种解决方案：
        watch（保证bannerList数据有了）+nextTick（保证v-for执行结束）

        watch:监听属性，watch可以检测到属性值的变化，当属性值发生变化的时候，可以触发一次。
        Vuex当中的仓库数据bannerList（组件在使用）：
        bannerList仓库数据有没有发生过变化？
        一定是有的：bannerList初始值空数组，当服务器的数据返回以后，它的bannerList存储的属性值会发生变化【变为服务器返回的数据】
        组件实例在使用仓库中的bannerList，组件的这个属性bannerList一定是发生过变化，watch可以监听到。

        组件实例的一个方法:$nextTick
        this.$nextTick(()=>{
            //DOM更新了 
        })

        nextTick官网解释:
        在下次DOM更新, 循环结束之后,执行延迟回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM。
        注意：组件实例的$nextTick方法，在工作当中经常使用，经常结合第三方插件使用，获取更新后的DOM节点


17.7 开发floor组件————家用电器组件
    开发Floor组件：Floor组件它被复用的（home首页中使用了两次floor组件）

    1：获取floor数据的请求  export const reqFloorList = ()=>mockRequests.get('/floor')

    ps：仓库当中发异步请求捞数据的时候——state的数据格式取决于服务器返回的数据格式

    2: Floor组件获取mock数据，发请求的action书写在哪里?  ——Home路由组件
    不能在Floor组件内部发，如果在floor内部发请求，就无法通过v-for遍历出两个floor组件
    ————必须在Home路由组件发送floor数据请求

        mounted(){
        //在home的mounted中派发action，获取floor组件的数据
        this.$store.dispatch('getFloorList')
        },
        computed:{
            ...mapState({
            floorList:state => state.home.floorList   //捞取floor（家用电器）数据
            })
        }

        <!-- 父Home给子Floor传数据 通过props实现父子组件通信  -->
        <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>


    3: v-for|v-show|v-if|这些指令可以在自定义标签（组件）的身上使用

    4: 组件间通信******面试必问的东西
            props:父子间通信
            插槽:父子
            自定义事件:子给父通信
            全局事件总线$bus:万能
            pubsub-js:万能 vue当中几乎不用
            Vuex:万能
            $ref:父子通信

    5: 为什么在Floor组件的mounted中初始化SWiper实例轮播图可以使用.
    因为是由父组件的mounted发请求获取Floor组件数据，当父组件的mounted执行的时候。Floor组件结构可能没有完整，但是服务器的数据回来以后Floor组件结构就一定是完成的了，因此v-for再遍历来自于服务器的数据，如果服务器的数据有了，Floor结构一定的完整的。否则，你都看不见Floor组件


## 18 Search模块开发
    1）静态页面+静态组件拆分
    2）发请求（API）
    3）vuex（三连环）
    4）组件获取仓库数据，动态展示数据

    18.1
        //是搜索模块需要携带给接口的参数 地址：/api/list  请求方式：post
        {
            "category1Id": "61",//一级分类的id
            "category2Id": "61",//二级分类的id
            "category3Id": "61",//三级分类的id
            "categoryName": "手机",//产品的名字
            "keyword": "小米",//关键字
            "order": "1:desc",//排序
            "pageNo": 1,//当前第几页
            "pageSize": 10,//每一页需要展示多少条数据
            "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],//平台属性的选择参数
            "trademark": "4:小米"//品牌参数
        }

        //当前这个接口，给服务器传递参数params，至少是一个空对象
        export const reqGetSearchInfo = (params)=> requests({url:'/list',method:'post',data:params})
        注意：搜索的接口，需要传递参数，至少是一个空对象（KV没有，但是至少给服务器一个对象）
        
    18.2 解决Search模块需要发多次请求的问题
        发请求不能写在mounted里面，这样的话由于组件挂载完毕只执行一次，就导致只发一次请求
        解决方法：把发请求封装在一个函数getData里面 需要的时候调用下即可

            //向服务器发请求获取数据
            getData() {
            this.$store.dispatch("getSearchList", this.searchParams);
            },

            mounted() {
            //在发请求之前带给服务器的参数一旦发生变化就要带给服务器
            this.getData();
            },

        另外，在mounted发请求之前要先从路由那里搞到searchParams参数，带着参数去向服务器发请求

            beforeMount() {
            //简写  Object.assign：ES6新增的语法， 合并对象
            Object.assign(this.searchParams, this.$route.query, this.$route.params);
            }
        
    18.3 search中子组件searchselector的动态数据展示

    18.4 监听路由的变化再次发请求获取数据
        watch数据监听，监听组件实例身上的属性的属性值是否发生变化
        watch: {
            $route(newValue, oldValue) {
            //再次发请求之前整理带给服务器的参数
            Object.assign(this.searchParams, this.$route.query, this.$route.params);
            //console.log(this.searchParams)
            //再次发起ajax请求
            this.getData();
            //每一次请求完毕，都要把相应的三个id置空（三级分类中第一次点了1Id，第二次点了2Id，但是1Id数据还在）
            //分类名字categoryName和关键字keyword不用清理，因为每一次路由发生变化的时候都会给它赋予新的数据
            this.searchParams.category1Id = undefined;
            this.searchParams.category2Id = undefined;
            this.searchParams.category3Id = undefined;
            },
        },

## 19

    1) 动态开发面包屑中的分类名
    编程式路由导航跳转（自己跳自己）
            <!-- 分类的面包屑取决于searchParams有没有categoryName -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">x</i>
            </li>

    2）动态开发面包屑中的关键字
    当面包屑中的关键字清除以后，需要让兄弟组件Header组件中的搜索框中的关键字也清除掉
     设计组件通信：$bus——全局事件总线

    3）面包屑处理品牌信息
      //品牌的事件处理函数
      trademarkHandler(trademark){
        //点击了品牌（苹果）还是需要整理参数向服务器发送请求获取相应的数据进行展示
        //因为是在父组件（search）中把searchParams参数带给服务器，所以子组件要把你点击的品牌的信息给父组件传递过去--采取自定义事件
        this.$emit('trademarkInfo',trademark)
      },

      <!--SearchSelector为Search的子组件-->
      <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

      //自定义事件回调
        trademarkInfo(trademark) {
        //整理子组件searchselector传过来的品牌的参数："ID:品牌名称"
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
        //再次发请求获取search模块列表数据进行展示
        this.getData();
        }

    4）平台售卖属性的操作

    5）综合与价格按钮，点击谁，谁的背景颜色变为红色。（类名：active）将来点击综合||价格，还是需要给服务器发请求

        【价格升序：把这个信息给服务器传递过去，服务器接收到信息，数据库自动把排序这件事情做了，把排序做好的数据返回给你，你展示即可】

        order:服务器需要字段，代表的是排序方式
        order这个字段需要的是字符串（可以传递也可以不传递）
        1:代表综合
        2:代表价格
        3:asc代表升序
        4:desc代表降序

        告诉服务器排序方式有几种情况?
        "1:asc" "1:desc"  "2:asc"  "2:desc"

        谁应该拥有类名（通过order属性值中包含1还是2）
        <li :class="{active:isOne}" @click="changeOrder('1')">
            <a href="#">综合<span v-show="isOne" class="iconfont"  :class="{'icon-long-arrow-up':isAsc,'icon-long-arrow-down':isDesc}"></span></a>
        </li>

        箭头用什么去做【可以选用阿里图标库】  https://www.iconfont.cn/ 
        1、右上角搜索up
        2、选择想要的图标添加进购物车
        3、添加至项目，设置项目名
        4、在我的项目里面找到想要的图标所在的项目，点击查看在线链接，点击生成链接，复制链接
            //at.alicdn.com/t/c/font_3803851_fw8ur9jqcr.css
        5、在public的index.html中引入
            <!-- 来自阿里图标的箭头 -->
            <link rel="stylesheet" href="https://at.alicdn.com/t/c/font_3803851_fw8ur9jqcr.css">
        6、去图标那里复制代码得到icon-long-arrow-up  
            :class="{'icon-long-arrow-up':isAsc,'icon-long-arrow-down':isDesc}

        分页功能。
        第三方插件:elementUI实现超级简单
        但是咱们需要自己封装。也属于前台项目当中比较重要的一部分。--Pagination

        分页器展示：需要的数据：
            需要知道当前是第几个：pageNo字段代表当前页数
            需要知道每一个需要展示多少条数据：pageSize字段进行代表
            需要知道整个分页器总共有多少条数据：total字段进行代表

            每一页3条数据，一共91条数据 ==> 一共是有31页

            需要知道分页器连续的页面个数：一般是5或者7：continues进行代表

            例如：continues=5
            1 ... 3 4 5 6 7 ... 31 下一页 共91条
            当前是第5页
            连续的页面个数：3 4 5 6 7 连续的页面个数的起始数字是3，结束数字是7

            连续页码5: 8   [6,7,8,9,10] 
            连续页码7: 8   [5,6,7,8,9,10,11]

            连续页码5:  8   [6,7,8,9,10]
            连续页码7:  8   [5,6,7,8,9,10,11]
        
## 20 开发某一个产品的详情页面--Detail
    20.1
        1:熟悉静态页面、书写样式
        2：拆分组件
        3:获取服务器动态展示
        4：完成动态业务
            <!-- 点击某个商品之后去到这个商品的详情页，在路由跳转的时候切记别忘记带上id（params参数） -->
            <router-link :to="`/detail/${good.id}`">
                <img :src="good.defaultImg" />
            </router-link>

    20.2 商品详情数据获取
        //获取产品详情信息的接口：URL：/api/item/{ skuId }  请求方式：get
        export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})

        建立一个detail的仓库
        mounted() {
            //派发action获取产品详情的信息
            this.$store.dispatch("getGoodInfo", this.$route.params.skuid);
            }

    20.3 产品详情展示动态数据




## 21 路由的滚动行为：当切换到新路由时，想要也秒你滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。
       //配置路由,对外暴露VueRouter类的实例
        let router = new VueRouter({
            //配置路由 注意路由的数组名是routes
            routes: [......     
            ],
            //滚动行为
            scrollBehavior(to, from, savedPosition) {
                //对于所有路由导航，让页面滚动到顶部
                //返回的y=0代表滚动条在最上方
                return { y: 0 }
            }
        })

## 22 加入购物车
        在detail的仓库的action中写异步请求 即加入购物车的异步请求函数

        async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //加入购物车以后（发请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他的数据（data:null），只是返回code=200，代表这次操作成功
        //因为服务器没有返回其余数据，因此我们不需要三连环存储数据
        let result = await redAddOrUpdateShopCart(skuId,skuNum)
        //代表服务器加入购物车成功
        if(result.code == 200){
            return "ok"
        }else{
            //代表加入购物车失败
            return Promise.reject(new ErrorEvent('faile'))
        }
    }

    <!-- 点击加入购物车后，在跳转到addcartsuccess路由之前，需要先发请求从而把要加购的产品信息
        发送给服务器，服务器会乖乖的进行相应的存储 -->
    <a @click="addShopCar">加入购物车</a>

    //加入购物车的回调函数
    async addShopCar() {
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: this.$route.params.skuid,
          skuNum: this.skuNum
        });
        //3：进行路由跳转，同时要将产品信息带给下一级路由
        //一些简单的数据比如产品个数skuNum通过query的形式给路由组件传递过去
        //而产品信息（如skuInfo对象）比较复杂，可以通过本地存储（持久）/会话存储（不持久化，会话结束数据会消失）
        //本地存储和会话存储，一般存储的都是字符串，不能存对象
        //所以要在传的时候将对象转换为json，接收的时候再将json转换为对象
        sessionStorage.setItem("SKUINFO", JSON.stringify(this.skuInfo));
        this.$router.push({
          name: "addcartsuccess",
          query: { skuNum: this.skuNum }
        });
      } catch (error) {
        //失败
        alert(error.message);
      }
    }

    computed:{
      skuInfo(){
        return JSON.parse(sessionStorage.getItem('SKUINFO'))
      }
    }


## 23.点击《去购物车结算》后会跳转到shopcart路由组件

    1）uuid游客身份获取购物车数据
        要先向服务器发起ajax请求，获取购物车数据，操作vuex三连环，组件获取数据展示数据
        服务器不知道你是谁，你拿不到数据

    2） detail的仓库必须有游客身份
        //封装游客身份模块uuid---生成一个随机字符串（不能再变化了）
        import {getUUID} from '@/uitls/uuid_token'
        const state = {
            goodInfo: {},
            //游客临时身份
            uuid_token:getUUID()
        }


    3）在uitls文件夹下新建文件uuid_token.js 里面封装一个getUUID函数
        import { v4 as uuidv4} from 'uuid'
        //要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
        export const getUUID = ()=>{
            //先从本地存储获取uuid（判断下本地存储里面是否有）
            let uuid_token = localStorage.getItem('UUIDTOKEN')
            //如果没有
            if(!uuid_token){
                //生成游客临时身份
                uuid_token = uuidv4()
                //本地存储存储一次
                localStorage.setItem('UUIDTOKEN',uuid_token)
            }
            return uuid_token
        }

    4）在ajax.js文件的发请求函数里————去仓库捞uuid然后添加进请求头里面

        if(store.state.detail.uuid_token){
        //给请求头添加一个字段——userTempId-即游客临时身份id（和后台老师商量好了）
        config.headers.userTempId = store.state.detail.uuid_token
        }


## 24.注册业务

    24.1 注册---通过数据库存储用户信息（名字、密码）
        1）收集表单数据
            data() {
                return {
                //收集表单数据--手机号
                phone: "",
                //验证码
                code: "",
                //密码
                password: "",
                //确认密码
                password1: "",
                //是否同意
                agree: true,
            };
        2）获取验证码的接口 /api/user/passport/sendCode/{phone}   get

        3) 建立user的小仓库 在里面写获取验证码的函数 获取验证码的接口正常情况下会把验证码发到用户手机上
            但这里直接把验证码返回（省个短信钱）

        4）写注册接口 
    

## 25.登录业务
    25.1 写登录接口

    25.2 token——需要通过localstorage持久存储    注意：vuex是仓库存储数据，不是持久化

        当用户注册完成，用户登录（用户名+密码）向服务器发送请求（组件派发action：userLogin），登陆成功后服务器会下发token，此时token是存储在仓库当中的，也就是非持久化的；在Login界面中路由跳转到Home首页
        紧接着首页Home的（mounted）当中会自动在一挂载的时候就派发action获取到用户信息，接着在header那里展示用户名信息
        但一刷新Home首页，由于token是非持久化存储，一刷新就没了token也就获取不到用户信息，因此需要持久化存储token--localstorage

    25.3 用户登录后——服务器会给我们token——登陆后会跳转到home界面——home挂载就要带着服务器给的token去向服务器获取用户信息

        //获取用户信息（需要在首页的请求头里带着用户的token向服务器要用户信息）
        export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

        //在请求头里面携带token给服务器
        if(store.state.user.token){
            config.headers.token = store.state.user.token
        }

    25.4 还存在的问题：
        1、多个组件（除了home还有search等）展示用户名信息的话需要在每一个组件的mounted中执行this.$store.dispatch('getUserInfo') ——不行

        2、用户如果已经登陆了，就不应该再回到登录页面

        //用于清除本地的数据（userInfo，token）
        CLEAR(state) {
            //把仓库中的数据清空
            state.token = ''
            state.userInfo = {}
            //把本地存储的数据清空
            removeToken()
        }

        //清除本地存储的token
        export const removeToken = ()=>{
            localStorage.removeItem('TOKEN')
        }


## 26 全局守卫：
    全局守卫：紫禁城大门守卫
    路由独享守卫：去往皇帝、太后、妃子 路上的守卫
    组件内守卫：贴身守卫
    项目当中任何路由变化都可以检测到，通过条件判断可不可以进行路由跳转。
        前置守卫：路由跳转之前可以做一些事情。
        后置守卫：路由跳转已经完成再执行。

        //全局守卫：前置守卫（在路由跳转之前进行判断）
        router.beforeEach(async (to, from, next) => {
            //to:可以获取到你要跳转的那个路由的信息--目的地
            //from:可以获取到你是从哪个路由来的--起点
            //next：放行函数--1、next()代表直接放行；2、next(path：'/')或者是next('/path')代表放行到指定的路由;3、next(false)--中断当前的导航，把你原路返回到from
            //为了方便测试，先统一放行
            //next()
            //用户登陆了才会有token，如果没有登录则一定不会有token
            let token = store.state.user.token
            let name = store.state.user.userInfo.name
            //有token说明用户登陆了
            if (token) {
                if (to.path == '/login' || to.path=='/register') {
                    //用户已经登陆了，则不能返回login，一定要停留在首页
                    next('/home')
                } else {
                    //登陆了但去的不是login与register,则进一步需要根据要跳转的组件是否已经派发action并获取到用户信息了
                    //如果登陆了并且用户名信息已有则放行
                    if (name) {
                        next()
                    } else {
                        //登陆了，去获取用户信息
                        try {
                            await store.dispatch('getUserInfo')
                            next()
                        } catch (error) {  //没有用户信息(token过期失效引起)，则要在路由跳转前通过派发userLogout方法清除token，并重新登录
                            await store.dispatch('userLogout')
                            next('/login')
                        }
                    }
                }
            } else {
                //用户未登录，放行
                next()
            }
        })


        //后置守卫:在路由跳转完毕之后才会执行一次
        const router = new VueRouter({...})
        router.afterEach(()=>{
            console.log('守卫:路由跳转完毕才会执行一')
        })

## 27 点击结算后获取用户地址信息以及订单交易页信息
    1）写接口
    2）写trade小仓库
## 28 点击提交订单跳转到pay组件


## 28 elementui使用————Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库
    1)  npm i element-ui -s
    2）如果是完整引入
        main.js
            import ElementUI from 'element-ui';
            import 'element-ui/lib/theme-chalk/index.css';
            Vue.use(ElementUI);

    2) 如果是按需引入（babel-plugin-component插件帮我们完成转换的工作）
        a、安装babel-plugin-component： npm install babel-plugin-component
        b、将.babelrc修改为
        // 按需引入element-ui
        "plugins": [
            [
            "component",
            {
                "libraryName": "element-ui",   // 组件库的名字
                "styleLibraryName": "theme-chalk"   // 组件库样式所在的文件夹
            }
            ]
        ]
        c、element按需引入的时候修改了配置项babel.config.js，所以项目需要重新启动

        d、接下来如果只需要引入部分组件，比如Button,MessageBox，则main.js中写入：
        import {Button,MessageBox} from 'element-ui';
        Vue.component(Button.name, Button);   //1、注册为全局组件
        Vue.component(MessageBox.name, MessageBox);
        /* 或写为
        * Vue.use(Button)
        * Vue.use(MessageBox)
        */

        //2、Element注册组件的第二种方法：把组件挂在原型上进行注册
        Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;

        使用
        <el-row>
            <el-button>默认按钮</el-button>
            <el-button type="primary">主要按钮</el-button>
            <el-button type="success">成功按钮</el-button>
            <el-button type="info">信息按钮</el-button>
            <el-button type="warning">警告按钮</el-button>
            <el-button type="danger">危险按钮</el-button>
        </el-row>

    2) 二维码生成qrcode
        cnpm i qrcode --save
        
        在pay组件里面  import QRCode from "qrcode";

## 29 微信支付业务
    1）根据返回的支付信息payInfo的codeUrl来生成二维码，此时生成的二维码是一个地址链接
        let url = await QRCode.toDataURL(this.payInfo.codeUrl)
        生成的url是二维码图片（后台老师的收款码）的地址

        后台提供查询订单支付状态的接口——定时器发请求获取订单支付状态
         //需要知道定时器一直监听着支付的结果是成功还是失败
        if (!this.timer) {
            this.timer = setInterval( async () => {
            //发请求获取用户支付状态
            let result = await this.$API.reqPayStatus(this.orderId);
            //console.log(result)
            if (result.code == 200) {
                //200是支付成功，201是支付失败
                //清除定时器并保存支付成功返回的code
                clearInterval(this.timer);
                this.code = result.code;
                //关闭弹出框
                this.$msgbox.close();
                //跳转到支付成功的路由
                this.$router.push("/paysuccess");
            }
            }, 1000);
      }

## 30 个人中心二级路由搭建
## 31 用户未登录路由判断
    1）全局守卫
    else {
        //用户未登录，不能去交易相关(trade)、支付相关（pay、paysuccess）、不能去个人中心(center)；如果去的是（home、search、shopcart）则放行
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath) //以query参数把当前你想去的路由存在地址栏中，等登录后再跳转到你想去的toPath
        }else{
            next()
        }

    2）路由独享守卫——beforeEnter
        只有从购物车界面shopcart点击了"结算"按钮之后才能跳转到交易界面trade（创建订单）——路由独享守卫beforeEnter
        只有从交易界面才能跳转到支付界面——路由独享守卫beforeEnter
        只有从支付界面才能跳转到支付成功界面——组件内守卫

        {
            path: "/trade",
            component: Trade,
            meta: { show: true },
            //路由独享守卫
            beforeEnter:(to, from, next) =>{
                if(from.path == '/shopcart'){
                    next()  //放行
                }else{
                    next(false)  //中断当前的导航
                }
            }
        },

## 32 图片懒加载
        项目中vue实现图片懒加载
        npm i vue-lazyload@1.3.3
        入口文件main.js
        // 引入插件
        import VueLazyload from 'vue-lazyload'
        // json和图片是默认对外暴露的，所以可以直接引入
        import tylor from '@/assets/泰勒.gif'
        // 注册插件
        Vue.use(VueLazyload, {
        // 懒加载默认的图片
        loading: tylor
        })
        在search路由组件中将原本的<img :src="good.defaultImg" />改成
        <img v-lazy="good.defaultImg" />

## 33 路由懒加载
打包上线时，js包会非常大，影响页面加载
路由懒加载——把不同路由对应的组件分割成不同代码块，然后当路由被访问的时候才加载对应组件
形式：
const Foo = () => import('./Foo.vue) //定义了一个回调函数，被调用的时候才去引入那个组件
在路由配置中什么都不需要改变，只需要像往常一样使用Foo
const router = new VueRouter({
    router:[{path:'/foo',component:Foo}]
})
本来是
        import Home from '../pages/Home'
        {
            path: "/home",
            component: Home,
            meta: { show: true }
        },
可以简写为
        {
            path: "/home",
            component: ()=>import("../pages/Home"),
            meta: { show: true }
        },

## 34 项目打包上线
    1）打包——npm run build——生成dist文件夹
    项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错，
    dist文件夹的js文件夹里面会有map文件，有了map之后就可以像未加密的代码一样，准确的输出是哪一行哪一列有错
    如果项目打包后不需要map文件可以去除掉——在vue.config.js配置 productionSourceMap:false

    2)购买服务器
    a、阿里云：免费使用三个月 我的服务器2023.4.25开始试用：https://ecs.console.aliyun.com/server/region/cn-guangzhou?instanceId=i-7xv98vo1m0zzuhsumcji&__refreshToken=1682394607957
    b、腾讯云

    3）安全组与xshell操作
    安全组：让服务器的一些端口号对外开放 默认打开22、3389、-1
    利用xshell工具登陆服务器

    linux ： / 根目录
    linux常用指令： cd跳转 ls查看   mkdir：创建目录  pwd:查看绝对路径
    在购买的服务器上 =》  /root/ljx/shangpinhui/dist  放置了项目打包好的dist
    我的腾讯云： http://82.156.11.187/
    a）为什么访问购买的服务器IP地址就可以访问到本项目？
        答： 需要在服务器上部署dist文件地址:/root/project/dist
    b）为什么访问购买的服务器ip地址可以向 http://39.98.123.211:8510/ 请求到所有该电商项目的数据？
        答：通过nginx从数据服务器拿数据
        devServer:{
        proxy:{
        '/api':{  //请求前缀为api时才能去访问target
            target:' http://39.98.123.211:8510/', //你想要去的地方，也就是这个项目的请求的所有数据都来自于这台服务器
          }
        }
        }

    答案： 是nginx帮我们在我的云服务器 http://82.156.11.187/  和  http://39.98.123.211:8510/ 之间做了代理

    怎么配？
    服务器根目录root下的etc目录可以配置nginx
    1、xshell进入根目录/etc
    2、进入etc目录下的nginx目录
    3、来到nginx目录，如果想安装nginx： yum install nginx
    4、安装完nginx服务器之后，nginx目录下就会多出一个nginx.conf文件，接下来就在这个文件下配置
    5、输入vim nginx.conf命令开始编辑
        //这一段配置解决了a问题
        location /{
            root /root/project/dist;
            index index.html;
            try_files $uri/ /index.html;
        }

        //这一段配置解决了b问题
        location /api{
	        proxy_pass http://39.98.123.211:8510/;
        }
    6、启动nginx服务器：service nginx start
