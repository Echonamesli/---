//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';

//使用插件
Vue.use(VueRouter);
//引入store
import store from '@/store'
//引入一级路由组件
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
//配置路由,对外暴露VueRouter类的实例
let router = new VueRouter({
    //配置路由 注意路由的数组名是routes
    routes: [
        {
            path: "/home",
            component: ()=>import("../pages/Home"),
            meta: { show: true }
        },
        {
            path: "/detail/:skuid", //当点击商品图片的时候，需要带上产品的ID给详情页面
            component: Detail,
            //路由元信息key不能瞎写：只能叫做meta
            meta: { show: true }  //用来控制是否显示组件footer
        },
        {
            path: "/addcartsuccess",
            name: "addcartsuccess",
            component: AddCartSuccess,
            meta: { show: true }
        },
        {
            path: "/shopcart",
            component: ShopCart,
            meta: { show: true }
        },
        {
            path: "/trade",
            component: Trade,
            meta: { show: true },
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                if (from.path == '/shopcart') {
                    next()  //放行
                } else {
                    next(false)  //中断当前的导航
                }
            }
        },
        {
            path: "/pay",
            component: Pay,
            meta: { show: true },
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next()  //放行
                } else {
                    next(false)  //中断当前的导航
                }
            }
        },
        {
            path: "/paysuccess",
            component: PaySuccess,
            meta: { show: true }
        },
        {
            path: "/center",
            component: Center,
            meta: { show: true },
            //二级路由组件
            children: [
                {
                    path: 'myorder',
                    component: MyOrder
                },
                {
                    path: 'grouporder',
                    component: GroupOrder
                },
                {
                    path: '/center',
                    redirect: '/center/myorder'  //子路由的重定向
                }
            ]
        },
        {
            path: "/search/:keyword?",  //params传递参数需要提前占位,加?代表此params参数可传可不传
            component: Search,
            meta: { show: true },
            name: "search",
            //路由组件能不能传递props数据？
            //第一种：布尔值写法:只有params参数能用
            //props:true,
            //第二种：对象写法：额外的给路由组件传递props数据
            //props:{a:1,b:2}
            //第三种：函数写法：可以把params参数、query参数通过props传递给路由组件
            /* props:($route)=>{
                return {keyword:$route.params.keyword,k:$route.query.k}
            } */
        },
        {
            path: "/login",
            component: Login,
            meta: { show: false }
        },
        {
            path: "/register",
            component: Register,
            meta: { show: false }
        },
        //重定向，在项目跑起来的时候，访问/，立马让它定向到首页
        {
            path: '*',
            redirect: "/home"
        }
    ],
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //对于所有路由导航，让页面滚动到顶部
        //返回的y=0代表滚动条在最上方
        return { y: 0 }
    }
})


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
        if (to.path == '/login' || to.path == '/register') {
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
        //用户未登录，不能去交易相关(trade)、支付相关（pay、paysuccess）、不能去个人中心(center)；如果去的是（home、search、shopcart）则放行
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath) //以query参数把当前你想去的路由存在地址栏中，等登录后再跳转到你想去的toPath
        } else {
            next()
        }
    }
})
export default router