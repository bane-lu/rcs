<template>
  <el-dialog
    id="copy-panel"
    :title="复制新增"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-form-item label="☆">
        <span class="title">请选择您要复制的版本号信息</span>
      </el-form-item>

      <el-form-item label="">
        <el-cascader
          :options="options"
          v-model="version"
          @change="versionHandleChange">
        </el-cascader>
      </el-form-item>

      <el-form-item label="☆">
        <span class="title">请输入您要创建的版本号</span>
      </el-form-item>

      <el-form-item label="" prop="version">
        <el-input v-model="dataForm.version"
          placeholder="新的版本号"
          maxlength="20"></el-input>
      </el-form-item>

      <!-- <el-form-item label="APP" prop="managerVersionId">
        <el-select v-model="dataForm.managerVersionId" placeholder="请选择">
          <el-option
            :label="item.app"
            :value="item.id"
            :key="index"
            v-for="(item,index) in to_app_type">{{item.app}}</el-option>
        </el-select>
      </el-form-item> -->

      <!-- <el-form-item label="描述" prop="remark">
        <el-input v-model="dataForm.remark"
          placeholder="请输入相关描述"
          maxlength="200"></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="系统" prop="os">
        <el-checkbox-group v-model="dataForm.os">
          <el-checkbox label="android">android</el-checkbox>
          <el-checkbox label="iphone">iphone</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      </el-form-item> -->

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
        dataForm: {
          id: null,
          createBy: null,
          managerVersionId: null,
          version: null,
          status: null,
          os: [],
          remark: null,
          createTime: null,
          updateTime: null,
        },
        dataRule: {
          managerVersionId: [
            { required: true, message: 'APP不能为空', trigger: 'blur' },
          ],
          version: [
            { required: true, message: '版本不能为空', trigger: 'blur' },
            { validator: validateVersion, trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          os: [
            { required: true, message: '系统不能为空', trigger: 'blur' }
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
      init (row) {
        this.dataForm.id = null
        row && (this.dataForm.id = row.id)
        console.log(this.dataForm.id);
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (row) {

          }else {
            this.dataForm.createBy = null
            this.dataForm.createTime = null
            this.dataForm.id = null
            this.dataForm.managerVersionId = null
            this.dataForm.os = []
            this.dataForm.remark = null
            this.dataForm.status = null
            this.dataForm.updateTime = null
            this.dataForm.version = null
          }
        })

      },
      versionHandleChange () {

      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.on_submit_loading = true
            this.$http({
              url: this.$http.adornUrl(`/manager/versioninf/copyasnew`),
              method: 'post',
              data: this.$http.adornData({
                'createBy': this.dataForm.createBy,
                'createTime': this.dataForm.createTime,
                'id': this.dataForm.id,
                'managerVersionId': this.dataForm.managerVersionId,
                'os': this.newOS,
                'remark': this.dataForm.remark,
                'status': this.dataForm.status,
                'updateTime': this.dataForm.updateTime,
                'version': this.dataForm.version
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
