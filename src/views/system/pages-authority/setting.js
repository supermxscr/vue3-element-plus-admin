import { h, resolveComponent } from "vue";
// import { ElMessage, ElMessageBox } from "element-plus";
const setting = (cb=() => {}) =>  ({
  label: "操作",
  width: 120,
  component: (col) => {
    return {
      render: () => {
        const btn = resolveComponent("el-button")
        const btns = [
          h(
            btn,
            {
              type: "text",
              size: "mini",
              onClick: () => {
                cb('edit',col)
              }
            },
            { default: () => "编辑" }
          ),
          h(
            btn,
            {
              type: "text",
              size: "mini",
              style: {
                "margin-left": "10px",
                color: "#F56C6C"
              },
              onClick: () => {
                cb('del',col)
              }
            },
            { default: () => "删除" }
          )
        ]
        return h("div", {}, { default: () => btns })
      }
    }
  }
})

export default setting
