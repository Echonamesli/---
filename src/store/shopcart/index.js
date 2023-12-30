import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api";
const state = {
    cartList:[]
}
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code == 200){
            commit("GETCARTLIST",result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new ErrorEvent('faile'))
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全选选中的产品(采取一次删一个的策略)
    deleteAllCheckedCart({dispatch,getters}){
        //context:相当于this，是一个小仓库，里面有1、commit（提交mutations修改state）
        //2、getters（计算数学），3、dispatch（派发action），4、state（当前仓库数据）
        //获取购物车中全部的产品cartInfoList（是一个数组）
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1 ? dispatch('deleteCartListBySkuId',item.skuId):''
            //将每一次返回的Promise添加到数组中
            PromiseAll.push(promise)
        })
        //Promise.all([p1,p2,p3])方法--p1、p2、p3只要全部成功则成功，有一个失败则返回失败
        return Promise.all(PromiseAll)
    },
    //通过全选框选中与否修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked){
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise = dispatch("updateCheckedById",{
                skuId:item.skuId,
                isChecked
            })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}
