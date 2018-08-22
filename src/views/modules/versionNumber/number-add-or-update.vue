<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '编辑'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">

      <el-form-item label="APP" prop="appId">
        <el-select v-model="dataForm.appId" placeholder="请选择" :disabled="isEditable">
          <el-option
            :label="item.app"
            :value="item.id"
            :key="index"
            v-for="(item,index) in to_app_type">{{item.app}}</el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="版本号" prop="version">
        <el-input v-model="dataForm.version"
          placeholder="请输入版本号"
          maxlength="20"></el-input>
      </el-form-item>

      <el-form-item label="描述" prop="remark">
        <el-input v-model="dataForm.remark"
          placeholder="请输入相关描述"
          maxlength="200"></el-input>
      </el-form-item>

      <el-form-item label="系统" prop="os">
        <el-checkbox-group v-model="dataForm.os">
          <el-checkbox label="android" :disabled="isEditable">android</el-checkbox>
          <el-checkbox label="iphone" :disabled="isEditable">iphone</el-checkbox>
        </el-checkbox-group>
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
        isEditable: true,
        dataForm: {
          id: null,
          createBy: null,
          appId: null,
          version: null,
          status: null,
          os: [],
          remark: null,
          createTime: null,
          updateTime: null
        },
        dataRule: {
          appId: [
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

        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (row) {
            this.isEditable = true
            this.dataForm.createBy = row.createBy
            this.dataForm.createTime = row.createTime
            this.dataForm.id = row.id
            // this.dataForm.app = row.app
            this.dataForm.appId = row.managerVersionId
            this.dataForm.os.push(row.os)
            this.dataForm.remark = row.remark
            this.dataForm.status = row.status
            this.dataForm.updateTime = row.updateTime
            this.dataForm.version = row.version
          }else {
            this.isEditable = false
            this.dataForm.createBy = null
            this.dataForm.createTime = null
            this.dataForm.id = null
            // this.dataForm.app = null
            this.dataForm.appId = null
            this.dataForm.os = []
            this.dataForm.remark = null
            this.dataForm.status = null
            this.dataForm.updateTime = null
            this.dataForm.version = null
          }
        })

      },
      // 表单提交
      dataFormSubmit () {
        console.log(this.dataForm);
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.on_submit_loading = true
            this.$http({
              url: this.$http.adornUrl(`/manager/versioninf/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'createBy': this.dataForm.createBy,
                'createTime': this.dataForm.createTime,
                'id': this.dataForm.id,
                'managerVersionId': this.dataForm.appId,
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
