<template>
  <el-row>
    <el-col :span="10">
      <p class="title">楼栋信息</p>
      <el-form :model="buildingForm" :rules="buildingRules" ref="buildingForm" label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="楼栋名称" prop="building_name">
          <el-col :span="12">
            <el-input v-model="buildingForm.building_name" placeholder="请输入楼栋名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="建筑面积" prop="area">
          <el-col :span="12">
            <el-input v-model="buildingForm.area" placeholder="请输入建筑面积">
              <template slot="append">平米</template>
            </el-input>
            <template slot="append">平米</template>
          </el-col>
          <el-col :span="6" style="text-align: center">
            <el-button type="primary" @click="buildingAdd('buildingForm')" size="small" v-if="isActive">添加</el-button>
            <el-button type="success" @click="buildingAmend('buildingForm')" size="small" v-if="!isActive">修改
            </el-button>
          </el-col>
          <el-col :span="6">
            <el-button @click="buildingEmpty('buildingForm')" size="small">清空</el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <el-table
        :data="buildingData"
        stripe
        :show-overflow-tooltip="true"
        @row-click="getFloor"
        :highlight-current-row="true"
        style="width: 100%">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="building_name"
          label="楼栋名称"
          >
        </el-table-column>
        <el-table-column
          prop="area"
          label="建筑面积(平米)"
          >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="editBuilding(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.enabled == 1" @click="deleteBuilding(scope.row)" type="text" size="small">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageinations"
        :total="total">
      </el-pagination>
    </el-col>
    <el-col :span="14">
      <p class="title">楼层信息</p>
      <el-form :model="floorForm" :rules="floorRules" ref="floorForm" label-width="100px" class="demo-ruleForm">
        <el-row>
          <el-col :span="10">
            <el-form-item label="楼栋名称" prop="building_name">
              <el-select v-model="floorForm.building_id" placeholder="请选择楼栋">
                <el-option v-for="(item ,index) in buildingData" :label="item.building_name" :value="item.building_id"
                           :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="楼层名称" prop="floor_name">
              <el-input v-model="floorForm.floor_name" placeholder="请输入楼层名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="建筑面积" prop="indoor_area">
              <el-input v-model="floorForm.indoor_area" placeholder="请输入建筑面积">
                <template slot="append">平米</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公摊系数" prop="residential_pool_coefficient">
              <el-col :span="12">
                <el-input v-model="floorForm.residential_pool_coefficient" placeholder="请输入公摊系数"></el-input>
              </el-col>
              <el-col :span="6" style="text-align: center">
                <el-button type="primary" @click="floorAdd('floorForm')" size="small" v-if="isShow">添加</el-button>
                <el-button type="success" @click="floorAmend('floorForm')" size="small" v-if="!isShow">修改</el-button>
              </el-col>
              <el-col :span="6">
                <el-button @click="floorEmpty('floorForm')" size="small">清空</el-button>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        :data="floorData"
        stripe
        :show-overflow-tooltip="true"
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="floor_name"
          :show-overflow-tooltip="true"
          label="楼层名称"
          >
        </el-table-column>
        <el-table-column
          prop="indoor_area"
          label="建筑面积(平米)"
          >
        </el-table-column>
        <el-table-column
          prop="residential_pool_coefficient"
          label="公摊系数"
          >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button @click="editFloor(scope.row)" type="text" size="small">编辑</el-button>
            <el-button v-if="scope.row.enabled == 1" @click="deleteFloor(scope.row)" type="text" size="small">作废</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="floorPageinations"
        :total="floortotal">
      </el-pagination>

    </el-col>
  </el-row>
</template>

<script>
  var data = {}
  import {common} from '@/common/common'

  export default {
    name: 'building',
    data() {
      return {
        buildingForm: {
          area: '',
          building_name: '',
          mall_id: ''
        },
        buildingRules: {
          building_name: [
            { required: true, message: '请输入楼栋名称', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '请输入建筑面积', trigger: 'blur' }
          ]
        },
        floorForm: {
          indoor_area: '',
          building_id: '',
          residential_pool_coefficient: ''
        },
        floorRules: {
          building_id: [
            { required: true, message: '请输入楼栋名称', trigger: 'blur' }
          ],
          indoor_area: [
            { required: true, message: '请输入建筑面积', trigger: 'blur' }
          ],
          residential_pool_coefficient: [
            { required: true, message: '请输入公摊系数', trigger: 'blur' }
          ],
          floor_name: [
            { required: true, message: '请输入楼层名称', trigger: 'blur' }
          ]
        },
        buildingData: [],//楼栋表格数据
        floorData: [],//楼层表格数据
        isActive: true,//楼栋添加/修改的显示
        isShow: true,//楼层添加/修改的显示
        total: 0,//楼栋数量
        floortotal: 0,//楼层数量
      }
    },
    props: ['mallId'],
    created() {
      //根据门店ID获取该门店楼栋列表信息
      this.buildingForm.mall_id = this.mallId
      data = {
        page: 1,
        limit: 10,
        mall_id: this.mallId
      }
      this.getBuild(data, this)
    },
    methods: {
      //添加楼栋信息
      buildingAdd(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let dataList = {
              area:that.buildingForm.area,
              building_name:that.buildingForm.building_name,
              mall_id:that.buildingForm.mall_id,
            }
            this.http.post('building_info/addBuildInfo', dataList).then(res => {
              data = {
                page: 1,
                limit: 10,
                mall_id: that.mallId
              }
              that.getBuild(data, this)
              that.$message({
                message: '添加成功',
                type: 'success'
              })
            }).catch((err) => {
              that.$message.error(err.response.data.msg);
            });
          } else {
            this.$message({
              message: '请输入完整信息！！！',
              type: 'warning'
            })
            return false
          }
        })
      },
      //清空楼栋修改 添加信息
      buildingEmpty() {
        this.buildingForm = {}
        this.isActive = true
      },
      //单击楼栋列表传递楼栋名称给楼层列表
      getFloor(row, event) {
        this.http.post('floor_info/getFloorList',  { building_id: row.building_id,limit:10 }).then(res => {
          this.floorData = res.data.data;
          this.floortotal = res.data.count;
          this.floorForm.building_id = row.building_id;
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      //点击楼栋编辑
      editBuilding(row) {
        this.isActive = false
        this.buildingForm = row
      },
      //点击修改楼栋信息
      buildingAmend(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.http.post('building_info/editBuild', that.buildingForm,).then(res => {
              that.isActive = true
              that.$message({
                message: '修改成功',
                type: 'success'
              })
            }).catch((err) => {
              that.$message.error(err.response.data.msg);
            });
          } else {
            this.$message({
              message: '请输入完整信息！！！',
              type: 'warning'
            })
            return false
          }
        })
      },
      //添加楼层信息
      floorAdd(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let dataList = {
              building_id:that.floorForm.building_id,
              floor_name:that.floorForm.floor_name,
              indoor_area:that.floorForm.indoor_area,
              residential_pool_coefficient:that.floorForm.residential_pool_coefficient,
            }
            that.http.post('floor_info/addFloor',  dataList).then(res => {
              //刷新table列表信息
              that.http.post('floor_info/getFloorList',  { building_id:this.floorForm.building_id, limit:10 },).then(res => {
                this.floorData = res.data.data
              }).catch((err) => {
                that.$message.error(err.response.data.msg);
              });
              that.$message({
                message: '添加成功',
                type: 'success'
              })
            }).catch((err) => {
              that.$message.error(err.response.data.msg);
            });
          } else {
            this.$message({
              message: '请输入完整信息！！！',
              type: 'warning'
            })
            return false
          }
        })
      },
      //清空楼层修改 添加信息
      floorEmpty() {
        this.floorForm = {}
        this.isShow = true
      },
      //编辑楼层信息
      editFloor(row) {
        this.isShow = false
        this.floorForm = row
      },
      //点击修改楼层信息
      floorAmend(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.http.post('floor_info/editFloor', this.floorForm,).then(res => {
              that.isShow = true;
              that.$message({
                message: '修改成功',
                type: 'success'
              })
            }).catch((err) => {
              that.$message.error(err.response.data.msg);
            });
          } else {
            this.$message({
              message: '请输入完整信息！！！',
              type: 'warning'
            })
            return false
          }
        })
      },
      //根据门店ID获取该门店楼栋列表信息
      getBuild(data,item) {
        let that = item
        that.http.post('building_info/getBuildList', data).then(res => {
          that.buildingData = res.data.data;
          that.total = res.data.count;
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      //楼栋作废
      deleteBuilding(val){
        let that = this;
        this.$confirm('此操作将作废该楼栋是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          that.http.post('building_info/editBuild',  { building_id: val.building_id,enabled:0 }).then(res => {
            data = {
              page: 1,
              limit: 10,
              mall_id: val.mall_id
            }
            that.getBuild(data, this)
            that.$message({
              type: 'success',
              message: '成功!'
            });
          }).catch((err) => {
            that.$message.error(err.response.data.msg);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      //楼层作废
      deleteFloor(val){
        let that = this;
        this.$confirm('此操作将作废该楼层是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          that.http.post('floor_info/editFloor', { floor_id: val.floor_id,enabled:0 }).then(res => {
            that.http.post('floor_info/getFloorList', { building_id:val.building_id }).then(res => {
              that.floorData = res.data.data
              that.$message({
                type: 'success',
                message: '成功!'
              });
            }).catch((err) => {
              that.$message.error(err.response.data.msg);
            });

          }).catch((err) => {
            that.$message.error(err.response.data.msg);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      //楼栋分页
      pageinations(val) {
        data = {
          page: val,
          limit: 10,
          mall_id: this.mallId
        }
        this.getBuild(data, this)
      },
      floorPageinations(val) {
        data.building_id = this.floorForm.building_id;
        data.page = val;
        data.limit = 10;
        this.http.post('floor_info/getFloorList', data).then(res => {
          this.floorData = res.data.data
        }).catch((err) => {
          this.$message.error(err.response.data.msg);
        });
      },
    }

  }
</script>

<style scoped>
  .title {
    position: relative;
    height: 42px;
    line-height: 42px;
    padding: 0 15px;
    border-bottom: 1px solid #f6f6f6;
    color: #333;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
  }

  .el-input-group__append, .el-input-group__prepend {
    padding: 0px 5px;
  }
</style>
