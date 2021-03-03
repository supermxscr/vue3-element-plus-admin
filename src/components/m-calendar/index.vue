<template>
  <div
    class="calendar"
  >
    <el-calendar>
      <template
        #dateCell="{data}"
      >
        <div>
          <div
            class="calendar-day"
            @dblclick="setMemoFn(data.day)"
          >
            {{ data.day.split('-').slice(1).join('-') }}
          </div>
          <div
            v-for="(item, index) in state.userInfo.memo"
            :key="index"
            class="btn"
          >
            <el-tooltip
              v-if="data.day == item.date"
              class="item"
              :content="item.decs"
              placement="top"
            >
              <div @dblclick="setMemoFn(data.day)">
                {{ item.decs }}
              </div>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-calendar>
    <set-memo
      ref="memoDom"
    />
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import {httpRequest} from "@/api/http.js"
import API from "@/api/api-config.js"
import { ElMessage } from "element-plus"
import setMemo from "./set-memo"
import { useStore } from "vuex";

export default {
  components:{ setMemo },
  setup(){
    const store = useStore();
    let state = reactive({
      userInfo: {
        memo:[]
      },
      setDate: null
    })
    const memoDom = ref(null);
    async function getWeatherData(){
      state.weather = await httpRequest("GET", API.weather).then((res) => res)
      console.log(state.weather,state.weather7Day)
    }
    async function getUserInfo(){
      state.userInfo = await httpRequest("POST", API.user , {id:store.state.userInfo.id}).then( (res) => res.data)
      console.log(state.userInfo)
    }
    
    function setMemoFn(day) {
      ElMessage(day)
      memoDom.value.show(true,day);
    }
    onMounted(()=>{
      // getWeatherData()
      getUserInfo()
    })
    return {
      state, getWeatherData, setMemoFn, memoDom, getUserInfo
    }
  }
}
</script>

<style lang="less" scoped>
  .calendar {
    width: 98%;
    display: inline-block;
    margin-top: 20px;
    .is-selected {
      color: #1989FA;
    }
    .btn {
      margin-top: 5px;
      overflow: hidden;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;//控制行数
    }
    .item {
      margin: 4px;
    }
    .el-calendar {
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    }
  }
</style>
