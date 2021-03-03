import {
  h,
  resolveComponent
} from "vue";
import {
  ElMessageBox
} from 'element-plus';
const tableInit = [{
    prop: "id",
    label: "ID",
    width: 80,
  },
  {
    label: "用户名",
    prop: "username"
  },
  {
    label: "登录账号",
    prop: "account"
  },
  {
    label: "登录密码",
    prop: "password",
    component: (col) => {
      return {
        render: () => {
          const btn = resolveComponent("el-button")
          const btns = [
            h('span', {}, {
              default: () => "*******"
            }),
            h(
              btn, {
                type: "text",
                size: "mini",
                style: {
                  "margin-left": "15px"
                },
                onClick: () => {
                  ElMessageBox({
                    title: '账号信息',
                    message: h('p', null, [
                      h('div', null, `用户名：${col.username}`),
                      h('div', null, `账号：${col.account}`),
                      h('div', null, `密码：${col.password}`)
                    ]),
                    showConfirmButton:false
                  })
                }
              }, {
                default: () => "查看"
              }
            )
          ]
          return h("div", {}, {
            default: () => btns
          })
        }
      }
    }
  },
  {
    label: "创建时间",
    component: (col) => {
      return {
        render: () => {
          return h("div", {}, {
            default: () => col.create_time
          })
        }
      }
    }
  }, {
    label: "更新时间",
    component: (col) => {
      return {
        render: () => {
          return h("div", {}, {
            default: () => col.update_time
          })
        }
      }
    }
  },
]
export default tableInit