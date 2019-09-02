<template>
 <div :style="height">
   <el-form ref="searchForm" :model="searchForm" label-width="90px" class="demo-ruleForm">
     <el-row>
       <el-col :span="6">
         <el-form-item label="费用期名称">
           <el-input v-model="searchForm.month_name" clearable/>
         </el-form-item>
       </el-col>
       <el-col :span="12">
         <el-form-item label="起止日期">
           <el-date-picker
             v-model="timeValue"
             :picker-options="pickerOptions"
             value-format="yyyy-MM-dd"
             type="daterange"
             range-separator="至"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
             @change="startDate($event)">
           </el-date-picker>
         </el-form-item>
       </el-col>
       <el-col :span="6">
         <el-form-item>
           <el-button size="medium" type="primary" @click="search('searchForm')">查 询</el-button>
         </el-form-item>
       </el-col>
     </el-row>
   </el-form>
   <div class="contract_table">
     <el-table
       ref="tableTwo"
       :height="heightTwo"
       :data="tableDataTwo"
       :show-overflow-tooltip="true"
       :highlight-current-row="true"
       border
       tooltip-effect="dark"
       style="width: 100%">
       <el-table-column
         type="selection"
         width="55"/>
       <el-table-column
         :show-overflow-tooltip="true"
         prop="account_year"
         min-width="100"
         label="记账年度"/>
       <el-table-column
         :show-overflow-tooltip="true"
         prop="account_month"
         min-width="100"
         label="费用期序号"/>
       <el-table-column
         :show-overflow-tooltip="true"
         prop="month_name"
         min-width="120"
         label="费用期名称"/>
       <el-table-column
         :show-overflow-tooltip="true"
         prop="month_start_day"
         min-width="120"
         label="费用期起止日期"/>
       <el-table-column
         :show-overflow-tooltip="true"
         prop="month_end_day"
         min-width="150"
         label="费用期结束日期"/>
       <el-table-column
         fixed="right"
         label="操作"
         min-width="80">
         <template slot-scope="scope">
           <el-button type="text" size="mini" @click="choose(scope.row)">选 择</el-button>
         </template>
       </el-table-column>
     </el-table>
     <el-pagination
       :page-sizes="[10, 20, 30, 40, 50]"
       :page-size="20"
       :current-page.sync="currentPageTwo"
       :total="totalTwo"
       background
       layout="prev, pager, next, total, sizes"
       @size-change="handleSizeChangeTwo"
       @current-change="paginationTwo"/>
   </div>
 </div>
</template>

<script>
  export default {
    name: 'periodSearch',
    data() {
      return {
        height: {
          height: window.innerHeight * 0.6 + 'px'
        },
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
        heightTwo: window.innerHeight * 0.6 - 106 + 'px',
        currentPageTwo: 1,
        totalTwo: 0,
        tableDataTwo: [], // 会计期table
        searchForm:{},
        timeValue: '', // 时间
      }
    },
    created() {
      this.http.post('StandardAccountPeroid/getList', this.searchForm).then(res => {
        this.tableDataTwo = res.data.data;
        this.totalTwo = res.data.count;
      });
    },
    methods: {
      search() { // 查询会计期
        this.http.post('StandardAccountPeroid/getList', this.searchForm).then(res => {
          this.tableDataTwo = res.data.data;
          this.totalTwo = res.data.count;
        });
      },
      paginationTwo(val) { // 分页功能
        const data = this.searchForm;
        data.page = val;
        this.http.post('StandardAccountPeroid/getList', data).then(res => {
          this.tableDataTwo = res.data.data;
          this.totalTwo = res.data.count;
        });
      },
      handleSizeChangeTwo(val) {
        const data = this.searchForm;
        data.limit = val;
        this.http.post('StandardAccountPeroid/getList', data).then(res => {
          this.tableDataTwo = res.data.data;
          this.totalTwo = res.data.count;
        });
      },
      startDate(e) {
            e ? this.searchForm.start = e[0] : this.searchForm.start = ''
            e ? this.searchForm.end = e[1] : this.searchForm.end = ''
      },
      choose(row) { // 选择会计期
       this.$emit('periodData', row)
      },
    }
  }
</script>

<style scoped>

</style>
