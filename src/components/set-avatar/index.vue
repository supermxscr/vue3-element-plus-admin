<template>
  <div class="avatar-dialog">
    <el-dialog
      title="选一个喜欢的吧~"
      v-model="state.isShow"
    >
      <div>
        <img
          v-for="(item,index) in state.avatarList"
          :key="item"
          :class="state.chooseIndex == index? 'avatar-item active' : 'avatar-item'"
          :src="require(`@/static/images/avatar/${index}.png`)"
          fit="cover"
          @click="chooseAvatar(index)"
        >
      </div>
      <template #footer>
        <span>
          <el-button
            @click="show(false)"
            size="mini"
          >在考虑一下~</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="saveAvatar"
          >嗯！就是它了~</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from "element-plus";
export default {
  setup(props,context){
    let store = useStore()
    let state = reactive({
      isShow: false,
      avatarList:[],
      chooseIndex: store.state.avatar
    })
    function show(flag){
      state.isShow = flag
    }
    function saveAvatar(){
      store.commit('user/save',{
        avatar: state.chooseIndex
      })
      ElMessage.success('修改成功~')
      context.emit('choose',state.chooseIndex)
      localStorage.setItem('avatar',state.chooseIndex)
      show(false)
    }
    function setAvatarList(){
      for( let i = 0; i < 31; i++ ){
        state.avatarList.push(i)
      }
    }
    setAvatarList()
    function chooseAvatar(index) {
      state.chooseIndex = index
    }
    watch(state,(val)=>{
      if (!val.isShow){
        state.chooseIndex = store.state.avatar
      }
    })
    return {
      state, show, saveAvatar, setAvatarList, chooseAvatar
    }
  }
}
</script>

<style lang="less">
.avatar-dialog {
  .avatar-item {
    width: 50px;
    border-radius: 50%;
    margin: 10px;
    box-shadow: 2px 2px 4px 1px #ccc;
  }
  .avatar-item:hover {
    transform: scale(1.3)
  }
  .active {
    box-shadow:  0px 0px 5px 4px #f00;
  }
  .el-dialog__footer {
    text-align: center !important;
  }
}
  
</style>
