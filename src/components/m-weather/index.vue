<template>
  <div class="weather">
    <p class="city">
      {{ state.weather.city }} {{ state.weather.country }} 
      <span class="date">{{ state.weather.date }}</span>
    </p>
    <div class="top">
      <img
        src="@/static/images/weather/hot.png"
        class="temperature"
        v-if="state.weather.tem > 19"
      >
      <img
        src="@/static/images/weather/cold.png"
        class="temperature"
        v-if="state.weather.tem < 20"
      >
      <span class="now-tem">{{ state.weather.tem }}℃</span>
   
      <span class="wea">{{ state.weather.wea }} {{ state.weather.tem2 }}℃ ~ {{ state.weather.tem1 }}℃</span>
      <img
        :src="require(`@/static/images/weather/${state.weather.wea_img}.png`)"
        class="temperature"
        v-if="state.weather.tem < 20"
      >
    </div>
    <div class="btm">
      <div class="info">
        <img
          src="@/static/images/weather/shidu.png"
          class="info-icon"
        >
        <span class="label">相对湿度 {{ state.weather.humidity }}</span>
      </div>
      <div class="info">
        <img
          src="@/static/images/weather/fengxiang.png"
          class="info-icon"
        >
        <span class="label">风向 {{ state.weather.win }} {{ state.weather.win_speed }}</span>
      </div>
      <div class="info">
        <img
          src="@/static/images/weather/shachen.png"
          class="info-icon"
        >
        <span class="label">风速 {{ state.weather.win_meter }}</span>
      </div>
      <div class="info">
        <img
          src="@/static/images/weather/nengjiandu.png"
          class="info-icon"
        >
        <span class="label">能见度 {{ state.weather.visibility }}</span>
      </div>
      <div class="info">
        <img
          src="@/static/images/weather/daqiya.png"
          class="info-icon"
        >
        <span class="label">气压 {{ state.weather.pressure }}hPa</span>
      </div>
      <div class="info">
        <img
          src="@/static/images/weather/dengji.png"
          class="info-icon"
        >
        <span class="label">空气等级 {{ state.weather.air_level }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import {httpRequest} from "@/api/http.js"
import API from "@/api/api-config.js";
export default {
  setup(){
    let state = reactive({
      weather:{},
      weather7Day:{}
    })
    async function getWeatherData(){
      // if(!state.weather){
        state.weather = await httpRequest("GET", API.weather).then((res) => res)
      // }
      // state.weather7Day = await httpRequest("GET", API.weather7Day).then((res) => res)
      console.log(state.weather,state.weather7Day)
    }
    
    onMounted(async ()=>{
      // getWeatherData()
    })
    return {
      state, getWeatherData
    }
  }
}
</script>

<style lang="less">
  .weather {
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 20px;
    width: 400px;
    display: inline-block;
    margin-top: 20px;
    .top {
      margin: 0 auto;
      width: 333px;
      position: relative;
    }
    .city {
      margin-top: 0;
      .date {
        float: right;
      }
    }
    .info {
      width: 46%;
      display: inline-block;
      margin-top: 10px;
      margin-left: 15px;
    }
    .now-tem {
      font-size: 60px;
      vertical-align: 18%;
      font-weight: bold;
      margin: 0 30px;
    }
    .wea {
      font-size: 20px;
      position: absolute;
      left: 50%;
      transform: translate(-81%,0);
    }
    .info-icon {
      width: 25px;
      vertical-align: middle;
    }
    .label {
      text-align: left;
      margin-left: 15px;
      vertical-align: middle;
    }
    .btm {
      padding-left: 11px;
    }
  }
</style>
