<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree :data="categoryList"
                 default-expand-all
                 :props="defaultProps"
                 node-key="id"
                 @node-click="nodeClick"
                 :default-checked-keys="[operationIds]"
                 ref="tree"
                 show-checkbox
                 style="height:70vh">
        </el-tree>
      </el-col>
      <el-col :span="16">
        <el-form ref="form" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-form-item label="品牌名称" class="search_lable">
                <el-input v-model="formInline.brand_name" placeholder="请输入商户名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="品牌编码" class="search_lable">
                <el-input v-model="formInline.brand_code" placeholder="请输入商户编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="品牌状态" class="search_lable">
                <el-select v-model="formInline.brand_status" placeholder="是品牌状态">
                  <el-option value='' label="请选择"></el-option>
                  <el-option :value='1' label="库内"></el-option>
                  <el-option :value='0' label="库外"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" align="center" class="search_lable">
              <el-button align="center" type="primary" @click="onSecher">查询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          :data="brandList"
          style="width: 100%;text-align: center;height:65vh"
          border
          :show-overflow-tooltip="true"
          align: center>
          <el-table-column
            align="center"
            prop="brand_name"
            :show-overflow-tooltip="true"
            label="品牌名称"
            resizable: true>
          </el-table-column>
          <el-table-column
            align="center"
            prop="brand_code"
            :show-overflow-tooltip="true"
            label="品牌编码">
          </el-table-column>
          <el-table-column
            prop="brand_status"
            align="center"
            label="品牌状态">
            <template slot-scope="scope">
              {{scope.row.brand_status == 1 ? '库外' : '库内'}}
            </template>
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="100">
            <template slot-scope="scope">
              <el-button @click="choice(scope.row)" type="text" size="small">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          :total="total"
          background
          layout="prev, pager, next, total, sizes"
          @current-change="pagination"
          @size-change="handleSizeChange"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  var data = {};
  export default {
    data() {
      return {
        filterText:'',
        formInline: {},
        categoryList: [],
        brandList: [],
        defaultProps: {
          children: 'children',
          label: 'text',
          id: 'id'
        },
        checkedId : 0,
        pageSize : 20,
        currentPage : 1,
        total : 1,
        operationIds:'',
      }
    },
    props: ["operationTypeId"],
    watch: {
      operationTypeId(newVal, oldVal) {
        const that = this;
        that.operationIds = newVal;
      },
      filterText(val) {
        this.$refs.tree.filter(val);
      },
    },
    created() {
      this.operationIds = this.operationTypeId;
      this.getCustomer();
    },
    methods: {
      nodeClick(data,checked,node) {
        console.log([data])
        this.checkedId = data.id;
        this.$refs.tree.setCheckedNodes([data]);
        this.onSecher();
      },
      getCustomer() {
        let that = this;
        that.http.post('operation_type/catelist').then(res => {
          that.categoryList = res.data.data;
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      onSecher() {
        let that = this;
        this.formInline.operation_type = this.checkedId;
        this.formInline.page = this.currentPage;
        this.formInline.limit = this.pageSize;
        that.http.post('brand_info/getbrandlist',this.formInline).then(res => {
          that.total = res.data.count
          that.brandList = res.data.data
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      pagination(val) {
        this.currentPage = val;
        this.onSecher();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.onSecher();
      },
      choice(data) {
        this.$emit('shopBrandData', data)
      }
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
