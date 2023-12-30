import { reqgetCategoryList,reqgetBannerList,reqFloorList } from '@/api'  //引入向服务器发请求的方法（axios）

//home模块的小仓库
//state:仓库存储数据的地方
const state = {
    //state中数据的默认初始值别瞎写,服务器返回是什么类型就写什么类型
    categoryList:[],  //home仓库中存储三级菜单的数据
    bannerList:[],   //轮播图的数据
    floorList:[],  //floor组件的数据
}
//mutations:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
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
    //获取首页轮播图数据
    async getBannerList({commit}){
        let result = await reqgetBannerList()
        if(result.code === 200){
            commit('GETBANNERLIST',result.data)
        }
    },
    //获取floor数据
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code === 200){
            commit('GETFLOORLIST',result.data)
        }
    }
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
