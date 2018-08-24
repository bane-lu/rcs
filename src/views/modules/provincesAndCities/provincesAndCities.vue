<template>
  <div v-loading="loading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="省份">
        <el-select v-model="formInline.province" placeholder="请选择">
          <el-option v-for="(item , index) in provinceList" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市">
        <el-select v-model="formInline.city" placeholder="请选择">
          <el-option v-for="(item , index) in cityList" :label="item.name" :value="item.name" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本">
        <el-select v-model="formInline.version" placeholder="请选择">
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
        width="50"
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="province"
        header-align="center"
        align="center"
        width="190"
        label="省份">
      </el-table-column>
      <el-table-column
        prop="city"
        header-align="center"
        align="center"
        :show-overflow-tooltip="true"
        label="市">
      </el-table-column>
      <el-table-column
        prop="version"
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
          <el-button type="danger" @click="deleteHandle(props.row)" size="small">删除</el-button>
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
        totalPage: 11,
        dataList: [{
          number: '1',
          province: '广东',
          city: '上海',
          version: '12'
        }, {
          number: '2',
          province: '广东',
          city: '上海',
          version: '12'
        }],
        loading: false,
        formInline: {
          province: '',
          city: '',
          version: ''
        },
        provinceList: [],
        cityList: [],
        versionList: [],
        showDialog: false
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
        this.$http({
          url: this.$http.adornUrl('/manager/region/list'),
          method: 'post',
          params: {
            appType: this.formInline.version,
            regionName: this.formInline.city,
            provinceName: this.formInline.province,
            limit: '10',
            page: '1'
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            console.log(data)
            this.dataList = data.page.list
          } else {
            this.$message.error('查询数据出错')
          }
        }).catch(({data}) => {
          this.$message.error('查询数据出错')
        })
      },
      onReset () {
      },
      onCreate () {
        this.title = '创建'
        this.showDialog = true
        this.$nextTick(() => {
          this.$refs.createProAndCity.init()
        })
      },
      sizeChangeHandle () {
        console.log('test')
      },
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
        console.log('test')
      },
      deleteHandle (row) {
        console.log(row.city)
        this.$confirm('确定删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      change (row) {
        this.title = '修改'
        this.showDialog = true
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
      },
      getDataList () {
      }
    },
    created () {
      this.getProvinces()
      this.get_app_type()
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>

</style>
