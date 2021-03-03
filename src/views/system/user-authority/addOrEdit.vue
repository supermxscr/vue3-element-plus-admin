<template>
  <div class="user-authority-dialog">
    <el-dialog
      :title="state.isEdit ? '编辑' : '新建'"
      v-model="state.isShow"
      width="600px"
    >
      <div>
        <el-form
          :model="state.ruleForm"
          status-icon
          ref="box"
          label-width="80px"
          style="width:100%"
          :rules="state.rules"
        >
          <el-form-item
            v-for="item in state.formInit"
            :key="item"
            v-bind="item"
            :rules="item.rules"
          >
            <M-Form
              @handleChange="handleChange"
              :item-props="item.view"
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
              @click="submitForm('ruleForm')"
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
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { httpRequest } from "@/api/http"
import API from "@/api/api-config.js"
import MForm from "@/components/m-form/index.vue";
import { formInit,ruleForm } from "./form";
import { rules } from "./rules";
import _ from "lodash"
import { toJSON, getRouterAccess } from "@/utils/index.js"

export default {
  components: { MForm },
  setup() {
    let state = reactive({
      isShow: false,
      loading: false,
      isEdit: false,
      formInit: formInit,
      ruleForm: ruleForm,
      rules: rules,
      authorityList: []
    });
    function show(flag, isEdit, colData) {
      state.formInit = formInit
      state.isShow = flag
      state.isEdit = isEdit
      state.ruleForm = _.cloneDeep(colData)
      state.ruleForm.authority = '[["member-center"],["template-form","add"]]'
      setAuthorityInfo(colData)
    }
    function setAuthorityInfo(){
      state.formInit.forEach((v) => {
        if(v.view.bindKey == 'authority') {
          v.view.options = []
          v.view.options = getRouterAccess()
          v.view.defaultValue = toJSON(state.ruleForm[v.view.bindKey],'arr')
        }else {
          v.view.defaultValue = state.ruleForm[v.view.bindKey]
        }
      })
      console.log(state.formInit)
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
      console.log('save--->ruleForm',state.ruleForm)
      state.ruleForm.authority = toJSON(state.ruleForm.authority,'str')
      httpRequest("POST", API.select).then((res) => {
        if( res && res.code == 0){
          ElMessage({
            type: "success",
            message: "保存成功!",
          })
          // show(false)
        }
      })
    }
    function handleChange(data) {
      console.log('data',data)
      state.ruleForm[data.key] = data.value;
    }
    onMounted(()=>{
    })
    
    return {
      state,
      show,
      submitForm,
      box,
      handleChange
    };
  },
};
</script>

<style lang="less">
.user-authority-dialog {
  .el-form-item__content {
    text-align: center;
  }
}
</style>
