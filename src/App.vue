<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
// import Login from '@/views/Login.vue'
export default {
  name: 'app',
  components: {
    Header,
    Footer
    // Login
  }
}
</script>

<style lang="scss" scoped>
@import "assets/layui/css/layui.css";
@import "assets/css/global.css";
@import "assets/layui/css/modules/layer/default/layer.css";
</style>
