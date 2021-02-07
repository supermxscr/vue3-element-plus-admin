<template>
  <div class="template">
    <h3>列表</h3>
    <m-table
      :table-data="state.tableData"
      :table-head="state.tableHead"
      :query="listQuery"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { httpRequest } from "@/api/http";
import MTable from "@/components/m-table/index.vue";
import tableHeadInfo from "./table";
import API from "@/api/api-config.js";
import { initSetting } from "@/utils/index.js";
// import { ElMessage, ElMessageBox } from "element-plus";
import setting from './setting'
import {  reactive, onMounted } from 'vue';
import { useStore } from "vuex";
export default {
  components: {
    MTable,
  },
  setup() {
    let store = useStore()
    const state = reactive({
      tableData: {},
      tableHead: initSetting(tableHeadInfo, setting)
    })
    let listQuery = {
      page: 1,
      size: 10
    }
    async function getList (data){
      store.commit("save", { loading: true })
      listQuery = data
      state.tableData =  await httpRequest("GET", API.list).then((res) => res)
      store.commit("save", { loading: false })
    }
    onMounted(() => {
      getList()
    })
    return {
      state, listQuery, getList
    }
  }
}

</script>
<style scoped lang="less">

</style>
