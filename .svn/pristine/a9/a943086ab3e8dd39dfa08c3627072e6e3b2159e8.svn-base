<template>
  <div id="addRentWrap">
    <el-form ref="formInline" :rules="rules" :model="formInline" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="12">
          <el-form-item label="门店" prop="mall_id">
            <el-select v-model="formInline.mall_id">
              <el-option v-for="mall in mall_name" :key="mall.mall_id" :label="mall.mall_name" :value="mall.mall_id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同ID" prop="contract_id">
            <el-input v-model="formInline.contract_id" suffix-icon="el-icon-search" clearable @click.native="contractId"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="费用类型" prop="charge_type_id">
            <el-select v-model="formInline.charge_type_id" placeholder="请选择">
              <el-option v-for="mall in getCostTypeList" :key="mall.charge_type_id" :label="mall.charge_description" :value="mall.charge_type_id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="时间段">
            <el-radio v-model="resource" label="1">按月份</el-radio>
            <el-radio v-model="resource" label="2">按天数</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-show="resource == '1'">
        <el-row>
          <el-col :span="12">
            <el-form-item label="选择月份" class="label_required">
              <el-date-picker
                v-model="monthValue"
                type="month"
                value-format="yyyy-MM-dd"
                placeholder="选择月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="月份数量" class="label_required">
              <el-select v-model="num" placeholder="请选择">
                <el-option v-for="(item, index) in timeNum" :key="index" :label="item" :value="item"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="优惠单价" class="label_required">
              <el-input v-model="price" type="number" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="优惠总额">
              <el-input v-model="dis_amt" :disabled="resource == '1'" type="number" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div v-show="resource == '2'">
        <el-row>
          <el-col :span="24">
            <el-form-item label="起止日期">
              <el-date-picker
                v-model="timeValue"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="startDate($event, 1)">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="优惠总额" class="label_required">
              <el-input v-model="formInline.dis_amt" type="number" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formInline.remark" type="textarea" autosize clearable/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="padding: 10px 0;background-color: #f2f2f2;text-align: center;">
        <el-button type="primary" @click="saveForm('formInline')">保 存</el-button>
      </el-form-item>
    </el-form>
    <!--选择会计期的弹窗-->
    <el-dialog
      :visible.sync="dialogVisibleTime"
      :close-on-click-modal="false"
      append-to-body
      title="选择会计期"
      top="5%"
      width="60%">
      <div class="height">
        <el-form ref="searchForm" :model="searchForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="费用期名称">
                <el-input v-model="searchForm.month_name" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="起止日期">
                <el-date-picker
                  v-model="rentValue"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="startDate($event, 2)">
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
              label="费用期起始日期"/>
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
                <el-button type="text" size="mini" @click="choose(scope.$index, tableDataTwo)">选 择</el-button>
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
            @size-change="handleSizeChangeTwo"
            @current-change="paginationTwo"/>
        </div>
      </div>
    </el-dialog>
    <!--选择合同的弹窗-->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      append-to-body
      title="选择合同"
      top="5%"
      width="80%"
      @close="handleClose">
      <div class="heightTwo">
        <el-form ref="rentForm" :model="rentForm" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="门店">
                <el-select v-model="rentForm.mall_id" placeholder="请选择门店名称" disabled>
                  <el-option v-for="mall in mall_name" :key="mall.mall_id" :label="mall.mall_name" :value="mall.mall_id"/>
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
                  @click.native.prevent="chooseTract(scope.$index, tableData)"
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
    </el-dialog>
  </div>
</template>

<script>
import { common } from '@/common/common';
import building from '@/utils/building';
export default {
  name: 'AddRent',
  data() {
    return {
      formInline: { mall_id: '', contract_id: '', charge_type_id: '', remark: '', dis_amt: '', }, // 新增表单内容
      rentForm: { mall_id: '', status: 3 }, // 选择合同表单
      mall_name: [], // 门店信息
      getCostTypeList: [], // 费用类型
      timeNum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      timeValue: '', // 起始日期
      timeRent: '', // 会计期
      rentValue: '',
      height: window.innerHeight - 500 + 'px',
      heightTwo: window.innerHeight - 500 + 'px',
      loading: false,
      total: 0,
      currentPage: 1, // 页码
      pageSize: 10,
      resource: '1', // 新增租金优惠的日期段选择
      num: '', // 月份数量
      price: '', // 优惠单价
      monthValue: '', // 月份
      dialogVisibleTime: false, // 会计期弹窗
      dialogVisible: false, // 选择合同的弹窗
      tableData: [], // 会计期列表
      tableDataTwo: [], // 会计期table
      contractSource: [], // 合同来源
      contractStatus: [], // 审批状态
      searchForm: {}, // 会记期搜索表单
      rules: {
        mall_id: [{ required: true, message: '请选择门店', trigger: 'change' }],
        contract_id: [{ required: true, message: '请输入合同ID' }],
        charge_type_id: [{ required: true, message: '请选择费用类型' }],
        dis_amt: [{ required: true, message: '请输入优惠金额', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注信息', trigger: 'blur' }]
      }
    };
  },
  computed: {
    dis_amt: function() {
      return parseInt(this.num) * parseInt(this.price);
    }
  },
  watch: {
    monthValue: function(val) {
      console.log(val);
    }
  },
  created() {
    building.Mall(this); // 获取项目名称信息
    this.getCostType(this); // 获取费用类型
    common.lookup('L011', this).then((res) => {
      this.contractSource = res;
    });
    common.lookup('L012', this).then((res) => {
      this.contractStatus = res;
    });
  },
  methods: {
    saveForm(formName) { // 保存
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.resource == 1) {
            if (this.num == '' || this.price == '' || this.monthValue == '') {
              that.$message.warning('请完善内容');
            } else {
              that.formInline.dis_amt = that.dis_amt;
              that.formInline.type = 'month';
              const r = parseInt(that.monthValue.substring(0, 4)); // 截取年份
              const t = building.find(that.monthValue, '-');
              const s = that.monthValue.substring(t + 1, t + 3); // 截取月份
              const y = parseInt(parseInt(s) + parseInt(that.num) - 1); // 获取新月份
              if (y > 12) {
                that.formInline.date_from = that.monthValue;
                that.formInline.date_to = building.getCurrentMonthLast((r + 1) + '-' + ('0' + (y - 12)));
                that.getData(that);
              } else {
                that.formInline.date_from = that.monthValue;
                that.formInline.date_to = building.getCurrentMonthLast(r + '-' + y);
                that.getData(that);
              }
            }
          } else if (that.resource == 2) {
            if (that.formInline.dis_amt == '' || that.timeValue == '') {
              that.$message.warning('请完善内容');
            } else {
              that.formInline.type = 'day';
              that.getData(that);
            }
          }
        } else {
          this.$message({
            message: '请输入完整信息！！！',
            type: 'warning'
          })
          return false;
        }
      });
    },
    contractId() { // 获取合同ID
      this.rentForm.status = 3;
      this.formInline.mall_id === '' ? this.$message({ message: '请先选择门店', type: 'warning' }) : this.dialogVisible = true;this.rentForm.mall_id = this.formInline.mall_id;
    },
    search() { // 查询会计期
      this.http.post('StandardAccountPeroid/getList', this.searchForm).then(res => {
        this.tableDataTwo = res.data.data;
        this.total = res.data.count;
      });
    },
    accounting() { // 获取会计期弹窗显示
      this.dialogVisibleTime = true;
    },
    choose(index, row) { // 选择会计期
      this.timeRent = row[index].month_name;
      this.formInline.peroid_id = row[index].standard_account_peroid_id;
      this.dialogVisibleTime = false;
    },
    chooseTract(index, row) { // 选择合同ID
      this.formInline.contract_id = row[index].contract_main_id;
      this.dialogVisible = false;
    },
    submitForm() { // 查询合同
      const data = this.rentForm;
      common.getPreData(data, 'contract_main/getConMainList', this, 'addRentList');
    },
    startDate(e, index) { // 搜索日期赋值
      switch (index) {
        case 1:
          e ? this.formInline.date_from = e[0] : this.formInline.date_from = '';
          e ? this.formInline.date_to = e[1] : this.formInline.date_to = '';
          break;
        case 2:
          e ? this.searchForm.start = e[0] : this.searchForm.start = '';
          e ? this.searchForm.end = e[1] : this.searchForm.end = '';
          break;
      }
    },
    handleClose() { // 合同关闭回调
      this.rentForm = {};
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
    paginationTwo(val) { // 分页功能
      const data = this.searchForm.mall_id;
      data.page = val;
      this.http.post('StandardAccountPeroid/getList', data).then(res => {
        this.tableDataTwo = res.data.data;
        this.total = res.data.count;
      });
    },
    handleSizeChangeTwo(val) {
      const data = this.searchForm.mall_id;
      data.limit = val;
      this.http.post('StandardAccountPeroid/getList', data).then(res => {
        this.tableDataTwo = res.data.data;
        this.total = res.data.count;
      });
    },
    getData(that) { // 公用得新增请求
      that.http.post('InvoiceDiscount/addInfo', that.formInline).then(res => {
        that.$message.success('新增成功');
        that.$emit('isShow', false);
      });
    },
    getCostType() { // 获取费用类型
      this.http.post('ChargeType/getTypeList', { module: 'all' }).then(res => {
        this.getCostTypeList = res.data.data;
      }).catch((err) => {
        this.$message.error(err.response.data.msg);
      });
    }
  }
};
</script>

<style scoped>
  .el-form-item {margin-bottom: 20px;}
  .height{overflow: auto;height: calc(100vh - 40vh)}
  .heightTwo{overflow: auto;height: calc(100vh - 25vh)}
</style>
