<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="APP" prop="paramApp">
        <el-input v-model="dataForm.paramApp" placeholder="APP" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="paramDes">
        <el-input v-model="dataForm.paramDes"
          placeholder="描述"
          maxlength="20"
          @input="des_input"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="paramStatus">
        <el-radio-group v-model="dataForm.paramStatus">
          <el-radio label="1">启用</el-radio>
          <el-radio label="0">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isEnglish, isUniqueChart } from '@/utils/validate'
  export default {
    data () {
      var validateApp = (rule, value, callback) => {
        if (!isEnglish(value)) {
          callback(new Error('只能输入英字'))
        } else {
          callback()
        }
      }
      var validateDes = (rule, value, callback) => {
        if (!isUniqueChart(value)) {
          callback(new Error('不能输入特殊字符'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        dataForm: {
          id: 0,
          paramApp: null,
          paramDes: null,
          paramStatus: null
        },
        dataRule: {
          paramApp: [
            { validator: validateApp, required: true, trigger: 'blur' }
          ],
          paramDes: [
            { validator: validateDes, required: true, trigger: 'blur' }
          ],
          paramStatus: [
            { required: true, message: '请选择一种状态', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      des_input () {
        var regStr = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
        this.dataForm.paramDes = this.dataForm.paramDes.replace(regStr, '')
      },
      init (id) {
        this.$nextTick(() => {
          this.visible = true
          this.dataForm.paramApp = null
          this.dataForm.paramDes = null
          this.dataForm.paramStatus = null
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/manager/version/save`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'app': this.dataForm.paramApp,
                'description': this.dataForm.paramDes,
                'status': this.dataForm.paramStatus
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
