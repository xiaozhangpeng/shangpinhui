<template>
  <div class="home">
    <!-- 商品分类导航 -->
   <TypeNav></TypeNav>
   <ListContainer></ListContainer>
   <Recommend></Recommend>
   <Rank></Rank>
   <Like></Like>
   <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
   <!-- <Floor></Floor> -->
   <Brand></Brand>

  </div>

</template>


<script>


import ListContainer from "@/pages/Home/ListContainer"
import Recommend from "@/pages/Home/Recommend"
import Rank from "@/pages/Home/Rank"
import Like from "@/pages/Home/Like"
import Floor from "@/pages/Home/Floor"
import Brand from "@/pages/Home/Brand"
// 引入mapSate
import {mapState} from "vuex"
  export default {
    name: "Home",
    components: {

      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted(){
      // 派发action。获取floor组件的数据
      this.$store.dispatch("getFloorList");
        // 获取用户信息在首页展示（在导航行守卫中派发）
      this.$store.dispatch("getUserInfo");
    },
    computed:{
      ...mapState({
        floorList:state=>state.home.floorList
      })
    }
  }
</script>

<style scoped>

</style>

