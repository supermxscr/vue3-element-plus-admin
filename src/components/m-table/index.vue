<template>
  <div class="m-table">
    <el-card class="box-card">
      <el-table
        :data="tableData.data"
        stripe
        :height="state.height"
        :max-height="state.height"
        empty-text="暂无数据"
        size="mini"
        fit
      >
        <el-table-column
          align="center"
          v-for="item in tableHead"
          :key="item.id"
          v-bind="item"
        >
          <template #default="scope">
            <span v-if="!item.component">{{ scope.row[item.prop] }}</span>
            <component
              v-if="item.component"
              :is="item.component(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-if="tableData.total > 0"
        :total="tableData.total"
        :page="query.page"
        :limit="query.size"
        @pagination="pagination"
      />
    </el-card>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  props:{
    tableData:{
      type:Object,
      default: ()=>{
        return {
        }
      }
    },
    query:{
      type:Object,
      default: ()=>{
        return {
          page: 1,
          size: 10,
        }
      }
    },
    tableHead:{
      type:Array,
      default: ()=>[]
    },
  },
  setup(props,context){
    let state = reactive({
      height: window.innerHeight - 300
    })
    function pagination(data){
      context.emit('pagination',data)
    }
    return {
      pagination, state
    }
  }
}
</script>
<style scoped lang="less">
.m-table  {
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .is-scrolling-none .el-table__body-wrapper {
    overflow: scroll !important;
  }
}
</style>