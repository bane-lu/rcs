<template>
    <div id="failDetail">
        <p> 失败详情</p>
        <el-table
        border
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="mobile"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="errorMsg"
                label="失败原因">
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
            tableData: null,
            page: '1',
            total: 1,
        }
    },
    methods: {
        failDetail () {
            let messageId = this.$route.params.messageId
            this.$http({
                url: this.$http.adornUrl('/iospush/errorDetail/list'),
                method: 'post',
                data: this.$http.adornData({
                    'messageId': messageId,
                    'page': this.page
                })
            }).then(({data}) => {
                if (data.code === 0) {
                    this.tableData = data.page.list
                    this.total = data.page.totalCount
                }
               
            })
            .catch(() => {
            })
        },

        /* 分页 */
        setPage(val) {
           this.page = '' + val
           this.failDetail()
        }
    },
    mounted () {
        this.failDetail()
    }
}
</script>

<style lang="scss" scoped>
    #failDetail{
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
    }
</style>


