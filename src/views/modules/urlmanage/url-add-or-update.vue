<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row :gutter="30">
        <el-col :span="12"><div class="grid-content">
          <el-form-item label="app" prop="app" label-width="100px">
            <el-select v-model="dataForm.app" placeholder="请选择" :disabled="dataForm.id == ''? false : true">
              <el-option :label="item.app"
                :value="item.app"
                :key="index"
                v-for="(item,index) in app_type">{{item.app}}</el-option>
            </el-select>
          </el-form-item>
        </div></el-col>
        <el-col :span="12"><div class="grid-content">
          <el-form-item label="urlName" prop="urlName" label-width="100px">
            <el-input
              v-model="dataForm.urlName"
              placeholder="urlName"
              maxlength="8"
              :disabled="dataForm.id == ''? false : true"></el-input>
          </el-form-item>
        </div></el-col>
      </el-row>

      <el-form-item label="url" prop="url" label-width="100px">
        <el-input
          v-model="dataForm.url"
          placeholder="请输入url"
          @input="url_input"
          maxlength="64"></el-input>
      </el-form-item>
      <el-form-item label="版本号" prop="version" label-width="100px">
        <el-input v-model="dataForm.version" placeholder="2.4.3"></el-input>
      </el-form-item>
      <el-form-item label="添加描述" prop="description" label-width="100px">
        <el-input
          v-model="dataForm.description"
          placeholder="请输入不超过20个字"
          maxlength="20"
          ></el-input>
      </el-form-item>
      <el-row :gutter="10">
        <el-col :span="10"><div class="grid-content">
          <el-form-item label="有效期选择" prop="minTime" label-width="100px">
            <el-date-picker
               v-model="dataForm.minTime"
               type="datetime"
               value-format="yyyy-MM-dd HH:mm:ss"
               placeholder="开始时间"
               :editable = "isEditable"
               @change="transformTime"
               :picker-options="pickerOptions0">
            </el-date-picker>
          </el-form-item>
        </div></el-col>
        <el-col :span="10"><div class="grid-content">
          <el-form-item label="-" prop="maxTime" label-width="80px">
            <el-date-picker
               v-model="dataForm.maxTime"
               type="datetime"
               value-format="yyyy-MM-dd HH:mm:ss"
               placeholder="结束时间"
               :editable = "isEditable"
               @change="transformTime"
               :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
        </div></el-col>
      </el-row>

      <el-form-item label="是否显示小红点" label-width="110px">
        <el-input
          v-model="dataForm.redFlag"
          placeholder="是否显示小红点"
          maxlength="8"
          @input="redDot_input"
          class="reddot"></el-input>
        <span class="redFlag_tip">8位数字（年月日）</span>
      </el-form-item>
      <el-form-item label="文案展示" label-width="100px">
        <el-checkbox v-model="dataForm.docFlag" @change="showDocument">需要</el-checkbox>
      </el-form-item>
      <!--                          是否需要显示文案                               -->
      <el-form-item label="文案文字" prop="docContent" label-width="100px" v-if="dataForm.docFlag">
        <el-input v-model="dataForm.docContent" placeholder="文案文字" maxlength="5"></el-input>
      </el-form-item>
      <el-form-item label="展示规则" prop="docRule" label-width="100px" v-if="dataForm.docFlag">
        <el-radio-group v-model="dataForm.docRule">
          <el-radio label="0">一直存在</el-radio>
          <el-radio label="1">点击后消失</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row :gutter="10" v-if="dataForm.docFlag">
        <el-col :span="10"><div class="grid-content">
          <el-form-item label="展示时间" prop="docMinTime" label-width="100px">
            <el-date-picker
               v-model="dataForm.docMinTime"
               type="datetime"
               value-format="yyyy-MM-dd HH:mm:ss"
               placeholder="yyy/mm/dd"
               :editable = "isEditable"
               @change="transformTime"
               :picker-options="pickerOptions0">
            </el-date-picker>
          </el-form-item>
        </div></el-col>
        <el-col :span="10"><div class="grid-content">
          <el-form-item label="-" prop="docMaxTime">
            <el-date-picker
               v-model="dataForm.docMaxTime"
               type="datetime"
               value-format="yyyy-MM-dd HH:mm:ss"
               placeholder="yyy/mm/dd"
               :editable = "isEditable"
               @change="transformTime"
               :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
        </div></el-col>
      </el-row>

      <h3>分享文案</h3>
      <el-form-item label="标题" prop="shareTitle" label-width="100px">
        <el-input type="text" v-model="dataForm.shareTitle" placeholder="0/20" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="shareContent" label-width="100px">
        <el-input v-model="dataForm.shareContent" placeholder="0/30" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="详情" prop="shareDetails" label-width="100px">
        <el-input v-model="dataForm.shareDetails" placeholder="0/50" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="系统选择" prop="os" label-width="100px">
        <el-checkbox-group v-model="dataForm.os" :disabled="dataForm.id == '' ? false : true">
          <el-checkbox label="IOS"></el-checkbox>
          <el-checkbox label="Android"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isChinese, isURL, isVersion } from '@/utils/validate'
  export default {
    data () {
      var validateUrlname = (rule, value, callback) => {
        if (!isChinese(value)) {
          callback(new Error('只能输入汉字'))
        } else {
          callback()
        }
      }
      var validateUrladdress = (rule, value, callback) => {
        if (!isURL(value)) {
          callback(new Error('url格式错误'))
        } else {
          callback()
        }
      }
      var validateVersion = (rule, value, callback) => {
        if (!isVersion(value)) {
          callback(new Error('版本格式错误（如:2.4.3)'))
        } else {
          callback()
        }
      }
      return {
        app_type: [],
        visible: false,
        // 设置日期选择器不可输入文本
        isEditable: false,
        dataForm: {
          id: '',
          app: '',
          urlName: '',
          url: '',
          version: '',
          description: '',
          redFlag: '',
          minTime: '',
          maxTime: '',
          docFlag: false,
          docContent: '',
          docRule: '',
          docMinTime: '',
          docMaxTime: '',
          shareTitle: '',
          shareContent: '',
          shareDetails: '',
          os: []
        },
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() > Date.now()
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() < this.dataForm.minTime || time.getTime() > Date.now()
          }
        },
        dataRule: {
          app: [
            { required: true, message: 'app不能为空', trigger: 'blur' }
          ],
          urlName: [
            { validator: validateUrlname, required: true, trigger: 'blur' }
          ],
          url: [
            { validator: validateUrladdress, required: true, trigger: 'blur' }
          ],
          version: [
            { validator: validateVersion, required: true, trigger: 'blur' }
          ],
          minTime: [
            { required: true, message: '有效期选择,开始不能为空', trigger: 'blur' }
          ],
          maxTime: [
            { required: true, message: '有效期选择,结束不能为空', trigger: 'blur' }
          ],
          docContent: [
            { required: true, message: '文案文字不能为空', trigger: 'blur' }
          ],
          docRule: [
            { required: true, message: '展示规则不能为空', trigger: 'blur' }
          ],
          docMinTime: [
            { required: true, message: '展示时间,开始不能为空', trigger: 'blur' }
          ],
          docMaxTime: [
            { required: true, message: '展示时间,结束不能为空', trigger: 'blur' }
          ],
          shareTitle: [
            { required: true, message: '分享文案标题不能为空', trigger: 'blur' }
          ],
          shareContent: [
            { required: true, message: '分享文案内容不能为空', trigger: 'blur' }
          ],
          shareDetails: [
            { required: true, message: '分享文案详情不能为空', trigger: 'blur' }
          ],
          os: [
            { required: true, message: '系统选择,1:IOS 2:Android不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      newOS () {
        return this.dataForm.os.join('-')
      },
      newDocFlag () {
        if (this.dataForm.docFlag) {
          return 1
        } else {
          return 0
        }
      }
    },
    created () {
      this.get_app_type()
    },
    methods: {
      url_input () {
        this.dataForm.url = this.dataForm.url.replace(/\s+/g, '')
      },
      redDot_input () {
        console.log(this.dataForm.redFlag)
      },
      init (row) {
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (row) {
            this.dataForm.id = row.id
            this.$http({
              url: this.$http.adornUrl(`/manager/url/info/${this.dataForm.id}`),
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.app = data.url.app
                this.dataForm.urlName = data.url.urlName
                this.dataForm.url = data.url.url
                this.dataForm.version = data.url.version
                this.dataForm.description = data.url.description
                this.dataForm.redFlag = data.url.redFlag
                this.dataForm.minTime = data.url.minTime
                this.dataForm.maxTime = data.url.maxTime
                this.dataForm.docFlag = data.url.docFlag
                this.dataForm.docContent = data.url.docContent
                this.dataForm.docRule = data.url.docRule
                this.dataForm.docMinTime = data.url.docMinTime
                this.dataForm.docMaxTime = data.url.docMaxTime
                this.dataForm.shareTitle = data.url.shareTitle
                this.dataForm.shareContent = data.url.shareContent
                this.dataForm.shareDetails = data.url.shareDetails
                this.dataForm.os = data.url.os.split('-')
              }
            }).catch(() => {
            })
          } else {
            this.dataForm.id = ''
            this.dataForm.app = ''
            this.dataForm.urlName = ''
            this.dataForm.url = ''
            this.dataForm.version = ''
            this.dataForm.description = ''
            this.dataForm.redFlag = ''
            this.dataForm.minTime = ''
            this.dataForm.maxTime = ''
            this.dataForm.docFlag = false
            this.dataForm.docContent = ''
            this.dataForm.docRule = ''
            this.dataForm.docMinTime = ''
            this.dataForm.docMaxTime = ''
            this.dataForm.shareTitle = ''
            this.dataForm.shareContent = ''
            this.dataForm.shareDetails = ''
            this.dataForm.os = []
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            var params = {
              'id': this.dataForm.id || undefined,
              'app': this.dataForm.app,
              'urlName': this.dataForm.urlName,
              'url': this.dataForm.url,
              'version': this.dataForm.version,
              'description': this.dataForm.description,
              'redFlag': this.dataForm.redFlag,
              'minTime': this.dataForm.minTime,
              'maxTime': this.dataForm.maxTime,
              'docFlag': this.newDocFlag,
              'docContent': this.dataForm.docContent,
              'docRule': this.dataForm.docRule,
              'docMinTime': this.dataForm.docMinTime,
              'docMaxTime': this.dataForm.docMaxTime,
              'shareTitle': this.dataForm.shareTitle,
              'shareContent': this.dataForm.shareContent,
              'shareDetails': this.dataForm.shareDetails,
              'os': this.newOS
            }
            this.$http({
              url: this.$http.adornUrl(`/manager/url/save`),
              method: 'post',
              data: this.$http.adornData(params)
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
      },
      showDocument () {
        if (!this.dataForm.docFlag) {
          this.dataForm.docContent = ''
          this.dataForm.docRule = ''
          this.dataForm.docMinTime = ''
          this.dataForm.docMaxTime = ''
        }
      },
      get_app_type () {
        this.$http({
          url: this.$http.adornUrl('/manager/version/getList'),
          method: 'get',
          data: this.$http.adornParams()
        }).then(({data}) => {
          this.app_type = data.appList
        })
        .catch(() => {
        })
      },
      transformTime (time) {
        console.log(time)
        return time
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
  .el-form-item__label {
    width: 126px;
  }
  .reddot{
    width: 70%;
  }
  .redFlag_tip{
    color: #999;
    font-size: 12px;
  }
</style>
