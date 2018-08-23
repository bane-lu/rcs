<template>
  <div class="lib">
    <el-row :gutter="24">

      <el-col :span="5"><div class="grid-content bg-purple">
        <label class="item_label">号码段</label>
        <el-input
          placeholder="请输入号码段"
          maxlength="7"></el-input>
      </div></el-col>

      <el-col :span="6"><div class="grid-content bg-purple">
        <label class="item_label">关联省</label>
        <el-select placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option label="android" value="android"></el-option>
          <el-option label="iphone" value="iphone"></el-option>
        </el-select>
      </div></el-col>

      <el-col :span="6"><div class="grid-content bg-purple">
        <label class="item_label">关联市</label>
        <el-select placeholder="请选择">
          <el-option label="请选择" value=""></el-option>
          <el-option label="android" value="android"></el-option>
          <el-option label="iphone" value="iphone"></el-option>
        </el-select>
      </div></el-col>

      <el-col :span="2"><div class="grid-content bg-purple">
        <el-button type="primary">查找</el-button>
      </div></el-col>

      <el-col :span="2"><div class="grid-content bg-purple">
        <el-button type="primary">重置</el-button>
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
        type="1"
        header-align="center"
        align="center"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="app"
        header-align="center"
        align="center"
        width="120"
        label="号码段">
      </el-table-column>
      <el-table-column
        prop="version"
        header-align="center"
        align="center"
        width="120"
        label="关联版本">
      </el-table-column>
      <el-table-column
        prop="os"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="关联省份">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="关联市"
        width="250">
        <template slot-scope="props">
          <span v-text="props.row.status == 1 ? '已上架' : '未上架'"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="createBy"
        header-align="center"
        align="center"
        label="操作"
        width="150">
        <template slot-scope="props">
          <span v-text="props.row.createBy == null ? '无' : props.row.createBy"></span>
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
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './lib-add-or-update'
  export default {
    data () {
      return {
        addOrUpdateVisible: false
      }
    },
    methods:{
      // 新增
      addOrUpdateHandle () {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init()
        })
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
