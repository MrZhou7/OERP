<template>
  <div class="content">
    <el-form ref="form" label-width="80px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="公司名称" class="search_lable">
            <el-input v-model="corp_name" placeholder="请输入公司名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="公司类型" class="search_lable">
            <el-select v-model="corp_type" placeholder="请选择公司类型">
              <el-option
                v-for="(item,index) in corpTypes"
                :key="index"
                :label="item.values_name"
                :value="item.values_code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否有效" class="search_lable">
            <el-input v-model="enabled" placeholder="请输入商户编号"></el-input>
            <el-select v-model="enabled" placeholder="请选择是否有效">
              <el-option label="全部" value=""></el-option>
              <el-option label="无效" value="0"></el-option>
              <el-option label="有效" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" align="center" class="search_lable">
          <el-button align="center" type="primary" @click="onSecher">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="choiceList"
      style="width: 100%;text-align: center;height: 100%"
      border
      :show-overflow-tooltip="true"
      align: center
      max-height="350">
      <el-table-column
        align="center"
        prop="corp_name"
        :show-overflow-tooltip="true"
        label="公司名称"
        resizable: true>
      </el-table-column>
      <el-table-column
        align="center"
        prop="corp_short_name"
        :show-overflow-tooltip="true"
        label="公司简称">
      </el-table-column>
      <el-table-column
        prop="corp_type"
        align="center"
        :show-overflow-tooltip="true"
        label="公司类型">
        <template slot-scope="scope">
             <span v-for="(item, index) in  corpTypes">
               {{scope.row.corp_type == item.values_code ? item.values_name : ''}}
             </span>
        </template>
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
      background
      layout="prev, pager, next"
      @current-change="pageinations"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  var data = {};
  import {common} from '@/common/common'
  export default {
    data() {
      return {
        corp_name: '',
        corp_type: '',
        enabled: '',
        choiceList: [],
        total: 0,
        corpTypes:[],
      }
    },
    created() {
      let that = this;
      common.lookup('L014', this).then((res) => {
        that.corpTypes = res;
      });
      data = {
        page: 1,
        limit: 10,
        enabled:1
      };
      this.getCustomer(data, this);

    },
    methods: {
      onSecher() {
        data = {
          corp_name: this.brand_name,
          corp_type: this.brand_code,
          enabled: this.brand_status
        };
        this.getCustomer(data, this);
      },
      pageinations(val) {
        data = {
          page: val,
          limit: 10,
          enabled:1
        };
        this.getCustomer(data, this);
      },
      getCustomer(data, item) {
        let that = item;
        this.http.post("corp_info/getCorpInfoList", data).then(function (res) {
            that.total = res.data.count;
            that.choiceList = res.data.data;
          });
      },
      choice(data) {
        this.$emit('businessChoice', data);
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
