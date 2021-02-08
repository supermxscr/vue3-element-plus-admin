<template>
  <div class="tabbar">
    <el-tag
      v-for="(tag,index) in tags"
      :key="tag.path"
      :closable="tag.closeable"
      :type="tag.tagType"
      :effect="tag.path == routeNow ? 'dark':'plain'"
      class="tag"
      @click="openMenu(tag)"
      @close="closeMenu(tag,index)"
    >
      {{ tag.meta.title }}
    </el-tag>
  </div>
</template>

<script>
import { routerPush } from '@/utils'
export default {
  name: "Tabbar",
  components: {},
  filters:{
    
  },
  data() {
    return {
      tags:null,
      chooseTag: 0
    }
  },
  created(){
    this.$router.options.routes.forEach((v) => {
      if(v.children){
        v.children.forEach( i => {
          if (!i.closeable) {
            this.$store.commit('setTagsViews',i)
          }
        })
      }
    })
  },
  mounted(){
  },
  watch:{
    '$store.state.tagsViews':{
      deep:true,
      handler:function(val){
        this.tags = val
      }
    }
  },
  computed:{
    routeNow(){
      return this.$route.path
    }
  },
  methods:{
    openMenu(tag){
      this.$store.commit('setActiveMenu',tag.path)
      routerPush(tag.path)
    },
    closeMenu(tag,index){
      if(tag.path == this.$route.path){
        routerPush(this.tags[index-1].path)
      }
      this.$store.commit('delTagsViews',tag)
    }
  }
};
</script>

<style lang="less">
.tabbar {
  width: 100%;
  height: 45px;
  overflow: auto;
  background: #f1f1f1;
  padding: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  .tag {
    margin-right: 5px;
  }
}
</style>
