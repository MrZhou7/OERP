<template>
  <el-main :style="height">
    <el-tabs value="orderInfo" type="border-card">
      <el-tab-pane label="基本信息" name="orderInfo">
        <el-card class="box-card" shadow="always">
          <div class="content">
            <p class="category-text" v-if="!view">商铺信息
              <span class="addCategory" @click="cancle">取消</span>
              <span class="addCategory" @click="savePayWay('rentDetailRules')">确定</span>
            </p>
            <el-form ref="rentDetailRules" :rules="rentDetailRules" :model="formInline" label-width="100px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="门店" prop="mall_id">
                    <el-select v-model="formInline.mall_id" placeholder="请选择门店名称" :disabled="view">
                      <el-option
                        v-for="(item,index) in preData.mall"
                        :key="index"
                        :label="item.mall_name"
                        :value="item.mall_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同Id" prop="contract_main_id">
                    <el-input v-model="formInline.contract_main_id" suffix-icon="el-icon-search" :disabled="view"
                              @focus="contractIdClick"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="合同编号">
                    <el-input v-model="formInline.contract_code" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="经营方式" prop="do_type">
                    <el-select v-model="formInline.do_type" placeholder="请选择经营方式" :disabled="view">
                      <el-option
                        v-for="(item,index) in preData.operation_model"
                        :key="index"
                        :label="item.values_name"
                        :value="item.values_code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="商户简称">
                    <el-input v-model="formInline.cust_short_name" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="场地编号" prop="unit_code">
                    <el-input v-model="formInline.unit_code" suffix-icon="el-icon-search" :disabled="editFiled"
                              @focus="fieldClick"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="计租面积">
                    <el-input v-model="formInline.area" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="开始日期">
                    <el-input v-model="formInline.valid_from" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="结束日期">
                    <el-input v-model="formInline.valid_to" disabled></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="终止日期">
                    <el-input v-model="formInline.terminated_on" disabled></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="资本类型" prop="capital_type">
                    <el-select v-model="formInline.capital_type" :disabled="view" placeholder="请选择">
                      <el-option
                        v-for="item in preData.capital_type"
                        :key="item.values_code"
                        :label="item.values_name"
                        :value="item.values_code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="数据收集方式">
                    <el-select v-model="formInline.sales_data_collection_type" :disabled="view" placeholder="请选择">
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="租用POS" value="1"></el-option>
                      <el-option label="接口数据" value="2"></el-option>
                      <el-option label="自动收集" value="3"></el-option>
                      <el-option label="互动平台" value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="商铺编码" prop="store_code">
                    <el-input v-model="formInline.store_code" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="商铺名称" prop="store_name">
                    <el-input v-model="formInline.store_name" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="商铺类型" prop="merchant_type_id">
                    <el-select v-model="formInline.merchant_type_id" :disabled="view" @change="merchantType($event)">
                      <el-option
                        v-for="(item,key) in preData.merchant_type"
                        :key="key"
                        :label="item.values_name"
                        :value="item.values_code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="楼栋">
                    <el-select v-model="formInline.building_name" disabled>
                      <el-option value="">请选择</el-option>
                      <el-option
                        v-for="item in allBuild"
                        :key="item.building_id"
                        :label="item.building_name"
                        :value="item.building_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="楼层">
                    <el-select v-model="formInline.floor_name" disabled placeholder="请选择">
                      <el-option
                        v-for="item in allFloor"
                        :key="item.floor_id"
                        :label="item.floor_name"
                        :value="item.floor_id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="经营区域" prop="area_name">
                    <el-select v-model="formInline.area_name" placeholder="请选择经营区域"
                               :disabled='view'>
                      <el-option
                        v-for="(item,key) in nusinessArea"
                        :key="key"
                        :label="item.values_name"
                        :value="parseInt(item.values_code)">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="品类" suffix-icon="el-icon-search" class="label_required"
                                prop="operation_type_name">
                    <el-input v-model="formInline.operation_type_name" @focus="entry.categoryChoice = true"
                              :disabled="view"
                              suffix-icon="el-icon-search"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="主营品牌" class="label_required" prop="brand_name">
                    <el-input v-model="formInline.brand_name" :disabled="view" @focus="brandChoiceData(1)"
                              suffix-icon="el-icon-search">
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="销售税率" prop="tax_rate">
                    <el-input v-model="formInline.tax_rate" type="number" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="统一手续费率(%)" class="width_130" prop="bank_card_fee">
                    <el-input v-model="formInline.bank_card_fee" type="number" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="商铺电话" prop="contact_number">
                    <el-input v-model="formInline.contact_number" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="计划开业时间" class="width_110" prop="plan_date">
                    <el-date-picker
                      v-model="formInline.plan_date"
                      type="date"
                      value-format="yyyy-MM-dd"
                      :disabled="view"
                      @change="startDate($event)"
                      placeholder="选择计划开业时间">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="兼营品牌">
                    <el-input v-model="formInline.sideline_brand_name" :disabled="view" @focus="brandChoiceData(2)"
                              suffix-icon="el-icon-search"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="商铺地址" prop="street">
                    <el-input v-model="formInline.street" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="门牌号">
                    <el-input v-model="formInline.region" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="小票头1">
                    <el-input v-model="formInline.footer1" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="小票尾1">
                    <el-input v-model="formInline.footer2" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="小票头2">
                    <el-input v-model="formInline.footer3" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="小票尾2">
                    <el-input v-model="formInline.footer4" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="小票头3">
                    <el-input v-model="formInline.footer5" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="小票尾3">
                    <el-input v-model="formInline.footer6" :disabled="view"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="证件参数" name="pay">
        <el-card class="box-card">
          <div class="content">
            <div class="contract_table" style="margin-top: 10px;">
              <p class="category-text" v-if="!view">支付方式
                <span class="addCategory" @click="addCertificates">新增</span>
              </p>
              <el-table
                ref="tableFour"
                :data="costDetailTable"
                border
                tooltip-effect="dark"
                style="width: 100%;">
                <el-table-column
                  prop="type"
                  min-width="120"
                  fixed="left"
                  label="证件信息">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择人员状态">
                      <el-option label="营业执照" value="1"></el-option>
                      <el-option label="组织机构代码证" value="2"></el-option>
                      <el-option label="税务登记" value="3"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="name"
                  min-width="120"
                  :label="'证件名称'">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.name" placeholder="请输入证件名称"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="legal"
                  min-width="120"
                  :label="'法人'">
                  <template slot-scope="scope">
                    <el-input size="small" v-model="scope.row.legal" placeholder="请输入法人"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="start_date"
                  min-width="120"
                  :label="'有效开始日期'">
                  <template slot-scope="scope">
                    <el-date-picker
                      v-model="scope.row.start_date"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择有效开始日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="end_date"
                  min-width="120"
                  :label="'有效结束日期'">
                  <template slot-scope="scope">
                    <el-date-picker
                      v-model="scope.row.end_date"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择有效结束日期">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="registered_on_store"
                  min-width="150"
                  :label="'是否注册在本商铺'">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.registered_on_store" placeholder="请选择是否注册在本商铺">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  min-width="80">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click.native.prevent="submitCertificates(scope.row)">保存
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="付款方式" name="retrunVisit">
        <el-card class="box-card">
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="合同查询" :visible.sync="entry.contractIdChoice" width="70%" height="70%" top="3%"
               :close-on-click-modal="false"
               :append-to-body="true">
      <contractIdSearch v-on:contractIdData="contractIdData" :mall="formInline.mall_id"></contractIdSearch>
    </el-dialog>
    <el-dialog title="品类选择" :visible.sync="entry.categoryChoice" width="70%" height="70%" top="3%" :close-on-click-modal="false"
               :append-to-body="true">
      <category v-on:categoryData="categoryData" :operationTypeId="formInline.operation_type_id"></category>
      <span slot="footer">
        <el-button @click="entry.categoryChoice = false">取 消</el-button>
        <el-button type="primary" @click="categoryDataList">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="品牌选择" :visible.sync="entry.brandChoice" width="70%" height="70%" top="3%" :close-on-click-modal="false"
               :append-to-body="true">
      <brand v-on:brandData="brandData" :operationTypeId="formInline.operation_type_id"></brand>
    </el-dialog>
    <el-dialog title="场地选择" :visible.sync="entry.fieldChoice" width="70%" height="70%" top="3%" :close-on-click-modal="false"
               :append-to-body="true">
      <Filed v-on:fieldData="fieldData" :mall="formInline.mall_id" :startData="formInline.valid_from"
             :endData="formInline.valid_to"></Filed>
    </el-dialog>
  </el-main>
</template>

<script>
  import { common } from '@/common/common'
  import Filed from '@/components/contract/field.vue' //场地
  import category from '@/components/contract/category.vue' //品类
  import brand from '@/components/contract/brand.vue' //品牌
  import contractIdSearch from '@/components/contract/contractIdSearch.vue' //合同Id

  export default {
    name: 'addShop',
    components: {
      Filed,
      category,
      brand,
      contractIdSearch
    },
    data() {
      return {
        mall_name: [], // 门店信息
        nusinessArea: [], // 经营区域
        costDetailTable: [],
        formInline: {
          sales_data_collection_type: '1'
        },
        height: {
          height: window.innerHeight * 0.8 + 'px',
          padding: 0
        },
        preData: {},
        sidelineBrand:'',
        entry: {
          fieldChoice: false,
          categoryChoice: false,
          brandChoice: false,
          contractIdChoice: false
        },
        view: false,
        editFiled: false,
        allBuild: [],//楼栋
        allFloor: [], //楼层
        rentDetailRules: {
          'mall_id': [{ required: true, message: '请选择门店', trigger: 'change' }],
          'contract_main_id': [{ required: true, message: '请选择合同Id', trigger: 'change' }],
          'do_type': [{ required: true, message: '请选择经营方式', trigger: 'change' }],
          'unit_code': [{ required: true, message: '请选择场地编号', trigger: 'change' }],
          'capital_type': [{ required: true, message: '请选择资本类型', trigger: 'change' }],
          'store_code': [{ required: true, message: '请输入商铺编码', trigger: 'blur' }],
          'store_name': [{ required: true, message: '请输入商铺名称', trigger: 'blur' }],
          'merchant_type_id': [{ required: true, message: '请选择商铺类型', trigger: 'change' }],
          'area_name': [{ required: true, message: '请选择经营区域', trigger: 'change' }],
          'bank_card_fee': [{ required: true, message: '请输入统一手续费率', trigger: 'blur' }],
          'contact_number': [{ required: true, message: '请输入商铺电话', trigger: 'blur' }],
          'plan_date': [{ required: true, message: '请选择计划开业时间', trigger: 'change' }],
          'street': [{ required: true, message: '请输入商铺地址', trigger: 'blur' }],
          'tax_rate': [{ required: true, message: '请输入销售税率', trigger: 'blur' }],
        }
      }
    },
    props: ['addShopId', 'addShopType'],
    watch: {
      addShopId(newVal, oldVal) {
        if (newVal != '') {
          const data = {
            store_id: newVal
          }
          this.getPreData(data)
        }
      },
      addShopType(newVal, oldVal) {
        if (newVal == 2) {
          this.view = true
          this.editFiled = true
        } else if (newVal == 3) {
          this.editFiled = true
        } else {
          this.view = false
        }
      }
    },
    created() {
      this.getData()
      if (this.addShopId != '') {
        const data = {
          store_id: this.addShopId
        }
        this.getPreData(data)
      }
      if (this.addShopType == 2) {
        this.view = true
        this.editFiled = true
      } else if (this.addShopType == 3) {
        this.editFiled = true
      } else {
        this.view = false
      }
    },
    methods: {
      getData() {//预渲染参数
        let that = this
        this.http.post('table_util/getPreData', { act: 'contract' }).then(function(res) {
          that.preData = res.data.data
        })
        common.lookup('L010', this).then((res) => {
          this.nusinessArea = res
        })
      },
      startDate(e) { // 搜索日期赋值
        e ? this.formInline.plan_date = e : this.formInline.plan_date = ''
      },
      getPreData(data) { //默认数据
        this.http.post('StoreSynthesize/getStoreInfo', data).then((res) => {
          this.formInline = res.data.data.baseinfo
          this.formInline.sales_data_collection_type = '1'
          this.costDetailTable = res.data.data.cardinfo
        })
      },
      merchantType(e){
        this.formInline.merchant_type_id = e;
        this.formInline.merchant_type_name = this.preData.merchant_type[e].values_name;
      },
      getAllBuild(data) {//根据门店ID获取楼栋信息
        let that = this
        that.http.post('building_info/getAllBuild', data).then(res => {
          that.allBuild = res.data.data
        }).catch((err) => {
          that.$message.error(err.response.data.msg)
        })
      },
      building(data) {//根据楼栋ID获取楼层信息
        let that = this
        that.http.post('floor_info/getAllFloor', data).then(res => {
          that.allFloor = res.data.data
        }).catch((err) => {
          that.$message.error(err.response.data.msg)
        })
      },
      contractIdClick() {//合同id查询
        if (!this.formInline.mall_id) {
          this.$message({
            message: '请选择门店',
            type: 'warning'
          })
        } else {
          this.entry.contractIdChoice = false
          this.$nextTick(() => {
            this.entry.contractIdChoice = true
          })
        }
      },
      fieldClick() {
        //场地点击
        if (!this.formInline.contract_main_id) {
          this.$message({
            message: '请选择合同id',
            type: 'warning'
          })
        } else {
          this.entry.fieldChoice = false
          this.$nextTick(() => {
            this.entry.fieldChoice = true
          })
        }
      },
      brandChoiceData(type) { //品类查询
        if(type == 1) {
          this.sidelineBrand = type;
        }else {
          this.sidelineBrand = type;
        }
        if (!this.formInline.operation_type_name) {
          this.$message({
            message: '请选择品类',
            type: 'warning'
          })
        } else {
          this.entry.brandChoice = true
        }
      },
      contractIdData(data) {//合同赋值
        this.formInline.contract_main_id = data.contract_main_id
        this.formInline.contract_code = data.contract_code
        this.formInline.cust_short_name = data.customer_name
        this.formInline.valid_from = data.start_date
        this.formInline.valid_to = data.end_date
        this.entry.contractIdChoice = false
      },
      fieldData(data) {//场地赋值
        this.formInline.unit_code = data.unit_code
        this.formInline.property_unit_ids = data.property_unit_id
        this.formInline.area = data.building_area
        this.formInline.building_name = data.building_id
        this.formInline.floor_name = data.floor_id
        let buildData = { mall_id: this.formInline.mall_id }
        this.getAllBuild(buildData)
        let floorData = { mall_id: data.mall_id, building_id: data.building_id }
        this.building(floorData)
        this.entry.fieldChoice = false
      },
      categoryData(data) {//品类赋值
        this.formInline.operation_type_id = data.id
        this.formInline.operation_type_name = data.text
      },
      brandData(data) {//品牌赋值
        if(this.sidelineBrand == 1) {
          this.formInline.brand_name = data.brand_name
          this.formInline.brand_id = data.brand_id
        }else {
          this.formInline.sideline_brand_name = data.brand_name
          this.formInline.sideline_brand_id = data.brand_id
        }
        this.entry.brandChoice = false

      },
      categoryDataList() { //品类确定
        this.entry.categoryChoice = false
      },
      savePayWay(formName) {
        let that = this
        let url = '', title = ''
        if (this.addShopType == 1) {
          url = 'StoreSynthesize/addBaseStoreInfo'
          title = '新增成功,请完善证件信息'
        } else {
          url = 'StoreSynthesize/saveBaseStoreInfo'
          title = '修改成功'
        }
        if (!this.formInline.operation_type_name) {
          this.$message({
            message: '请选择品类',
            type: 'warning'
          })
          return false
        }
        if (!this.formInline.brand_name) {
          this.$message({
            message: '请选择主要品牌',
            type: 'warning'
          })
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.http.post(url, this.formInline).then(res => {
              if (this.addShopType == 1) {
                that.formInline.store_id = res.data.store_id;
                setTimeout(function() {
                  that.$emit('addShopData', true)
                }, 500)
              }else {
                setTimeout(function() {
                  that.$emit('addShopData', false)
                }, 500)
              }
              that.$message({
                message: title,
                type: 'success'
              })
            }).catch((err) => {
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
        this.$emit('addShopData', false)
      },
      submitCertificates(row) {
        if (!row.legal && !row.name && !row.start_date && !row.end_date) {
          this.$message({
            message: '请填写完整',
            type: 'error'
          })
          this.$emit('addShopData', true)
        } else {
          this.http.post('StoreSynthesize/doCardInfo', row).then(res => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          }).catch((err) => {
            this.$message.error(err.response.data.msg)
          })
        }

      },
      addCertificates() {
        const addCertificatesObj = {
          registered_on_store: '',
          type: '',
          name: '',
          start_date: '',
          end_date: '',
          legal: '',
          store_id: this.formInline.store_id
        }
        this.costDetailTable.push(addCertificatesObj)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .el-input.is-disabled .el-input__inner {
    color: #000;
  }

  .search > .el-row > div > .el-form-item {
    margin-bottom: 22px !important;
  }

  .category-text {
    background: #f7f7f7;
    line-height: 40px;
    font-size: 14px;
    color: #606266;
    padding: 0 15px;
    box-sizing: border-box;
    font-weight: bold;
  }

  .addCategory {
    color: #38f;
    float: right;
    cursor: pointer;
    padding: 0 25px;
  }

</style>
<style lang="scss">
  .el-tabs--border-card > .el-tabs__content {
    padding: 0 !important;
  }

  .el-card__body {
    padding: 0 !important;
  }

  .el-form-item__error {
    display: none;
  }

  .el-form-item {
    margin-bottom: 5px;
  }
</style>
