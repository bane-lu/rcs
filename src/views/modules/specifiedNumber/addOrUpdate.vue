<template>
  <el-dialog
    class="lib-add-update"
    :title="!dataForm.id ? '新增' : '编辑'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="96px">

      <el-form-item label="指定号码" prop="sectionNumber">
          <el-input v-model="dataForm.sectionNumber"
              placeholder="输入手机号查询"
              :disabled="!isEditable"
              maxlength="11">
          </el-input>
      </el-form-item>
      <el-form-item label="APP选择" prop="app">
          <el-select label="APP" v-model="dataForm.app" placeholder="请选择">
              <el-option
                  v-for="(item,index) in to_app_type"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="sectionText">
          <el-input v-model="dataForm.sectionText"
          maxlength="20">
          </el-input>
      </el-form-item>
        <el-form-item label="有效期时间" prop="minTime" label-width="96px" style="display:block;float: left;width:320px;"> 
          <el-date-picker
             v-model="dataForm.minTime"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="开始时间"
             :editable = "isEditable"
             @change="transformTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="-" prop="maxTime" label-width="56px" style="display:block;float: left;width:280px;">
          <el-date-picker
             v-model="dataForm.maxTime"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="结束时间"
             :editable = "isEditable"
             @change="transformTime">
          </el-date-picker>
        </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="on_submit_loading">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isMobile, compareTime } from '@/utils/validate'
  export default {
    props: {
      to_app_type: {
        type: Array
      }
    },
    data () {
      var validateNumber = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('请输入正确号码'))
        } else {
          callback()
        }
      }
      var validateDate = (rule, value, callback) => {
        if (!this.docTimeCheck) {
          callback(new Error('请选择有效期'))
        } else {
          callback()
        }
      }

      return {
        on_submit_loading: false,
        visible: false,
        isEditable: true,
        docTimeCheck: true,
        dataForm: {
          id: null,
          sectionNumber: null,
          minTime: null,
          maxTime: null,
          app: null,
          sectionText: ''
        },
        dataRule: {
          sectionNumber: [
            { required: true, message: '请输入正确号码', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          app: [
            { required: true, message: '请选择APP', trigger: 'blur' }
          ],
          minTime: [
            { required: true, message: '请选择开始时间', trigger: 'blur' }
          ],
          maxTime: [
            { required: true, message: '请选择结束时间', trigger: 'blur' }
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
        row && (this.dataForm.id = row.regionCode)
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (row) {
            this.isEditable = false
            this.dataForm.sectionNumber = row.mobile;
            this.dataForm.id = row.id;
            this.dataForm.minTime = row.startDate;
            this.dataForm.maxTime = row.endDate;
            this.dataForm.app = row.app;
            this.dataForm.sectionText = row.desc;
          }else {
            this.isEditable = true
            this.dataForm.id = null;
            this.dataForm.sectionNumber = null;
            this.dataForm.minTime = null;
            this.dataForm.maxTime = null;
            this.dataForm.app = null;
            this.dataForm.sectionText = '';
          }
        })

      },
      // 格式化日期选择器
      transformTime (time) {
          return time
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.on_submit_loading = true
            this.$http({
              url: this.$http.adornUrl('/mobapp/edit'),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id,
                "desc": this.dataForm.sectionText,
                "app": this.dataForm.app,
                "mobile": this.dataForm.sectionNumber,
                "startDate": this.dataForm.minTime,
                "endDate": this.dataForm.maxTime
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
              } else if(data && data.code == -1){
                this.$message.error('号码已存在，无法添加');
                this.on_submit_loading = false
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
<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
</style>
