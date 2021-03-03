import { h } from "vue";
const tableInit = [
  {
    prop: "id",
    label: "ID",
    width: 80,
  },
  {
    label: "页面名",
    prop: "pageName"
  },
  {
    label: "权限名",
    prop: "authority"
  },
  {
    label: "创建时间",
    component: (col) => {
      return {
        render: () => {
          return h("div", {},  {default: () =>col.create_time})
        }
      }
    }
  },{
    label: "更新时间",
    component: (col) => {
      return {
        render: () => {
          return h("div", {},  {default: () =>col.update_time})
        }
      }
    }
  },
]
export default tableInit