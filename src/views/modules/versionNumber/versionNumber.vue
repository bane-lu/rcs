<template>
  <div class="version-number">
    <el-row :gutter="30">
      <el-col :span="5"><div class="grid-content bg-purple">
        <label class="item_label">APP</label>
        <el-select v-model="filter.app" placeholder="请选择">
          <el-option
            :label="item.app"
            :value="item.app"
            :key="index"
            v-for="(item,index) in app_type">{{item.app}}</el-option>
        </el-select>
      </div></el-col>

      <el-col :span="5"><div class="grid-content bg-purple">
        <label class="item_label">OS</label>
        <el-select v-model="filter.os" placeholder="请选择">
          <el-option label="android" value="android"></el-option>
          <el-option label="iphone" value="iphone"></el-option>
        </el-select>
      </div></el-col>

      <el-col :span="5"><div class="grid-content bg-purple">
          <label class="item_label">状态</label>
          <el-select v-model="filter.status" placeholder="请选择">
            <el-option label="全部" value=""></el-option>
            <el-option label="已上架" value="1"></el-option>
            <el-option label="已下架" value="0"></el-option>
          </el-select>
      </div></el-col>

      <el-col :span="2"><div class="grid-content bg-purple">
        <el-button v-if="isAuth('manager:versioninf:list')" type="primary" @click="search()">查询</el-button>
      </div></el-col>

      <el-col :span="3"><div class="grid-content bg-purple">
        <el-button v-if="isAuth('manager:versioninf:save')" type="primary" @click="addOrUpdateHandle()">新增版本</el-button>
      </div></el-col>

      <el-col :span="2"><div class="grid-content bg-purple">
        <el-button v-if="isAuth('manager:versioninf:copyasnew')" type="primary" @click="copyAddHandle()">复制新增</el-button>
      </div></el-col>

    </el-row>

    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="app"
        header-align="center"
        align="center"
        width="120"
        label="App">
      </el-table-column>
      <el-table-column
        prop="version"
        header-align="center"
        align="center"
        width="120"
        label="版本">
      </el-table-column>
      <el-table-column
        prop="os"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="系统">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="状态"
        width="200">
        <template slot-scope="props">
          <span v-text="props.row.status == 1 ? '已上架' : '未上架'"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createBy"
        header-align="center"
        align="center"
        label="创建人"
        width="150">
        <template slot-scope="props">
          <span v-text="props.row.createBy == null ? '无' : props.row.createBy"></span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="280"
        label="操作">
        <template slot-scope="props">
          <el-button v-if="isAuth('manager:versioninf:publish')" v-text="props.row.status == 1 ? '下架' : '上架'" :type="props.row.status == 1 ? 'success' : 'danger'" size="mini" @click="enableOrDisable(props.row,'forbidden')"></el-button>
          <el-button type="text" v-if="isAuth('manager:versioninf:update')" size="small" @click="addOrUpdateHandle(props.row)">编辑</el-button>
          <el-button type="text" v-if="isAuth('manager:versioninf:delete')" size="small"  @click="enableOrDisable(props.row,'delete')">删除</el-button>
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
    <!-- 弹窗: 新增 / 复制新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" :to_app_type="app_type" @refreshDataList="getDataList" ></add-or-update>
    <copy-add v-if="copyAddVisible" ref="copyAdd" :to_app_type="app_type" @refreshDataList="getDataList" ></copy-add>
    <enable-or-disable v-if="enableOrDisableVisible" ref="enableOrDisable" @refreshDataList="getDataList"></enable-or-disable>
  </div>
</template>

<script>
  import AddOrUpdate from './number-add-or-update'
  import copyAdd from './number-copy-add'
  import EnableOrDisable from './number-enable-or-disable'
  export default {
    data () {
      return {
        app_type: [],
        filter: {
          app: '',
          os: '',
          status: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        copyAddVisible: false,
        enableOrDisableVisible: false
      }
    },
    components: {
      AddOrUpdate,
      copyAdd,
      EnableOrDisable
    },
    mounted () {
      this.get_app_type()
      this.getDataList()
    },
    activated () {
      // this.getDataList()
    },
    methods: {
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
      search () {
        this.pageIndex = 1
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        let page = this.pageIndex.toString()
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/manager/versioninf/list'),
          method: 'post',
          data: this.$http.adornData({
            'app': this.filter.app,
            'os': this.filter.os,
            'status': this.filter.status,
            'page': page,
            'limit': '10'
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
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
      // 新增
      addOrUpdateHandle (row) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(row)
        })
      },
      // 复制新增
      copyAddHandle (row) {
        this.copyAddVisible = true
        this.$nextTick(() => {
          this.$refs.copyAdd.init(row)
        })
      },
      // 上架 下架
      enableOrDisable (row,type) {
        this.enableOrDisableVisible = true
        this.$nextTick(() => {
          this.$refs.enableOrDisable.init(row,type)
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id
        this.$confirm(`确定对[id=${ids}]进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/manager/versioninf/delete'),
            method: 'post',
            data: this.$http.adornData({
              'id': ids
            }, false)
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
        }).catch(() => {})
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .version-number{
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
    .el-row {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
    .el-dialog {
      position: relative;
      margin: 0 auto 50px;
      background: #fff;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 25%!important;
    }
  }

</style>
