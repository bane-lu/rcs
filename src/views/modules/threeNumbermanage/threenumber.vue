<template>
  <div class="lib">
    <el-row :gutter="24">

      <el-col :span="3"><div class="grid-content bg-purple">
        <el-button type="primary" @click="addOrUpdateHandle()">新增号码库</el-button>
      </div></el-col>

    </el-row>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="index"
        :index="transforIndex"
        header-align="center"
        align="center"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="number"
        header-align="center"
        align="center"
        width="170"
        label="前三位号段">
      </el-table-column>
      <el-table-column
        prop="operatorCode"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        width="250"
        label="运营商">
        <template slot-scope="props">
          <span v-text="props.row.operatorCode == 0 ? '中国移动' : (props.row.operatorCode == 1 ? '中国联通' : '中国电信')"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="创建时间"
        width="300">
      </el-table-column>
      <el-table-column
        prop="regionCode"
        header-align="center"
        align="center"
        label="操作">
        <template slot-scope="props">
          <el-button type="primary" size="small" @click="addOrUpdateHandle(props.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteHandle(props.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, prev, pager, next">
    </el-pagination>
    <add-or-update v-if="addOrUpdateVisible" :to_app_type="app_type" :to_province_type="province_type" ref="addOrUpdate"  @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './number-add-or-update'
  export default {
    data () {
      return {
        province_type: [],
        app_type: [],
        city_type: [],
        filter: {
          sectionNumber: null,
          provinceId: null,
          regionCode: null
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 8,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
      }
    },
    mounted(){
      this.getDataList()
    },
    methods:{
      transforIndex (index) {
        return index + this.pageSize*(this.pageIndex - 1) + 1
      },
      // 获取app
      get_app_type () {
        this.$http({
          url: this.$http.adornUrl('/manager/version/getList'),
          method: 'get',
          data: this.$http.adornParams()
        }).then(({data}) => {
          this.app_type = data.appList
        })
        .catch(() => {
        })
      },
      // 获取省份
      get_province_type () {
        this.$http({
          url: this.$http.adornUrl('/manager/province/queryAll'),
          method: 'get',
          data: this.$http.adornParams()
        }).then(({data}) => {
          this.province_type = data.data
        })
        .catch(() => {
        })
      },
      changeProvince (value) {
        this.get_city_type(value)
        this.filter.regionCode = null
      },
      // 获取市
      get_city_type (province) {
        this.$http({
          url: this.$http.adornUrl(`/manager/region/queryByProvinceId?provinceId=${province}`),
          method: 'get',
          data: this.$http.adornParams()
        }).then(({data}) => {
          this.city_type = data.data
        })
        .catch(() => {
        })
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/manager/operatornumber/list'),
          method: 'post',
          data: this.$http.adornData({
            'page': this.pageIndex.toString(),
            'limit': this.pageSize.toString()
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalPage
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 新增
      addOrUpdateHandle (row) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(row)
        })
      },
      deleteHandle (row) {
        var ids = row.number
        this.$confirm(`确定对该条数据进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            'sectionNumber': ids
          }
          this.$http({
            url: this.$http.adornUrl('/manager/operatornumber/delete'),
            method: 'post',
            data: this.$http.adornData({
              'number': ids
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(({data}) => {
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
    },
    components: {
      AddOrUpdate
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
.lib{
  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10%!important;
  }
  .grid-content{
    padding: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: start;
  }
  .item_label{
    font-size: 14px;
    padding: 0px 10px;
    word-break:keep-all;
    white-space:nowrap;
  }
}
</style>
