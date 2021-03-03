<template>
  <div class="template">
    <h3>用户权限列表---{{ a }}</h3>
    <m-table
      :table-data="state.tableData"
      :table-head="state.tableHead"
      :query="listQuery"
      @pagination="getList"
    />
    <addOrEdit ref="addOrEditDom" />
  </div>
</template>
<script>
import { httpRequest } from "@/api/http";
import MTable from "@/components/m-table/index.vue";
import tableHeadInfo from "./table";
import API from "@/api/api-config.js";
import { initSetting } from "@/utils/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import setting from "./setting";
import { reactive, onMounted, ref, inject, provide } from "vue";
import { useStore } from "vuex";
import addOrEdit from "./addOrEdit";

export default {
  components: {
    MTable,
    addOrEdit,
  },
  setup() {
    let store = useStore();
    let addOrEditDom = ref(null)
    onMounted(() => {
      getList();
      console.log("addOrEditDom  onMounted", addOrEditDom);
    });
    let listQuery = {
      page: 1,
      size: 10,
    };
    async function getList(data) {
      store.commit("save", { loading: true });
      listQuery = data;
      state.tableData = await httpRequest("GET", API.systemUser).then(
        (res) => res
      );
      store.commit("save", { loading: false })
    }

    function del() {
      ElMessageBox("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        ElMessage({
          type: "success",
          message: "删除成功!",
        });
      });
    }
    provide("tabList", ref("11111"));
    const a = inject("tabList");

    function addOrEditFc(isEdit, col) {
      console.log("addOrEditDom", addOrEditDom);
      addOrEditDom.value.show(true, isEdit, col);
    }
    const state = reactive({
      tableData: {},
      tableHead: initSetting(
        tableHeadInfo,
        setting((flag, col) => {
          // console.log(flag, col);
          if (flag == "edit") {
            addOrEditFc(true, col);
          } else if (flag == "del") {
            del();
          }
        })
      ),
    });
    return {
      state,
      listQuery,
      getList,
      addOrEditFc,
      addOrEditDom,
      a,
    };
  },
};
</script>
<style scoped lang="less"></style>
