<template>
  <el-main :style="height">
    <el-form ref="ruleForm" :model="formInline" :rules="rules" label-width="180px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="编码" prop="pay_code">
            <el-input v-model="formInline.pay_code" placeholder="请输入编码" :disabled="view" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="名称" prop="pay_name">
            <el-input v-model="formInline.pay_name" placeholder="请输入名称" :disabled="view" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="门店">
            <el-input v-model="formInline.mall_name" placeholder="请输入名称" disabled clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付大类" prop="getPayTypeList">
            <el-select v-model="formInline.pay_type_name" placeholder="请选择支付大类" :disabled="view" clearable>
              <el-option v-for="getPay in getPayTypeList" :key="getPay.pay_type_id" :label="getPay.pay_type_name"
                         :value="getPay.pay_type_id"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="币种" prop="currency">
            <el-input v-model="formInline.icon_type"  disabled clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="价值金额" prop="value_price">
            <el-input type="number" v-model="formInline.value_price" placeholder="请输入价值金额" :disabled="view"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手续费购物中心承担比例"  prop="center_rate">
            <el-input v-model="formInline.center_rate" :disabled="view" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手续费门店承担比例" prop="mall_rate">
            <el-input type="number" v-model="formInline.mall_rate" placeholder="请输入价值金额" :disabled="view"
                      clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否允许找零" prop="ch_pay_over_paid">
            <el-radio-group v-model="formInline.ch_pay_over_paid" :disabled="view" clearable @change="chPayOver(1)">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否允许退货" prop="can_refund">
            <el-radio-group v-model="formInline.can_refund" :disabled="view" clearable @change="chPayOver(2)">
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="找零支付方式">
            <el-select v-model="formInline.change_type" placeholder="请选择门店名称" :disabled="giveChange">
              <el-option v-for="getPay in paymentMethod" :key="getPay.pay_type_id" :label="getPay.pay_name"
                         :value="getPay.pay_name"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="退货支付方式">
            <el-select v-model="formInline.refund_type" placeholder="请选择门店名称" :disabled="refundChange">
              <el-option v-for="getPay in paymentMethod" :key="getPay.pay_type_id" :label="getPay.pay_name"
                         :value="getPay.pay_name"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手续费计算方式" prop="rate_type">
            <el-select v-model="formInline.rate_type" placeholder="请选择手续费计算方式" :disabled="view" clearable>
              <el-option label="请选择" value=""/>
              <el-option label="无手续费" value="0"/>
              <el-option label="按支付方式手续费" value="1"/>
              <el-option label="按商铺支付方式" value="1"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手续费率（%）" prop="charge_rate">
            <el-input type="number" v-model="formInline.charge_rate" :disabled="view" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否手续费" prop="has_service_fee">
            <el-radio-group v-model="formInline.has_service_fee" :disabled="view" clearable>
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否允许超付" prop="is_over_pay">
            <el-radio-group v-model="formInline.is_over_pay" :disabled="view" clearable>
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否参与抽成" prop="is_pumped">
            <el-radio-group v-model="formInline.is_pumped" :disabled="view" clearable>
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否需要验证有效" prop="is_verify">
            <el-radio-group v-model="formInline.is_verify" :disabled="view" clearable>
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="是否国内卡" prop="is_china">
            <el-radio-group v-model="formInline.is_china" :disabled="view" clearable>
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否参与促销" prop="is_promotion">
            <el-radio-group v-model="formInline.is_promotion" :disabled="view" clearable>
              <el-radio label="1">是</el-radio>
              <el-radio label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手续费封顶金额" prop="total_rate">
            <el-input type="number" v-model="formInline.total_rate" :disabled="view" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="description">
            <el-input v-model="formInline.description" :disabled="view" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="float: right" v-if="!view">
      <el-button type="primary" @click="preservation('ruleForm')">确 定</el-button>
      <el-button @click="cancel('ruleForm')">取 消</el-button>
    </div>
  </el-main>
</template>

<script>
  import { common } from '@/common/common'
  import building from '@/utils/building'

  export default {
    name: 'payMode',
    props: {
      addList: {
        type: Object,
        default: function() {
        }
      }
    },
    data() {
      return {
        formInline: {
          icon_type:'人民币'
        },
        mall_name: [], // 门店信息
        getPayTypeList: [], // 获取支付大类
        paymentMethod: [], // 支付方式
        view: false,
        giveChange: true,
        refundChange: true,
        height: {
          height: window.innerHeight * 0.8 + 'px',
        },
        rules: {
          pay_code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
          pay_name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          pay_type_name: [{ required: true, message: '请选择支付大类', trigger: 'change' }],
          value_price: [{ required: true, message: '请输入价值金额', trigger: 'blur' }],
          center_rate: [{ required: true, message: '请输入手续费购物中心承担比例', trigger: 'blur' }],
          mall_rate: [{ required: true, message: '请输入手续费门店承担比例', trigger: 'blur' }],
          rate_type: [{ required: true, message: '请选择手续费计算方式', trigger: 'change' }],
          charge_rate: [{ required: true, message: '请选择手续费率（%）', trigger: 'blur' }],
          total_rate: [{ required: true, message: '请选择手续费封顶金额', trigger: 'blur' }],
          ch_pay_over_paid: [{ required: true, message: '请选择是否允许找零', trigger: 'change' }],
          can_refund: [{ required: true, message: '请选择是否允许退货', trigger: 'change' }],
          has_service_fee: [{ required: true, message: '请选择是否是否手续费', trigger: 'change' }],
          is_over_pay: [{ required: true, message: '请选择是否允许超付', trigger: 'change' }],
          is_pumped: [{ required: true, message: '请选择是否参与抽成', trigger: 'change' }],
          is_verify: [{ required: true, message: '请选择是否需要验证有效', trigger: 'change' }],
          is_china: [{ required: true, message: '请选择是否国内卡', trigger: 'change' }],
          is_promotion: [{ required: true, message: '请选择参与促销', trigger: 'change' }],
        }
      }
    },
    props: ['payModeId', 'payModeType','mallName'],
    watch: {
      payModeId: function(newVal, oldVal) {
        if (newVal != '') {
          this.viewPayData(newVal)
        }
      },
      payModeType: function(newVal, oldVal) {
        if (newVal == 1) {
          this.view = true
        } else {
          this.view = false
        }
      }
    },
    created() {
      this.formInline.mall_name = this.mallName.text;
      building.getPayType(this) // 先获取项目名称信息
      this.http.post('Sale/getPayTypeToName').then(res => { //支付方式
        this.paymentMethod =  res.data;
      }).catch((err) => {
        this.$message.error(err.response.data.msg);
      });
      if (this.payModeId != '') {
        this.viewPayData(this.payModeId)
      }
      if (this.payModeType == 1) {
        this.view = true
      } else {
        this.view = false
      }
    },
    methods: {
      viewPayData(data) {
        let that = this;
        that.http.post('Sale/payMentDetail', { pay_id: data}).then(res => {
          that.formInline = res.data.data;
          that.formInline.icon_type = '人民币';
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      refundCheckbox(val) {
        let checkbox = val
        if (val == 1 || val == 0) {
          checkbox = val == 1 ? true : false
        }
        this.refundChange = !checkbox
      },
      giveCheckbox(val) {
        let checkbox = val
        if (val == 1 || val == 0) {
          checkbox = val == 1 ? true : false
        }
        this.giveChange = !checkbox
      },
      chPayOver(type) {
        if(type == 1) {
          if(this.formInline.ch_pay_over_paid  == 1) {
            this.giveChange = false;
          }else {
            this.giveChange = true;
          }
        }else {
          if(this.formInline.can_refund == 1) {
            this.refundChange = false;
          }else {
            this.refundChange = true;
          }
        }
      },
      preservation(formName) { // 保存信息
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url , title;
            if(this.payModeId == '') {
              url = 'Sale/addPayMent';
              title="添加成功";
            }else {
              url='Sale/savePayMent';
              title="修改成功";
            }
            that.http.post(url,  that.formInline).then(res => {
              that.$message.success(title);
              setTimeout(function() {
                that.cancel();
              }, 500);
            }).catch((err) => {
              that.$message.error(err.response.data.msg);
            });
          } else {
            this.$message({
              message: '请输入完整信息！！！',
              type: 'warning'
            })
          }
        })
      },
      cancel() {
        this.$emit('payMode', false)
      }

    }
  }
</script>

<style scoped lang="scss">

  .el-checkbox {
    font-size: 14px;
    color: #606266;
    font-weight: 700 !important;
  }
</style>
