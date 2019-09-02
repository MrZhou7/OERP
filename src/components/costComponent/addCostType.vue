<template>
  <div class="addSubclass" :style="height">
    <el-form :model="newLists" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
      <el-form-item label="费用编码" prop="charge_code">
        <el-input v-model="newLists.charge_code" clearable></el-input>
      </el-form-item>
      <el-form-item label="费用名称" prop="charge_description">
        <el-input v-model="newLists.charge_description" clearable></el-input>
      </el-form-item>
      <el-form-item label="记账科目号" prop="account_code">
        <el-input v-model="newLists.account_code" clearable></el-input>
      </el-form-item>
      <el-form-item label="收支类型" prop="charge_type">
        <el-select v-model="newLists.charge_type" clearable>
          <el-option
            v-for="(item,index) in chargeTypeData"
            :key="index"
            :label="item.text"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属类型"  prop="parent_id">
        <el-select v-model="newLists.parent_id" clearable>
          <el-option label="默认 " :value="0"></el-option>
          <el-option
            v-for="(item,index) in tagsData"
            :key="index"
            :label="item.text"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属模块" prop="module">
        <el-select v-model="newLists.module" clearable>
          <el-option label="财务 " value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收费性质"  prop="charge_reason_type">
        <el-select v-model="newLists.charge_reason_type" clearable>
          <el-option label="固定费用" value="1"></el-option>
          <el-option label="临时费用" value="2"></el-option>
          <el-option label="代收费用" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票类型" prop="invoice_type">
        <el-select v-model="newLists.invoice_type"  clearable>
          <el-option label="服务发票" value="1"></el-option>
          <el-option label="租金发票" value="2"></el-option>
          <el-option label="代开发票" value="3"></el-option>
          <el-option label="收据" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有效" prop="enabled">
        <el-radio-group v-model="newLists.enabled" clearable>
          <el-radio label="0">否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="添加人">
        <el-input v-model="newLists.added_by" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="说明">
        <el-input type="textarea" v-model="newLists.type_desc" clearable></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="primary" @click="saveList('ruleForm')">保存</el-button>
        <el-button type="primary" @click="cancle()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rules: {
          charge_description: [
            { required: true, message: '请输入费用名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20 个字符以内', trigger: 'blur' }
          ],
          charge_code: [
            { required: true, message: '请输入费用编码', trigger: 'blur' },
          ],
          enabled: [ { required: true, message: '请选择是否有效', trigger: 'change' } ],
          parent_id: [ { required: true, message: '请选择所属类型', trigger: 'change' } ],
          module: [ { required: true, message: '请选择所属模块', trigger: 'change' } ],
          charge_type: [ { required: true, message: '请填写收支类型', trigger: 'change' } ],
          account_code: [ { required: true, message: '请选择记账科目号', trigger: 'change' } ],
          invoice_type: [ { required: true, message: '请选择发票类型', trigger: 'change' } ],
          charge_reason_type: [ { required: true, message: '请选择收费类型', trigger: 'change' } ],
        },
        height: {
          height: window.innerHeight * 0.71 + 'px'
        },
        newLists: {},
      }
    },
    props: ['chargeTypeData', 'tagsData'],
    created() {
    },
    methods: {
      //保存信息
      saveList(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newLists.tags = 0; // 控制标记
            this.newLists.charge_level = 0; // 级别
            this.newLists.level_inner_index = 0; // 级内顺序
            this.newLists.is_system_type = 1; // 是否系统类型
            this.axios({
              method: 'post',
              url:process.env.BASE_API + 'ChargeType/addType',
              data: this.newLists
            }).then((res)=>{
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              this.cancle();
            }).catch(function(err) {
              this.$message.error(err.response.data.msg)
            })
          } else {
            this.$message({
              message: '请输入完整信息！！！',
              type: 'warning'
            })
          }
        });
      },
      //取消
      cancle(){
        this.$emit("listenDialog",false)
      }
    }
  }
</script>

<style rel="stylesheet/css" lang="scss" scoped>
  .addSubclass{margin-top:5px;}
  .el-dialog__body>div {
    overflow-y: auto;
    overflow-x: hidden;
  }

  .el-form-item {
    margin-bottom: 5px;
  }
</style>
<style rel="stylesheet/css" lang="scss">
  .el-form-item__error {
    display: none;
  }
</style>
