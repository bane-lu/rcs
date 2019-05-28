<template>
    <div id="failDetail">
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="checkRecord">查询</el-button>
            </el-form-item>
        </el-form>
        <p> 失败详情</p>
        <el-table border :data="tableData" style="width: 100%">
            <el-table-column prop="mobile" label="手机号">
            </el-table-column>
            <el-table-column prop="errorMsg" label="失败原因">
            </el-table-column>
        </el-table>
        <el-pagination @current-change="setPage" layout="total, prev, pager, next" :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: null,
            page: '1',
            total: 1,
            phone: ''
        }
    },
    methods: {
        failDetail() {
            let messageId = this.$route.params.id
            this.$http({
                url: this.$http.adornUrl('/iospush/errorDetail/list'),
                method: 'post',
                data: this.$http.adornData({
                    'messageId': messageId,
                    'limit': '10',
                    'page': this.page
                })
            }).then(({ data }) => {
                if (data.code === 0) {
                    this.tableData = data.page.list
                    this.total = data.page.totalCount
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
            if (this.phone) {
                this.checkRecord()
            } else {
                this.failDetail()
            }
        },
        checkRecord() {
            let messageId = this.$route.params.id
            this.$http({
                url: this.$http.adornUrl('/iospush/errorDetail/list'),
                method: 'post',
                data: this.$http.adornData({
                    'messageId': messageId,
                    'limit': '10',
                    'page': this.page,
                    'mobile': this.phone
                })
            }).then(({ data }) => {
                if (data.code === 0) {
                    this.tableData = data.page.list
                    this.total = data.page.totalCount
                } else {
                    self.$message({
                        type: 'error',
                        message: data.msg
                    });
                }

            })
                .catch(() => {
                })
        }
    },
    mounted() {
        this.failDetail()
    }
}
</script>

<style lang="scss" scoped>
#failDetail {
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
}
</style>


