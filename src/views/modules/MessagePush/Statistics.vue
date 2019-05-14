<template>
    <div id="Statistics">
        <p> 统计详情及分析</p>
        <el-form ref="form" :model="data" label-width="120px" id="elForm" v-if="data" size="small">
            <el-form-item label="主标题：">
                <span>{{data.title}}</span>
            </el-form-item>
            <el-form-item label="内容：">
                <span>{{data.contents}}</span>
            </el-form-item>
            <el-form-item label="url：">
                <span>{{data.url}}</span>
            </el-form-item>
            <el-form-item label="推送日期：">
                <span>{{data.pushDate}}</span>
            </el-form-item>
            <el-form-item label="频率：">
                <span>{{data.pushTime}}</span>
            </el-form-item>
             <el-form-item label="发送状态：">
                <span>{{data.pushStatus}}</span>
            </el-form-item>
        </el-form>
        <div>
            <p class="push-title"> 推送数据</p>
            <el-button v-if="data.pushStatus !== '待推送'" type="text" style="margin-left: 20px;" @click="failDetail()">查看失败详情</el-button>
            <el-button type="primary" class="export-btn" @click="exportAll">导出</el-button>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            v-if="system!='ios'"
            prop="total"
            label="推送数"
            align="center">
            </el-table-column>
            <el-table-column
            prop="arrive"
            label="到达数"
            align="center">
            </el-table-column>
            <el-table-column
            prop="fail"
            label="失败数"
            align="center">
            </el-table-column>
            <div v-if="system!='ios'">
                <el-table-column
                prop="arriveRate"
                label="到达率"
                align="center">
                </el-table-column>
                <el-table-column
                prop="click"
                label="点击数"
                align="center">
                </el-table-column>
                <el-table-column
                prop="clickRate"
                label="点击率"
                align="center">
                </el-table-column>
            </div>
        </el-table>
        <el-table
            v-if="system!='ios'"
            :data="tableData2"
            border
            style="width: 100%">
            <el-table-column
                label="品牌手机"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope,0)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="型号"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope,1)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="应用版本"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope,2)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column
                label="省份"
                align="center">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope,3)" type="text" size="small">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column>
            </el-table-column>
            <el-table-column>
            </el-table-column>
        </el-table>
        <detailToast :dataDetail="dataDetail"></detailToast>
    </div>
</template>

<script>
import detailToast from './detailToast';
export default {
    data () {
        return {
            data: {},
            tableData: [],
            tableData2: [{}],
            dataDetail: {},
            id: "",
            system: ""
        }
    },
    methods: {
        getIdData () {
            this.$http({
                url: this.$http.adornUrl('/iospush/pushDetail/info/'+ this.id),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if (data.code === 0) {
                    this.data = data.data
                    this.tableData.push(data.data)
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
                params: { messageId: this.id } 
            })
        },
        handleClick(row,index) {
            let url = '/iospush/pushDetail';
            if(index == 0){
                url = url + '/androidMan/' + this.id;
            }else if(index == 1){
                url = url + '/androidModel/' + this.id;
            }else if (index == 2) {
                url = url + '/androidApp/' + this.id;
            }else{
                url = url + '/androidProvince/' + this.id;
            }
            this.$http({
                url: this.$http.adornUrl(url),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if(data.code == 0){
                    this.dataDetail = {
                        index: index,//当前点击索引
                        title: row.column.label,//当前点击标题
                        data: data.data //要渲染的数据
                    }
                }else{
                    this.$message({
                        type: 'error',
                        message: data.msg
                    })
                } 
            }).catch(() => {
                })
            

        },
        //导出
        exportAll(){
            window.location.href = this.$http.adornUrl("/iospush/pushDetail/infoDownload/" + this.id);
        }
    },
    mounted () {
        this.id = this.$route.params.id;
        this.system = this.$route.params.system;
        
        this.getIdData()
        // console.log(this.$route.params.system);
        // this.data = {
        //     title: "哈哈",
        //     contents: "哈哈",
        //     pushDate: "哈哈",
        //     pushStatus: "哈哈",
        //     pushSuccess: "哈哈",
        //     pushSuccess: "哈哈",
        //     pushFail: "哈哈"
        // }
    },
    components: {
        detailToast
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
        .push-title{
            display: inline-block;
            margin-top: 20px;
        }
        .export-btn{
            float: right;
        }
        .el-form{
            &:after{
                content: "";
                display: block;
                clear: both;
            }
            .el-form-item{
                float: left;
                width: 50%;
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
