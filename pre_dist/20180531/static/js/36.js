webpackJsonp([36],{Nnw2:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:"日志列表","close-on-click-modal":!1,visible:e.visible,width:"75%"},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{attrs:{inline:!0,model:e.dataForm},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.getDataList()}}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"任务ID",clearable:""},model:{value:e.dataForm.id,callback:function(t){e.$set(e.dataForm,"id",t)},expression:"dataForm.id"}})],1),e._v(" "),a("el-form-item",[a("el-button",{on:{click:function(t){e.getDataList()}}},[e._v("查询")])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:e.dataList,border:"",height:"460"}},[a("el-table-column",{attrs:{prop:"logId","header-align":"center",align:"center",width:"80",label:"日志ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"jobId","header-align":"center",align:"center",width:"80",label:"任务ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"beanName","header-align":"center",align:"center",label:"bean名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"methodName","header-align":"center",align:"center",label:"方法名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"params","header-align":"center",align:"center",label:"参数"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status","header-align":"center",align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.status?a("el-tag",{attrs:{size:"small"}},[e._v("成功")]):a("el-tag",{staticStyle:{cursor:"pointer"},attrs:{size:"small",type:"danger"},nativeOn:{click:function(a){e.showErrorInfo(t.row.logId)}}},[e._v("失败")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"times","header-align":"center",align:"center",label:"耗时(单位: 毫秒)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime","header-align":"center",align:"center",width:"180",label:"执行时间"}})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.pageIndex,"page-sizes":[10,20,50,100],"page-size":e.pageSize,total:e.totalPage,layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}})],1)},staticRenderFns:[]},i=a("46Yf")({data:function(){return{visible:!1,dataForm:{id:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1}},methods:{init:function(){this.visible=!0,this.getDataList()},getDataList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/sys/scheduleLog/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,jobId:this.dataForm.id})}).then(function(t){var a=t.data;a&&0===a.code?(e.dataList=a.page.list,e.totalPage=a.page.totalCount):(e.dataList=[],e.totalPage=0),e.dataListLoading=!1})},sizeChangeHandle:function(e){this.pageSize=e,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(e){this.pageIndex=e,this.getDataList()},showErrorInfo:function(e){var t=this;this.$http({url:this.$http.adornUrl("/sys/scheduleLog/info/"+e),method:"get",params:this.$http.adornParams()}).then(function(e){var a=e.data;a&&0===a.code?t.$alert(a.log.error):t.$message.error(a.msg)})}}},n,!1,null,null,null);t.default=i.exports}});