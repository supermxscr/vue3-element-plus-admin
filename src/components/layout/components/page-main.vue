<template>
  <div class="page-main">
    <router-view v-slot="{ Component }">
      <!-- <keep-alive include="home"> -->
        <transition
          name="fade-transform"
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      <!-- </keep-alive> -->
    </router-view>
    <div
      class="loading-box"
      v-if="loading"
    >
      <div class="loading">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, computed} from 'vue'
import { useStore } from "vuex";
export default {
  name: "PageMain",
  setup(){
    const { ctx } = getCurrentInstance();
    let Component = ctx.$root.$route.path
    const store = useStore()
    let loading = computed(()=>{
      return store.state.loading
    })
    return {
      Component,
      loading
    }
  }
};
</script>

<style lang="less">
.page-main {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #f1f1f1;
  .loading-box {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.5);
    position: fixed;
    top: 100px;
    left: 0;
    .loading {
      width: 80px;
      height: 40px;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 30%;
      left: 50%;
    }
    .loading span {
      display: inline-block;
      width: 8px;
      height: 100%;
      border-radius: 4px;
      background: lightgreen;
      -webkit-animation: load 1s ease infinite;
      margin: 0 3px;
    }
    @-webkit-keyframes load {
      0%,
      100% {
        height: 40px;
        background: lightgreen;
      }
      50% {
        height: 70px;
        margin: -15px 0;
        background: lightblue;
      }
    }
    .loading span:nth-child(2) {
      -webkit-animation-delay: 0.2s;
    }
    .loading span:nth-child(3) {
      -webkit-animation-delay: 0.4s;
    }
    .loading span:nth-child(4) {
      -webkit-animation-delay: 0.6s;
    }
    .loading span:nth-child(5) {
      -webkit-animation-delay: 0.8s;
    }
  }
}
</style>
