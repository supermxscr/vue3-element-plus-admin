<template>
  <div class="about">
    <p>http ===> ok</p>
    <p>表单验证 rlues  ===>ok</p>
    <p>table 组件  ====>ok </p>
    <p>表单 组件  ====> ok</p>
    <p>菜单 权限</p>
    <p>权限 管理</p>
    <p>图片上传组件 单个 多个 ===> ok</p>
    <p>富文本 ====>ok</p>
    <p>echarts  ====>ok</p>
    <p>天气组件s  ====>ok</p>
    <p>日历组件</p>
    <p>个人中心组件显隐配置项</p>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name:"About",
  setup(){
    const store = useStore()
    store.commit('save',{loading:false})
  }
}
</script>
