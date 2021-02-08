<template>
  <div class="form">
    <el-form
      :model="state.ruleForm"
      status-icon
      ref="box"
      label-width="100px"
      class="demo-ruleForm"
      style="width:50%"
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
          :rest="state.restFlag"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="mini"
          @click="submitForm('ruleForm')"
        >
          提交
        </el-button>
        <el-button
          @click="resetForm('ruleForm')"
          size="mini"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MForm from "@/components/m-form/index.vue";
import { formInit, ruleForm, formCopy } from "./form";
import { httpRequest } from "@/api/http";
import API from "@/api/api-config.js";
import { rules } from "./rules";
import { useStore } from "vuex";
import { reactive, ref } from "vue";
export default {
  components: { MForm },
  setup() {
    let store = useStore();
    store.commit("save", { loading: false });
    let state = reactive({
      formInit: formInit,
      ruleForm: ruleForm,
      rules: rules,
      restFlag: false,
    });
    function setSelectData() {
      httpRequest("GET", API.select).then((res) => {
        state.formInit.forEach((v) => {
          if (v.view.bindKey == "select") {
            v.view.dataArr = res;
          }
        });
      });
    }
    setSelectData();
    function handleChange(data) {
      state.ruleForm[data.key] = data.value;
    }
    let box = ref(null);
    function submitForm() {
      box.value.validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    }
    function resetForm() {
      state.ruleForm = formCopy;
      state.restFlag = true;
    }
    return {
      state,
      handleChange,
      submitForm,
      resetForm,
      box,
    };
  },
};
</script>

<style lang="less" scope>
.form {
  background: #fff;
  padding: 30px 0;
}
</style>
