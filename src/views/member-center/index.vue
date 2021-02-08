<template>
  <div class="member-center">
    <div class="top">
      <!-- :style="`width:${state.width}px`" -->
      <!-- height:${state.height}px; -->
      <img
        class="avatar"
        :src="require(`@/static/images/avatar/${state.avatar}.png`)"
        fit="cover"
      >
      <span
        class="set-avatar"
        @click="setAvatarFn"
      >设置头像</span>
      <h3 class="username">
        {{ state.seyHi }}
        {{ state.username }}
      </h3>
    </div>
    <set-avatar
      ref="avatarDom"
      @choose="chooseAvatar"
    />
    <weather class="wearth" />
  </div>
</template>

<script>
import { useStore } from "vuex";
import setAvatar from "@/components/set-avatar/index.vue";
import { reactive, ref } from "vue";
import { setSeyHi } from "@/utils/index.js";
import weather from "@/components/weather/index.vue"

export default {
  name: "MemberCenter",
  components: {
    setAvatar, weather
  },
  setup() {
    const store = useStore();
    store.commit("save", { loading: false });
    let state = reactive({
      avatar: store.state.avatar,
      username: store.state.username,
      seyHi: setSeyHi(),
      // height: window.innerHeight - 220,
      width: window.innerWidth - 1200,
    })
    const avatarDom = ref(null);
    function setAvatarFn() {
      avatarDom.value.show(true);
    }
    function chooseAvatar(data) {
      state.avatar = data;
    }
    return {
      state,
      setAvatarFn,
      avatarDom,
      chooseAvatar
    };
  },
};
</script>

<style lang="less" scoped>
.member-center {
  padding-top: 80px;
  position: relative;
  .top {
    height: 120px;
    width: 65%;
    background: #fff;
    position: relative;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: inline-block;
    .username {
      position: absolute;
      left: 170px;
    }
    .avatar {
      background: #fff;
      width: 80px;
      border-radius: 50%;
      position: absolute;
      left: 40px;
      top: -40px;
      box-shadow: 0 0 0 5px #fff;
    }
    .set-avatar {
      position: absolute;
      left: 54px;
      top: 55px;
      font-size: 12px;
      color: #999;
      cursor: pointer;
    }
    .set-avatar:hover {
      color: #409eff;
    }
  }
  .wearth {
    position: absolute;
    right: 20px;
    // top: 80px;
    top: 0;
  }
}
</style>
