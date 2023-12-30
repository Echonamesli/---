import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken,removeToken } from '@/uitls/token'
//登录与注册的模块
const state = {
    code: '',
    // 刚开始本地没有token，所以为null，登录后会把token存到本地，且不管刷新几次token都是从本地获取
    token: getToken(),
    userInfo: {},
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //用于清除本地的数据（userInfo，token）
    CLEAR(state) {
        //把仓库中的数据清空
        state.token = ''
        state.userInfo = {}
        //把本地存储的数据清空
        removeToken()
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        //获取验证码的接口，按道理是把验证码发到用户手机上，但此处为了省钱就把验证码数据返回
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        //console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        //服务器下发的token，是用户的唯一标识符
        //将来经常通过携带token找服务器要用户信息进行展示
        //注意：vuex是仓库存储数据，不是持久化，一刷新就没了
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            //提交用户信息
            commit("GETUSERINFO", result.data)
            return 'ok'
        }
    },
    //退出登录
    async userLogout({ commit }) {
        //通知服务器要本地清除token
        let result = await reqLogout()
        if (result.code == 200) {
            //注意：action里面一定不能操作state，必须通过提交mutaion去修改state
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}