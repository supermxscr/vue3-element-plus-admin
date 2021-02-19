<template>
  <div class="clock-container">
    <item
      :total="2"
      :current="timeArr[0]"
    />
    <item
      :total="9"
      :current="timeArr[1]"
    />
    <div class="colon" />
    <item
      :total="5"
      :current="timeArr[2]"
    />
    <item
      :total="9"
      :current="timeArr[3]"
    />
    <div class="colon" />
    <item
      :total="5"
      :current="timeArr[4]"
    />
    <item
      :total="9"
      :current="timeArr[5]"
    />
  </div>
</template>

<script>
import item from './item.vue'
import { getTimeArr } from '@/utils/index.js'

export default {
  components: {
    item
  },
  data() {
    return {
      timeArr: getTimeArr()
    }
  },
  mounted() {
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  },
  methods: {
    startTimer() {
      this.stopTimer()
      this.timer = setTimeout(() => {
        this.timeArr = getTimeArr()
        this.startTimer()
      }, 1000)
    },
    stopTimer() {
      clearTimeout(this.timer)
    }
  }
}
</script>

<style lang='less' scoped>
.clock-container {
  display: flex;
  align-items: center;
}
.colon {
  height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  &::after,
  &::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
  }
}
</style>
