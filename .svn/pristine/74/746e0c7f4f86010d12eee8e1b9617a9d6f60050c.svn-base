<template>
  <div>
    <el-form :model="detailList" label-width="100px" class="demo-ruleForm">
      <blockquote class="elem_quote">订单收款查看</blockquote>
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单编号">
            <el-input v-model="detailList.order_code" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商铺编号">
            <el-input v-model="detailList.store_code" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商铺名称">
            <el-input v-model="detailList.store_name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单日期">
            <el-input v-model="detailList.order_date" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="订单金额">
            <el-input v-model="detailList.total_amt" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="已付款金额">
            <el-input v-model="detailList.paid_amt" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="配送状态">
            <el-select v-model="detailList.deliver_status" :disabled="true" placeholder="请选择">
              <el-option value="0" label="未配送"/>
              <el-option value="1" label="部分配送"/>
              <el-option value="2" label="已配送"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="配送日期">
            <el-input v-model="detailList.deliver_date" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <blockquote class="elem_quote">本次付款信息</blockquote>
      <el-row>
        <el-col :span="6">
          <el-form-item label="付款编号">
            <el-input v-model="detailList.pay_code" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收款人">
            <el-select v-model="detailList.created_by" :disabled="true" placeholder="请选择">
              <el-option value="0" label="张瑞"/>
              <el-option value="1" label="李琳"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收款日期">
            <el-input v-model="detailList.pay_time" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="订单状态">
            <el-select v-model="detailList.paid_status" :disabled="true" placeholder="请选择">
              <el-option value="0" label="未付款"/>
              <el-option value="1" label="首付款完成"/>
              <el-option value="2" label="付款完成"/>
              <el-option value="3" label="部分收款完成"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="支付金额">
            <el-input v-model="detailList.pay_amt" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手续费">
            <el-input v-model="detailList.cash_discount" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="抹零金额">
            <el-input v-model="detailList.fee_amt" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="收款总额">
            <el-input v-model="detailList.net_amt" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="付款方式">
            <el-input v-model="detailList.pay_name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="终端编号">
            <el-input v-model="detailList.eft_terminal_id" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批次号">
            <el-input v-model="detailList.eft_batch_id" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="流水号">
            <el-input v-model="detailList.related_number" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <blockquote class="elem_quote">代收款信息</blockquote>
      <el-row>
        <el-col :span="6">
          <el-form-item label="待收款状态">
            <el-input v-model="detailList.role_name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="代收款编号">
            <el-input v-model="detailList.role_name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="代收款日期">
            <el-input v-model="detailList.role_name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="处理状态">
            <el-input v-model="detailList.role_name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'CheckGathering',
  props: {
    detailList: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style scoped>

</style>
