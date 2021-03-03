<template>
  <div class="member-center">
    <el-row>
      <el-col :span="16">
        <div
          class="top"
        >
          <img
            class="avatar"
            :src="require(`@/static/images/avatar/${state.avatar}.png`)"
            fit="cover"
          >
          <span
            class="set set-avatar"
            @click="setAvatarFn"
          >设置头像</span>
          <span
            class="set set-info"
            @click="setAvatarFn"
          >完善信息</span>
          <h3 class="username">
            {{ state.seyHi }}
            {{ state.username }}
          </h3>
        </div>
      </el-col>
      <el-col :span="8">
        <m-clock />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <m-calendar />
      </el-col>
      <el-col :span="8">
        <m-weather />
      </el-col>
    </el-row>
    <set-avatar
      ref="avatarDom"
      @choose="chooseAvatar"
    />
  </div>
</template>

<script>
import { useStore } from "vuex";
import setAvatar from "@/components/set-avatar/index.vue";
import { reactive, ref } from "vue";
import { setSeyHi } from "@/utils/index.js";
import mWeather from "@/components/m-weather/index.vue"
import mCalendar from "@/components/m-calendar/index.vue"
import mClock from "@/components/m-clock/index.vue"

export default {
  name: "MemberCenter",
  components: {
    setAvatar, mWeather, mCalendar, mClock
  },
  setup() {
    const store = useStore();
    store.commit("save", { loading: false });
    let state = reactive({
      avatar: store.state.userInfo.avatar,
      username: store.state.userInfo.username,
      seyHi: setSeyHi(),
      // height: window.innerHeight - 220,
      width: window.innerWidth - 740,
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
  padding-top: 60px;
  position: relative;
  .top {
    height: 120px;
    width: 98%;
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
    .set {
      position: absolute;
      left: 54px;
      font-size: 12px;
      color: #999;
      cursor: pointer;
    }
    .set-avatar {
      top: 55px;
    }
    .set-info {
      top: 76px;
    }
    .set-avatar:hover {
      color: #409eff;
    }
    .set-info:hover {
      color: #409eff;
    }
  }
}
</style>
