<template>
    <div>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="condition"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="check">查询</el-button>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="fullQuantity">消息推送</el-button>
            </el-form-item>
        </el-form>
        <el-table
            border
            ref="multipleTable"
            :data="messageData"
            tooltip-effect="dark"
            style="width: 100%; margin-top: 20px;">
            <el-table-column
            type="index"
            label="序号"
            width="55">
            </el-table-column>
            <el-table-column
            prop="title"
            label="主标题"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="body"
            label="内容"
            width="150"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="url"
            label="URL"
            show-overflow-tooltip>
            </el-table-column>
             <el-table-column
            prop="pushStartDate"
            label="推送日期"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="system"
            label="推送系统"
            show-overflow-tooltip>
            </el-table-column>
            <el-table-column
            prop="pushStatus" 
            label="状态"
            show-overflow-tooltip>
            <template slot-scope="scope">
                <span  v-if="scope.row.pushStatus === 0">待推送</span>
                <span  v-else-if="scope.row.pushStatus === 1">推送中</span>
                <span  v-else-if="scope.row.pushStatus === 2">已推送</span>
                <span  v-else>已终止</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="pushType" 
            label="推送范围"
            show-overflow-tooltip>
            <template slot-scope="scope">
                <!--<span  v-if="scope.row.pushType === 0">全量</span>
                <span  v-else>指定号码</span>-->
                <span>{{scope.row.province}}</span>    
            </template>
            </el-table-column>
             <el-table-column 
             label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="small"
                    type="text"
                    @click="statistics(scope.row.id,scope.row.system)"
                   >详情分析</el-button>
                    <el-button
                    size="small"
                    type="text"
                    style="color: red"
                    @click.native.prevent="deleteRow(scope.$index, messageData,scope.row.id )"
                    >删除</el-button>
                </template>
             </el-table-column>
              <el-table-column label="开关">
                <template slot-scope="scope">
                   <el-button
                    size="small"
                    type="primary"
                    :disabled="scope.row.pushStatus === 3 || scope.row.pushStatus === 2"
                    @click="submite(scope.$index, messageData,scope.row.id)">终止</el-button>
                </template>
             </el-table-column>
        </el-table>
        <el-pagination
        @current-change="setPage"
        layout="total, prev, pager, next"
        :total="total">
        </el-pagination>
    </div> 
</template>

<script>
export default {
    data () {
        return {    
            condition: "",
            messageData: null,                                                                                                                                                                                                                                                                                                                              
            page: '1',
            total: 1,
            text: ""
        }
    },
    methods: {
        
        /* 删除弹窗 */
        deleteRow(index, rows, id) {
            let self = this
            this.$confirm(`确认删除？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            })
            .then(() => {
                this.$http({
                    url: this.$http.adornUrl('/iospush/pushMessageConf/deletePushMessageConf/' + id ),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({data}) => {
                    if(data.code === 0) {
                        rows.splice(index, 1)
                        self.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                    }else {
                        self.$message({
                            type: 'error',
                            message: data.msg
                        });
                    }
                })
                .catch(() => {
                    self.$message({
                        type: 'error',
                        message: '删除失败'
                    });
                })
            })
            .catch(action => {
            });
        },

        /* 开关 */
        submite (index, rows, id) {
            let self = this
            this.$http({
                url: this.$http.adornUrl('/iospush/pushMessageConf/stopPushMessageConf/' + id ),
                method: 'get',
                params: this.$http.adornParams()
            }).then(({data}) => {
                if(data.code === 0) {
                    rows[index].pushStatus = 3
                    self.$message({
                        type: 'success',
                        message: '终止成功'
                    });
                } else {
                    self.$message({
                        type: 'error',
                        message: data.msg
                    });
                }
            })
            .catch(() => {
                self.$message({
                    type: 'error',
                    message: '终止失败'
                });
            }) 
        },
        /*点击查询*/
        check(){
            let self = this;
            console.log(this.condition);
            this.$http({
                url: this.$http.adornUrl('/iospush/pushMessageConf/list'),
                method: "post",
                data: this.$http.adornData({
                    'limit': '10',
                    'page': self.page,
                    'condition': self.condition
                })
            }).then(({data}) => {
                console.log(data);
                self.messageData = data.page.list
                self.total = data.page.totalCount
            })
        },
        /* 新建全量 */
        fullQuantity () {
            this.$router.push({ name: 'FullQuantity' })
        },

        /* 详情 */
        statistics (id,system) {
            this.$router.push({ 
                name: 'Statistics',
                params: { 
                     id,
                    system
                 } 
            })
        },

        /* 获取数据 */
        getData() {
            let self = this
            this.$http({
                url: this.$http.adornUrl('/iospush/pushMessageConf/list'),
                method: 'post',
                data: this.$http.adornData({
                        'limit': '10',
                        'page' :  self.page
                })
            }).then(({data}) => {
                if (data.code === 0) {
                    self.messageData = data.page.list
                    self.total = data.page.totalCount
                } else {
                    self.$message({
                        type: 'error',
                        message: data.msg
                    });
                }
            })
            .catch(() => {
            })
        },

        /* 分页 */
        setPage(val) {
           this.page = '' + val
           if(this.condition){
              this.check()
           }else{
               this.getData()
           }
           
        }
    },
    mounted () {
        this.getData()
    },
    deactivated() {
        this.$destroy()
    }
}
</script>

