<template>
    <div id="specifiedNumber">
        <el-form :inline="true">
            <el-form-item label="号码">
                <el-input v-model="filter.sectionNumber"
                    placeholder="输入手机号查询"
                    maxlength="11">
                </el-input>
            </el-form-item>
            <el-form-item label="APP">
                <el-select v-model="filter.app" placeholder="请选择">
                    <el-option
                        v-for="(item,index) in app_type"
                        :key="index"
                        :label="item"
                        :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <label class="item_label">时间</label>
            <el-date-picker
                v-model="filter.minTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="开始时间"
                @change="transformTime">
            </el-date-picker>
            <span>&nbsp;-&nbsp;</span>
            <el-date-picker
                v-model="filter.maxTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束时间"
                @change="transformTime">
            </el-date-picker>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table
          :data="dataList"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          style="width: 100%;">
          <el-table-column
            type="index"
            :index="transforIndex"
            header-align="center"
            align="center"
            label="序号"
            width="80">
          </el-table-column>
          <el-table-column
            prop="mobile"
            header-align="center"
            align="center"
            width="120"
            label="号码">
          </el-table-column>
          <el-table-column
            prop="app"
            header-align="center"
            align="center"
            width="180"
            label="APP">
          </el-table-column>
          <el-table-column
            prop="desc"
            header-align="center"
            align="center"
            label="时间"
            width="290">
            <template slot-scope="props">
              <span v-text="props.row.startDate +' — '+ props.row.endDate"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="desc"
            header-align="center"
            align="center"
            :show-overflow-tooltip="true"
            label="描述"
            width="200">
            <template slot-scope="props">
              <span v-text="props.row.desc == '' || props.row.desc == null ? '--' : props.row.desc"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="regionCode"
            header-align="center"
            align="center"
            label="操作">
            <template slot-scope="props">
              <el-button type="primary" size="small" @click="addOrUpdateHandle(props.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="deleteHandle(props.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, prev, pager, next">
        </el-pagination>
        <add-or-update v-if="addOrUpdateVisible" :to_app_type="app_type" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    </div>
</template>

<script>
    import AddOrUpdate from './addOrUpdate';
    export default {
        data () {
            return {
                app_type: [],
                filter: {
                    sectionNumber: null,
                    app: null,
                    desc: '',
                    minTime: null,
                    maxTime: null
                },
                dataList: [],
                pageIndex: 1,
                pageSize: 8,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false
            }
        },
        methods: {
            transforIndex (index) {
                return index + this.pageSize*(this.pageIndex - 1) + 1
            },
            //获取APP
            get_app_type () {
                this.$http({
                    url: this.$http.adornUrl('/mobapp/apps'),
                    method: 'get',
                    data: this.$http.adornParams()
                }).then(({data}) => {
                    if(data.code == 0) {
                        this.app_type = data.data;
                    }
                }).catch(() => {
                })
            },
            // 格式化日期选择器
            transformTime (time) {
                return time
            },
            // 获取数据列表
            getDataList () {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/mobapp/list'),
                    method: 'post',
                    data: this.$http.adornData({
                        "page": this.pageIndex.toString(),
                        "limit": this.pageSize.toString(),
                        "app": this.filter.app,
                        "mobile": this.filter.sectionNumber == '' ? null : this.filter.sectionNumber ,
                        "startDate": this.filter.minTime,
                        "endDate": this.filter.maxTime
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.dataList = data.page.list;
                        this.totalPage = data.page.totalCount
                    } else if(data && data.code == 500) {
                        this.$message({
                            message: data.msg,
                            type: 'warning'
                        });
                        this.dataList = [];
                        this.totalPage = 0;
                    } else {
                        this.dataList = []
                        this.totalPage = 0
                    }
                    
                    this.dataListLoading = false
                }).catch(({data}) => {
                    this.dataListLoading = false
                })
            },
            //查询
            onSubmit() {
                this.getDataList();
            },
            addOrUpdateHandle(row) {
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(row)
                })
            },
            //删除
            deleteHandle(row) {
                var id = row.id;
                this.$confirm(`确定删除`, '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$http({
                    url: this.$http.adornUrl('/mobapp/delete/' + id),
                    method: 'get',
                  }).then(({data}) => {
                    if (data && data.code == 0) {
                      this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                          this.getDataList()
                        }
                      })
                    } else {
                      this.$message.error(data.msg)
                    }
                  })
                }).catch(({data}) => {
                })
            },
            //重置
            reset() {
                this.pageIndex = 1;
                this.filter.app = null;
                this.filter.sectionNumber = null;
                this.filter.desc = '';
                this.filter.minTime = null;
                this.filter.maxTime = null;
                this.getDataList();
            },
            // 每页数
            sizeChangeHandle (val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle (val) {
                this.pageIndex = val
                this.getDataList()
            },
            // 多选
            selectionChangeHandle (val) {
                this.dataListSelections = val
            }
        },
        mounted () {
            this.get_app_type();
            this.getDataList();
        },
        components: {
            AddOrUpdate
        }
    }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
</style>