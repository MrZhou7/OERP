<template>
  <el-main>
    <el-form ref="formInline" :model="formInline" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="门店">
            <el-select v-model="formInline.mall_id" placeholder="请选择门店名称" clearable>
              <el-option v-for="mall in mall_name" :key="mall.mall_id" :label="mall.mall_name" :value="mall.mall_id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="起止日期">
            <el-date-picker
              v-model="start_date"
              :picker-options="pickerOptions"
              type="daterange"
              value-format="yyyy-MM-dd"
              align="right"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="startDate($event)"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="缴款状态">
            <el-select v-model="formInline.cancel_status" clearable placeholder="请选择">
              <el-option label="全部" value="0"/>
              <el-option label="生成代收款" value="1"/>
              <el-option label="新增收款" value="2"/>
              <el-option label="确认收款" value="3"/>
              <el-option label="对账不成功" value="4"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="取消状态">
            <el-select v-model="formInline.cancel_status" clearable placeholder="请选择">
              <el-option label="全部" value="0"/>
              <el-option label="未取消" value="1"/>
              <el-option label="已取消" value="2"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收银员">
            <el-input v-model="formInline.order_code" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm('formInline')">查 询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn_bottom">
      <el-button :disabled="submitAgency" @click="confirmGathering">确认收款</el-button>
      <el-button :disabled="auditAgency" @click="cancleGathering">取消收款</el-button>
      <el-button :disabled="cancleAgency" @click="confirmCancle">确认取消收款</el-button>
      <el-button :disabled="invalidAgency" @click="addPayment">新增缴款</el-button>
    </div>
    <div class="contract_table">
      <el-table
        ref="table"
        :height="height"
        :data="tableData"
        :show-overflow-tooltip="true"
        highlight-current-row
        border
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="getRadio"
        @row-click="getDetails">
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="pay_code"
          min-width="100"
          label="门店">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="order_code"
          min-width="100"
          label="收银员">
        </el-table-column>
        <el-table-column
          prop="store_name"
          min-width="100"
          label="交易日期">
        </el-table-column>
        <el-table-column
          prop="pay_amt"
          min-width="100"
          label="收款人">
        </el-table-column>
        <el-table-column
          prop="pay_name"
          min-width="100"
          label="收款日期">
        </el-table-column>
        <el-table-column
          prop="created_by"
          min-width="100"
          label="收银总额">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="pay_time"
          min-width="120"
          label="现金总额">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="created_time"
          min-width="120"
          label="缴款状态">
        </el-table-column>
        <el-table-column
          prop="deliver_status"
          min-width="100"
          label="取消状态">
          <template slot-scope="scope">
            <span v-if="scope.row.deliver_status == 0">已取消</span>
            <span v-else-if="scope.row.deliver_status == 1">未取消</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="80">
          <template slot-scope="scope">
            <el-button type = "text" size="small" @click.native.prevent="checkCashier(scope.$index, tableData)">查 看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :current-page.sync="currentPage"
        :total="total"
        background
        layout="prev, pager, next, total, sizes"
        @current-change="pagination"
        @size-change="handleSizeChange"/>
    </div>
    <!--代收款查看-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      title="提示"
      top="5%"
      width="80%">
      <div class="height">
        <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="门店">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="公司">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="合同编号">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="代收款类型">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="代收款金额">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="余额">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="已处理金额">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="状态">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="取消标志">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="处理状态">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="生成人">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="开始日期">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="结束日期">
                <el-input v-model="ruleForm.role_name" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="contract_table">
          <el-table
            ref="table"
            class="tableHeight"
            :data="tableDataSecond"
            :show-overflow-tooltip="true"
            border
            tooltip-effect="dark">
            <el-table-column
              type="selection"
              width="40">
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="dept_code"
              min-width="180"
              label="商铺名称">
            </el-table-column>
            <el-table-column
              prop="role_name"
              min-width="100"
              label="交易日期">
            </el-table-column>
            <el-table-column
              prop="subject_code"
              min-width="100"
              label="代收款类型">
            </el-table-column>
            <el-table-column
              prop="subject_code"
              min-width="100"
              label="客户">
            </el-table-column>
            <el-table-column
              prop="subject_code"
              min-width="100"
              label="交易类型">
            </el-table-column>
            <el-table-column
              prop="subject_code"
              min-width="100"
              label="付款金额">
            </el-table-column>
            <el-table-column
              prop="subject_code"
              min-width="100"
              label="分摊金额">
            </el-table-column>
            <el-table-column
              prop="subject_code"
              min-width="100"
              label="手续费率">
            </el-table-column>
            <el-table-column
              prop="subject_code"
              min-width="100"
              label="净额">
            </el-table-column>
            <el-table-column
              prop="subject_code"
              min-width="100"
              label="手续费">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import { common } from '@/common/common';
import building from '@/utils/building';
export default {
  name: 'Cashier',
  data() {
    return {
      formInline: {
        mall_id: ''
      }, // 搜索条件信息
      ruleForm: {}, // 查看详情
      height: window.innerHeight - 345 + 'px',
      centerDialogVisible: false, // 收款查看弹框
      loading: false,
      total: 0,
      currentPage: 1, // 页码
      submitAgency: true, // 提交审核
      auditAgency: true, // 审核
      cancleAgency: true, // 代收款去取消
      invalidAgency: true, // 作废
      mall_name: [], // 门店信息
      tableDataSecond: [], // 代收费用明细
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime());
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 365);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      tableData: [], // 订单table
      start_date: '' // 起始日期
    };
  },
  created() {
    building.Mall(this); // 先获取门店数据
    const searchHistory = common.get('gatheringData');
    if (searchHistory != null) {
      this.formInline = searchHistory.search;
      common.getPreData(searchHistory.search, 'OrderPayingDetail/orderPayList', this, 'gatheringData');
    }
  },
  methods: {
    submitForm() { // 查询
      const data = this.formInline;
      common.getPreData(data, 'OrderPayingDetail/orderPayList', this, 'gatheringData');
      common.set('gatheringData', { 'search': data });
    },
    getDetails(row) { // 点击table的row获取当前行数据
      this.$refs.table.toggleRowSelection(row);
    },
    getRadio(row) { // 去除多选
      building.radioBtn(row, this.$refs.table);
    },
    checkCashier() { // 查看
      this.centerDialogVisible = true;
    },
    confirmGathering() { // 确认收款

    },
    confirmCancle() { // 确认取消收款

    },
    cancleGathering() { // 取消收款

    },
    addPayment() { // 新增缴款

    },
    pagination(val) { // 分页功能
      const data = this.formInline;
      data.page = val;
      common.getPreData(data, 'OrderPayingDetail/orderPayList', this, 'gatheringData');
      common.set('gatheringData', { 'search': data });
    },
    handleSizeChange(val) {
      const data = this.formInline;
      data.limit = val;
      common.getPreData(data, 'OrderPayingDetail/orderPayList', this, 'gatheringData');
      common.set('gatheringData', { 'search': data });
    },
    startDate(e) { // 搜索日期赋值
      if (e == null) {
        this.formInline.start = '';
        this.formInline.end = '';
      } else {
        this.formInline.start = e[0];
        this.formInline.end = e[1];
      }
    }
  }
};
</script>

<style scoped>
  .btn_bottom{padding-left: 15px;}
  .height{overflow: auto;height: calc(100vh - 20vh)}
  .tableHeight{width: 100%;height: calc(100vh - 70vh)}
  .el-row > div > .el-form-item { margin-bottom: 5px !important; }
</style>
