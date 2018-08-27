<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    class="createDialog">
    <el-form :model="formInline" :rules="rules" ref="ruleForm" label-width="100px">
      <el-form-item label="省份" prop="province">
        <el-select v-model="formInline.province" @change="inputChange(formInline, formInline.province, $event)" placeholder="请选择" class="el-col-18">
          <el-option v-for="(item , index) in provinceList" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-select v-model="formInline.city" @change="inputChange(formInline, formInline.city, $event)" placeholder="请选择" class="el-col-18">
          <el-option v-for="(item , index) in cityList" :label="item.name" :value="item.name" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本" prop="version">
        <el-select v-model="formInline.version" @change="inputChange(formInline, formInline.version, $event)" placeholder="请选择" class="el-col-18">
          <el-option v-for="(item , index) in versionList" :label="item.app" :value="item.app" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="info" @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import provinceData from '@/utils/provinceData'
  export default {
    data () {
      return {
        visible: false,
        formInline: {
          province: '',
          city: '',
          version: ''
        },
        cityList: [],
        rules: {
          province: [
              { required: true, message: '请选择省份', trigger: 'change' }
          ],
          city: [
              { required: true, message: '请选择地市', trigger: 'change' }
          ],
          version: [
              { required: true, message: '请选择版本', trigger: 'change' }
          ]
        },
        isFirst: true   // 判断城市选项框数据显示的问题
      }
    },
    props: ['title', 'provinceList', 'versionList', 'formData'],
    watch: {
      province (val) {
        if (this.formInline.city) {
          this.formInline.city = ''
        }
        if (this.title == '修改' && this.isFirst) {
          this.formInline.city = this.formData.city
          this.isFirst = false
        }
        this.getCities(val)
      }
    },
    computed: {
      province () {
        return this.formInline.province
      }
    },
    methods: {
      inputChange (obj, attr, val) {
        // 这样设置才能改变选项值
        this.$set(obj, attr, val)
        // 解决不能显示已点击过的选项的问题
        delete obj[attr]
      },
      getCities (val) {
        let arr = provinceData.filter((item) => {
          return item.name == val
        })
        if (arr[0]) {
          // 加判断，防止不存在属性时报错
          this.cityList = arr[0].city
        }
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.title == '创建') {
              this.createProAndCity()
            } else {
              this.updateProAndCity()
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields()
        }
      },
      createProAndCity () {
        this.$http({
          url: this.$http.adornUrl('/manager/region/save'),
          method: 'post',
          data: {
            appType: this.formInline.version,
            regionName: this.formInline.city,
            provinceName: this.formInline.province
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('创建成功')
            this.visible = false
            this.$emit('emitQuery')
          } else {
            this.$message.error(data.msg)
          }
        }).catch((data) => {
          this.$message.error('创建失败')
        })
      },
      updateProAndCity () {
        this.$http({
          url: this.$http.adornUrl('/manager/region/update'),
          method: 'post',
          data: {
            appType: this.formInline.version,
            regionName: this.formInline.city,
            provinceName: this.formInline.province
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message.success('修改成功')
            this.visible = false
            this.$emit('emitQuery')
          } else {
            this.$message.error(data.msg)
          }
        }).catch((data) => {
          this.$message.error('修改失败')
        })
      },
      init () {
        this.visible = true
        this.resetForm('ruleForm')
        if (this.title == '创建') {
          this.formInline = {}
        } else {
          this.isFirst = true
          this.formInline = {
            province: '',
            city: '',
            version: ''
          }
          this.formInline = Object.assign(this.formInline, this.formData)
        }
      }
    },
    created () {
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>

</style>
