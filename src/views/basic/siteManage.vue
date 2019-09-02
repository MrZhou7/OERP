<template>
  <el-main class="siteWrap">
    <el-form :model="siteMess" class="demo-form-inline" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="门店名称">
            <el-select v-model="siteMess.mall_id" placeholder="请选择项目名称" @change="getMall">
              <el-option v-for="mall in mall_name" :key="mall.mall_id" :label="mall.mall_name" :value="mall.mall_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属楼栋">
            <el-select v-model="siteMess.building_id" placeholder="请选择所属楼栋" @visible-change="getBuild($event)">
              <el-option v-for="build in building_name" :key="build.building_id" :label="build.building_name" :value="build.building_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所属楼层">
            <el-select v-model="siteMess.floor_id" placeholder="请选择所属楼层" @visible-change="getFloor($event)">
              <el-option v-for="(floor,index) in floor_name" :key="index" :label="floor.floor_name" :value="floor.floor_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="经营区域" prop="operate_area_id">
            <el-select v-model="siteMess.operate_area_id" placeholder="请选择经营区域" clearable>
              <el-option v-for="(item,index) in BusinessArea" :key="index" :label="item.values_name" :value="item.values_code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="场地编号">
            <el-input v-model="siteMess.unit_code" clearable placeholder="请输入场地编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="资源类别">
            <el-select v-model="siteMess.unit_kind" clearable placeholder="请选择资源类别" @change="getMerchantType">
              <el-option v-for="item in BusinessUnit" :key="item.values_code" :label="item.values_name" :value="item.values_code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="场地类型">
            <el-select v-model="siteMess.merchant_type_id" clearable placeholder="请选择场地类型" @focus="getFirst">
              <el-option v-for="item in MerchantType" :key="item.merchant_type_id" :label="item.type_name" :value="item.merchant_type_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="场地状态">
            <el-select v-model="siteMess.status" clearable placeholder="请选择">
              <el-option :value="1" label="启用"></el-option>
              <el-option :value="0" label="停用"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="inquireSite">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btn_bottom ">
      <el-row>
        <el-button type="primary" @click="addSite">新增场地</el-button>
        <el-button disabled>拆分场地</el-button>
        <el-button disabled>合并场地</el-button>
        <el-button disabled>批量删除</el-button>
      </el-row>
    </div>
    <div class="contract_table">
      <el-table
        ref="tableOne"
        :height="tableHeight"
        :data="tableData"
        :show-overflow-tooltip="true"
        style="width: 100%;"
        tooltip-effect="dark"
        border
        @selection-change="getRadio"
        @row-click="clickRow">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          fixed
          prop="mall_name"
          label="门店名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="building_name"
          label="所属楼栋"
          width="150">
        </el-table-column>
        <el-table-column
          prop="floor_name"
          label="所属楼层"
          width="150">
        </el-table-column>
        <el-table-column
          prop="unit_kind"
          label="资源类别"
          width="150">
          <template slot-scope="scope">
            <span v-for="item in BusinessUnit" :key="item.values_code">
              {{ scope.row.unit_kind == item.values_code ? item.values_name : '' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operate_area_id"
          label="经营区域"
          width="150">
          <template slot-scope="scope">
            <span v-for="(item, index) in BusinessArea" :key="index">
              {{ scope.row.operate_area_id == item.values_code ? item.values_name : '' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit_code"
          label="场地编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="building_area"
          label="测量面积"
          width="150">
        </el-table-column>
        <el-table-column
          prop="merchant_type_id"
          label="场地类型"
          width="150">
          <template slot-scope="scope">
            <span v-for="(item, index) in allMerchantType" :key="index">
              {{ scope.row.merchant_type_id == parseInt(item.merchant_type_id) ? item.type_name : '' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="场地状态"
          width="150">
          <template slot-scope="scope">
            {{ scope.row.status == 0 ?'无效':'有效' }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.native.prevent="checkSite(scope.$index, tableData)">查看</el-button>
            <el-button type="text" size="small" @click.native.prevent="editSite(scope.$index, tableData)">编辑</el-button>
            <el-button type="text" size="small" v-if="scope.row.status == 0" @click.native.prevent="stareSite(scope.$index, tableData)">启用</el-button>
            <el-button type="text" size="small" v-if="scope.row.status == 1" @click.native.prevent="stopSite(scope.$index, tableData)">停用</el-button>
            <el-button type="text" size="small" @click.native.prevent="deleteSite(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :page-sizes="[20, 30, 40, 50]"
        :page-size="20"
        :current-page.sync="currentPage"
        :total="total"
        background
        layout="prev, pager, next, total, sizes"
        @current-change="pagination"
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
    <!--查看、编辑场地弹窗-->
    <el-dialog
      :title="siteTitle"
      :close-on-click-modal="false"
      :visible.sync="editSiteVisible"
      width="80%"
      top="5%">
      <EditSite :edit-site-data="editSiteData" :check-site-bool="checkSiteBool" @isEditShow="isEditShow"></EditSite>
    </el-dialog>
    <!--新增场地弹窗-->
    <el-dialog
      v-if="addSiteVisible"
      :close-on-click-modal="false"
      :visible.sync="addSiteVisible"
      title="新增场地"
      width="80%"
      top="5%">
      <AddSite :add-list="addList" @isShow="isShow"></AddSite>
    </el-dialog>
  </el-main>
</template>

<script>
import EditSite from '@/components/basic/editSite';
import AddSite from '@/components/basic/addSite';
import { common } from '@/common/common';
import building from '@/utils/building';

export default {
  name: 'SiteManage',
  components: {
    EditSite, AddSite
  },
  data() {
    return {
      siteTitle: '', // 编辑 查看的title
      total: 0,
      currentPage: 1, // 当前页码
      tableHeight: window.innerHeight - 355,
      editSiteVisible: false,
      checkSiteBool: false,
      editSiteData: {},
      addSiteVisible: false, // 新增场地不显示
      tableData: [], // 获取的table数据
      mall_name: [], // 门店信息
      building_name: [], // 楼栋信息
      floor_name: [], // 楼层信息
      MerchantType: [], // 场地类型
      siteMess: {
        status: '', // 场地状态
        unit_code: '', // 场地编号
        mall_id: '',
        building_id: '',
        floor_id: '',
        operate_area_id: '', // 经营区域
        unit_kind: '', // 资源类别
        merchant_type_id: '' // 场地类型
      },
      addList: {}, // 新增场地时的搜索数据
      BusinessArea: [], // 经营区域基础信息
      BusinessUnit: [], // 资源类别基础数据
      allMerchantType: [] // 获取所有的场地类型
    };
  },
  created() {
    building.Mall(this); // 先获取门店数据
    building.getAllMerchantType(this); // 获取所有的场地类型
    const searchHistory = common.get('siteSearch');
    if (searchHistory != null) {
      this.siteMess = searchHistory.search;
      common.getPreData(this.siteMess, 'property_unit/getAllUnit', this);
    }
    common.lookup('L010', this).then((res) => {
      this.BusinessArea = res;
    });
    common.lookup('L013', this).then((res) => {
      this.BusinessUnit = res;
    });
  },
  methods: {
    addSite() { // 新增场地
      this.addList = this.siteMess;
      this.addSiteVisible = true;
    },
    inquireSite() { // 查询
      const data = this.siteMess;
      data.limit = 20;
      common.getPreData(data, 'property_unit/getAllUnit', this, 'siteSearch');
      common.set('siteSearch', { 'search': data });
    },
    clickRow(row) { // 点击table的row
      this.$refs.tableOne.toggleRowSelection(row);
    },
    getRadio(row) { // 去除多选
      building.radioBtn(row, this.$refs.tableOne);
    },
    pagination(val) { // 分頁
      const data = this.siteMess;
      data.page = val; // 页码。第几页
      common.getPreData(data, 'property_unit/getAllUnit', this, 'siteSearch');
      common.set('siteSearch', { 'search': data });
    },
    handleSizeChange(val) {
      const data = this.siteMess;
      data.limit = val;// 每页显示数据数量
      common.getPreData(data, 'property_unit/getAllUnit', this, 'siteSearch');
      common.set('siteSearch', { 'search': data });
    },
    getMall() { // 获取项目名称信息
      this.siteMess.building_id = '';
      this.siteMess.floor_id = '';
    },
    getBuild(callback) { // 获取楼栋信息
      callback ? building.build(this, this.siteMess.mall_id) : this.siteMess.floor_id = '';
    },
    getFloor(callback) { // 获取楼层信息
      callback && building.floor(this, this.siteMess.building_id);
    },
    getFirst() { // 点击场地类型
      this.siteMess.unit_kind || this.$message.error('请先选择资源类别！');
    },
    getMerchantType(index) { // 获取场地类型
      this.http.post('propertyUnit/getMerchantType', { unit_kind: index }).then((res) => {
        this.MerchantType = res.data.data;
      });
    },
    deleteSite(index, row) { // 删除
      common.del('此操作将删除该场地是否继续?', 'propertyUnit/delUnit', {
        property_unit_id: row[index].property_unit_id,
        enabled: 0
      }, 'property_unit/getAllUnit', this, 'siteSearch');
    },
    stopSite(index, row) { // 停用
      common.del('此操作将停用该场地是否继续?', 'propertyUnit/stopUnit', {
        property_unit_id: row[index].property_unit_id,
        status: 0
      }, 'property_unit/getAllUnit', this, 'siteSearch');
    },
    stareSite(index, row) { // 启用
      common.del('此操作将启用该场地是否继续?', 'propertyUnit/stopUnit', {
        property_unit_id: row[index].property_unit_id,
        status: 1
      }, 'property_unit/getAllUnit', this, 'siteSearch');
    },
    isEditShow(data) { // 接受编辑子组件参数
      this.editSiteVisible = data.state; // 关闭弹窗
      this.tableData = data.tableList; // 更新table
    },
    isShow(data) { // 接受新增子组件参数
      this.addSiteVisible = data.state; // 关闭弹窗
      this.tableData = data.tableList; // 更新table
    },
    editSite(index, table) { // 编辑
      this.siteTitle = '编辑场地';
      this.editSiteVisible = true;
      this.checkSiteBool = false;
      this.getData(index, table, this);
    },
    checkSite(index, table) { // 查看场地信息
      this.siteTitle = '查看场地';
      this.editSiteVisible = true;
      this.checkSiteBool = true;
      this.getData(index, table, this);
    },
    getData(index, table, that) {
      that.http.post('propertyUnit/getUnitDetail', { property_unit_id: table[index].property_unit_id })
        .then((res) => {
          that.editSiteData = res.data.data;
          this.editSiteData.seacherLish = this.siteMess;
        }).catch(function(err) {
          that.$message.error(err.response.data.msg);
        });
    }
  }
}
</script>

<style scoped lang="scss">
  .siteWrap {padding: 15px;}
  .el-input--suffix .el-input__inner {padding-right: 15px;}
  .el-form-item {margin-bottom: 5px;}
</style>
