<template>
  <div>
    <el-form ref="userForm" :model="userForm" label-width="50px" class="demo-ruleForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="账号">
            <el-input v-model="userForm.loginid"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="姓名">
            <el-input v-model="userForm.lastname"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="search">搜 索</el-button>
          <el-button :disabled="deleteBtn" type="primary" @click="moreChoose">多 选</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      v-loading="loading"
      ref="table"
      :data="tableData"
      :show-overflow-tooltip="true"
      :height="height"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="getRadio"
      @row-click="clickRow">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        fixed="left"
        label="操作"
        min-width="80">
        <template slot-scope="scope">
          <el-button type = "text" size="small" @click.native.prevent="choose(scope.$index, tableData)">选 择</el-button>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="jobtitlename"
        min-width="180"
        label="岗位">
      </el-table-column>
      <el-table-column
        prop="loginid"
        min-width="180"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="lastname"
        min-width="180"
        label="姓名">
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="20"
      :current-page.sync="currentPage"
      :total="total"
      background
      layout="prev, pager, next, total, sizes"
      @size-change="handleSizeChange"
      @current-change="pagination">
    </el-pagination>
  </div>
</template>

<script>
import building from '@/utils/building'
import { common } from '@/common/common'
export default {
  name: 'ChooseUser',
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      userForm: {}, // 表单
      tableData: [], // table
      userData: [], // 获取的所有的用户信息
      chooseData: [], // 选中的所有用户账号数据
      total: 0,
      currentPage: 1, // 页码
      loading: false,
      height: window.innerHeight - 350 + 'px',
      deleteBtn: true // 多选按钮显示
    };
  },
  created() {
    this.search(); // 获取所有的用户数据
  },
  methods: {
    search() { // 搜索
      this.loading = true;
      const data = this.userForm;
      common.getPreData(data, 'Organization/getUserAll', this, 'roalSearch');
      common.set('roalSearch', data);
    },
    getRadio(val) { // 获取选中的所有登录账号数据
      this.userData = val;
      if (this.userData) {
        this.deleteBtn = false;
      }
      const d = [];
      for (let i = 0, len = val.length; i < len; i++) {
        d.push(val[i].loginid);
      }
      this.chooseData = d.join(',');
    },
    clickRow(row) { // 点击table当前行
      this.$refs.table.toggleRowSelection(row);
    },
    choose(v, s) { // 选择
      this.http.post('AdminRole/add', { staff_num: s[v].loginid, role_id: this.userId }).then(res => {
        this.$nextTick(() => {
          this.http.post('Role/getInfo', { role_id: this.userId }).then(res => {
            console.log(res)
            this.$message({ message: '成功！', type: 'success' });
            this.$emit('chooseUser', s[v]);
          });
        })
      });
    },
    moreChoose() { // 多选
      this.http.post('AdminRole/add', { staff_num: this.chooseData, role_id: this.userId }).then(res => {
        this.$nextTick(() => {
          this.http.post('Role/getInfo', { role_id: this.userId }).then(res => {
            console.log(res)
            this.$message({ message: '成功！', type: 'success' });
            this.$emit('chooseUser', this.userData);
          });
        })
      });
    },
    pagination(val) { // 分页功能
      const data = this.userForm;
      data.page = val;
      common.getPreData(data, 'Organization/getUserAll', this, 'roalSearch');
      common.set('roalSearch', data);
    },
    handleSizeChange(val) {
      const data = this.userForm;
      data.limit = val;
      common.getPreData(data, 'Organization/getUserAll', this, 'roalSearch');
      common.set('roalSearch', { 'search': data });
    }
  }
}
</script>

<style scoped>
  .el-row > div > .el-form-item { margin-bottom: 5px !important; }
  .el-col button { margin-left: 10px; }
</style>
