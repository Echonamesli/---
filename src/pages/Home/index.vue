<template>
  <div>
    <!-- 三级联动全局组件：由于三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- 父Home给子Floor传数据 通过props实现父子组件通信 -->
    <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
//引入其余的组件
import ListContainer from '@/pages/Home/ListContainer';
import Recommend from '@/pages/Home/Recommend';
import Rank from '@/pages/Home/Rank';
import Like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import {mapState} from 'vuex'
export default {
  name:'',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted(){
    //在home的mounted中派发action，获取floor组件的数据
    this.$store.dispatch('getFloorList')
    //获取用户信息在首页展示
    //this.$store.dispatch('getUserInfo')
  },
  computed:{
    ...mapState({
      floorList:state => state.home.floorList   //捞取floor（家用电器）数据
    })
  }
}
</script>

<style>

</style>