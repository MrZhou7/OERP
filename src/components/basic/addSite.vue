<template>
  <el-main>
    <blockquote class="elem_quote">基本信息</blockquote>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="门店名称" prop="mall_id">
        <el-col :span="6">
          <el-select v-model="ruleForm.mall_id" placeholder="请选择活动区域" @change="getBuild">
            <el-option v-for="mall in mall_name" :key="mall.mall_id" :label="mall.mall_name" :value="mall.mall_id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="所属楼栋" prop="building_id">
        <el-col :span="6">
          <el-select v-model="ruleForm.building_id" placeholder="请选择所属楼栋" @change="getFloor">
            <el-option v-for="build in building_name" :key="build.building_id" :label="build.building_name" :value="build.building_id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="所属楼层" prop="floor_id">
        <el-col :span="6">
          <el-select v-model="ruleForm.floor_id" placeholder="请选择所属楼层">
            <el-option v-for="floor in floor_name" :key="floor.floor_id" :label="floor.floor_name" :value="floor.floor_id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="资源类别" prop="unit_kind">
        <el-col :span="6">
          <el-select v-model="ruleForm.unit_kind" placeholder="请选择资源类别" @change="getMerchantType">
            <el-option v-for="item in BusinessUnit" :key="item.values_code" :label="item.values_name" :value="item.values_code"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="场地类型" prop="merchant_type_id">
        <el-col :span="6">
          <el-select v-model="ruleForm.merchant_type_id" clearable placeholder="请选择场地类型" @focus="getFirst">
            <el-option v-for="item in MerchantType" :key="item.merchant_type_id" :label="item.type_name" :value="item.merchant_type_id"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="经营区域" prop="operate_area_id">
        <el-col :span="6">
          <el-select v-model="ruleForm.operate_area_id" placeholder="请选择经营区域">
            <el-option v-for="item in BusinessArea" :key="item.values_code" :label="item.values_name" :value="item.values_code"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-col :span="6">
          <el-input type="textarea" v-model="ruleForm.note" autosize></el-input>
        </el-col>
      </el-form-item>
      <blockquote class="elem_quote">面积信息</blockquote>
      <el-row v-for="(item,index) in ruleForm.siteList" :key="index" style="margin-bottom: 10px;">
        <el-col :span="2"><div class="siteNav"><span>*</span>场地</div></el-col>
        <el-col :span="16" class="field-border">
          <el-col :span="10">
            <el-form-item label="场地编号"
                          :prop="'siteList.' + index + '.unit_code'"
                          :rules="[{ required: true, message: '场地编号不能为空',trigger: 'blur'},{max:10, message: '不超过10个字符', trigger: 'blur'}]">
              <el-input v-model="item.unit_code" placeholder="英文、数字、限10个字符"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="测量面积"
                          :prop="'siteList.' + index + '.building_area'"
                          :rules="[{ required: true, message: '测量面积不能为空',trigger: 'blur'}]">
              <el-input v-model="item.building_area" type="number" placeholder="数字保留两位小数"/>
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="2">
          <div class="siteNav">
            <el-button v-if="ruleForm.siteList.length > 1" type="danger" size="medium" @click="removeRow(index)">
              删除
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" size="medium" @click="addRow">新增场地</el-button>
      </el-form-item>
      <el-form-item style="padding: 10px 0;background-color: #f2f2f2;text-align: center;">
        <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
import { common } from '@/common/common';
import building from '@/utils/building';
export default {
  name: 'AddSite',
  props: {
    addList: {
      type: Object,
      default: function() {}
    }
  },
  data() {
    return {
      mall_name: '', // 项目名称信息
      building_name: '', // 楼栋信息
      floor_name: '', // 获取楼层信息
      BusinessArea: [], // 经营区域基础信息
      BusinessUnit: [], // 资源类别基础数据
      MerchantType: [], // 场地资源类型
      dataList: {}, // 传给父组件的数据
      ruleForm: {
        mall_id: '',
        building_id: '',
        floor_id: '',
        unit_kind: '',
        merchant_type_id: '',
        operate_area_id: '',
        note: '',
        siteList: [{
          building_area: '',
          unit_code: ''
        }]
      },
      rules: {
        mall_id: [{ required: true, message: '请选择项目名称', trigger: 'change' }],
        building_id: [{ required: true, message: '请选择所属楼栋', trigger: 'change' }],
        floor_id: [{ required: true, message: '请选择所属楼层', trigger: 'change' }],
        unit_kind: [{ required: true, message: '请选择资源类别', trigger: 'change' }],
        merchant_type_id: [{ required: true, message: '请选择场地类型', trigger: 'change' }],
        operate_area_id: [{ required: true, message: '请选择经营区域', trigger: 'change' }]
      }
    };
  },
  created() {
    common.lookup('L010', this).then((res) => {
      this.BusinessArea = res;
    });
    common.lookup('L013', this).then((res) => {
      this.BusinessUnit = res;
    });
    building.Mall(this); // 先获取项目名称信息
  },
  methods: {
    removeRow(index) { // 删除属性列
      this.ruleForm.siteList.splice(index, 1);
    },
    addRow() {
      this.ruleForm.siteList.push({ building_area: '', unit_code: '' });
    },
    getBuild(index) { // 获取楼栋信息
      this.ruleForm.floor_id = '';
      this.ruleForm.building_id = '';
      building.build(this, index);
    },
    getFloor(index) { // 获取楼层信息
      this.ruleForm.floor_id = '';
      building.floor(this, index);
    },
    saveForm(formName) { // 保存信息
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http.post('property_unit/addUnit', { ruleForm: JSON.stringify(this.ruleForm) }).then(res => {
            this.$refs[formName].resetFields();
            this.$message({ message: '新增成功', type: 'success' });
            this.http.post('property_unit/getAllUnit', this.addList).then(res => {
              this.dataList.tableList = res.data.data; // 更新table
              this.dataList.state = false; // 关闭弹窗
              this.$emit('isShow', this.dataList);
            });
          });
        } else {
          this.$message({
            message: '请输入完整信息！！！',
            type: 'warning'
          })
        }
      });
    },
    getFirst() { // 点击场地类型
      this.ruleForm.unit_kind || this.$message.error('请先选择资源类别！');
    },
    getMerchantType(index) { // 获取场地类型
      this.http.post('propertyUnit/getMerchantType', { unit_kind: index }).then((res) => {
        this.MerchantType = res.data.data;
        this.ruleForm.merchant_type_id = '';
      });
    }
  }
}
</script>

<style scoped lang="scss">
  .field-border { border: 1px solid #e2e2e2;border-radius: 5px;padding: 10px; }
  .siteNav{ line-height: 84px;text-align: center;
    span{ color:red; }
  }
</style>
