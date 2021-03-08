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
@import './assets/css/layui-layer/layer.css';

// through 为0到5循环,改为to则为0到4循环
@for $i from 0 through 5 {
  .pd#{$i} {
    padding: $i * 10 + px !important;
  }
  .pb#{$i} {
    padding-bottom: $i * 10 + px !important ;
  }
  .pt#{$i} {
    padding-top: $i * 10 + px !important ;
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
  .ml#{$i} {
    margin-left: $i * 10 + px !important ;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px !important;
  }
}

.gray {
  color: #999;
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

.d-flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  &.flex-start {
    justify-content: flex-start;
  }
  &.flex-end {
    justify-content: flex-end;
  }
  &.flex-center {
    justify-content: center;
  }
}

.fly-badge-accept {
  background-color:  #1E9FFF;
}

.fly-list {
  border-color: #1E9FFF !important;
}

.btn-color {
  background-color: #1E9FFF;
}
.best-color {
  background-color: red;
}

.font-color {
  color:#c2c2c2 !important;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes bounceOut {
  0% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(0.7);
  }
}
</style>
