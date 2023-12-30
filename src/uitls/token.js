//对外暴露一个用于持久存储token的函数
export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}

//获取本地存储的token
export const getToken = ()=>{
    return localStorage.getItem("TOKEN")
}

//清除本地存储的token
export const removeToken = ()=>{
    localStorage.removeItem('TOKEN')
}
