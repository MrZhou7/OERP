<template>
  <div class="content">
    <el-form ref="form" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="楼栋" class="search_lable">
            <el-select v-model="building_id" placeholder="请选择" @change="building($event)">
              <el-option value="" >请选择</el-option>
              <el-option
                v-for="item in allBuild"
                :key="item.building_id"
                :label="item.building_name"
                :value="item.building_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="楼层" class="search_lable">
            <el-select v-model="floor_id" placeholder="请选择">
              <el-option
                v-for="item in allFloor"
                :key="item.floor_id"
                :label="item.floor_name"
                :value="item.floor_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="场地编号" class="search_lable">
            <el-input v-model="unit_code" placeholder="请输入场地编号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" align="center" class="search_lable" style="margin-top: 5px">
          <el-button align="center" type="primary" size="small" @click="onSecher()">查询</el-button>
          <el-button align="center" type="primary" size="small" @click="onSelectSub()">多选</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="customer_list"
      style="width: 100%;text-align: center;height: 100%"
      @selection-change="onSelect"
      border
      :show-overflow-tooltip="true"
      ref="multipleTable"
      align: center
      max-height="350">
      <el-table-column
        fixed
        prop="unit_code"
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        prop="unit_code"
        label="场地编号"
        :show-overflow-tooltip="true"
        resizable: true>
      </el-table-column>
      <!--<el-table-column-->
        <!--align="center"-->
        <!--prop="building_area"-->
        <!--label="签约面积">-->
      <!--</el-table-column>-->
      <el-table-column
        prop="building_area"
        align="center"
        label="测量面积">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100">
        <template slot-scope="scope">
          <el-button @click="choice(scope.row)" type="text" size="small">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      :total="total"
      background
      layout="prev, pager, next, total, sizes"
      @current-change="pagination"
      @size-change="handleSizeChange"/>
  </div>
</template>
<script>
  var data = {};
  export default {
    data() {
      return {
        building_id: '',
        floor_id: '',
        unit_code: '',
        customer_list: [],
        currentPage: 1, // 页码
        pageSize: 10, // 页码
        total: 0,
        mall_id: 0,
        multipleSelection: [],
        allBuild: [],//楼栋
        allFloor: [], //楼层
      }
    },
    props: ['mall','startData','endData'],
    watch: {
      mall:function(newVal,oldVal){
        data = {
          mall_id: newVal,
          start_date: this.startData,
          end_date: this.endData,
          limit: this.pageSize,
        };
        this.getCustomer(data);
        this.getAllBuild(data);
      },
      startData:function(newVal,oldVal){
        data = {
          mall_id: this.mall,
          start_date: newVal,
          end_date: this.endData,
          limit: this.pageSize,
        };
        this.getCustomer(data);
        this.getAllBuild(data);
      },
      endData:function(newVal,oldVal){
        data = {
          mall_id: this.mall,
          start_date: this.startData,
          end_date: newVal,
          limit: this.pageSize,
        };
        this.getCustomer(data);
        this.getAllBuild(data);
      },
    },
    created() {
      data = {
        mall_id: this.mall,
        start_date: this.startData,
        end_date: this.endData,
        limit: this.pageSize,
      };
      this.getCustomer(data);
      this.getAllBuild(data);
    },

    methods: {
      onSecher() {
        data = {
          mall_id: this.mall,
          start_date: this.startData,
          end_date: this.endData,
          building_id: this.building_id,
          floor_id: this.floor_id,
          unit_code: this.unit_code,
          limit: this.pageSize,
        };
        this.getCustomer(data);
        this.getAllBuild();
      },
      pagination(val) {
        data = {
          mall_id: this.mall,
          start_date: this.startData,
          end_date: this.endData,
          building_id: this.building_id,
          floor_id: this.floor_id,
          unit_code: this.unit_code,
          page: val,
          limit: this.pageSize,
        };
        this.getCustomer(data);
      },
      // 表格条数
      handleSizeChange(val) {
        data = {
          mall_id: this.mall,
          start_date: this.startData,
          end_date: this.endData,
          building_id: this.building_id,
          floor_id: this.floor_id,
          unit_code: this.unit_code,
          limit: val,
        };
        this.pageSize = val;
        this.getCustomer(data);
      },
      pageinations(val) {
        data = {
          mall_id: this.mall,
          start_date: this.startData,
          end_date: this.endData,
          building_id: this.building_id,
          floor_id: this.floor_id,
          unit_code: this.unit_code,
          page: val,
          limit: 10,
        };
        this.getCustomer(data);
      },
      getCustomer(data) {//根据门店Id获取场地信息
        let that = this;
        that.http.post('property_unit/getunitlist', data).then(res => {
          that.total = res.data.count;
          that.customer_list = res.data.data;
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      getAllBuild() {//根据门店ID获取楼栋信息
        let that = this;
        that.http.post('building_info/getAllBuild', {mall_id: this.mall}).then(res => {
          that.allBuild = res.data.data;
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      building(val) {
        let that = this;
        that.http.post('floor_info/getAllFloor', {mall_id: this.mall,building_id: val}).then(res => {
          that.allFloor = res.data.data;
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      onSelect(val) {
        let that = this;
        that.multipleSelection = val;
      },
      onSelectSub() {
        this.choice(this.multipleSelection)
      },
      choice(data) {
        this.$emit('fieldData', data);
      }
    }
  }
</script>

<style lang="scss">
  .search_lable {
    margin-bottom: 0px !important;
  }

  .search_lable > .el-form-item__label {
    width: 80px !important;
  }

  .search_lable .el-form-item__content {
    margin-left: 80px !important;
  }
</style>
