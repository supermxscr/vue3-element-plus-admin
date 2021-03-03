import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import layout from '@/components/layout'

function randomTagType() {
  const types = ['', 'success', 'danger', 'warning']
  return types[Math.floor(Math.random() * 4)]
}
/**
 * closeable 是否固定在tabbar tag中(默认 false 固定)
 * icon 路由menu icon
 * hidden 是否在menu 中显示 默认false
 * tagType tag 样式
 */
const routes = [{
    path: '/home',
    component: layout,
    meta: {
      title: 'home',
      icon: 'el-icon-office-building',
    },
    children: [{
      path: '/home',
      name: 'Home',
      meta: {
        title: '首页',
        icon: 'el-icon-office-building'
      },
      closeable: false,
      tagType: randomTagType(),
      component: () => import('@/views/home/index.vue')
    }]
  },
  {
    path: '/about',
    component: layout,
    children: [{
      path: '/about',
      name: 'About',
      meta: {
        title: '关于',
        icon: 'el-icon-office-building'
      },
      access:{
        value: 'about',
        label: '关于'
     },
      closeable: true,
      tagType: randomTagType(),
      component: () => import('@/views/about/index.vue')
    }]
  },
  {
    path: '/member-center',
    component: layout,
    hidden: true,
    children: [{
      path: '/member-center',
      name: 'member-center',
      meta: {
        title: '个人中心',
        icon: 'el-icon-office-building'
      },
      closeable: true,
      tagType: randomTagType(),
      component: () => import('@/views/member-center/index.vue')
    }]
  },
  {
    path: '/template',
    component: layout,
    meta: {
      title: '模板',
      icon: 'el-icon-office-building'
    },
    children: [{
        path: '/form',
        name: 'template-form',
        meta: {
          title: '表单',
          icon: 'el-icon-office-building'
        },
        access: {
          value: 'template-form',
          label: '模板-表单',
          children: [{
              value: 'search',
              label: '查询'
            },
            {
              value: 'add',
              label: '新增'
            },
            {
              value: 'updade',
              label: '修改'
            },
            {
              value: 'del',
              label: '删除'
            }
          ]
        },
        closeable: true,
        tagType: randomTagType(),
        component: () => import('@/views/template/form/index.vue')
      },
      {
        path: '/table',
        name: 'template-table',
        meta: {
          title: '表格',
          icon: 'el-icon-office-building'
        },
        access: {
          value: 'template-table',
          label: '模板-表格',
          children: [{
              value: 'search',
              label: '查询'
            },
            {
              value: 'add',
              label: '新增'
            },
            {
              value: 'updade',
              label: '修改'
            },
            {
              value: 'del',
              label: '删除'
            }
          ]
        },
        closeable: true,
        tagType: randomTagType(),
        component: () => import('@/views/template/table/index.vue')
      }
    ]
  },
  {
    path: '/access',
    component: layout,
    meta: {
      title: '权限设置',
      icon: 'el-icon-office-building'
    },
    children: [{
      path: '/user-access',
      name: 'UserAccess',
      meta: {
        title: '用户菜单权限',
        icon: 'el-icon-office-building'
      },
      closeable: true,
      tagType: randomTagType(),
      component: () => import('@/views/system/user-authority/index.vue')
    },{
      path: '/system',
      name: 'System',
      meta: {
        title: '菜单权限配置',
        icon: 'el-icon-office-building'
      },
      closeable: true,
      tagType: randomTagType(),
      component: () => import('@/views/system/pages-authority/index.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router