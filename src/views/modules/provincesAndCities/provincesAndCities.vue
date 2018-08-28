<template>
  <div v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="省份">
        <el-select v-model="formInline.province" @change="onChange" placeholder="请选择">
          <el-option v-for="(item , index) in provinceList" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市">
        <el-select v-model="formInline.city" @change="onChange" placeholder="请选择">
          <el-option v-for="(item , index) in cityList" :label="item.name" :value="item.name" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本">
        <el-select v-model="formInline.version" @change="onChange" placeholder="请选择">
          <el-option v-for="(item , index) in versionList" :label="item.app" :value="item.app" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
        <el-button type="info" @click="onReset">重置</el-button>
        <el-button type="primary" @click="onCreate">创建省/市</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      style="width: 100%;">
      <el-table-column
        header-align="center"
        align="center"
        width="100"
        type="index"
        :index="transforIndex"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="provinceName"
        header-align="center"
        align="center"
        label="省份">
      </el-table-column>
      <el-table-column
        prop="regionName"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="市">
      </el-table-column>
      <el-table-column
        prop="appType"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="关联版本">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        label="操作">
        <template slot-scope="props">
          <el-button type="success" size="small" @click="change(props.row)">修改</el-button>
          <el-button type="danger" @click="deleteHandle(props.row,props.index,dataList)" size="small">删除</el-button>
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
    <!--创建省/市弹窗-->
    <create-pro-and-city v-if="showDialog"
                           :title="title"
                           :provinceList = "provinceList"
                           :versionList = "versionList"
                           :formData = "formData"
                           @emitQuery = "onQuery"
                           ref="createProAndCity"></create-pro-and-city>
  </div>
</template>

<script>
  import CreateProAndCity from './createProvincesAndCities.vue'
  import provinceData from '@/utils/provinceData'
  export default {
    data () {
      return {
        title: '创建',
        pageSize: 10,
        pageIndex: 1,
        totalPage: 0,
        dataList: [],
        loading: false,
        formInline: {
          province: '',
          city: '',
          version: ''
        },
        provinceList: [],
        cityList: [],
        versionList: [],
        showDialog: false,
        formData: {}
      }
    },
    watch: {
      province (val) {
        this.formInline.city = ''
        this.getCities(val)
      }
    },
    computed: {
      province () {
        return this.formInline.province
      }
    },
    components: {
      CreateProAndCity
    },
    methods: {
      onQuery () {
        this.loading = true
        this.$http({
          url: this.$http.adornUrl('/manager/region/list'),
          method: 'post',
          data: {
            appType: this.formInline.version,
            regionName: this.formInline.city,
            provinceName: this.formInline.province,
            limit: JSON.stringify(this.pageSize),
            page: JSON.stringify(this.pageIndex)
          }
        }).then(({data}) => {
          this.loading = false
          if (data && data.code === 0) {
            this.totalPage = data.page.totalCount
            this.dataList = data.page.list
          } else {
            this.$message.error('查询数据出错')
          }
        }).catch(({data}) => {
          this.loading = false
          this.$message.error('查询数据出错')
        })
      },
      onReset () {
        this.loading = true
        this.formInline = {
          province: '',
          city: '',
          version: ''
        }
        this.pageIndex = 1
        this.$http({
          url: this.$http.adornUrl('/manager/region/list'),
          method: 'post',
          data: {
            appType: this.formInline.version,
            regionName: this.formInline.city,
            provinceName: this.formInline.province,
            limit: JSON.stringify(this.pageSize),
            page: JSON.stringify(this.pageIndex)
          }
        }).then(({data}) => {
          this.loading = false
          if (data && data.code === 0) {
            this.totalPage = data.page.totalCount
            this.dataList = data.page.list
          } else {
            this.$message.error('查询数据出错')
          }
        }).catch(({data}) => {
          this.loading = false
          this.$message.error('查询数据出错')
        })
      },
      onCreate () {
        this.title = '创建'
        this.showDialog = true
        // 使用nexttick触发子组件的方法，不然点击按钮第二次就没有弹窗
        this.$nextTick(() => {
          this.$refs.createProAndCity.init()
        })
      },
      onChange () {
        this.pageIndex = 1
        setTimeout(() => {
          this.onQuery()
        }, 1)
      },
      transforIndex (index) {
        return index + this.pageSize * (this.pageIndex - 1) + 1
      },
      sizeChangeHandle () {
        console.log('test')
      },
      currentChangeHandle (val) {
        this.pageIndex = val
        this.onQuery()
      },
      deleteHandle (row, index, list) {
        this.$confirm('确定删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteReq(row, index, list)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      deleteReq (row, index, list) {
        this.$http({
          url: this.$http.adornUrl('/manager/region/delete'),
          method: 'post',
          data: {
            regionName: row.regionName,
            provinceName: row.provinceName
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('删除成功')
            list.splice(index, 1)
          } else {
            this.$message.error('删除失败')
          }
        }).catch(({data}) => {
          this.$message.error('删除失败')
        })
      },
      change (row) {
        this.title = '修改'
        this.formData.version = row.appType
        this.formData.city = row.regionName
        this.formData.province = row.provinceName
        this.showDialog = true
        // 使用nexttick触发子组件的方法，不然点击按钮第二次就没有弹窗
        this.$nextTick(() => {
          this.$refs.createProAndCity.init()
        })
      },
      getProvinces () {
        let arr = []
        for (let i = 0; i < provinceData.length; i++) {
          arr.push(provinceData[i].name)
        }
        this.provinceList = arr
      },
      getCities (val) {
        let arr = provinceData.filter((item) => {
          return item.name == val
        })
        this.cityList = arr[0].city
      },
      // 获取app版本
      get_app_type () {
        this.$http({
          url: this.$http.adornUrl('/manager/version/getList'),
          method: 'get'
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.versionList = data.appList
          } else {
            this.$message.error('获取版本列表出错')
          }
        })
          .catch(() => {
            this.$message.error('获取版本列表出错')
          })
      }
    },
    created () {
      this.getProvinces()
      this.get_app_type()
      this.onQuery()
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>

</style>
