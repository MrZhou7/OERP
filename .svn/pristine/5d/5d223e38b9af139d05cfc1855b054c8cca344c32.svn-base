<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <!--<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">-->
        <!--<el-tab-pane-->
          <!--v-for="(item, index) in editableTabs"-->
          <!--:key="item.name"-->
          <!--:label="item.title"-->
          <!--:name="item.name"-->
        <!--&gt;-->
          <!--<keep-alive>     &lt;!&ndash;<keep-alive>缓存数据,即tab切换时保留填写内容&ndash;&gt;-->
            <app-main/>
          <!--</keep-alive>-->
        <!--</el-tab-pane>-->
      <!--</el-tabs>-->


    </div>
  </div>
</template>

<script>
  import { common } from '@/common/common'
  import { Navbar, Sidebar, AppMain } from './components'
  import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  data() {
    return {
      editableTabsValue: '1',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }],
      tabIndex: 1
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    edit() {
      return this.$store.state.user.editableTabs
    },
    tabsName() {
      return this.$store.state.user.tabsName
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
  },
  watch:{
    edit:function(old,newd){
      this.editableTabs = old;
    },
    tabsName:function(old,newd){
      this.editableTabsValue = old;
    }
  },
  created: function() {
    const searchHistory = common.get('editableTabsSearch');
    const searchEditableTabsValue = common.get('editableTabsValue');
    if (searchHistory != null && searchHistory.length != 0) {
      this.editableTabs = searchHistory
      this.editableTabsValue = searchEditableTabsValue
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) { //判断删除栏是否在数组里面
            let nextTab = tabs[index + 1] || tabs[index - 1];//判断删除栏是否有上一个下一个
            if (nextTab) {
              activeName = nextTab.name;
              this.editableTabsValue = nextTab.name;
              common.set('editableTabsValue', activeName);
            }
          }
        });
      }
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      this.$store.commit("editableTabs", this.editableTabs);
      common.set('editableTabsSearch', this.editableTabs);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
