<template>
  <div class="memo-dialog">
    <el-dialog
      title="记录一下备忘录吧~"
      v-model="state.isShow"
    >
      <div>
        <p class="date">
          时间： {{ state.date }}
        </p>
        <el-input
          v-model="state.decs"
          type="textarea"
          :autosize="{ minRows: 4}"
          placeholder="请输入内容吧~"
        />
      </div>
      <template #footer>
        <span>
          <el-button
            @click="show(false)"
            size="mini"
          >再考虑一下~</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="saveAvatar"
            :loading="state.loading"
          >保存~</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from "element-plus";
import { httpRequest } from "@/api/http"
import API from "@/api/api-config.js"
export default {
  setup(props,context){
    let store = useStore()
    let state = reactive({
      isShow: false,
      loading: false,
      date: '',
      decs: ''
    })
    function show(flag,date){
      state.date = date
      state.isShow = flag
    }
    function saveAvatar(){
      state.loading = true
      if(store.state.userInfo.memo){
        store.state.userInfo.memo.forEach(v => {
          if(v.date == state.date){
            v.decs = state.decs
          }else {
            store.state.userInfo.memo.push({
              "date": state.date,
              "decs": state.decs
            })
          }
        })
      }else {
        store.state.userInfo.memo = []
        store.state.userInfo.memo.push({
          "date": state.date,
          "decs": state.decs
        })
      }
      httpRequest("PUT", API.user, {
        id: store.state.userInfo.id,
        memo: store.state.userInfo.memo
      } ).then((res) => {
        state.loading = false
        if(res.code == 0){
          ElMessage.success(res.message)
          context.emit('choose',state.chooseIndex)
          show(false)
        }else {
          ElMessage.error(res.message)
        }
      })
    }
    watch(state,(val)=>{
      if(!val.isShow){
        state.date = ''
        state.decs = ''
        state.loading = false
      }
    })

    return {
      state, show, saveAvatar,
    }
  }
}
</script>

<style lang="less">
.memo-dialog {
  .date {
    margin-top: 0;
    font-size: 15px;
    font-weight: bold;
    color: #000;
  }
  .el-dialog__footer {
    text-align: center !important;
  }
}
  
</style>
