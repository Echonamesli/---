const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //不要打包生成的dist文件夹的js的map文件
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false,
  //只要前台项目的请求路径中带有/api，此代理服务器会找真实的服务器要数据，并返回前端进行展示
  //代理跨域
  devServer:{
    proxy:{
      '/api':{  //请求前缀为api时才能去访问target
        target:'http://39.98.123.211:8510/',    //你想要去的地方，也就是这个项目的请求的所有数据都来自于这台服务器
      }
    }
  }
})
