<template>
  <div
    class="menu-item"
    v-if="!item.hidden"
  >
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <el-menu-item
        :index="item.path"
        :class="{ 'submenu-title-noDropdown': !isNest }"
        @click="handleItem(item)"
      >
        <i
          v-if="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
          :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
        />
        <el-badge
          is-dot
          type="danger"
          v-if="onlyOneChild.meta.title == '关于'"
        >
          <span class="m-l20">{{ onlyOneChild.meta.title }}</span>
        </el-badge>
        <span
          class="m-l20"
          v-else
        >{{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="item.path"
      popper-append-to-body
    >
      <template #title>
        <span v-if="item.meta">
          <i
            v-if="item.meta.icon"
            :class="item.meta.icon"
          />
          <span class="m-l20">{{ item.meta.title }}</span>
        </span>
      </template>
      
      <menu-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="child.path"
        class="nest-menu"
        :index="child.path"
        @click="handleItem(child)"
      />
    </el-submenu>
  </div>
</template>

<script>
import { routerPush } from '@/utils'
export default {
  name: "MenuItem",
  components: {},
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    this.onlyOneChild = null
    return {
      isCollapse: this.$store.state.navMenuCollapse
    }
  },
  methods: {
    handleItem(route){
      if (route.children){
        routerPush(route.children[0].path)
        this.$store.commit('setTagsViews',route.children[0])
      }else {
        routerPush(route.path)
        this.$store.commit('setTagsViews',route)
      }
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true }
        return true
      }
      return false
    },
  },
};
</script>
<style lang="less" >
.navMenu {
  height: 100%;
  overflow: auto;
  background: #000;
  .menu {
    border: none;
  }
  .m-l20 {
    margin-left: 20px;
  }
  .el-badge__content.is-fixed.is-dot {
    right: 0px;
    top: 19px;
  }

}
</style>
