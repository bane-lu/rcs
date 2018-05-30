<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple">
        <label class="item_label">APP</label>
        <el-select v-model="filter.app" placeholder="请选择">
          <el-option
            :label="item.app"
            :value="item.app"
            :key="index"
            v-for="(item,index) in app_type">{{item.app}}</el-option>
        </el-select>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <label class="item_label">urlName</label>
          <el-input v-model="filter.urlName" placeholder="请输入"></el-input>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <label class="item_label">Url查询</label>
          <el-input v-model="filter.url" placeholder="请输入"></el-input>
      </div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
          <label class="item_label">开启状态</label>
          <el-select v-model="filter.status" placeholder="请选择">
            <el-option label="请选择" value=""></el-option>
            <el-option label="开启" value="1"></el-option>
            <el-option label="关闭" value="0"></el-option>
          </el-select>
      </div></el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="4"><div class="grid-content bg-purple">
        <label class="item_label">描述</label>
        <el-input v-model="filter.description" placeholder="请输入描述"></el-input>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">
          <label class="item_label">有效时间</label>
          <el-date-picker
             v-model="filter.minTime"
             type="datetime"
             value-format="yyyy-MM-dd HH:mm:ss"
             placeholder="开始时间"
             @change="transformTime"
             :picker-options="pickerOptions0">
          </el-date-picker>
          <span>&nbsp;-&nbsp;</span>
          <el-date-picker
             v-model="filter.maxTime"
             type="datetime"
             value-format="yyyy-MM-dd HH:mm:ss"
             placeholder="结束时间"
             @change="transformTime"
             :picker-options="pickerOptions1">
          </el-date-picker>
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple">
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button type="success" @click="addOrUpdateHandle()">新增</el-button>
          <el-button type="info" @click="reset()">重置</el-button>
          <el-button type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </div></el-col>
    </el-row>
    <!-- 分页 -->
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
        :show-overflow-tooltip="true"
        width="110"
        label="APP">
      </el-table-column>
      <el-table-column
        prop="urlName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        width="110"
        label="urlName">
      </el-table-column>
      <el-table-column
        prop="version"
        header-align="center"
        align="center"
        label="版本号">
      </el-table-column>
      <el-table-column
        prop="url"
        header-align="center"
        align="center"
        label="Url"
        :show-overflow-tooltip="true"
        width="270">
      </el-table-column>
      <el-table-column
        prop="system"
        header-align="center"
        align="center"
        label="系统">
        <template slot-scope="props">
          <span v-text="props.row.os == 1 ? 'IOS' : 'Android'"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="props">
          <span v-text="props.row.status == 1 ? '开启' : '关闭'"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="描述"
        width="100">
      </el-table-column>
      <el-table-column
        prop="description"
        header-align="center"
        align="center"
        label="时间"
        width="290">
        <template slot-scope="props">
          <span v-text="props.row.minTime +'-'+ props.row.maxTime"></span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="props">
          <el-button type="primary" size="mini" @click="addOrUpdateHandle(props.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteHandle(props.row)">删除</el-button>
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
    <!-- 新建弹窗 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
  import { compareTime } from '@/utils/validate'
  import AddOrUpdate from './url-add-or-update'
  export default {
    data () {
      return {
        id: null,
        // 获取app下拉框内容
        app_type: [],
        // 控制弹窗显示
        addOrUpdateVisible: false,
        timerange: null,
        filter: {
          id: null,
          app: null,
          urlName: null,
          url: null,
          status: null,
          description: null,
          minTime: null,
          maxTime: null
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 8,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() > Date.now() - 8.64e7
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() > Date.now()
          }
        }
      }
    },
    components: {
      AddOrUpdate
    },
    created () {
      this.get_app_type()
    },
    activated () {
      this.getDataList()
    },
    methods: {
      search () {
        this.pageIndex = 1
        this.getDataList()
      },
      reset () {
        this.pageIndex = 1
        this.filter.app = null
        this.filter.urlName = null
        this.filter.url = null
        this.filter.status = null
        this.filter.description = null
        this.filter.minTime = null
        this.filter.maxTime = null
        this.getDataList()
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/manager/url/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'app': this.filter.app,
            'urlName': this.filter.urlName,
            'url': this.filter.url,
            'status': this.filter.status,
            'description': this.filter.description,
            'minTime': this.filter.minTime,
            'maxTime': this.filter.maxTime
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
        }).catch(({data}) => {
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
      // 新增 / 修改
      addOrUpdateHandle (row) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(row)
        })
      },
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
      // 格式化日期选择器
      transformTime (time) {
        if (!this.filter.minTime) {
          this.$message({
            message: '请选择开始时间',
            type: 'warning'
          })
        } else if (!this.filter.maxTime) {
          this.$message('请选择结束时间')
        } else {
          let sta = compareTime(this.filter.minTime, this.filter.maxTime, 3600 * 24 * 1000)
          if (!sta) {
            this.$message({
              message: '结束时间必须多于开始时间24小时以上',
              type: 'warning'
            })
          }
        }
        return time
      },
      deleteHandle (row) {
        var id = row.id
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.roleId
        })
        this.$confirm(`确定对[ id = ${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/manager/url/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
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
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
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
  .date_picker{
    margin-right: 10px;
  }
  /* 时间选择框 */
  .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
    width: 360px;
  }
</style>
