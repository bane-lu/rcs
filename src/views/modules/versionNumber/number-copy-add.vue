<template>
  <el-dialog
    id="copy-panel"
    title="复制新增"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="☆">
        <span class="title">请选择您要复制的版本号信息</span>
      </el-form-item>

      <el-form-item label=""
       v-if="isAuth('manager:versioninf:getAppOsVersionList')"
       props="exist">
        <el-cascader
          :options="versionOptions"
          v-model="dataForm.exist"
          @change="versionHandleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="☆">
        <span class="title">请输入您要创建的版本号</span>
      </el-form-item>

      <el-form-item label="" prop="newVersion">
        <el-input v-model="dataForm.newVersion"
          placeholder="新的版本号"
          maxlength="20"></el-input>
      </el-form-item>

    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="on_submit_loading">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isVersion } from '@/utils/validate'
  export default {
    props: {
      to_app_type: {
        type: Array
      },
    },
    data () {
      var validateVersion = (rule, value, callback) => {
        if (!isVersion(value)) {
          callback(new Error('版本号格式不正确'))
        } else {
          callback()
        }
      }

      return {
        on_submit_loading: false,
        visible: false,
        versionOptions: [],
        dataForm: {
          exist: null,
          existVersion: '',
        	newVersion: null
        },
        dataRule: {
          existVersion: [
            { required: true, message: '请选择需要复制的版本信息', trigger: 'blur' },
          ],
          newVersion: [
            { required: true, message: '请输入新的版本号', trigger: 'blur' },
            { validator: validateVersion, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      newOS () {
        return this.dataForm.os.join(',')
      },
    },
    mounted () {
    },
    methods: {
      init () {
        this.visible = true
        this.$nextTick(() => {
          this.get_version_type()
          this.$refs['dataForm'].resetFields()
          this.dataForm.exist = []
          this.dataForm.newVersion = ''
        })

      },
      // 获取版本号选择框
      get_version_type () {
        this.$http({
          url: this.$http.adornUrl('/manager/versioninf/getAppOsVersionList'),
          method: 'get',
          data: this.$http.adornParams()
        }).then(({data}) => {
          let appOsVersionList = []
          let applist = []
          let oslist = []
          let versionlist = []

          data.appOsVersionList.forEach(function(appItem,index){
            var tempApp = {}
            tempApp.value =  Object.keys(appItem)[0]
            tempApp.label = Object.keys(appItem)[0]
            tempApp.children = [{},{}]
            // android
            tempApp.children[0].value = 'android'
            tempApp.children[0].label = 'android'
            let androidObj = appItem[tempApp.label][0]
            if(androidObj.android.length){
              var versionChildren = []
              androidObj.android.forEach(function(versionItem,index){
                var tempversion = {}
                tempversion.value = versionItem
                tempversion.label = versionItem
                versionChildren.push(tempversion)
              })
              tempApp.children[0].children = versionChildren
            }

            tempApp.children[1].value = 'iphone'
            tempApp.children[1].label = 'iphone'
            let iphoneObj = appItem[tempApp.label][1]
            if(iphoneObj.iphone.length){
              var versionChildren = []
              iphoneObj.iphone.forEach(function(versionItem,index){
                var tempversion = {}
                tempversion.value = versionItem
                tempversion.label = versionItem
                versionChildren.push(tempversion)
              })
              tempApp.children[1].children = versionChildren
            }
            appOsVersionList.push(tempApp)
          })
          this.versionOptions = appOsVersionList

        })
        .catch(() => {
        })
      },
      versionHandleChange (value) {
        console.log(value);
        if(this.dataForm.exist.length < 3){
          this.$message({
            message: '请选择正确的版本号',
            type: 'warning'
          });
          this.dataForm.exist = []
        }else {
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            console.log(this.dataForm);
            this.on_submit_loading = true
            this.$http({
              url: this.$http.adornUrl(`/manager/versioninf/copyasnew`),
              method: 'post',
              data: this.$http.adornData({
                'existApp': this.dataForm.exist[0],
                'existOS': this.dataForm.exist[1],
                'existVersion': this.dataForm.exist[2],
                'newVersion': this.dataForm.newVersion,
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
  #copy-panel{
    .el-form-item__content {
      line-height: 40px;
      position: relative;
      font-size: 18px;
      color: #999;
    }
  }

</style>
