<template>
  <main>
    <el-row>
      <el-col :span="6">
        <div class="category-tree-content">
          <el-input
            v-model="filterText"
            placeholder="输入关键字进行搜索"/>
          <el-tree
            v-loading="loading"
            ref="tree2"
            :highlight-current="true"
            :data="dataTree"
            :props="defaultProps"
            :filter-node-method="filterNode"
            :load="loadNode"
            node-key="id"
            class="filter-tree"
            lazy
            @node-click="handleNodeClick"/>
        </div>
      </el-col>
      <el-col :span="18">
        <el-tabs type="border-card">
          <el-tab-pane label="人力资源">
            <el-table
              ref="table"
              :data="tableData"
              :show-overflow-tooltip="true"
              :height="height.one"
              border
              tooltip-effect="dark"
              style="width: 100%;">
              <el-table-column
                type="selection">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="lastname"
                min-width="80"
                label="姓名">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="loginid"
                min-width="80"
                label="编号">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="status"
                min-width="80"
                label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 0">试 用</span>
                  <span v-else-if="scope.row.status == 1">正 式</span>
                  <span v-else-if="scope.row.status == 2">临 时</span>
                  <span v-else-if="scope.row.status == 3">试用延期</span>
                  <span v-else-if="scope.row.status == 4">解 聘</span>
                  <span v-else-if="scope.row.status == 5">离 职</span>
                  <span v-else-if="scope.row.status == 6">退 休</span>
                  <span v-else-if="scope.row.status == 7">无 效</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="jobtitlename"
                min-width="100"
                label="岗位">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="role_name"
                min-width="100"
                label="绑定角色">
                <template slot-scope="scope">
                  <span>{{ scope.row.role_name ? scope.row.role_name : '暂无' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="loginid"
                label="登录名"
                min-width="80">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                min-width="180">
                <template slot-scope="scope">
                  <el-button type = "text" size="small" @click.native.prevent="binding(scope.$index, tableData)">绑定角色</el-button>
                  <el-button type = "text" size="small" @click.native.prevent="remove(scope.$index, tableData)">解除绑定</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <!--绑定角色信息-->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisible"
      title="绑定角色"
      top="5%"
      width="60%">
      <blockquote class="elem_quote">绑定角色 <span class="btn" @click="choose">选 择</span></blockquote>
      <el-table
        v-loading="loading"
        ref="table"
        :data="tableDataOne"
        :show-overflow-tooltip="true"
        :height="height.two"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="getRadioOne"
        @row-click="clickRow">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="departmentname"
          min-width="180"
          label="岗位">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="role_name"
          min-width="180"
          label="角色名称">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="subject_code"
          min-width="180"
          label="角色描述">
        </el-table-column>
      </el-table>
    </el-dialog>
    <!--解除绑定信息-->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="dialogVisibleTwo"
      title="解除绑定"
      top="5%"
      width="60%">
      <blockquote class="elem_quote">解除绑定 <span class="btn" @click="removeChoose">选 择</span></blockquote>
      <el-table
        v-loading="loading"
        ref="tableTwo"
        :data="tableDataTwo"
        :show-overflow-tooltip="true"
        :height="height.two"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="getRadio"
        @row-click="clickRowTwo">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="enabled"
          min-width="180"
          label="是否有效">
          <template slot-scope="scope">
            <span>{{ scope.row.enabled == 1 ? '有效' : '无效' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="role_name"
          min-width="180"
          label="角色名称">
        </el-table-column>
      </el-table>
    </el-dialog>
  </main>
</template>

<script>
import { common } from '@/common/common';
export default {
  name: 'UserOA',
  data() {
    return {
      userId: null, // 角色id
      loginId: null, // 登录账号
      title: '',
      filterText: '', // 查询过滤的初始值
      chooseData: [], // 解除绑定的选择
      chooseList: [], // 绑定的选择
      dataTree: [], // 树状图显示数据
      defaultProps: {
        children: [],
        label: 'name',
        isLeaf: 'leaf'
      },
      loading: false,
      param: {}, // 请求参数
      tableData: [], // 表格数据
      tableDataOne: [], // 角色表格数据
      tableDataTwo: [], // 解除绑定数据table
      currentPage: 1, // 页码
      total: 0,
      height: {
        one: window.innerHeight - 160 + 'px',
        two: window.innerHeight - 230 + 'px'
      },
      dialogVisible: false, // 绑定角色弹窗
      dialogVisibleTwo: false // 解除绑定弹窗
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  created() {
    this.loading = true;
    this.getUserTree();
  },
  methods: {
    filterNode(value, data) { // 组织架构的搜索查询
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    // 异步树叶子节点懒加载逻辑
    loadNode(node, resolve) {
      // 一级节点处理
      if (node.level === 0) {
        this.getUserTree(resolve);
      }
      // 其余节点处理
      if (node.level >= 1) {
        // 注意！把resolve传到你自己的异步中去
        this.getTree(node, resolve);
      }
    },
    handleNodeClick(node, data) { // 点击传参给用户信息，并显示用户信息
      if (node.num == 0 && node.type == 'dev') {
        this.userId = node.id;
        this.getUser(this.userId);
      }
    },
    getRadio(val) { // 获取选中的所有解除绑定的信息
      const d = [];
      for (let i = 0, len = val.length; i < len; i++) {
        d.push(val[i].id);
      }
      this.chooseData = d.join(',');
    },
    getRadioOne(val) { // 获取所有绑定的信息
      const r = [];
      for (let i = 0, len = val.length; i < len; i++) {
        r.push(val[i].role_id);
      }
      this.chooseList = r.join(',');
    },
    clickRow(row) { // 点击table当前行
      this.$refs.table.toggleRowSelection(row);
    },
    clickRowTwo(row) { // 点击table当前行 解除绑定
      this.$refs.tableTwo.toggleRowSelection(row);
    },
    binding(index, table) { // 绑定角色
      this.dialogVisible = true;
      this.loginId = table[index].loginid;
      this.http.post('role/roleList', { type: 'dev', id: table[index].departmentid }).then(res => {
        this.tableDataOne = res.data.data;
      });
    },
    remove(index, table) { // 解除绑定弹窗
      this.dialogVisibleTwo = true;
      this.loginId = table[index].loginid;
      this.http.post('Role/roleListByUser', { staff_num: this.loginId }).then(res => {
        this.tableDataTwo = res.data.data;
      });
    },
    removeChoose() { // 解除绑定
      this.$confirm('此操作将与该角色解除绑定, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http.post('AdminRole/del', { staff_num: this.loginId, id: this.chooseData }).then(res => {
          this.dialogVisibleTwo = false;
          this.$message({ message: '成功！', type: 'success' });
          this.getUser(this.userId);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    choose(v, s) { // 单选
      this.$confirm('此操作将与该角色绑定, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http.post('AdminRole/add', { staff_num: this.loginId, role_id: this.chooseList }).then(res => {
          this.$message({ message: '成功！', type: 'success' });
          this.dialogVisible = false;
          this.getUser(this.userId);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    getUser(data) { // 获取部门人员详细信息
      this.http.post('Organization/getUserList', { departmentid: data }).then(res => {
        this.tableData = res.data.data;
        this.loading = false;
      })
    },
    getTree(node, resolve) { // 获取tree信息个表格的查询及点击组织架构获取信息
      if (node.data.type == 'subcompany') {
        this.param = {
          company_id: 1,
          sub_parent_id: node.data.id
        };
      } else {
        this.param = {
          company_id: 1,
          sub_parent_id: node.parent.data.id,
          supdepid: node.data.id
        };
      }
      this.http.post('Organization/getSubList', this.param)
        .then(res => {
          const data = res.data.data;
          resolve(data);
        });
      this.userId = node.key;
      this.getUser(this.userId)
    },
    getUserTree() { // 获取tree信息各表格的查询及点击组织架构获取信息
      this.http.post('Organization/getSubList', { company_id: 1, sub_parent_id: 0 }).then(res => {
        this.dataTree = res.data.data;
        this.loading = false;
      })
    }
  }
};
</script>

<style scoped>
  .el-input--suffix .el-input__inner {padding-right:15px;}
  .filter-tree{overflow: auto;height:calc(100vh - 120px);}
  .category-tree-content{margin:0 10px;border: 1px solid #e2e2e2;}
  .btn{ float: right; color:#409EFF; cursor: pointer;font-weight: bold; }
  .category-tree-content{margin:10px;border: 1px solid #e2e2e2;}
</style>
