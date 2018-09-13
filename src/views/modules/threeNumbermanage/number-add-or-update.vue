<template>
  <el-dialog
    class="lib-add-update"
    :title="!dataForm.id ? '新增' : '编辑'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="前三位号段" prop="number">
        <el-input
          :disabled="!isEditable"
          v-model="dataForm.number"
          placeholder="请输入号段"
          maxlength="3"></el-input>
      </el-form-item>

      <el-form-item label="运营商" prop="operatorCode">
        <el-radio-group v-model="dataForm.operatorCode" @change="assa">
          <el-radio v-model="dataForm.operatorCode" label="0">中国移动</el-radio>
          <el-radio v-model="dataForm.operatorCode" label="1">中国联通</el-radio>
          <el-radio v-model="dataForm.operatorCode" label="2">中国电信</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="on_submit_loading">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isThreeNumber } from '@/utils/validate'
  export default {
    data () {
      var validateNumber = (rule, value, callback) => {
        if (!isThreeNumber(value)) {
          callback(new Error('号段格式不正确'))
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
          number: null,
          operatorCode: null
        },
        dataRule: {
          number: [
            { required: true, message: '三位号段不能为空', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          operatorCode: [
            { required: true, message: '运营商不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
    },
    mounted () {
    },
    methods: {
      assa(){
        console.log(this.dataForm.operatorCode);
      },
      init (row) {
        this.dataForm.id = null
        row && (this.dataForm.id = row.operatorCode)
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (row) {
            this.isEditable = false
            this.dataForm.number = row.number
            this.dataForm.operatorCode = row.operatorCode.toString()
            console.log(this.dataForm);
          }else {
            this.isEditable = true
            this.dataForm.number = null
            this.dataForm.operatorCode = null
          }
        })

      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.on_submit_loading = true
            console.log(this.dataForm)
            this.$http({
              url: this.$http.adornUrl(`/manager/operatornumber/${this.dataForm.id == null ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'number': this.dataForm.number,
                'operatorCode': this.dataForm.operatorCode
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
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.lib-add-update{
  .el-select {
    width: 100%;
    display: inline-block;
    position: relative;
  }
  .el-form-item__content{
    margin-left: 140px!important;
  }
  .el-form-item__label{
    width: 130px!important;
  }
}
</style>
