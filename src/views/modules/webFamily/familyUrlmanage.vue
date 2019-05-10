<template>
  <div id="webFamily">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <label class="item_label">名称</label>
          <el-input v-model="filter.urlName" placeholder="请输入"></el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <label class="item_label">url</label>
          <el-input v-model="filter.url" placeholder="请输入"></el-input>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content bg-purple">
          <label class="item_label">有效时间</label>
          <el-date-picker v-model="filter.minTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="开始时间" @change="transformTime">
          </el-date-picker>
          <span>&nbsp;-&nbsp;</span>
          <el-date-picker v-model="filter.maxTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间" @change="transformTime">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <label class="item_label">模块</label>
          <el-input v-model="filter.description" placeholder="请输入"></el-input>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-button type="primary" v-if="isAuth('manager:url:list')" @click="search()">查询</el-button>
          <el-button type="success" v-if="isAuth('manager:url:save')" @click="addOrUpdateHandle()">新增</el-button>
          <el-button type="info" v-if="isAuth('urlmanage:urlmanage:reset')" @click="reset()">重置</el-button>
          <el-button type="danger" v-if="isAuth('manager:url:delete')" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">排序</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" style="width: 100%;">
      <el-table-column type="index" :index="transforIndex" header-align="center" align="center" label="序列" width="80">
      </el-table-column>
      <el-table-column prop="mobile" header-align="center" align="center" width="120" label="业务名称">
      </el-table-column>
      <el-table-column prop="app" header-align="center" align="center" width="180" label="APP">
      </el-table-column>
      <el-table-column prop="desc" header-align="center" align="center" label="模块" width="290">
        <template slot-scope="props">
          <span v-text="props.row.startDate +' — '+ props.row.endDate"></span>
        </template>
      </el-table-column>
      <el-table-column prop="desc" header-align="center" align="center" :show-overflow-tooltip="true" label="url" width="200">
        <template slot-scope="props">
          <span v-text="props.row.desc == '' || props.row.desc == null ? '--' : props.row.desc"></span>
        </template>
      </el-table-column>
      <el-table-column prop="regionCode" header-align="center" align="center" label="操作">
        <template slot-scope="props">
          <el-button type="primary" size="small" @click="addOrUpdateHandle(props.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteHandle(props.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-size="pageSize" :total="totalPage" layout="total, prev, pager, next">
    </el-pagination>
    <add-or-update v-if="addOrUpdateVisible" :to_app_type="app_type" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from '../specifiedNumber/addOrUpdate';
export default {
  data() {
    return {
      app_type: [],
      filter: {
        sectionNumber: null,
        app: null,
        desc: '',
        minTime: null,
        maxTime: null
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 8,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      form: {
        methodVal: ""
      },
      method: "",
    }
  },
  methods: {
    transforIndex(index) {
      return index + this.pageSize * (this.pageIndex - 1) + 1
    },
    //获取APP
    get_app_type() {
      this.$http({
        url: this.$http.adornUrl('/mobapp/apps'),
        method: 'get',
        data: this.$http.adornParams()
      }).then(({ data }) => {
        if (data.code == 0) {
          this.app_type = data.data;
        }
      }).catch(() => {
      })
    },
    // 格式化日期选择器
    transformTime(time) {
      return time
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/mobapp/list'),
        method: 'post',
        data: this.$http.adornData({
          "page": this.pageIndex.toString(),
          "limit": this.pageSize.toString(),
          "app": this.filter.app,
          "mobile": this.filter.sectionNumber == '' ? null : this.filter.sectionNumber,
          "startDate": this.filter.minTime,
          "endDate": this.filter.maxTime
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount
        } else if (data && data.code == 500) {
          this.$message({
            message: data.msg,
            type: 'warning'
          });
          this.dataList = [];
          this.totalPage = 0;
        } else {
          this.dataList = []
          this.totalPage = 0
        }

        this.dataListLoading = false
      }).catch(({ data }) => {
        this.dataListLoading = false
      })
    },
    //查询
    onSubmit() {
      this.getDataList();
    },
    addOrUpdateHandle(row) {
      this.$router.push({
        name: "addOrUpdate"
      })
      // this.addOrUpdateVisible = true
      // this.$nextTick(() => {
      //   this.$refs.addOrUpdate.init(row)
      // })
    },
    //删除
    deleteHandle(row) {
      var id = row.id;
      this.$confirm(`确定删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/mobapp/delete/' + id),
          method: 'get',
        }).then(({ data }) => {
          if (data && data.code == 0) {
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
      }).catch(({ data }) => {
      })
    },
    //重置
    reset() {
      this.pageIndex = 1;
      this.filter.app = null;
      this.filter.sectionNumber = null;
      this.filter.desc = '';
      this.filter.minTime = null;
      this.filter.maxTime = null;
      this.getDataList();
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    }
  },
  mounted() {
    this.get_app_type();
    this.getDataList();
  },
  components: {
    AddOrUpdate
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