<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <!--当没有子路由的时候显示-->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}" @click="addTab($route.path,item)">
          <item :meta="Object.assign({},item.meta,onlyOneChild.meta)" />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item :meta="item.meta" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :is-nest="true"
        :item="child"
        :key="child.path"
        :base-path="resolvePath(child.path)"
        class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
import { common } from '@/common/common'
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    addTab(path,menu) { //快捷导航栏
      menu.routerPath = path;
      const searchHistory = common.get('editableTabsSearch');
      const editableTabsData =  this.$store.getters.editableTabs;
      if (searchHistory != null && searchHistory.length != 0) { //判断缓存是否有数据
        this.editable(searchHistory,menu)
      }else {
        this.editable(editableTabsData,menu)
      }
    },
    editable(editableTabsData,menu) {
      let exist = false;
      let tabsObj = {
        title: menu.meta.title,
        name:menu.name,
        path:menu.path,
        routerPath:menu.routerPath
      }
      if(editableTabsData.length == 0) {
        editableTabsData.push(tabsObj);
      }else {
        for (var i = 0; i < editableTabsData.length; i++) {
          if(editableTabsData[i].name == menu.name) {
            this.$store.commit("tabsName", menu.name);
            exist = true;
            break;
          }
        }
        if(exist == false) {
          editableTabsData.push(tabsObj);
        }
      }
      common.set('editableTabsSearch', editableTabsData);
      common.set('editableTabsValue', menu.name);
      this.$store.commit("editableTabs",editableTabsData);
      this.$store.commit("tabsName", menu.name);
    },
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
