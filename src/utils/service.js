import { httpRequest } from "@/api/http";
import { customRef } from 'vue';
// import { useStore } from "vuex";

function getList (url,cb){
  httpRequest("GET", url).then((res) => {
    cb && cb(res)
  })
}

function initRef (value,cb){
  return customRef( (track, trigger) =>{
    cb && cb(value,trigger)
    return {
      'get'(){
        track()
        return value
      }
    }
  })
}


export {
  getList, initRef
}