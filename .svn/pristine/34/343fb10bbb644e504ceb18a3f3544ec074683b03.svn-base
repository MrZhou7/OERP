<template>
  <div id="checkBrandWrap">
    <el-tabs type="border-card">
      <el-tab-pane label="基本信息">
        <div class="brandStyle">品牌信息</div>
        <el-form ref="editTableData" :model="checkTableData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="品牌名称" prop="brand_name">
            <el-col :span="8">
              <el-input v-model="checkTableData.brand_name" placeholder="中英文、数字、限20字以内" disabled></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="品牌编号" prop="brand_code">
            <el-col :span="8">
              <el-input v-model="checkTableData.brand_code" placeholder="品牌信息保存后自动生成" disabled></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="品类选择" prop="operation_type">
            <el-col :span="8" class="getPointer">
              <el-input placeholder="请选择品类" @click.native="gttOperation" suffix-icon="el-icon-search" v-model="checkTableData.type_name" disabled></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="品牌等级" prop="brand_rank">
            <el-col :span="8">
              <el-select v-model="checkTableData.brand_rank" disabled>
                <el-option v-for="item in brandRank" :key="item.values_code" :label="item.values_name" :value="item.values_code"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="品牌状态" prop="brand_status">
            <el-col :span="8">
              <el-select v-model="checkTableData.brand_status" disabled>
                <el-option v-for="(item,index) in brandState" :key="index" :label="item.values_name" :value="item.values_code"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="品牌logo" prop="logo">
            <el-col :span="3">
              <div v-if="checkTableData.logo" class="logoStyle">
                <img :src="imgUrl" alt="">
              </div>
              <div v-else>
                暂无
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="品牌说明" placeholder="请输入品牌说明，300字以内" prop="brand_desc">
            <el-col :span="8">
              <el-input v-model="checkTableData.brand_desc" type="textarea" autosize contenteditable="true" disabled></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="品牌商户">品牌商户</el-tab-pane>
      <el-tab-pane label="角色管理">操作记录</el-tab-pane>
      <el-tab-pane label="审核记录">审核记录</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { common } from '@/common/common';

export default {
  name: 'CheckBrand',
  data() {
    return {
      imgUrl: '',
      brandRank: [], // 品牌等级基础数据
      brandState: [], // 品牌狀態基礎數據
      checkTableData: {} // 接受点击传过来的品牌信息
    };
  },
  created() {
    this.getCheckBrand();
    common.lookup('L016', this).then((res) => {
      this.brandRank = res;
    });
    common.lookup('L017', this).then((res) => {
      this.brandState = res;
    });
  },
  methods: {
    getCheckBrand() { // 获取当前品牌信息
      const BrandId = { brand_id: this.$route.query.checkBrandId };
      this.http.post('brand_info/getBrandInfo', BrandId).then((res) => {
        this.checkTableData = res.data.data;
        const u = process.env.BASE_API;
        const s = u.substring(0, u.length - 3);
        this.imgUrl = s + this.checkTableData.logo;
      })
    },
    back() { // 返回上一页
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
  #checkBrandWrap{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: white;
    padding:15px;
  }
  .brandStyle{
    margin-bottom: 10px;
    padding: 10px 15px;
    line-height: 22px;
    border-left: 5px solid #009688;
    border-radius: 0 2px 2px 0;
    background-color: #f2f2f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height:36px;
  }
  .el-row{
    padding: 9px 15px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 15px;
  }
  .logoStyle{
    width:100%;
    border-radius:5px;
    img{
      width:100%;border-radius:5px;
    }
  }
</style>
