<template>
  <div
    class="calendar"
    :style="`width:${state.width}px`"
  >
    <el-calendar>
      <template #dateCell="{data}">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
        </p>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import {httpRequest} from "@/api/http.js"
import API from "@/api/api-config.js";
export default {
  setup(){
    let state = reactive({
      width: window.innerWidth - 740,
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

<style lang="less" scoped>
  .calendar {
    width: 65%;
    display: inline-block;
    margin-top: 20px;
    .is-selected {
      color: #1989FA;
    }
    .el-calendar {
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
  }
</style>
