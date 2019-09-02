<template>
  <el-main>
    <el-form ref="payWayForm" :model="payWayForm" :rules="rules" label-width="100px">
      <el-form-item label="门店">
        <el-select v-model="payWayForm.mall_id" clearable placeholder="请选择项目名称" prop="mall_id"
                   :disabled="view">
          <el-option v-for="mall in mall_name" :key="mall.mall_id" :label="mall.mall_name"
                     :value="mall.mall_id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商铺">
        <el-input v-model="payWayForm.store_name" suffix-icon="el-icon-search" clearable ref="getPayWayChang" @focus="fieldClick"
                  :disabled="view"></el-input>
      </el-form-item>
      <el-form-item label="登录名" prop="login_name">
        <el-input v-model="payWayForm.login_name" clearable  type="number" :disabled="view"/>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="payWayForm.name" clearable  :disabled="view"/>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model="payWayForm.mobile" clearable type="number" :disabled="view"/>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="payWayForm.gender" :disabled="view">
          <el-radio label="0">未知</el-radio>
          <el-radio label="1">男</el-radio>
          <el-radio label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="默认密码" v-if="editNo">
        <el-input v-model="payWayForm.password" clearable type="password" :disabled="view"/>
      </el-form-item>
      <el-form-item label="人员类型" prop="person_type">
        <el-select v-model="payWayForm.person_type" clearable placeholder="请选择人员类型" :disabled="view">
          <el-option value="" label="请选择"></el-option>
          <el-option label="店长" value="1"></el-option>
          <el-option label="销售员" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员状态" prop="enabled">
        <el-select v-model="payWayForm.enabled" clearable placeholder="请选择人员状态" :disabled="view">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span style="float: right" v-if="!view">
        <el-button type="primary" @click="savePayWay('payWayForm')">确定</el-button>
        <el-button @click="cancle">取消</el-button>
      </span>
    <!--查看编辑弹窗-->
    <el-dialog title="商铺选择" :visible.sync="fieldChoice" v-if="fieldChoice" width="70%" height="70%"
               :close-on-click-modal="false" :append-to-body="true">
      <Shops v-on:fieldData="fieldData" :mall="payWayForm.mall_id"></Shops>
    </el-dialog>
  </el-main>
</template>

<script>
  import building from '@/utils/building'
  import Shops from '@/components/order/shops.vue' //商铺
  export default {
    name: 'addPersonnel',
    components: { Shops },
    data() {
      return {
        payWayForm: {
          password:'888888'
        },
        mall_name: [], // 门店信息
        view: false,
        editNo: false,
        fieldChoice: false,
        rules: {
          login_name: [{ required: true, message: '请选择登录名', trigger: 'blur' }],
          gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' },   { min: 11, max: 11, message: '手机号长度为11位请输入正确', trigger: 'blur' }],
          person_type: [{ required: true, message: '请选择人员类型', trigger: 'change' }],
          enabled: [{ required: true, message: '请选择人员状态', trigger: 'change' }]
        }
      }
    },
    props: ['personnelId', 'viewType','mall'],
    watch: {
      personnelId(newVal, oldVal) {
        if (newVal != '') {
          this.getPreData()
        }
      },
      mall(newVal, oldVal) {
        if (newVal != '') {
          this.payWayForm.mall_id = newVal;
        }
      },
      viewType(newVal, oldVal) {
        this.ViewTypeData(newVal);
      }
    },
    created() {
      building.Mall(this) // 先获取门店数据
      if (this.mall != '') {
        this.payWayForm.mall_id = this.mall;
      }
      if (this.personnelId != '') {
        this.getPreData();
      }
      this.ViewTypeData(this.viewType);
    },
    methods: {
      ViewTypeData(data) {
        if (data == 2) {
          this.view = true;
        }else if(data == 1) {
          this.view = false;
          this.editNo = true;
        }else {
          this.view = false;
          this.editNo = false;
        }
      },
      getPreData() {
        this.http
          .post('StorePerson/getStorePersonInfo', {id:this.personnelId})
          .then((res) => {
            this.payWayForm = res.data.data;
          })
          .catch((err) => {
            this.$message.error(err.response.data.msg)
          })
      },
      fieldClick() {
        //场地点击
        if (!this.payWayForm.mall_id) {
          this.$message({
            message: '请选择门店',
            type: 'warning'
          })
        } else {
          if (!this.payWayForm.store_id) {
            this.fieldChoice = true
          } else {
            this.payWayForm.store_id = ''
            this.payWayForm.store_name = ''
            this.$nextTick(() => {
              this.$refs.getPayWayChang.blur()
            })
          }
        }
      },
      fieldData(data) {//场地赋值
        if (data.length == undefined) {
          this.payWayForm.store_name = data.store_name
          this.payWayForm.store_id = data.store_id
        } else {
          let store_id = '', store_name = ''
          data.forEach((index, i) => {
            if (i != data.length - 1) {
              store_id += index.store_id + ','
              store_name += index.store_name + ','
            } else {
              store_id += index.store_id
              store_name += index.store_name
            }
            this.payWayForm.store_name = store_name
            this.payWayForm.store_id = store_id
          })
        }
        this.fieldChoice = false
      },
      savePayWay(formName) {
        let that = this;
        let title = '',url = '';
        if(this.viewType == 1) {
          title = '添加成功';
          url = 'StorePerson/addStorePerson'
        }else {
          title = '保存成功';
          url = 'StorePerson/editStorePersonInfo'
        }
        if(!this.payWayForm.store_id) {
          this.$message.error('请选择商铺')
          return false;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.http
              .post(url, this.payWayForm)
              .then((res) => {
                that.$message.success(title)
                setTimeout(function() {
                  that.cancle();
                }, 500)
              })
              .catch((err) => {
                that.$message.error(err.response.data.msg)
              })
          } else {
            this.$message({
              message: '请输入完整信息！！！',
              type: 'warning'
            })
          }
        })
      },
      cancle() {
        this.$emit('addPersonnelData', false)
      }
    }
  }
</script>

<style scoped>
  .el-form-item {
    margin-bottom: 22px;
  }
</style>
