<template>
  <el-dialog
    title="请输入密令"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="0px">
      <el-form-item prop="commitKey">
        <el-input type="password" v-model="dataForm.commitKey" placeholder=""></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">&nbsp;&nbsp;&nbsp;取消&nbsp;&nbsp;&nbsp;</el-button>
      <el-button type="primary" @click="dataFormSubmit()">&nbsp;&nbsp;&nbsp;确定&nbsp;&nbsp;&nbsp;</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: null,
          commitKey: null,
          status: ''
        },
        dataRule: {
          secret: [
            { required: true, message: '请输入密令', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (row) {
        this.visible = true
        this.dataForm.id = row.id
        this.dataForm.commitKey = null
        this.dataForm.status = row.status
        if (row.status == '0') {
          this.dataForm.paramStatus = '1'
        } else {
          this.dataForm.paramStatus = '0'
        }
      },
      // 上下架
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/manager/versioninf/publish`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                'commitKey': this.dataForm.commitKey,
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

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .el-dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 2px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 25%!important;
  }
</style>
