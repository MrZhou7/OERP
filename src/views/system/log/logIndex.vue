<template>
  <el-main>
    <el-form ref="form" :model="formInline" label-width="90px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="工号">
            <el-input v-model="formInline.loginid" clearable placeholder="请输入工号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间段选择">
            <el-date-picker
              v-model="create_time"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              type="daterange"
              SelectionMode="None"
              clearable
              @change="startDate($event)"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" align="center">
          <el-button align="center" type="primary" @click="onSearch(formInline)">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="contract_table">
      <el-table
        :data="tableData"
        style="width: 100%;"
        :show-overflow-tooltip="true"
        border
        ref="multipleTable"
        highlight-current-row
        tooltip-effect="dark"
        align: center
        :height="tableHeight">
        <el-table-column
          fixed
          prop="menu"
          :show-overflow-tooltip="true"
          label="模块"
          resizable: true
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="before"
          label="修改前信息"
          :show-overflow-tooltip="true"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="last"
          label="修改后信息"
          :show-overflow-tooltip="true"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="create_name"
          label="创建人信息"
          :show-overflow-tooltip="true"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建日期"
          :show-overflow-tooltip="true"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="ip"
          label="ip"
          :show-overflow-tooltip="true"
          min-width="120">
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[20, 30, 40, 50]"
        :page-size="pageSize"
        :current-page.sync="currentPage"
        :total="total"
        background
        layout="prev, pager, next, total, sizes"
        @current-change="pagination"
        @size-change="handleSizeChange"/>
    </div>

  </el-main>
</template>

<script>
  import building from '@/utils/building';
  export default {
    name: '',
    data() {
      return {
        tableData:[],
        formInline:{},
        create_time:[],//时间段选择
        mall_name: [], // 门店信息
        total: 0,//分页总数据
        currentPage: 1,//当前页码
        pageSize:20,
        tableHeight: window.innerHeight - 225, //表格高度
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [end, start]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [end, start]);
            }
          }, {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              end.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [end, start]);
            }
          }]
        },
      }
    },
    created:function()  {
      building.Mall(this); // 获取项目名称信息
      this.getData();
    },
    methods: {
      onSearch() {
        this.getData()
      },
      getData() {
        this.http.post('SystemLog/getList',this.formInline).then(res => {
          this.tableData = res.data.data;
        }).catch(err => {
          this.$message.error(err.response.data.msg);
        })
      },
      pagination(val) {//分页
        this.currentPage = val;
        const data = this.formInline;
        data.page = val;
        data.limit = this.pageSize;
        common.getPreData(data, 'contract_main/getConMainList', this, 'search');
        common.set('search', { 'search': data });
      },
      handleSizeChange(val) {//分页
        this.pageSize = val;
        const data = this.formInline;
        data.limit = val;
        data.page = this.currentPage;
        common.getPreData(data, 'contract_main/getConMainList', this, 'search');
        common.set('search', { 'search': data });
      },
      startDate(e) {//开始日期
        console.log(e)
        e ? this.formInline.start = e[0] : this.formInline.start = '';
        e ? this.formInline.end = e[1] : this.formInline.end = '';
      },
    }
  }
</script>

<style scoped>

</style>
