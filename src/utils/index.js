import router from '@/router'
import store from '@/store'
import moment from "moment"

/**
 * @des 跳转路由
 */

 export function routerPush(path) {
  router.options.routes.forEach(v => {
    if(v.children){
      v.children.forEach( i => {
        if(i.path == path){
          store.commit('setTagsViews',i)
        }
      })
    }
  })
  router.push({ path: path})
 }

 /**
 * @des 初始化table 操作列
 *  列表是否有操作列 
 *  否 在最后一行增加操作列
 */

export function initSetting(tableData,setting) {
  let arr = tableData
  if(tableData[ tableData.length-1 ].label != '操作'){
    arr.push(setting)
  }
  return arr
 }

  /**
 * @des 设置 问候语
 */
export function setSeyHi(){
  let str = null
  let hour = moment().format('HH')
  if(hour > 5 && hour < 11){
   str = '早上好~'
  }else if(hour > 10 && hour < 14){
    str = '中午好~'
  }else if(hour > 13 && hour < 18){
    str = '下午好~'
  }else if(hour > 15 && hour < 23){
    str = '晚上好~'
  }else if(hour > 22 && hour < 25 || hour < 6){
    str = '夜深了~'
  }
  return str
}