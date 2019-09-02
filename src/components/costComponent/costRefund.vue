<template>
  <!--订单收款的弹窗-->
  <div class="innerWrap">
    <div v-if="costSearchDisabled">
      <el-form :model="costSearch" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="门店选择">
              <el-select v-model="costSearch.mall_id" clearable placeholder="请选择">
                <el-option
                  v-for="(item,index) in preData.mall"
                  :key="index"
                  :label="item.mall_name"
                  :value="parseInt(item.mall_id)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同编号">
              <el-input v-model="costSearch.contract_code" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同类型">
              <el-select v-model="costSearch.invoice_contract_type" clearable placeholder="请选择">
                <el-option
                  v-for="(item,index) in preData.contract_type"
                  :key="index"
                  :label="item.values_name"
                  :value="parseInt(item.values_code)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同状态">
              <el-input v-model="costSearch.balance_processing" clearable/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="商铺编号">
              <el-input v-model="costSearch.store_code" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商铺名称">
              <el-input v-model="costSearch.store_id" clearable/>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="账单编号">
              <el-input v-model="costSearch.invoice_code" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款状态">
              <el-select v-model="costSearch.paid_status" clearable placeholder="请选择">
                <el-option label="请选择" value=""></el-option>
                <el-option label="未收款" :value="0"></el-option>
                <el-option label="部分收款" :value="1"></el-option>
                <el-option label="全部收款" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="商户编号">
              <el-input v-model="costSearch.customer_code" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="商户名称">
              <el-input v-model="costSearch.customer_name" clearable/>
            </el-form-item>
          </el-col>
          <el-col :span="6" align="center">
            <el-button align="center" type="primary" @click="onSecher()">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row>
      <el-col v-if="costSearchDisabled" :span="costSearchDisabled == false ? 0 : 8">
        <div class="leftTable">
          <el-table
            ref="multipleTable"
            :data="tableData"
            :show-overflow-tooltip="true"
            border
            tooltip-effect="dark"
            @row-click="clickRow"
            @selection-change="changFun"
            style="width: 100%">
            <el-table-column
              type="selection"
              fixed
              width="55"/>
            <el-table-column
              :show-overflow-tooltip="true"
              prop="invoice_code"
              min-width="110"
              label="账单号"/>
            <el-table-column
              prop="account_month"
              min-width="100"
              label="会计期"/>
            <el-table-column
              prop="store_code"
              min-width="100"
              label="商铺编号"/>
            <el-table-column
              prop="store_name"
              min-width="140"
              label="商铺名称"/>
            <el-table-column
              prop="contract_code"
              min-width="150"
              label="合同编号"/>
            <el-table-column
              prop="net_amount"
              min-width="100"
              label="应付款金额"/>
            <el-table-column
              prop="no_pay_money"
              min-width="100"
              label="未付款金额"/>
            <el-table-column
              prop="paid_amount"
              min-width="100"
              label="已收款金额"/>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="60">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click.native.prevent="costViewList(scope.row)">
                  查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="costSearchDisabled == false ? 24 : 16">
        <div class="rightTable">
          <blockquote class="elem_quote">本次{{implementTitle}}信息</blockquote>
          <el-form  ref="costRefunds" :model="costRefund" :rules="costRefunds" label-width="100px" class="demo-ruleForm">
            <el-row>
              <el-col :span="6">
                <el-form-item label="商户名称" tabindex="-1">
                  <el-input v-model="costRefund.customer_name" clearable :readonly="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="可用金额">
                  <el-input v-model="costRefund.money" clearable :readonly="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item :label="implementStatus+'来源'" prop="payment_type">
                  <el-select v-model="costRefund.payment_type" clearable placeholder="请选择">
                    <el-option label="直接付款 " value="1"></el-option>
                    <el-option label="押金转付款" value="2"></el-option>
                    <el-option label="商户余额转付款" value="3"></el-option>
                    <el-option label="银行POS返款转付款" value="4"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6" >
                <el-form-item label="余额处理方式" class="width_110" prop="balance_process_way">
                  <el-select v-model="costRefund.balance_process_way" clearable placeholder="请选择">
                    <el-option label="找零" value="1"></el-option>
                    <el-option label="转存余款账户" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="录入日期">
                  <el-input v-model="costRefund.time" clearable :readonly="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="退款人">
                  <el-input v-model="costRefund.refundable" clearable :readonly="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="立账日期" prop="accounts_date">
                  <el-date-picker
                    v-model="costRefund.accounts_date"
                    value-format="yyyy-MM-dd"
                    clearable
                    @change="accountsDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="录入人">
                  <el-input v-model="costRefund.etry_person" :readonly="true"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="退款总额">
                  <el-input v-model="refundMoney" :readonly="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="备注">
                  <el-input v-model="costRefund.remark" clearable/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <blockquote class="elem_quote">账单明细</blockquote>
          <div class="tableRefund">
            <el-table
              ref="tableFour"
              :data="costDetailTable"
              :show-overflow-tooltip="true"
              border
              tooltip-effect="dark"
              style="width: 100%;">
              <el-table-column
                prop="charge_type_id"
                :show-overflow-tooltip="true"
                width="120"
                label="费用类型">
              </el-table-column>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="invoice_detail_code"
                min-width="120"
                label="账单编号"/>
              <el-table-column
                prop="month_name"
                min-width="100"
                label="会计期"/>
              <el-table-column
                prop="charge_from"
                min-width="120"
                label="费用开始日期"/>
              <el-table-column
                prop="charge_to"
                min-width="120"
                label="费用结束日期"/>
              <el-table-column
                prop="net_charge_amount"
                min-width="100"
                label="应收金额"/>
              <el-table-column
                prop="charged_amount"
                min-width="100"
                label="已收金额"/>
              <el-table-column
                prop="no_pay"
                min-width="100"
                label="未收金额"/>
              <el-table-column
                fixed="right"
                prop="edit_no_pay"
                min-width="120"
                :label="'本次'+implementStatus+'金额'">
                <template slot-scope="scope">
                  <el-input size="small" type="number" v-model="scope.row.edit_no_pay" placeholder="请输入内容"
                            @change="editFcous(scope.$index, scope.row)"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <blockquote class="elem_quote">支付方式</blockquote>
          <div class="btn_bottom">
            <el-button :autofocus="true" type="primary" :disabled="refundMoneyDisabled" @click="addPayWay">
              新增支付方式
            </el-button>
            <el-button :autofocus="true" type="primary" :disabled="refundMoneyDisabled" @click="addPayWay('2')">
              支付宝
            </el-button>
            <el-button :autofocus="true" type="primary" :disabled="refundMoneyDisabled" @click="addPayWay('1')">
              微信
            </el-button>
            <el-button :disabled="paymentConfi" type="primary" @click="isPay('costRefunds')">付款确认</el-button>
          </div>
          <div class="tableRefund">
            <el-table
              ref="tableFive"
              :data="tableDataFive"
              :show-overflow-tooltip="true"
              border
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="55"/>
              <el-table-column
                :show-overflow-tooltip="true"
                prop="pay_name"
                min-width="100"
                label="支付方式"/>
              <el-table-column
                prop="money"
                min-width="100"
                label="付款金额"/>
              <el-table-column
                prop="fee_amt"
                min-width="100"
                label="手续费"/>
              <el-table-column
                fixed="right"
                label="操作"
                min-width="120">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click.native.prevent="deletePayWay(scope.$index, tableDataFive)">
                    删除支付方式
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--新增支付方式弹窗-->
    <el-dialog
      :visible.sync="innerVisibleSecond"
      top="5%"
      width="40%"
      title="新增支付方式"
      append-to-body
      @close="handleClose('payWayForm')">
      <el-form ref="payWayForm" :model="payWayForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="应付金额">
          <el-input v-model="payWayForm.paying_amt" ref="getPayWayChang" readonly/>
        </el-form-item>
        <el-form-item label="支付大类">
          <el-select v-model="payWayForm.pay_type_id" clearable @change="getPayWay">
            <el-option v-for="item in getPayTypeList" :key="item.pay_type_id" :label="item.pay_type_name"
                       :value="item.pay_type_id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式" prop="pay_id">
          <el-select v-model="payWayForm.pay_id" clearable @change="currentSel">
            <el-option v-for="item in getPayWayList" :key="item.pay_id" :label="item.pay_name" :value="item.pay_id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="本次付款金额" class="label_required width_110" prop="money">
          <el-input v-model="payWayForm.money" clearable type="number" @input="payWayFormMoney"/>
        </el-form-item>
        <el-form-item label="手续费">
          <el-input v-model="payWayForm.fee_amt" clearable type="number"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePayWay('payWayForm')">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { common } from '@/common/common'

  var reg = /^\d{1,10}(\.\d{1,2})?$/
  export default {
    name: 'costRefund',
    props: ['checkData', 'costName', 'invoiceHeaderId', 'cost'],
    watch: {
      costName: function(newVal, oldVal) {
        if (newVal == '账单退款') {
          this.implementStatus = '退款'
          this.implementTitle = '本次退款信息'
        } else {
          this.implementStatus = '收款'
          this.implementTitle = '收款'
        }
      },
      invoiceHeaderId(newVal, oldVal) {
        this.getDetail(newVal)
      },
      cost(newVal, oldVal) {
        if (newVal == 'cost') {
          this.costSearchDisabled = false
        } else {
          this.costSearchDisabled = true
        }
      }
    },
    computed: {
      act() {
        return this.$store.getters.act
      }
    },
    data() {
      return {
        costRefund: {},
        costSearch: {},// 查询
        preData: [],
        tableData: [],
        costSearchDisabled: true, // 查询隐藏
        inputColumn1: '',
        tableDataFive: [], // 新增支付方式表格
        costDetailTable: [],// 账单明细表格
        innerVisibleSecond: false,// 新增支付方式
        paymentConfi: true,// 付款确认
        refundMoneyDisabled: true, // 新增付款方式
        payWayForm: {pay_id:'',money:''},// 新增付款表单
        getPayTypeList: [], // 获取的支付大类信息
        getPayWayList: [], // 获取支付方式的信息
        money: '',
        rules: {
          pay_id: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
          money: [{ required: true, message: '请选择支付方式', trigger: 'blur' }]
        },
        costRefunds: {
          payment_type: [{ required: true, message: '请选择收款来源', trigger: 'change' }],
          balance_process_way: [{ required: true, message: '请选择余额处理方式', trigger: 'change' }],
          accounts_date: [{ required: true, message: '请选择立账日期', trigger: 'change' }]
        },
        pay_name: '', // 支付name
        charge_rate: 0, // 手续费
        refundMoney: 0, // 退款金额
        totalMoney: 0, // 新增金额总数
        implementStatus: '',
        implementTitle: '',
        payingAmt: 0, //新增支付方式应金额
        no_pay: 0,
        checkDataList: []
      }
    },
    created() {
      this.getData()// 预加载数据
      this.getPayType()
      if (this.costName == '账单退款') {
        this.implementStatus = '退款'
        this.implementTitle = '退款'
      } else {
        this.implementStatus = '收款'
        this.implementTitle = '收款'
      }
      if (this.cost == 'cost') {
        this.costSearchDisabled = false
        this.getDetail(this.invoiceHeaderId)
      } else {
        this.costSearchDisabled = true
      }

    },
    methods: {
      clickRow(row) {//选择当前行
        this.$refs.multipleTable.toggleRowSelection(row)
        this.checkDataList = row
        // if(row.no_pay_money != 0) {
        this.getDetail(row.invoice_header_id)
        this.invoiceHeaderId = row.invoice_header_id
        // }
      },
      changFun(row) {//获取当前行数据
        if (row.length > 1) { //去除多选
          this.$refs.multipleTable.clearSelection()
          this.$refs.multipleTable.toggleRowSelection(row.pop())
        }else {
          if(row.length != 0) {
            this.checkDataList = row[0];
          }
        }
      },
      getData() {//预渲染参数
        this.http.post('table_util/getPreData',  { act: 'contract' }).then(res => {
          this.preData = res.data.data
        }).catch((err) => {
          this.$message.error(err.response.data.msg);
        });
      },
      // 获取详情
      getDetail(data) {
        let that = this
        this.http.post('Bill/getBillDetail',  { invoice_header_id: data }).then(res => {
          that.costRefund = res.data.data.main
          res.data.data.list.forEach(item => {
            item['edit_no_pay'] = ''
          })
          that.costDetailTable = res.data.data.list// 订单信息
          that.costRefund.time = common.currentDate()
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      onSecher() {
        let that = this
        if (this.costSearch.store_code != undefined || this.costSearch.invoice_code != undefined || this.costSearch.contract_code != undefined) {
          that.http.post('InvoiceHeader/getList', { mall_id: data }).then(res => {
            that.tableData = res.data.data
          }).catch((err) => {
            that.$message.error(err.response.data.msg);
          });

        } else {
          this.$message.error('合同编号、商铺编号、账单编号不能同时为空')
        }
      },
      // 编辑框失去焦点
      editFcous(index, row) {
        this.payingAmt = 0
        this.costDetailTable.forEach((item, i) => {
          let data = this.costDetailTable[i]
          if (data.edit_no_pay == undefined || data.edit_no_pay == '') data.edit_no_pay = 0
          const valueMoney = parseFloat(data.net_charge_amount) - parseFloat(data.charged_amount)
          if (valueMoney >= 0) {// 收款
            if (data.edit_no_pay > valueMoney) {
              data.edit_no_pay = valueMoney
              this.$message({ message: '请填写输入正确金额', type: 'error' })
            }
          } else {// 退款
            if (data.edit_no_pay > Math.abs(valueMoney)) {
              data.edit_no_pay = Math.abs(valueMoney)
              this.$message({ message: '请填写输入正确金额', type: 'error' })
            }
          }
          if (!reg.test(data.edit_no_pay)) {
            this.$message.error('请保留两位小数')
            data.edit_no_pay = Math.round(data.edit_no_pay * 100) / 100
          }

          this.payingAmt += parseFloat(data.edit_no_pay)
        })
        if (this.payingAmt >= 0) { // 判断新增支付方式后是否修改过退款金额 如修改小于退款总额情况支付方式及退款总额
          if (this.payingAmt < this.refundMoney) {
            this.$message({ message: '请填写输入正确金额', type: 'error' })
            this.tableDataFive = []
            this.refundMoney = 0
          }
        }
        if (this.payingAmt != 0) {
          this.refundMoneyDisabled = false
        }
      },
      // 新增支付方式
      addPayWay(data) {
        if(data == 2) {
          this.getPayWay(2,'wx');
          this.payWayForm.pay_type_id = data;
        }else if(data == 1) {
          this.getPayWay(1,'wx');
          this.payWayForm.pay_type_id = data;
        }
        this.payWayForm.paying_amt = parseFloat(this.payingAmt) - parseFloat(this.refundMoney)
        this.innerVisibleSecond = true
      },
      // 删除支付方式
      deletePayWay(index, rows) {
        rows.splice(index, 1)
        let money = 0
        this.tableDataFive.forEach(item => {
          money += parseFloat(item.money)
        })
        this.refundMoney = money
        this.addPayList()
      },
      // 立账日期
      accountsDate(val) {
        this.costRefund.accountsDate = val
      },
      // 关闭新增支付方式
      handleClose(formName) {
        this.$refs[formName].resetFields();
        this.payWayForm.pay_type_id = '';
        this.payWayForm.pay_id = '';
        this.payWayForm.money = '';
        this.payWayForm.fee_amt = '';
        this.getPayWayList = [];
      },
      // 获取支付大类
      getPayType() {
        this.http.post('order_pay/getPayType').then(res => {
          this.getPayTypeList = res.data.data
        }).catch((err) => {
          this.$message.error(err.response.data.msg)
        });
      },
      getPayWay(index,val) { // 根据门店和支付大类获取支付方式
        this.http.post('order_pay/getPayByStoreAndType',{ mall_id: 1, pay_type_id: index }).then(res => {
          this.getPayWayList = res.data.data;
          if(val) {
            this.payWayForm.pay_id = res.data.data[0].pay_id;
          }
        }).catch((err) => {
          this.$message.error(err.response.data.msg)
        });
      },
      // 本次付款金额
      payWayFormMoney(val) {
        if (this.payWayForm.paying_amt > 0) {
          if (parseFloat(val) > parseFloat(this.payWayForm.paying_amt)) {
            this.$message({ message: '请输入正确金额！', type: 'error' })
            this.payWayForm.money = this.payWayForm.paying_amt
          }
          this.payWayForm.fee_amt = parseFloat(this.payWayForm.money * this.charge_rate).toFixed(2)
        }
        if (!reg.test(this.payWayForm.money)) {
          this.$message.error('请保留两位小数')
          this.payWayForm.money = Math.round(this.payWayForm.money * 100) / 100
        }
      },
      // 获取手续费率
      currentSel(selVal) {
        this.getPayWayList.forEach(v => {
          if (v.pay_id == selVal) {
            this.pay_name = v.pay_name
            this.charge_rate = v.charge_rate
            if (this.payWayForm.money != undefined && this.payWayForm.money != '') {
              this.payWayForm.fee_amt = parseFloat(this.payWayForm.money * v.charge_rate).toFixed(2)
            }
          }
        })
      },
      //保存新增支付方式
      savePayWay(formName) { // 新增支付方式保存
        this.refundMoney = 0;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (parseFloat(this.payWayForm.money) > parseFloat(this.payWayForm.paying_amt)) {
              this.$message({ message: '金额不能大于退款金额！', type: 'error' });
            } else {
              this.payWayForm.pay_name = this.pay_name;
              this.tableDataFive.push(JSON.parse(JSON.stringify(this.payWayForm)));
              this.tableDataFive.forEach((index, i) => {
                this.refundMoney += parseFloat(index.money);
              });
              this.payWayForm.paying_amt = parseFloat(this.totalMoney) - parseFloat(this.refundMoney);
              this.handleClose(formName);
              this.innerVisibleSecond = false;
              this.addPayList();
            }
          } else {
            this.$message({
              message: '请输入完整信息！！！',
              type: 'warning'
            })
          }
        })
      },
      // 判断本次退款金额和支付金额
      addPayList() {
        if (parseFloat(this.refundMoney) == parseFloat(this.payingAmt)) {
          this.refundMoneyDisabled = true;
          this.paymentConfi = false;
        } else {
          this.refundMoneyDisabled = false;
          this.paymentConfi = true;

        }
      },
      // 付款确认
      isPay(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let isPayDetail = [], payFive = [];
            let that = this;
            // 账单明细
            this.costDetailTable.forEach((item, i) => {
              let isPayDetailObj = {}
              if (this.costName == '账单退款') {
                isPayDetailObj = {
                  money: '-' + item.edit_no_pay,
                  invoice_detail_id: item.invoice_detail_id
                }
              } else {
                isPayDetailObj = {
                  money: item.edit_no_pay,
                  invoice_detail_id: item.invoice_detail_id
                }
              }
              isPayDetail.push(isPayDetailObj);
            })
            // 支付方式
            this.tableDataFive.forEach((item, i) => {
              let payFiveObj = {}
              if (this.costName == '账单退款') {
                payFiveObj = {
                  pay_amount: '-' + item.money,
                  pay_id: item.pay_id
                }
              } else {
                payFiveObj = {
                  pay_amount: item.money,
                  pay_id: item.pay_id
                }
              }
              payFive.push(payFiveObj);
            });
            let remarks = this.costRefund.remark;
            if(remarks == null) {
              remarks = '';
            }
            let main = {
              main: {
                invoice_header_id: this.invoiceHeaderId,
                balance_process_way: this.costRefund.balance_process_way,
                payment_type: this.costRefund.payment_type,
                account_date: this.costRefund.accounts_date,
                pay_media_type: 1,
                remark: remarks,
              },
              detail: isPayDetail,
              pay_type: payFive
            }
            that.http.post('Bill/billCollection', { data: JSON.stringify(main) }).then(res => {
              that.$emit('billAdminIndex', res.data.error_code);
              that.$message.success('添加成功')
            }).catch((err) => {
              that.$message.error(err.response.data.msg)
            });

          }else {
            this.$message({
              message: '请输入完整信息！！！',
              type: 'warning'
            })
          }
        })


      },
      costViewList(row) {
        this.$emit('billAdminIndex', row)
      }
    }
  }
</script>

<style scoped>
  .demo-ruleForm > div  {
    margin-bottom: 25px !important;
  }
  .el-row > div > .el-form-item {
    margin-bottom: 5px !important;
  }
  .tableRefund {
    margin: 5px 10px;
  }

  .leftTable {
    padding: 1%;
  }

  .rightTable {
    border-left: 3px solid #d6d5d5;
    padding: 1%;
  }
</style>
