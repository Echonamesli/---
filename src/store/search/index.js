//search模块的小仓库
import { reqGetSearchInfo } from "@/api"
const state = {
    //仓库初始状态
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    //获取search模块数据
    async getSearchList({ commit }, params = {}) {
        //当前这个reqGetSearchInfo函数在调用服务器数据的时候，至少需要传递一个参数（空对象）
        //params:形参。是用户派发action的时候传递过来的第二个形参，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const getters = {
    //形参state：当前仓库中的state，并非大仓库的state
    goodsList(state){
        //防止没网的时候state.searchList返回的是空对象
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
}

//对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}
