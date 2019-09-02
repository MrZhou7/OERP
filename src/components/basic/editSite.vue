<template>
  <div class="editSiteWrap">
    <blockquote class="elem_quote">基本信息</blockquote>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="门店名称" prop="mall_id">
        <el-col :span="6">
          <el-select v-model="ruleForm.mall_id" placeholder="请选择活动区域" disabled>
            <el-option v-for="mall in mall_name" :key="mall.mall_id" :label="mall.mall_name" :value="mall.mall_id"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="所属楼栋" prop="building_id">
        <el-col :span="6">
          <el-select v-model="ruleForm.building_name" placeholder="请选择所属楼栋" disabled>
            <el-option v-for="build in building_name" :key="build.building_id" :label="build.building_name" :value="build.building_id"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="所属楼层" prop="floor_id">
        <el-col :span="6">
          <el-select v-model="ruleForm.floor_name" placeholder="请选择所属楼层" disabled>
            <el-option v-for="(floor,index) in floor_name" :key="index" :label="floor.floor_name" :value="parseInt(floor.floor_id)"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="资源类别" prop="unit_kind">
        <el-col :span="6">
          <el-select v-model="ruleForm.unit_kind" :disabled="checkSiteBool" placeholder="请选择资源类别" @change="getMerchantType">
            <el-option v-for="item in BusinessUnit" :key="item.values_cod" :label="item.values_name" :value="item.values_code"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="场地类型" prop="type_name">
        <el-col :span="6">
          <el-select v-model="ruleForm.type_name" :disabled="checkSiteBool" placeholder="请选择场地类型">
            <el-option v-for="item in MerchantType" :key="item.merchant_type_id" :label="item.type_name" :value="item.merchant_type_id"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="经营区域" prop="operate_area_id">
        <el-col :span="6">
          <el-select v-model="ruleForm.operate_area_id" :disabled="checkSiteBool" placeholder="请选择经营区域">
            <el-option v-for="(item,index) in BusinessArea" :key="index" :label="item.values_name" :value="item.values_code"/>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="备注">
        <el-col :span="6">
          <el-input v-model="ruleForm.note" :disabled="checkSiteBool" type="textarea" autosize/>
        </el-col>
      </el-form-item>
      <blockquote class="elem_quote">面积信息</blockquote>
      <el-row style="margin-bottom: 10px;">
        <el-col :span="2"><div class="siteNav"><span>*</span>场地</div></el-col>
        <el-col :span="16" class="field-border">
          <el-col :span="10">
            <el-form-item label="场地编号" prop="unit_code">
              <el-input v-model="ruleForm.unit_code" disabled placeholder="英文、数字、限10个字符"/>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="测量面积" prop="building_area">
              <el-input v-model="ruleForm.building_area" :disabled="checkSiteBool" type="number" placeholder="数字保留两位小数"/>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-form-item v-if="!checkSiteBool" style="padding: 10px 0;background-color: #f2f2f2;text-align: center;">
        <el-button type="primary" @click="saveForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { common } from '@/common/common';
import building from '@/utils/building';
export default {
  name: 'EditSite',
  props: {
    editSiteData: {
      type: Object,
      default: function() {}
    },
    checkSiteBool: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mall_name: '', // 项目名称信息
      building_name: '', // 楼栋信息
      floor_name: '', // 获取楼层信息
      BusinessArea: [], // 经营区域基础信息
      BusinessUnit: [], // 资源类别基础数据
      MerchantType: [], // 获取场地类型
      dataList: {}, // 更新后传给父组件的数据
      ruleForm: {
        mall_id: '',
        building_id: '',
        floor_id: '',
        unit_kind: '',
        type_name: '',
        operate_area_id: '',
        note: '',
        building_area: '',
        unit_code: ''
      },
      rules: {
        mall_id: [{ required: true, message: '请选择项目名称', trigger: 'change' }],
        building_id: [{ required: true, message: '请选择所属楼栋', trigger: 'change' }],
        floor_id: [{ required: true, message: '请选择所属楼层', trigger: 'change' }],
        unit_kind: [{ required: true, message: '请选择资源类别', trigger: 'change' }],
        type_name: [{ required: true, message: '请选择场地类型', trigger: 'change' }],
        operate_area_id: [{ required: true, message: '请选择经营区域', trigger: 'change' }],
        unit_code: [{ required: true, message: '场地编号不能为空', trigger: 'blur' },
          { max: 10, message: '不超过10个字符', trigger: 'blur' }],
        building_area: [{ required: true, message: '计租面积不能为空', trigger: 'blur' }]
      }
    };
  },
  watch: {
    editSiteData: {
      handler(val) {
        this.ruleForm = val;
      },
      immediate: true
    }
  },
  created() {
    building.Mall(this); // 先获取项目名称信息
    common.lookup('L010', this).then((res) => { // 先获取数据
      this.BusinessArea = res;
    });
    common.lookup('L013', this).then((res) => {
      this.BusinessUnit = res;
    });
  },
  methods: {
    saveForm(formName) { // 保存信息
      const siteData = {
        mall_id: this.editSiteData.mall_id,
        building_id: this.editSiteData.building_id,
        floor_id: this.editSiteData.floor_id,
        unit_code: this.editSiteData.unit_code,
        unit_kind: this.ruleForm.unit_kind,
        merchant_type_id: isNaN(this.ruleForm.type_name) ? this.editSiteData.merchant_type_id : this.ruleForm.type_name,
        operate_area_id: this.ruleForm.operate_area_id,
        note: this.ruleForm.note,
        building_area: this.ruleForm.building_area,
        property_unit_id: this.editSiteData.property_unit_id
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.http.post('propertyUnit/editUnit', siteData).then(res => {
            this.$message({ message: '修改成功', type: 'success' });
            this.http.post('property_unit/getAllUnit', this.editSiteData.seacherLish).then(res => {
              this.dataList.tableList = res.data.data; // 更新table
              this.dataList.state = false; // 关闭弹窗
              this.$emit('isEditShow', this.dataList);
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
    getMerchantType(index) { // 获取场地类型
      this.http.post('propertyUnit/getMerchantType', { unit_kind: index }).then((res) => {
        this.MerchantType = res.data.data;
        this.ruleForm.type_name = '';
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .editSiteWrap{ padding: 15px; }
  .field-border { border: 1px solid #e2e2e2;border-radius: 5px;padding: 10px;}
  .siteNav{ line-height: 84px;text-align: center;
    span{ color:red; }
  }
</style>

