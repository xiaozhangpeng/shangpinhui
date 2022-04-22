<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
  // 优化TypeNav的网络请求，只请求一次
  mounted(){
   // 通知vuex发送请求，获取数据，存储与home仓库当中
    // 派发action
    this.$store.dispatch("categoryList");

  
  }
};
</script>

<style>
  

</style>
