<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    class="createDialog">
    <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="选择省份" prop="province">
          <el-select v-model="formData.province" placeholder="请选择" class="el-col-20">
            <el-option v-for="(item , index) in provinceList" :label="item" :value="item" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择地市" prop="city">
          <el-select v-model="formData.city" placeholder="请选择" class="el-col-20">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联版本" prop="version">
          <el-select v-model="formData.version" placeholder="请选择" class="el-col-20">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
  export default {
    data () {
      return {
        visible: false,
        formData: {
          province: '',
          city: '',
          version: ''
        },
        provinceList: ['广东', '浙江', '江苏'],
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
        }
      }
    },
    props: ['title'],
    components: {
    },
    methods: {
      cancel () {

      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
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
      init () {
        this.visible = true
        this.resetForm('ruleForm')
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .createDialog{
    .el-dialog{
      width:28% !important;
    }
  }
</style>
