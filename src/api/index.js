//当前这个模块作用：对所有API进行统一管理
import requests from "./ajax";
import mockRequests from './mockAjax'

//三级联动接口   /api/product/getBaseCategoryList  get请求  无参数
//封装接口请求函数，然后暴露出去，方便直接传参使用
export const reqgetCategoryList = ()=>{
    //发请求：axios发请求返回的结果是一个Promise对象
    return requests({url:'/product/getBaseCategoryList',method:'get',})
}
//切记当前函数执行需要把服务器返回结果返回

//获取banner数据（首页轮播图接口）
export const reqgetBannerList = ()=> mockRequests.get('/banner')

//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')

//获取搜索模块的数据 地址：/api/list  方式：post 参数：8个
//当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params)=> requests({url:'/list',method:'post',data:params})


//获取产品详情信息的接口：URL：/api/item/{ skuId }  请求方式：get
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车中（获取更新某一个产品的个数）
export const redAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})

//获取购物车列表数据接口
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})

//删除购物车产品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//切换商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})

//登录
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})

//获取用户信息（需要在首页的请求头里带着用户的token向服务器要用户信息）
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取订单交易页信息
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单的接口
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取支付信息
export const reqPayInfo = (orderId)=>({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//获取订单支付状态
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取个人中心的数据
export const reqMyorderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})