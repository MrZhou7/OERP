<template>
  <el-main :style="height">

  </el-main>
</template>

<script>
  export default {
    name: 'costView',
    data() {
      return {
        costView: {},// 账单查看
        costViewTable: [],
        total: 0,//分页总数据
        currentPage: 1,//当前页码
        height: {
          height: window.innerHeight * 0.7 + 'px'
        }
      }
    },
    props: ['costId', 'detailId'],
    watch: {
      costId: function(newVal, oldVal) {
        let data = {}
        data.invoice_header_id = newVal
        this.costViews(data)
      },
      detailId: function(newVal, oldVal) {
        // this.costViews(newVal)
      }
    },
    created() {
      let data = {}
      data.invoice_header_id = this.costId
      this.costViews(data)
    },
    methods: {
      pageinations(val) {//分页
        let data = {}
        data.page = val
        data.limit = 10
        data.invoice_header_id = this.costId
        this.costViews(data)
      },
      costViews(data) {
        let that = this
        this.http.post('Bill/getBillDetail', data).then(res => {
          that.costView = res.data.data.main
          that.costViewTable = res.data.data.list// 订单信息
        }).catch((err) => {
          that.$message.error(err.response.data.msg);
        });
      },
      viewRow(index, row) {
        this.$emit('costEditTiem', row[index].invoice_detail_id)
      }
    }
  }
</script>

<style scoped>

</style>
