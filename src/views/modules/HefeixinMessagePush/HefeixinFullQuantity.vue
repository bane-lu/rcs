<template>
    <div id="fullQuantity">
        <p> 新建消息推送</p>
        <div class="formContent">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="主标题" prop="title">
                    <el-input v-model="form.title" maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="body">
                    <el-input type="textarea" v-model="form.body" maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="URL" prop="url">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <!--<el-form-item label="推送机制">
                    <el-radio-group v-model="form.pushType">
                        <el-radio label="0">全量</el-radio>
                        <el-radio label="1">指定号码</el-radio>
                    </el-radio-group>
                </el-form-item>-->
                <el-form-item label="范围选择" prop="rangeVal">
                    <el-select v-model="form.rangeVal" placeholder="请选择活动范围">
                        <el-option v-for="item in range" :label="item.provinceName" :value="item.provinceName"  :key="item.provinceId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推送机制" prop="pushType">
                    <el-radio-group v-model="form.pushType">
                        <el-radio label="0">立即推送</el-radio>
                        <el-radio label="1">定时推送</el-radio>        
                    </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="推送系统" prop="pushSystem" v-if="form.rangeVal !== '指定号码'">
                    <el-checkbox-group v-model="form.pushSystem">
                        <el-checkbox label="ios" name="type">Ios</el-checkbox>
                        <el-checkbox label="android" name="type">Android</el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
                <el-form-item label="推送系统" prop="push_system">
                    <el-radio-group v-model="form.push_system">
                        <el-radio label="ios">Ios</el-radio>
                        <!-- <el-radio label="android">Android</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="时间参数" prop="date" v-if="form.pushType==1">
                    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="form.date" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"  :picker-options="pickerBeginDateBefore">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="导入号码"  v-if="form.rangeVal == '指定号码'">
                    <el-upload class="upload-demo" :action="a" :on-success="fileSuccess" :headers="header" ref="upload" :on-remove="fileRemove" :limit=1 :file-list="form.fileList" :before-upload="beforeAvatarUpload">
                        <el-button slot="trigger" size="small">选取文件</el-button>
                        <div v-show="showDialog" style="float: right">
                            <span>有效号码：{{validNums}}</span>
                            <span style="color: red; margin-left: 15px;">无效号码：{{invalidNums}}</span>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitUpload">确认推送</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            a: window.SITE_CONFIG['basePath'] + "/web-manager/rcsiospush/pushMessageConf/numberFileUpload",
            pickerBeginDateBefore: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            },
            form: {
                title: '',
                body: '',
                url: '',
                pushType: '0',
                date: '',
                fileList: [],
                numberTag: '',
                rangeVal: '',
                // pushSystem: "ios",
                push_system: "ios"
            },
            range: [],
            invalidNums: 0,
            validNums: 0,
            showDialog: false,
            header: {
                'token': Vue.cookie.get('token')
            },
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                body: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
                url: [
                    { required: false, message: '请输入url', trigger: 'blur' }
                ],
                rangeVal: [
                    { required: true, message: '请选择活动范围', trigger: 'change' }
                ],
                date: [
                    { required: true, message: '请选择时间', trigger: 'blur' }
                ],
                pushType: [
                    { required: true, message: '请选择推送机制', trigger: 'change'}
                ],
                // pushSystem: [
                //     { type: 'array', required: true, message: '请至少选择一种推送系统', trigger: 'change' }
                // ],
                // push_system: [
                //     { required: true, message: '请选择推送系统', trigger: 'change' }
                // ]
            }
        }
    },
    // watch: {
    //     'form.push_system'(newValue){
    //         this.a = newValue == 'ios' ?  window.SITE_CONFIG['basePath'] + "/web-manager/iospush/pushMessageConf/numberFileUpload" :  window.SITE_CONFIG['basePath'] + "/web-manager/iospush/pushMessageConf/androidNumberFileUpload";
    //     }
    // },
    methods: {
        /* 推送 */
        submitUpload() {
            this.$refs['form'].validate((valid) => {
                if (valid) {              
                    console.log(1);   
                    let system = this.form.push_system
                    this.$http({
                        contentType: 'application/json',
                        url: this.$http.adornUrl('/rcsiospush/pushMessageConf/createPushMessageConf'),
                        method: 'post',
                        data: this.$http.adornData({
                            'title': this.form.title,
                            'body': this.form.body,
                            'url': this.form.url,
                            'pushTime': this.form.pushType,
                            'pushStartDate': this.form.date[0],
                            'pushEndDate': this.form.date[1],
                            'numberTag': this.form.numberTag,
                            'province': this.form.rangeVal,
                            'system': system
                        })
                    }).then(({ data }) => {
                        if (data.code === 0) {
                            this.form.fileList = [];
                            this.form.rangeVal = "";
                            // this.$router.replace({ name: 'MessagePush' })
                            this.$router.replace({ path: '/HefeixinMessagePush-HefeixinMessagePush' })
                            this.showDialog = false
                            this.$refs['form'].resetFields()

                        } else {
                            this.$message({
                                type: 'error',
                                message: data.msg
                            })
                            return false
                        }
                    })
                        .catch(() => {
                        })
                } else {
                    return false;
                }
            })

        },

        /* 取消弹窗 */
        cancel() {
            this.$confirm(`确定放弃已编写内容？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
                .then(() => {
                    this.form.rangeVal = "";
                    // this.$router.replace({ name: 'MessagePush' })
                    this.$router.replace({ path: '/HefeixinMessagePush-HefeixinMessagePush' })
                    this.$refs['form'].resetFields()
                })
                .catch(action => {
                });
        },

        beforeAvatarUpload(file) {
            const isJPG = file.type === 'application/vnd.ms-excel';

            if (!isJPG) {
                this.$message.error('上传文件只能是 csv 格式!');
            }
            return isJPG
        },

        /* 上传成功 */
        fileSuccess(data) {
            if (data.code === 0) {
                this.form.numberTag = data.numberTag
                this.validNums = data.validNums
                this.invalidNums = data.invalidNums
                this.showDialog = true
                this.$message({
                    type: 'success',
                    message: '文件上传成功'
                });
            } else {
                this.$message({
                    type: 'error',
                    message: data.msg
                });
            }
        },
        // 取消文件
        fileRemove() {
            this.showDialog = false
        }
    },
    mounted() {
        //请求活动范围
        this.$http({
            contentType: 'application/json',
            url: this.$http.adornUrl('/rcsiospush/pushMessageConf/getArea'),
            method: 'get',
        }).then(({ data }) => {
            if (data.code === 0) {
                this.range = data.data;
            } else {
                this.$message({
                    type: 'error',
                    message: data.msg
                })
                return false
            }
        }).catch(() => {
        })
    }

}
</script>

<style lang="scss" scoped>
#fullQuantity {
    p {
        margin: 0;
        padding: 0;
        color: #909399;
        font-size: 18px;
        border-left: 4px solid #909399;
        padding-left: 10px;
        line-height: 22px;
        margin-bottom: 28px;
    }
    .formContent {
        width: 60%;
    }
}
</style>

  



