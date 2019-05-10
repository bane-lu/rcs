<template>
    <div class="detail-toast">
        <el-dialog :title="dataDetail.title+'推送数'" :visible.sync="dialogVisible" width="40%">
            <div class="detail-info clearfix">
                <div v-for="(item,index) in dataDetail.data" :key="index">
                    <span v-if="dataDetail.index==0">{{item.mobileMan}}:</span>
                    <span v-if="dataDetail.index==1">{{item.mobileModel}}:</span>
                    <span v-if="dataDetail.index==2">{{item.appVersion}}:</span>
                    <span v-if="dataDetail.index==3">{{item.province}}:</span>
                    <span>{{item.total}}</span>
                    <span>{{item.arrive}}</span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="getExcel">导出</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "detailToast",
    props: {
        dataDetail: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            dialogVisible: false,
            result: {
                type: "",
                total: "",
                arrive: ""
            }
        }
    },
    watch: {
        dataDetail() {
            this.dialogVisible = true;
        }
    },
    methods: {
        getExcel(){
            let id = this.$route.params.id;
            let url = "/iospush/pushDetail";
            if (this.dataDetail.index == 0) {
                url = url + '/androidManDownload/' + id;
            } else if (this.dataDetail.index == 1) {
                url = url + '/androidModelDownload/' + id;
            } else if (this.dataDetail.index == 2) {
                url = url + '/androidAppDownload/' + id;
            } else {
                url = url + '/androidProvinceDownload/' + id;
            }
            window.location.href = this.$http.adornUrl(url);
        }
    }
}
</script>
<style lang="scss" scoped>
.detail-toast {
    .detail-info {
        div {
            float: left;
            width: 33.3%;
            margin-bottom: 10px;
            span {
                margin-right: 10px;
                &:nth-of-type(3) {
                    color: red;
                }
            }
        }
    }
}
</style>

