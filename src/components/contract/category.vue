<template>
  <div class="content">
    <el-input
      placeholder="输入关键字进行过滤"
      v-model="filterText">
    </el-input>
    <el-tree :data="categoryList" default-expand-all  :props="defaultProps"  node-key="id"
             @check-change="handleNodeClick" @node-click="nodeClick" :default-checked-keys="[operationIds]"
             :filter-node-method="filterNode"  ref="tree"  show-checkbox>
    </el-tree>
  </div>
</template>
<script>
  var data = {};
  export default {
    data() {
      return {
        filterText:'',
        categoryList: [],
        defaultProps: {
          children: 'children',
          label: 'text',
          id: 'id'
        },
        checkedId : 0,
        operationIds:'',
      }
    },
    props: ["operationTypeId",'categoryType'],
    watch: {
      operationTypeId(newVal, oldVal) {
        console.log(newVal)
        const that = this;
        that.operationIds = newVal;
      },
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      categoryType(newVal, oldVal) {
        console.log(newVal)
      }
    },
    created() {
      this.operationIds = this.operationTypeId;
      this.getCustomer();
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.text.indexOf(value) !== -1;
      },
      handleNodeClick(data, checked, indeterminate) {
        if(checked == true){
          this.checkedId = data.id;
          this.$refs.tree.setCheckedNodes([data]);
          this.$emit('categoryData',data);
        }
      },
      nodeClick(data,checked,node) {
        this.checkedId = data.id;
        this.$refs.tree.setCheckedNodes([data]);
      },
      getCustomer() {
        let that = this;
        that.axios.post(process.env.BASE_API +'operation_type/catelist').then(res => {
          that.categoryList = res.data.data;
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
    }
  }
</script>

<style lang="scss">
  .search_lable {
    margin-bottom: 0px !important;
  }
  .search_lable>.el-form-item__label {
    width: 80px !important;
  }
  .search_lable .el-form-item__content{
    margin-left: 80px !important;
  }
  .el-tree{
    height: 350px;
    overflow: scroll;
    overflow-x: hidden;
  }
</style>
