<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '编辑'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="号码段" prop="sectionNumber">
        <el-input
          :disabled="!isEditable"
          v-model="dataForm.sectionNumber"
          placeholder="请输入号码段"
          maxlength="7"></el-input>
      </el-form-item>

      <el-form-item label="关联省" prop="provinceId">
        <el-select placeholder="请选择"
          v-model="dataForm.provinceId"
          @change="changeProvince">
          <el-option
            :label="item.provinceName"
            :value="item.id"
            :key="index"
            v-for="(item,index) in to_province_type">{{item.provinceName}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="关联市" prop="regionId">
        <el-select placeholder="请选择"
          v-model="dataForm.regionId">
          <el-option
            :label="item.regionName"
            :value="item.id"
            :key="index"
            v-for="(item,index) in city_type">{{item.regionName}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="appType" prop="appType">
        <el-select v-model="dataForm.appType" placeholder="请选择">
          <el-option
            :label="item.app"
            :value="item.app"
            :key="index"
            v-for="(item,index) in to_app_type">{{item.app}}</el-option>
        </el-select>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="on_submit_loading">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isNumberLib } from '@/utils/validate'
  export default {
    props: {
      to_app_type: {
        type: Array
      },
      to_province_type: {
        type: Array
      }
    },
    data () {
      var validateNumber = (rule, value, callback) => {
        if (!isNumberLib(value)) {
          callback(new Error('号码段式不正确'))
        } else {
          callback()
        }
      }

      return {
        on_submit_loading: false,
        visible: false,
        isEditable: true,
        city_type: [],
        dataForm: {
          id: null,
          sectionNumber: null,
          provinceId: null,
          regionId: null,
          appType: null
        },
        dataRule: {
          sectionNumber: [
            { required: true, message: '号码段不能为空', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          provinceId: [
            { required: true, message: '省份不能为空', trigger: 'blur' },
          ],
          regionId: [
            { required: true, message: '市不能为空', trigger: 'blur' }
          ],
          appType: [
            { required: true, message: 'app不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
    },
    mounted () {
    },
    methods: {
      init (row) {
        this.dataForm.id = null
        row && (this.dataForm.id = row.regionId)
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (row) {
            this.isEditable = false
            this.get_city_type(row.regionEntity.provinceId)
            this.dataForm.sectionNumber = row.sectionNumber
            this.dataForm.provinceId = row.regionEntity.provinceId
            this.dataForm.regionId = row.regionId
            this.dataForm.appType = row.appType
          }else {
            this.isEditable = true
            this.dataForm.sectionNumber = null
            this.dataForm.provinceId = null
            this.dataForm.regionId = null
            this.dataForm.appType = null
          }
        })

      },
      changeProvince (value) {
        this.get_city_type(value)
        this.dataForm.regionId = null
      },
      // 获取市
      get_city_type (province) {
        var params = new FormData();
        params.append('provinceId', province);//上传的文件： 键名，键值
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
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            
            this.on_submit_loading = true
            this.$http({
              url: this.$http.adornUrl(`/manager/sectionNumber/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'sectionNumber': this.dataForm.sectionNumber,
                'provinceId': this.dataForm.provinceId,
                'regionId': this.dataForm.regionId,
                'appType': this.dataForm.appType
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.on_submit_loading = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
                this.on_submit_loading = false
              }
            }).catch(() => {
              this.on_submit_loading = false
            })
          }
        })
      }
    }
  }
</script>
