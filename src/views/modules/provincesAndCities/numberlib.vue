<template>
  <div class="lib">
    <el-row :gutter="24">

      <el-col :span="5"><div class="grid-content bg-purple">
        <label class="item_label">号码段</label>
        <el-input
          v-model="filter.sectionNumber"
          placeholder="请输入号码段"
          maxlength="7"></el-input>
      </div></el-col>

      <el-col :span="6"><div class="grid-content bg-purple">
        <label class="item_label">关联省</label>
        <el-select placeholder="请选择"
          v-model="filter.provinceId"
          @change="changeProvince">
          <el-option
            :label="item.provinceName"
            :value="item.id"
            :key="index"
            v-for="(item,index) in province_type">{{item.provinceName}}</el-option>
        </el-select>
      </div></el-col>

      <el-col :span="6"><div class="grid-content bg-purple">
        <label class="item_label">关联市</label>
        <el-select placeholder="请选择"
          :disabled="!filter.provinceId"
          v-model="filter.regionId">
          <el-option
            :label="item.regionName"
            :value="item.id"
            :key="index"
            v-for="(item,index) in city_type">{{item.regionName}}</el-option>
        </el-select>
      </div></el-col>

      <el-col :span="2"><div class="grid-content bg-purple">
        <el-button type="primary" @click="getDataList()">查找</el-button>
      </div></el-col>

      <el-col :span="2"><div class="grid-content bg-purple">
        <el-button type="primary" @click="reset()">重置</el-button>
      </div></el-col>

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
        prop="sectionNumber"
        header-align="center"
        align="center"
        width="120"
        label="号码段">
      </el-table-column>
      <el-table-column
        prop="appType"
        header-align="center"
        align="center"
        width="200"
        label="关联版本">
      </el-table-column>
      <el-table-column
        prop="regionEntity"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        width="200"
        label="关联省份">
        <template slot-scope="props">
          <span v-text="props.row.regionEntity.provinceEntity.provinceName == null ? '---' : props.row.regionEntity.provinceEntity.provinceName"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="regionEntity"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="关联市"
        width="200">
        <template slot-scope="props">
          <span v-text="props.row.regionEntity.regionName == null ? '---' : props.row.regionEntity.regionName"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="regionId"
        header-align="center"
        align="center"
        label="操作">
        <template slot-scope="props">
          <el-button type="primary" size="small" @click="addOrUpdateHandle(props.row)">修改</el-button>
          <el-button type="danger" size="small" @click="deleteHandle(props.row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        label="操作"> -->
        <!-- <template slot-scope="props"> -->
          <!-- <el-button v-if="isAuth('manager:versioninf:publish')" v-text="props.row.status == 1 ? '下架' : '上架'" :type="props.row.status == 1 ? 'success' : 'danger'" size="mini" @click="enableOrDisable(props.row,'forbidden')"></el-button>
          <el-button type="text" v-if="isAuth('manager:versioninf:update')" size="small" @click="addOrUpdateHandle(props.row)">编辑</el-button>
          <el-button type="text" v-if="isAuth('manager:versioninf:delete')" size="small"  @click="enableOrDisable(props.row,'delete')">删除</el-button> -->
        <!-- </template> -->
      <!-- </el-table-column> -->
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
  import AddOrUpdate from './lib-add-or-update'
  export default {
    data () {
      return {
        province_type: [],
        app_type: [],
        city_type: [],
        filter: {
          sectionNumber: null,
          provinceId: null,
          regionId: null
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
      this.get_app_type()
      this.get_province_type()
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
        this.filter.regionId = null
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
      reset () {
        this.filter.sectionNumber = null
        this.filter.provinceId = null
        this.filter.regionId = null
        this.dataList = null
        this.pageIndex = 1
        this.pageSize = 8
        this.totalPage = 0

        this.dataListLoading = false
        this.dataListSelections = []
        this.addOrUpdateVisible = false

        this.get_province_type()
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl(`/manager/sectionNumber/queryList/${this.pageIndex}/${this.pageSize}`),
          method: 'post',
          data: this.$http.adornData({
            'sectionNumber': this.filter.sectionNumber,
            'provinceId': this.filter.provinceId,
            'regionId': this.filter.regionId,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.data.sectionNumberList
            this.totalPage = data.data.total
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
        var ids = row.sectionNumber
        console.log(row.sectionNumber)
        this.$confirm(`确定对该条数据进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params = {
            'sectionNumber': ids
          }
          this.$http({
            url: this.$http.adornUrl('/manager/sectionNumber/delete'),
            method: 'post',
            data: this.$http.adornData({
              'sectionNumber': ids
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
