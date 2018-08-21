<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '编辑'"
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
          <el-form-item label="系统选择" prop="os" label-width="100px">
            <el-checkbox-group v-model="dataForm.os" >
              <el-checkbox label="android" :disabled="androidStatus">Android</el-checkbox>
              <el-checkbox label="iphone" :disabled="iosStatus">IOS</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div></el-col>
      </el-row>

      <el-form-item label="版本号" prop="version" label-width="100px">
        <el-input v-model="dataForm.version" placeholder="2.4.3"></el-input>
      </el-form-item>

      <el-form-item label="urlName" prop="urlName" label-width="100px">
        <el-input
          v-model="dataForm.urlName"
          placeholder="urlName"
          maxlength="64"
          :disabled="dataForm.id == ''? false : true"></el-input>
      </el-form-item>

      <el-form-item label="url" prop="url" label-width="100px">
        <el-input
          v-model="dataForm.url"
          placeholder="请输入url"
          @input="url_input"
          maxlength="64"></el-input>
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
               @change="transformTime">
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
               @change="transformTime">
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
        <el-input v-model="dataForm.docContent" placeholder="文案文字" maxlength="20"></el-input>
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
               placeholder="文案开始时间"
               :editable = "isEditable"
               @change="transformDocTime">
            </el-date-picker>
          </el-form-item>
        </div></el-col>
        <el-col :span="10"><div class="grid-content">
          <el-form-item label="-" prop="docMaxTime">
            <el-date-picker
               v-model="dataForm.docMaxTime"
               type="datetime"
               value-format="yyyy-MM-dd HH:mm:ss"
               placeholder="文案结束时间"
               :editable = "isEditable"
               @change="transformDocTime">
            </el-date-picker>
          </el-form-item>
        </div></el-col>
      </el-row>
      <el-form-item label="识别码" label-width="100px" prop="adCode" v-if="dataForm.docFlag">
        <el-input
          v-model="dataForm.adCode"
          placeholder="广告后台配置识别码"
          maxlength="8"
          class="reddot"></el-input>
        <span class="redFlag_tip">8位数字（年月日）</span>
      </el-form-item>


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

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()" :loading="on_submit_loading">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isURL, isVersion, compareTime, isEnglish, isNumber } from '@/utils/validate'
  export default {
    data () {
      var validateUrlname = (rule, value, callback) => {
        if (!isEnglish(value)) {
          callback(new Error('只能输入英文'))
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
      var validateAdCode = (rule, value, callback) => {
        if (!isNumber(value)) {
          callback(new Error('识别码格式错误（如:20180606)'))
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
      var validateTime = (rule, value, callback) => {
        if (!this.timeCheck) {
          callback(new Error('起止时间间隔须为24小时以上'))
        } else {
          callback()
        }
      }
      var validateDocTime = (rule, value, callback) => {
        if (!this.docTimeCheck) {
          callback(new Error('文案起止时间间隔须为24小时以上'))
        } else {
          callback()
        }
      }
      return {
        app_type: [],
        on_submit_loading: false,
        visible: false,
        // 设置日期选择器不可输入文本
        isEditable: false,
        dataForm: {
          createTime: '',
          id: '',
          app: '',
          urlName: '',
          url: '',
          managerVersionInfoId: '',
          version: '',
          description: '',
          redFlag: '',
          adCode: '',
          minTime: '',
          maxTime: '',
          docFlag: true,
          docContent: '',
          docRule: '',
          docMinTime: '',
          docMaxTime: '',
          shareTitle: '',
          shareContent: '',
          shareDetails: '',
          os: ['android','iphone']
        },
        androidStatus: false,
        iosStatus: false,
        // 时间校验成功判断
        timeCheck: false,
        // 文案时间校验成功判断
        docTimeCheck: false,
        dataRule: {
          app: [
            { required: true, message: '请选择APP', trigger: 'blur' }
          ],
          urlName: [
            { required: true, message: '请输入urlName', trigger: 'blur' },
            { validator: validateUrlname, trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入url地址不能为空', trigger: 'blur' },
            { validator: validateUrladdress, trigger: 'blur' }
          ],
          version: [
            { required: true, message: '请输入版本号', trigger: 'blur' },
            { validator: validateVersion, trigger: 'blur' }
          ],
          minTime: [
            { required: true, message: '请选择开始时间', trigger: 'blur' },
            { validator: validateTime, trigger: 'blur' }
          ],
          maxTime: [
            { required: true, message: '请选择结束时间', trigger: 'blur' },
            { validator: validateTime, trigger: 'blur' }
          ],
          adCode: [
            { required: true, message: '请输入识别码', trigger: 'blur' },
            { validator: validateAdCode, trigger: 'blur' }
          ],
          docContent: [
            { required: true, message: '请输入文案文字', trigger: 'blur' }
          ],
          docRule: [
            { required: true, message: '请选择展示规则', trigger: 'blur' }
          ],
          docMinTime: [
            { required: true, message: '请选择文案开始时间', trigger: 'blur' },
            { validator: validateDocTime, trigger: 'blur' }
          ],
          docMaxTime: [
            { required: true, message: '请选择文案结束时间', trigger: 'blur' },
            { validator: validateDocTime, trigger: 'blur' }
          ],
          shareTitle: [
            { required: false, message: '请输入文案标题', trigger: 'blur' }
          ],
          shareContent: [
            { required: false, message: '请输入文案内容', trigger: 'blur' }
          ],
          shareDetails: [
            { required: false, message: '请输入文案详情', trigger: 'blur' }
          ],
          os: [
            { required: true, message: '请选择系统', trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      newOS () {
        return this.dataForm.os.join(',')
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
        // console.log(this.dataForm.redFlag)
      },
      init (row) {
        this.visible = true
        this.on_submit_loading = false
        this.androidStatus = false
        this.iosStatus = false
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (row) {
            this.dataForm.id = row.id
            this.$http({
              url: this.$http.adornUrl(`/manager/url/info/${this.dataForm.id}`),
              method: 'get'
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.createTime = data.url.createTime
                this.dataForm.app = data.url.app
                this.dataForm.urlName = data.url.urlName
                this.dataForm.url = data.url.url
                this.dataForm.version = data.url.version
                this.dataForm.managerVersionInfoId = data.url.managerVersionInfoId
                this.dataForm.description = data.url.description
                this.dataForm.redFlag = data.url.redFlag
                this.dataForm.adCode = data.url.adCode
                this.dataForm.minTime = data.url.minTime
                this.dataForm.maxTime = data.url.maxTime
                this.timeCheck = true
                if (data.url.docFlag == 1) {
                  this.dataForm.docFlag = true
                  this.docTimeCheck = true
                } else {
                  this.dataForm.docFlag = false
                  this.docTimeCheck = false
                }
                this.dataForm.docContent = data.url.docContent
                this.dataForm.docRule = data.url.docRule
                this.dataForm.docMinTime = data.url.docMinTime
                this.dataForm.docMaxTime = data.url.docMaxTime
                this.dataForm.shareTitle = data.url.shareTitle
                this.dataForm.shareContent = data.url.shareContent
                this.dataForm.shareDetails = data.url.shareDetails
                this.dataForm.os = data.url.os.split(',')
                let that = this
                console.log(this.dataForm.os)
                this.dataForm.os.forEach(function(item,index){
                  if (item == 'android') {
                    that.androidStatus = true
                  }else if (item == 'iphone') {
                    that.iosStatus = true
                  }
                })
              }
            }).catch(() => {
            })
          } else {
            this.dataForm.createTime = ''
            this.dataForm.id = ''
            this.dataForm.app = ''
            this.dataForm.urlName = ''
            this.dataForm.url = ''
            this.dataForm.managerVersionInfoId = ''
            this.dataForm.version = ''
            this.dataForm.description = ''
            this.dataForm.redFlag = ''
            this.dataForm.adCode = ''
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
            this.dataForm.os = ["android","iphone"]
            this.androidStatus = false
            this.iosStatus = false
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.on_submit_loading = true
            var params = {
              'createTime': this.dataForm.createTime,
              'id': this.dataForm.id,
              'app': this.dataForm.app,
              'urlName': this.dataForm.urlName,
              'url': this.dataForm.url,
              'managerVersionInfoId': this.dataForm.managerVersionInfoId,
              'version': this.dataForm.version,
              'description': this.dataForm.description,
              'redFlag': this.dataForm.redFlag,
              'adCode': this.dataForm.adCode,
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
              url: this.$http.adornUrl(`/manager/url/${!this.dataForm.id ? 'save' : 'update'}`),
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
      },
      showDocument () {
        console.log(this.dataForm.docFlag)
        if (!this.dataForm.docFlag) {
          this.dataForm.docContent = ''
          this.dataForm.docRule = ''
          this.dataForm.docMinTime = ''
          this.dataForm.docMaxTime = ''
          this.dataForm.adCode = ''
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
      // 获取版本号
      get_version_type(app,os) {
        this.$http({
          url: this.$http.adornUrl('/manager/versioninf/getVersionList'),
          method: 'post',
          data: this.$http.adornData({
            'app': app,
            'os': os
          })
        }).then(({data}) => {
          this.version_type = data.appVersionList
        })
        .catch(() => {
        })
      },
      transformTime (time) {
        let sta = compareTime(this.dataForm.minTime, this.dataForm.maxTime, 3600 * 24 * 1000)
        if (!sta) {
          this.timeCheck = false
        } else {
          this.timeCheck = true
        }
        return time
      },
      transformDocTime (time) {
        let sta = compareTime(this.dataForm.docMinTime, this.dataForm.docMaxTime, 3600 * 24 * 1000)
        if (!sta) {
          this.docTimeCheck = false
        } else {
          this.docTimeCheck = true
        }
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
