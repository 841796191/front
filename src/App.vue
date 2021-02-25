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

<style lang="scss">
@import "assets/css/global.css";

// through 为0到5循环,改为to则为0到4循环
@for $i from 0 through 5 {
  .pd#{$i} {
    padding: $i * 10 + px !important;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px !important;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px !important;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px !important;
  }
}

.orange {
  color: #ff5722;
}
.pull-right {
  float: right !important;
}

.pd20 {
  padding: 20px;
}
.mt20{
  margin-top: -20px;
}
.pl0 {
  padding-left: 0;
}
.pr0 {
  padding-right: 0;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
</style>
