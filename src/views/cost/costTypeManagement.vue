<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <div class="category-tree-content">
          <el-input
            placeholder="输入关键字进行费用类型搜索"
            v-model="filterText" clearable>
          </el-input>
          <el-tree
            ref="tree2"
            :highlight-current="true"
            :data="dataTree"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            class="filter-tree"
            @node-click="handleNodeClick"
            :style="{height: treeHeight+'px'}"
          >
            <span class="slot-t-node" slot-scope="{ node, data }">
        <i class="iconfont icon-renyuan" style="color: #009688;" />
        <span>{{ node.label }}</span>
    </span>

          </el-tree>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="category-tree-content grid-content bg-purple-light" v-if="contentIsShow">
          <p class="category-text">费用类型 <span class="addCategory" @click="addCategory">添加子类</span>
          <div class="addSubclass" :style="{height: treeHeight+'px'}">
            <el-form :model="newLists" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm" >
              <el-form-item label="费用编码">
                <el-input v-model="newLists.charge_code" clearable></el-input>
              </el-form-item>
              <el-form-item label="费用名称" prop="charge_description">
                <el-input v-model="newLists.charge_description" clearable></el-input>
              </el-form-item>
              <el-form-item label="记账科目号" prop="account_code">
                <el-input v-model="newLists.account_code" clearable></el-input>
              </el-form-item>
              <el-form-item label="收支类型" prop="tags">
                <el-select v-model="newLists.charge_type" clearable>
                  <el-option
                    v-for="(item,index) in chargeTypeData"
                    :key="index"
                    :label="item.text"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属类型" prop="tags">
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
                  <el-option label="财务模块" value="1"></el-option>
                  <el-option label="商管模块" value="2"></el-option>
                  <el-option label="物管模块" value="3"></el-option>
                  <el-option label="招商模块" value="4"></el-option>
                  <el-option label="企划模块" value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="收费性质" prop="charge_reason_type">
                <el-select v-model="newLists.charge_reason_type" clearable>
                  <el-option label="固定费用" value="1"></el-option>
                  <el-option label="临时费用" value="2"></el-option>
                  <el-option label="代收费用" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票类型" prop="invoice_type">
                <el-select v-model="newLists.invoice_type" clearable>
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
              <!--<el-form-item label="说明">-->
                <!--<el-input type="textarea" clearable v-model="newLists.type_desc"></el-input>-->
              <!--</el-form-item>-->
              <el-form-item>
                <el-button type="primary" @click="eidtList('ruleForm')">编辑</el-button>
                <el-button @click="delateList('ruleForm')">删除</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="添加子类"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="40%" top="3%">
      <AddCostType  v-if = "dialogVisible"
                    v-on:listenDialog="showDialog"
                    :chargeTypeData="chargeTypeData"
                    :tagsData="tagsData">
      </AddCostType>
    </el-dialog>
  </div>
</template>

<script>
  import AddCostType from '@/components/costComponent/addCostType.vue'

  export default {
    components: {
      AddCostType
    },
    data() {
      return {
        filterText: '',
        contentIsShow: false,//品类内容是否显示
        dataTree: [], //树状图显示数据
        defaultProps: {
          children: 'children',
          label: 'text'
        },
        treeHeight: window.innerHeight - 150,//表格高度
        newLists: {}, //父组件给子组建的传值
        dialogVisible: false,//添加子组件是否显示
        currentIndex: 0,
        parent_id: '',//上级类别显示
        subparentid: [],//添加子类上级类别显示
        newListsId: {}, //获取当前id
        rules: {
          charge_description: [
            { required: true, message: '请输入品类名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在20 个字符以内', trigger: 'blur' }
          ],
          enabled: [{ required: true, message: '请选择是否有效', trigger: 'blur' }],
          tags: [{ required: true, message: '请选择控制编标记', trigger: 'blur' }],
          charge_type: [{ required: true, message: '请填写收支类型', trigger: 'blur' }],
          account_code: [{ required: true, message: '请选择记账科目号', trigger: 'blur' }],
          module: [{ required: true, message: '请选择所属科目', trigger: 'blur' }],
          invoice_type: [{ required: true, message: '请选择发票类型', trigger: 'blur' }],
          charge_reason_type: [{ required: true, message: '请选择收费类型', trigger: 'blur' }]
        },
        tagsData:[], // 控制标记
        chargeTypeData:[], // 收支类型
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    created() {
      // 获取树状图数据
      this.getCategoryTree();
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.text.indexOf(value) !== -1;
      },
      //点击传参给品类信息子组件，并显示品类信息
      handleNodeClick(node, data) {
        if (!node.children) {
          this.contentIsShow = true;
          this.newLists = data.data.data;
          this.newListsId = data.data;
          let parentId = { parent_id: this.newLists.parent_id };
          this.http.post('Operation_Type/getName', parentId).then(res => {
            this.parent_id = res.data.data;
          }).catch((err) => {
            this.$message.error(err.response.data.msg);
          });
        }
      },
      // 获取树状图数据
      getCategoryTree() {
        this.http.post('ChargeType/getTypeTree').then(res => {
          this.dataTree = res.data.data;
          // 收支类型
          this.chargeTypeData = [];
          this.dataTree.forEach(item => {
            this.chargeTypeData.push({
              id: item.data.charge_type,
              text: item.data.charge_description,
            })
          });
          // 控制标记
          this.tagsData = [];
          this.dataTree[1].children.forEach(item => {
            this.tagsData.push({
              id: item.id,
              text: item.text,
            })
          })
        }).catch((err) => {
          this.$message.error(err.response.data.msg);
        });
      },
      // 点击添加子类
      addCategory() {
        if (this.newLists.parent_id < 0) {
          return false;
        }
        this.dialogVisible = true;

        let id = { parent_id: this.newLists.parent_id };
        this.http.post('Operation_Type/equality',id).then(res => {
          this.subparentid = res.data.data;
        }).catch((err) => {
          this.$message.error(err.response.data.msg);
        });
      },
      // 接受子组件传值
      showDialog: function(data) {
        this.dialogVisible = data;
        this.getCategoryTree();
      },
      // 编辑
      eidtList(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.newLists.charge_type_id = this.newListsId.id;
            this.http.post('ChargeType/editType', this.newLists).then(res => {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.getCategoryTree();
            }).catch((err) => {
              this.$message.error(err.response.data.msg);
            });
          } else {
            this.$message({
              message: '请输入完整',
              type: 'warning'
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../font/iconfont.css";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #666;
  }

  .category-tree-content {
    margin: 10px;
    border: 1px solid #e2e2e2;
  .category-text{background: #f7f7f7;line-height: 40px;font-size: 14px;color: #606266;padding: 0 15px;box-sizing: border-box;font-weight: bold;}
  }
  .filter-tree {
    overflow: auto;
    height: 750px;
  }
  .app-container {
    padding: 18px;
  }
  .addCategory {
    color: #38f;
    float: right;
    padding-right: 5px;
    cursor: pointer;
  }

  .addSubclass {
    padding: 10px;
    overflow: scroll;
    overflow-x: hidden;
  }
  .el-form-item {
    margin-bottom: 20px !important;
  }
</style>

