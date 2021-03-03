<template>
  <div class="authority-dialog">
    <el-dialog
      :title="state.isEdit ? '编辑' : '新建'"
      v-model="state.isShow"
      width="500px"
    >
      <div>
        <el-form
          :model="state.subData"
          status-icon
          ref="box"
          label-width="80px"
          style="width:100%"
          :rules="state.rules"
        >
          <el-form-item
            label="页面名"
            :rules="state.rules.pageName"
            prop="pageName"
          >
            <el-input
              size="mini"
              style="width:100%"
              v-model="state.subData.pageName"
              placeholder="请输入页面名"
            />
          </el-form-item>
          <el-form-item
            :rules="state.rules.authority"
            prop="authority"
            label="权限名"
          >
            <el-input
              size="mini"
              v-model="state.subData.authority"
              placeholder="请输入权限名"
            />
          </el-form-item>
          <el-form-item label-width="0">
            <el-button
              @click="show(false)"
              size="mini"
            >
              取消~
            </el-button>
            <el-button
              type="primary"
              size="mini"
              @click="submitForm('subData')"
              :loading="state.loading"
            >
              保存~
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { httpRequest } from "@/api/http"
import API from "@/api/api-config.js"
export default {
  setup() {
    let state = reactive({
      isShow: false,
      loading: false,
      isEdit: false,
      subData: null,
      rules: {
        pageName: [
          {
            required: true,
            message: "请输入页面名",
            trigger: "blur",
          },
        ],
        authority: [
          {
            required: true,
            message: "请输入权限名",
            trigger: "blur",
          },
        ],
      },
    });
    function show(flag, isEdit, colData) {
      state.isShow = flag;
      state.isEdit = isEdit;
      state.subData = colData ? colData : {
        pageName:null,
        authority:null
      }
    }
    let box = ref(null)
    function submitForm() {
      box.value.validate((valid) => {
        if (valid) {
          save()
        } else {
          return false;
        }
      })
    }
    function save(){
      httpRequest("POST", API.select).then((res) => {
        if( res && res.code == 0){
          ElMessage({
            type: "success",
            message: "保存成功!",
          })
          show(false)
        }
      })
    }
    return {
      state,
      show,
      submitForm,
      box
    };
  },
};
</script>

<style lang="less">
.authority-dialog {
  .el-form-item__content {
    text-align: center;
  }
}
</style>
