<template>
  <div class="heightTwo">
    <el-form ref="rentForm" :model="rentForm" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="门店">
            <el-select v-model="rentForm.mall_id" placeholder="请选择门店名称" disabled>
              <el-option
                v-for="(item,index) in preData.mall"
                :key="index"
                :label="item.mall_name"
                :value="item.mall_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同ID">
            <el-input v-model="rentForm.contract_id" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同编号">
            <el-input v-model="rentForm.contract_code" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="品牌名称">
            <el-input v-model="rentForm.brand_name" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="商户编号">
            <el-input v-model="rentForm.customer_code" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商户名称">
            <el-input v-model="rentForm.customer_name" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商铺编号">
            <el-input v-model="rentForm.store_code" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商铺名称">
            <el-input v-model="rentForm.store_id" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="审批状态">
            <el-select v-model="rentForm.status" disabled>
              <el-option label="全部" value=""></el-option>
              <el-option label="无效" :value="0"></el-option>
              <el-option label="草稿" :value="1"></el-option>
              <el-option label="审批中" :value="2"></el-option>
              <el-option label="生效" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="场地编号">
            <el-input v-model="rentForm.unit_code" placeholder="请输入场地编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm('rentForm')">查 询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="contract_table">
      <el-table
        ref="table"
        :height="heightTwo"
        height="80vh"
        max-height="340"
        :data="tableData"
        :show-overflow-tooltip="true"
        :highlight-current-row="true"
        border
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop="contract_main_id"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          :show-overflow-tooltip="true"
          prop="mall_name"
          label="门店名称"
          resizable: true
          width="120">
        </el-table-column>
        <el-table-column
          prop="contract_code"
          label="合同编号"
          :show-overflow-tooltip="true"
          width="120">
        </el-table-column>
        <el-table-column
          prop="data_source"
          :show-overflow-tooltip="true"
          label="合同来源"
          width="120">
          <template slot-scope="scope">
                <span v-for="(item, index) in contractSource">
                  {{ scope.row.data_source == item.values_code ? item.values_name : '' }}
                </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="customer_code"
          width="120"
          :show-overflow-tooltip="true"
          label="商户编号">
        </el-table-column>
        <el-table-column
          prop="customer_name"
          width="120"
          :show-overflow-tooltip="true"
          label="商户名称">
        </el-table-column>
        <el-table-column
          prop="enabled"
          width="120"
          label="合同状态"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.enabled == 0? '无效' : '有效' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          width="120"
          label="审批状态">
          <template slot-scope="scope">
                <span v-for="(item, index) in contractStatus">
                  {{ scope.row.status == item.values_code ? item.values_name : '' }}
                </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="contract_area"
          label="签约面积(平米)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="start_date"
          label="开始时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="end_date"
          label="结束时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="store_code"
          :show-overflow-tooltip="true"
          label="场地编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="store_code"
          :show-overflow-tooltip="true"
          label="商铺编码"
          width="120">
        </el-table-column>
        <el-table-column
          prop="store_name"
          :show-overflow-tooltip="true"
          label="商铺名称"
          width="120">
        </el-table-column>

        <el-table-column
          prop="brand_name"
          :show-overflow-tooltip="true"
          label="品牌名称"
          width="120">
        </el-table-column>

        <el-table-column
          prop="avoid_lease"
          label="免租期(天)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="decorate_days"
          label="装修期(天)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="招商人员"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          algin="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="chooseTract(scope.row)"
              type="text"
              size="small">
              选择
            </el-button>
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
    </div>
  </div>
</template>

<script>
  import { common } from '@/common/common';
  import building from '@/utils/building';
  export default {
    name: 'contractIdSearch',
    data() {
      return {
        rentForm: { mall_id: '', status: 3 }, // 选择合同表单
        mall_name: [], // 门店信息
        tableData: [], // 合同信息
        total: 0,
        preData: {},
        currentPage: 1, // 页码
        pageSize: 20,
        contractSource: [], // 合同来源
        contractStatus: [], // 审批状态
      };
    },
    props: ['mall'],
    watch: {
      mall: function(newVal, oldVal) {
       this.rentForm.mall_id = newVal;
      },

    },
    created() {
      this.getData();
      this.rentForm.mall_id = this.mall;
      common.lookup('L011', this).then((res) => {
        this.contractSource = res;
      });
      common.lookup('L012', this).then((res) => {
        this.contractStatus = res;
      });
    },
    methods: {
      getData() {//预渲染参数
        let that = this
        this.http.post('table_util/getPreData', { act: 'contract' }).then(function(res) {
          that.preData = res.data.data
        })
      },
      submitForm() { // 查询合同
        const data = this.rentForm;
        let that = this;
        this.http
          .post('contract_main/getConMainList', data)
          .then(function(res) {
            that.tableData = res.data.data;
            that.total = res.data.count;
          })
          .catch(function(err) {
            console.log(err)
            that.$message.error(err.responseJSON.msg);
          })
      },
      pagination(val) { // 分页
        const data = this.rentForm;
        data.page = val;
        common.getPreData(data, 'contract_main/getConMainList', this);
      },
      handleSizeChange(val) { // 分页
        const data = this.rentForm;
        data.limit = val;
        common.getPreData(data, 'contract_main/getConMainList', this);
      },
      chooseTract(row) { // 选择合同ID
        this.$emit('contractIdData',row);
      },
    }
  }
</script>

<style scoped>

</style>
