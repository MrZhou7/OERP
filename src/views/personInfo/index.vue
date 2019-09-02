<template>
  <main>
    <el-tabs v-loading="loading" type="border-card">
      <el-tab-pane label="总裁级">
        <div><el-button size="small" @click="request(0)">一键导出</el-button></div>
        <el-button v-for="(item, index) in tableData[0]" :key="index" @click="change(item)" type = "text" size="medium">{{ item.lastname }}</el-button>
      </el-tab-pane>
      <el-tab-pane label="总监级">
        <div><el-button size="small" @click="request(1)">一键导出</el-button></div>
        <el-button v-for="(item, index) in tableData[1]" :key="index" @click="change(item)" type = "text" size="medium">{{ item.lastname }}</el-button>
      </el-tab-pane>
      <el-tab-pane label="部长级">
        <div>
          <el-button size="small" @click="compressData(2)">一键生成压缩包文件</el-button>
          <el-button size="small" @click="downData(2)">下载压缩包文件</el-button>
        </div>
        <el-button v-for="(item, index) in tableData[2]" :key="index" @click="change(item)" type = "text" size="medium">{{ item.lastname }}</el-button>
      </el-tab-pane>
      <el-tab-pane label="高级经理级">
        <div><el-button size="small" @click="request(3)">一键导出</el-button></div>
        <el-button v-for="(item, index) in tableData[3]" :key="index" @click="change(item)" type = "text" size="medium">{{ item.lastname }}</el-button>
      </el-tab-pane>
      <el-tab-pane label="经理级">
        <div>
          <el-button size="small" @click="compressData(4)">一键生成压缩包文件</el-button>
          <el-button size="small" @click="downData(4)">下载压缩包文件</el-button>
        </div>
        <el-button v-for="(item, index) in tableData[4]" :key="index" @click="change(item)" type = "text" size="medium">{{ item.lastname }}</el-button>
      </el-tab-pane>
      <el-tab-pane label="主管级">
        <div>
          <el-button size="small" @click="compressData(5)">一键生成压缩包文件</el-button>
          <el-button size="small" @click="downData(5)">下载压缩包文件</el-button>
        </div>
        <el-button v-for="(item, index) in tableData[5]" :key="index" @click="change(item)" type = "text" size="medium">{{ item.lastname }}</el-button>
      </el-tab-pane>
      <el-tab-pane label="员工级（普通员工）">
        <div>
          <el-button size="small" @click="compressData(6)">一键生成压缩包文件</el-button>
          <el-button size="small" @click="downData(6)">下载压缩包文件</el-button>
        </div>
        <el-button v-for="(item, index) in tableData[6]" :key="index" @click="change(item)" type = "text" size="medium">{{ item.lastname }}</el-button>
      </el-tab-pane>
      <el-tab-pane label="员工级（一线员工）">
        <div>
          <el-button size="small" @click="compressData(7)">一键生成压缩包文件</el-button>
          <el-button size="small" @click="downData(7)">下载压缩包文件</el-button>
        </div>
        <el-button v-for="(item, index) in tableData[7]" :key="index" @click="change(item)" type = "text" size="medium">{{ item.lastname }}</el-button>
      </el-tab-pane>
      <el-tab-pane label="实习生">
        <div><el-button size="small" @click="request(8)">一键导出</el-button></div>
        <el-button v-for="(item, index) in tableData[8]" :key="index" @click="change(item)" type = "text" size="medium">{{ item.lastname }}</el-button>
      </el-tab-pane>
    </el-tabs>
  </main>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      loading: false,
      tableData: [],
      name: '',
      icon: '0'
    }
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.loading = true;
      this.axios.post('http://10.1.200.173/oa/User/getUserList').then(res => {
        this.loading = false;
        this.tableData = res.data.data;
      });
    },
    change(data) {
      this.$router.push({
        path: '/person/form',
        query: {
          id: data.id
        }
      });
    },
    request(index) {
      this.loading = true;
      fetch('http://10.1.200.173/v1/Excel/export?type=' + index, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.blob())
        .then(data => {
          this.loading = false;
          const blobUrl = 'http://10.1.200.173/v1/Excel/export?type=' + index;
          this.download(blobUrl, index);
        });
    },
    compressData(index) { // 一键压缩
      this.$confirm('该压缩可能持续时间约2分钟，请您耐心等待......', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true;
        this.axios.get('http://10.1.200.173/v1/Excel/producefile?type=' + index).then(res => {
          this.loading = false;
          this.icon = '1';
          this.$message({
            showClose: true,
            message: '已生成成功！',
            type: 'success'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消压缩'
        });
      });
    },
    downData(index) { // 下载
      if (this.icon != '1') {
        this.$message({ type: 'warning', message: '请先生成压缩包！' });
        return;
      }
      this.loading = true;
      fetch('http://10.1.200.173/v1/Excel/downloadFile?type=' + index, {
        method: 'get',
        headers: {
          'Content-Type': 'application/zip'
        }
      })
        .then(res => res.blob())
        .then(data => {
          this.loading = false;
          const blobUrl = 'http://10.1.200.173/v1/Excel/downloadFile?type=' + index;
          this.download(blobUrl, index);
        });
    },
    download(blobUrl, index) {
      const a = document.createElement('a');
      switch (index) {
        case 0:
          this.name = '总裁级';
          break;
        case 1:
          this.name = '总监级';
          break;
        case 2:
          this.name = '部长级';
          break;
        case 3:
          this.name = '高级经理级';
          break;
        case 4:
          this.name = '经理级';
          break;
        case 5:
          this.name = '主管级';
          break;
        case 6:
          this.name = '员工级（普通员工）';
          break;
        case 7:
          this.name = '员工级（一线员工）';
          break;
        case 8:
          this.name = '实习生';
          break;
      }
      a.style.display = 'none';
      a.download = this.name;
      a.href = blobUrl;
      a.click();
      this.icon = '0';
      document.body.removeChild(a);
    }
  }
};
</script>

<style scoped>
.el-tabs{ margin: 10px; }
  .wrap a{
    padding: 8px 10px;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: center;
    box-sizing: border-box;
    font-size: 12px;
    border-radius: 3px;
    outline: 0;}
</style>
