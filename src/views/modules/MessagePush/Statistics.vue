<template>
    <div id="Statistics">
        <p> 统计详情及分析</p>
        <el-form ref="form" :model="data" label-width="120px" id="elForm" v-if="data">
            <el-form-item label="主标题：">
                <span>{{data.title}}</span>
            </el-form-item>
            <el-form-item label="内容：">
                <span>{{data.contents}}</span>
            </el-form-item>
            <el-form-item label="推送日期：">
                <span>{{data.pushDate}}</span>
            </el-form-item>
            <el-form-item label="时间段：">
                <span>{{data.pushTime}}</span>
            </el-form-item>
            <el-form-item label="发送状态：">
                <span>{{data.pushStatus}}</span>
            </el-form-item>
            <el-form-item label="成功数：">
                <span>{{data.pushSuccess}}</span>
            </el-form-item>
            <el-form-item label="失败数：">
                <span>{{data.pushFail}}</span>
                <el-button v-if="data.pushStatus !== '待推送'" type="text" style="margin-left: 20px;" @click="failDetail()">查看失败详情</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            data: null
        }
    },
    methods: {
        getIdData () {
            let id = this.$route.params.id
            console.log(id)
            this.$http({
                url: this.$http.adornUrl('/iospush/pushDetail/info/'+ id),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data.code === 0) {
                    this.data = data.data
                } else {
                    this.$message({
                        type: 'error',
                        message: data.msg
                    })
                }
            })
            .catch(() => {
            })
            
        },

        failDetail () {
            this.$router.push({ 
                name: 'FailDetail' ,
                params: { messageId: this.data.messageId } 
            })
        }
    },
    mounted () {
        this.getIdData()
    }
}
</script>

<style lang="scss" >
    #Statistics{
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
        .el-form{
            .el-form-item{
                .el-form-item__label{
                    color: #909399 !important;
                    font-size: 18px !important;
                }
                span{
                    font-size: 15px;
                }
            }
        } 
    }
</style>
