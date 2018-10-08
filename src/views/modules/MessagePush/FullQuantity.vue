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
                <el-form-item label="推送机制">
                    <el-radio-group v-model="form.pushType">
                    <el-radio label="0">全量</el-radio>
                    <el-radio label="1">指定号码</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item 
                label="时间参数"
                v-if="form.pushType === '0'"
                prop="date">
                    <el-date-picker
                    value-format="yyyy-MM-dd 00:00:00"
                    v-model="form.date"
                    type="datetimerange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '00:00:00']"
                    :picker-options="pickerBeginDateBefore">
                    </el-date-picker> 
                </el-form-item>
                <el-form-item 
                label="导入号码"
                v-else>
                    <el-upload
                    class="upload-demo"
                    accept=".csv"
                    action="http://192.168.185.250:10006/web-manager/iospush/pushMessageConf/numberFileUpload"
                    multiple
                    :headers="header"
                    :file-list="form.fileList"
                    :on-change="filesChange"
                    :on-success="fileSuccess">
                        <el-button slot="trigger" size="small">选取文件</el-button>
                    </el-upload>

                    <!-- <el-input type="file"></el-input> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitUpload" :disabled="show">确认推送</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    data () {
        return {
            pickerBeginDateBefore:{
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            },
            show: true,
            form: {
                title: '',
                body: '',
                url: '',
                pushType: '0',
                date: '',
                fileList: [],
                numberTag: ''
            },
            header: {
                'token' : Vue.cookie.get('token')
            },
           rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                body: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '请输入url', trigger: 'blur' }
                ],
                date: [
                    { required: true, message: '请选择时间', trigger: 'blur' }
                ]
           }
        }
    },
    methods: {
        /* 推送 */
        submitUpload () {
            console.log(this.form)
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.$http({
                        contentType: 'application/json',
                        url: this.$http.adornUrl('/iospush/pushMessageConf/createPushMessageConf'),
                        method: 'post',
                        data: this.$http.adornData({
                                'title' : this.form.title,
                                'body' :  this.form.body,
                                'url' : this.form.url,
                                'pushType' : this.form.pushType,
                                'pushStartDate' : this.form.date[0],
                                'pushEndDate' : this.form.date[1],
                                'numberTag' : this.form.numberTag,
                        })
                    }).then(({data}) => {
                        if (data.code === 0) {
                            this.$refs['form'].resetFields()
                            this.$router.replace({ name: 'MessagePush' })
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
        cancel () {
            this.$confirm(`确定放弃已编写内容？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
            .then(() => {
                this.$refs['form'].resetFields()
                this.$router.replace({ name: 'MessagePush' })

            })
            .catch(action => {
            });
        },

        filesChange () {
            this.show = false
        },

        /* 上传成功 */
        fileSuccess (data) {  
            if (data.code === 0) {
                this.form.numberTag = data.numberTag
                this.$message({
                    type: 'success',
                    message: '文件上传成功'
                });
                this.show = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #fullQuantity{
        p{
            margin:0;
            padding:0;
            color: #909399;
            font-size: 18px;
            border-left: 4px  solid #909399;
            padding-left: 10px;
            line-height: 22px;
            margin-bottom: 28px;
        }
        .formContent{
            width: 60%;
        }
    }
</style>

  



