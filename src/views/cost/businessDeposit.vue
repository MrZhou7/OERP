<template>
  <el-main>
    <el-form ref="formInline" :modelprocess_type="formInline" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span="5">
          <el-form-item label="门店">
            <el-select v-model="formInline.mall_id" placeholder="请选择门店名称" clearable>
              <el-option v-for="mall in mall_name" :key="mall.mall_id" :label="mall.mall_name" :value="mall.mall_id"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="商户名称">
            <el-input v-model="formInline.customer_name" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="合同编号">
            <el-input v-model="formInline.contract_code" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="押金编号">
            <el-input v-model="formInline.contract_deposit_code" clearable/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button class="searchBtn" type="primary" @click="searchForm('formInline')">查 询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="padding: 0 10px;">
      <el-col :span="10">
        <blockquote class="elem_quote">商户押金列表</blockquote>
        <div class="contract_table">
          <el-table
            ref="table"
            :height="height.heightOne"
            :data="tableData"
            :show-overflow-tooltip="true"
            highlight-current-row
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="getRadio"
            @row-click="clickRow">
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="corp_name"
              min-width="100"
              label="商管公司"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="customer_code"
              min-width="100"
              label="商户编号"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="customer_name"
              min-width="100"
              label="商户名称"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="account_balance"
              min-width="120"
              label="可用押金余额"/>
          </el-table>
          <el-pagination
            :page-sizes="[20, 30, 40, 50]"
            :current-page.sync="currentPage"
            :total="total.totalOne"
            :page-size="20"
            background
            layout="prev, pager, next, total, sizes"
            @current-change="pagination"
            @size-change="handleSizeChange"/>
        </div>
      </el-col>
      <el-col :span="14">
        <blockquote class="elem_quote">
          <span class="btn" @click="depositHandle">押金处理</span>
          <span class="btn" @click="depositMake">押金补齐</span>
          <span class="btn" @click="amendTime">修改立账日期</span>
        </blockquote>
        <el-form ref="searchData" :model="searchData" label-width="100px" class="demo-ruleForm">
          <el-row>
            <el-col :span="9">
              <el-form-item label="收费单号">
                <el-input v-model="searchData.customer_name" clearable/>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="是否同步">
                <el-select v-model="searchData.mall_id" clearable>
                  <el-option label="全部" value=""/>
                  <el-option label="否" value="0"/>
                  <el-option label="是" value="1"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button class="searchBtn" type="primary" @click="searchList('searchData')">查 询</el-button>
            </el-col>
          </el-row>
        </el-form>
        <div class="contract_table depositType">
          <el-table
            ref="tableOne"
            :height="height.heightTwo"
            :data="tableDataOne"
            :show-overflow-tooltip="true"
            highlight-current-row
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="getRadioTwo"
            @row-click="clickRowTwo">
            <el-table-column
              type="selection"
              width="55"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="contract_deposit_code"
              min-width="100"
              label="编号"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="contract_code"
              min-width="100"
              label="合同编号"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="invoice_pay_code"
              min-width="100"
              label="收费单号"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="charge_description"
              min-width="100"
              label="押金类型"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="pay_amount"
              min-width="100"
              label="押金金额"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="balance"
              min-width="100"
              label="押金余额"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="fill_amount"
              min-width="100"
              label="已补押金"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="account_date"
              min-width="100"
              label="立账日期"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="sync_tag"
              min-width="100"
              label="是否同步">
              <template slot-scope="scope">
                <span v-if="scope.row.sync_tag == 0">否</span>
                <span v-else-if="scope.row.sync_tag == 1">是</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="sync_date"
              min-width="120"
              label="同步日期"/>
          </el-table>
          <el-pagination
            :page-sizes="[20, 30, 40, 50]"
            :current-page.sync="currentPage"
            :total="total.totalTwo"
            :page-size="20"
            background
            layout="prev, pager, next, total, sizes"
            @current-change="pagination"
            @size-change="handleSizeChange"/>
        </div>
        <blockquote class="elem_quote">商户押金变动日志</blockquote>
        <div class="contract_table">
          <el-table
            ref="tableTwo"
            :height="height.heightThree"
            :data="tableDataTwo"
            :show-overflow-tooltip="true"
            highlight-current-row
            border
            tooltip-effect="dark"
            style="width: 100%">
            <!--<el-table-column-->
              <!--:show-overflow-tooltip="true"-->
              <!--prop="fee_amt"-->
              <!--min-width="80"-->
              <!--label="明细">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button type = "text" size="small" @click.native.prevent="checkDetail(scope.$index, tableDataTwo)">明 细</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              :show-overflow-tooltip="true"
              prop="process_type"
              min-width="100"
              label="变动类型">
              <template slot-scope="scope">
                <span v-if="scope.row.process_type == 1">返还</span>
                <span v-else-if="scope.row.process_type == 2">扣款</span>
                <span v-else-if="scope.row.process_type == 3">转付款</span>
                <span v-else-if="scope.row.process_type == 4">补齐</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="processing_amount"
              min-width="100"
              label="变动金额"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="available_balance"
              min-width="100"
              label="余额"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="processing_time"
              min-width="120"
              label="变动日期"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="pay_name"
              min-width="120"
              label="押金支付方式"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="added_by"
              min-width="120"
              label="操作人">
              <template slot-scope="scope">
                <span v-if="scope.row.added_by == 0">张瑞</span>
                <span v-else-if="scope.row.added_by == 1">李琳</span>
              </template>
            </el-table-column>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="status"
              min-width="120"
              label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">无效</span>
                <span v-else-if="scope.row.status == 1">草稿</span>
                <span v-else-if="scope.row.status == 2">审批中</span>
                <span v-else-if="scope.row.status == 3">已审批</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
    <!--押金补齐弹窗-->
    <el-dialog
      :visible.sync="dialogVisible.three"
      :close-on-click-modal="false"
      title="押金补齐"
      top="5%"
      width="40%">
      <el-form :model="depositForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="押金金额">
          <el-input v-model="depositForm.mall_name" type="number" disabled/>
        </el-form-item>
        <el-form-item label="已收押金">
          <el-input v-model="depositForm.mall_name" type="number" disabled/>
        </el-form-item>
        <el-form-item label="押金余额">
          <el-input v-model="depositForm.mall_name" type="number" disabled/>
        </el-form-item>
        <el-form-item label="已补金额">
          <el-input v-model="depositForm.mall_name" type="number" disabled/>
        </el-form-item>
        <el-form-item label="补齐金额">
          <el-input v-model="depositForm.mall_name" type="number"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savedeposit('depositForm')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--押金处理弹窗-->
    <el-dialog
      :visible.sync="dialogVisible.one"
      :close-on-click-modal="false"
      title="押金处理"
      top="5%"
      width="40%"
      @close="close()">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rulesTwo" label-width="140px" class="demo-ruleForm">
        <el-form-item label="处理方式" prop="process_type">
          <el-select v-model="ruleForm.process_type">
            <el-option :value="1" label="返还"/>
            <el-option :value="2" label="扣款"/>
            <el-option :value="3" label="转付款"/>
            <el-option :value="4" label="补齐"/>
          </el-select>
        </el-form-item>
        <el-form-item label="余额">
          <el-input v-model="ruleForm.num" type="number" disabled/>
        </el-form-item>
        <el-form-item label="处理金额" prop="processing_amount">
          <el-input v-model="ruleForm.processing_amount" type="number"/>
        </el-form-item>
        <el-form-item label="处理人">
          <el-input v-model="ruleForm.customer_id" :readonly="true"/>
        </el-form-item>
        <el-form-item label="处理日期">
          <el-input v-model="ruleForm.newTime" :readonly="true"/>
        </el-form-item>
        <el-form-item label="押金支付大类">
          <el-select v-model="ruleForm.pay_in_type" @change="getPayWay">
            <el-option v-for="item in getPayTypeList" :key="item.pay_type_id" :label="item.pay_type_name" :value="item.pay_type_id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="押金支付方式" prop="pay_id">
          <el-select v-model="ruleForm.pay_id" @focus="getFirst">
            <el-option v-for="item in getPayWayList" :key="item.pay_id" :label="item.pay_name" :value="item.pay_id"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveRuleForm('ruleForm')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--立账日期弹框-->
    <el-dialog
      v-if="dialogVisible.two"
      :visible.sync="dialogVisible.two"
      :close-on-click-modal="false"
      title="修改立账日期"
      top="5%"
      width="50%">
      <AmendTime :time-one="timeOne" @changeTime="changeTime"/>
    </el-dialog>
  </el-main>
</template>

<script>
import building from '@/utils/building';
import { common } from '@/common/common';
import AmendTime from '@/components/order/amendTime';
export default {
  name: 'BusinessDeposit',
  components: { AmendTime },
  data() {
    return {
      formInline: {}, // 搜索内容表单
      ruleForm: { process_type: 1, processing_amount: 0, pay_id: '', num: 0, customer_id: 'test', newTime: '', pay_in_type: '' }, // 押金处理
      searchData: {}, // 商户押金列表详情
      depositForm: {}, // 押金补齐
      mall_name: [], // 门店信息
      height: {
        heightOne: window.innerHeight - 280 + 'px',
        heightTwo: window.innerHeight - 650 + 'px',
        heightThree: window.innerHeight - 748 + 'px'
      },
      timeOne: {}, // 传给立账日期的对象
      businessList: {}, // 点击当前行查询的信息
      businessListTwo: {}, // 点击当前行查询的详细信息
      getPayTypeList: [], // 获取的支付大类信息
      getPayWayList: [], // 获取支付方式的信息
      tableData: [], // 商户押金列表
      tableDataOne: [], // 商户押金详细俩表
      tableDataTwo: [], // 押金变动日志
      total: {
        totalOne: 0,
        totalTwo: 0,
        totalThree: 0
      },
      dialogVisible: {
        one: false, // 押金处理弹窗
        two: false, // 立账日期弹窗
        three: false // 押金补齐弹窗
      },
      currentPage: 1, // 页码
      rulesTwo: {
        pay_id: [{ required: true, message: '请选择支付方式', trigger: 'blur' }],
        process_type: [{ required: true, message: '请选择处理方式', trigger: 'blur' }],
        processing_amount: [{ required: true, message: '请填写处理金额', trigger: 'blur' }]
      }
    };
  },
  created() {
    building.Mall(this); // 先获取门店数据
    building.getPayType(this); // 获取支付大类
    const searchHistory = common.get('depositList');
    if (searchHistory != null) {
      this.formInline = searchHistory.search;
      common.getPreData(this.formInline, 'ContractDeposit/getList', this, 'depositList');
    }
  },
  methods: {
    searchForm() { // 查询商户押金列表
      const data = this.formInline;
      data.limit = 20;
      common.getPreData(data, 'ContractDeposit/getList', this, 'depositList');
      common.set('depositList', { 'search': data });
    },
    searchList() { // 商户押金列表详情查询
      this.http.post('ContractDeposit/getListDetail', {
        mall_id: this.businessList.mall_id,
        cust_id: this.businessList.cust_id,
        sync_tag: this.searchData.sync_tag,
        contract_deposit_code: this.searchData.contract_deposit_code
      }).then(res => {
        this.tableDataOne = res.data.data;
        this.tableDataOne.length < 1 && this.$message.warning('暂无数据');
      });
    },
    clickRow(row) { // 点击table的row获取当前行数据
      this.$refs.table.toggleRowSelection(row);
      this.businessList = row;
      console.log(row);
      this.http.post('ContractDeposit/getListDetail', { mall_id: row.mall_id, cust_id: row.cust_id }).then(res => {
        this.tableDataOne = res.data.data;
        this.tableDataOne.length < 1 && this.$message.warning('暂无数据');
      });
    },
    clickRowTwo(row) {
      this.businessListTwo = row;
      this.$refs.tableOne.toggleRowSelection(row);
      console.log(row);
      this.http.post('DepositProcess/getList', { contract_deposit_id: this.businessListTwo.id }).then(res => {
        this.tableDataTwo = res.data.data;
      });
    },
    getRadio(row) { // 去除多选
      building.radioBtnTwo(row, this.$refs.table);
    },
    getRadioTwo(row) { // 去除多选
      building.radioBtnTwo(row, this.$refs.tableOne);
    },
    depositHandle() { // 押金处理
      if (Object.keys(this.businessListTwo) == 0) {
        this.$message.warning('请选择一行数据');
      } else {
        this.dialogVisible.one = true;
        this.ruleForm.newTime = building.getNowFormatDate(); // 处理时间
        this.ruleForm.customer_id = 'test'; // 处理人
        this.http.post('ContractDeposit/getMoney', { id: this.businessListTwo.id }).then(res => {
          this.ruleForm.num = res.data.data;
        });
      }
    },
    getFirst() { // 点击支付方式
      this.ruleForm.pay_in_type || this.$message.error('请先选择支付大类！');
    },
    depositMake() { // 押金补齐
      if (Object.keys(this.businessListTwo) == 0) {
        this.$message.warning('请选择一行数据');
      } else {
        this.dialogVisible.three = true;
      }
    },
    amendTime() { // 修改立账日期
      if (Object.keys(this.businessListTwo) == 0) {
        this.$message.warning('请选择一行数据');
      } else if (this.businessListTwo.sync_tag == 1) {
        this.$message.warning('已经同步数据，无法操作!');
      } else {
        this.dialogVisible.two = true;
        this.timeOne = { account_date: this.businessListTwo.account_date, url: 'ContractDeposit/editAccountDate', id: this.businessListTwo.id };
      }
    },
    changeTime(data) { // 关闭立账日期弹窗，刷新数据
      this.dialogVisible.two = data;
    },
    saveRuleForm(formName) { // 押金处理保存
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (parseInt(this.ruleForm.processing_amount) > parseInt(this.ruleForm.num) || parseInt(this.ruleForm.processing_amount) == 0) {
            this.$message.warning('处理金额必须小余额且不能为 0');
          } else {
            const List = {};
            List.id = this.businessListTwo.id;
            List.process_type = this.ruleForm.process_type;
            List.processing_amount = parseInt(this.ruleForm.processing_amount);
            List.pay_id = this.ruleForm.pay_id;
            this.http.post('ContractDeposit/handle', List).then(res => {
              this.$message.success('添加成功！');
              this.dialogVisible.one = false;
            });
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
    close() { // 处理弹框回调
      this.$refs.ruleForm.resetFields();
      this.form = {};
    },
    savedeposit() { // 押金补齐保存

    },
    checkDetail() { // 明细

    },
    pagination(val) { // 分页功能
      const data = this.formInline;
      data.page = val;
      common.getPreData(data, 'ContractDeposit/getList', this, 'depositList');
      common.set('depositList', { 'search': data });
    },
    handleSizeChange(val) {
      const data = this.formInline;
      data.limit = val;
      common.getPreData(data, 'ContractDeposit/getList', this, 'depositList');
      common.set('depositList', { 'search': data });
    },
    getPayWay(index) { // 根据门店和支付大类获取支付方式
      this.ruleForm.pay_id = '';
      this.http.post('order_pay/getPayByStoreAndType', { mall_id: this.businessListTwo.mall_id, pay_type_id: index }).then(res => {
        this.getPayWayList = res.data.data;
      });
    }
  }
};
</script>

<style scoped>
  .btn{color: #38f;padding-left: 10px;cursor:pointer;}
  .searchBtn{ margin-left: 10px; }
  .depositType{margin-bottom: 7px;}
</style>
