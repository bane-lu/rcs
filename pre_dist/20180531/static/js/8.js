webpackJsonp([8,30],{"2dmQ":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={name:"detailToast",props:{dataDetail:{type:Object,default:{}}},data:function(){return{dialogVisible:!1,result:{type:"",total:"",arrive:""}}},watch:{dataDetail:function(){this.dialogVisible=!0}},methods:{getExcel:function(){var t=this.$route.params.id,a="/iospush/pushDetail";a=0==this.dataDetail.index?a+"/androidManDownload/"+t:1==this.dataDetail.index?a+"/androidModelDownload/"+t:2==this.dataDetail.index?a+"/androidAppDownload/"+t:a+"/androidProvinceDownload/"+t,window.location.href=this.$http.adornUrl(a)}}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"detail-toast"},[e("el-dialog",{attrs:{title:t.dataDetail.title+"推送数",visible:t.dialogVisible,width:"40%"},on:{"update:visible":function(a){t.dialogVisible=a}}},[e("div",{staticClass:"detail-info clearfix"},t._l(t.dataDetail.data,function(a,i){return e("div",{key:i},[0==t.dataDetail.index?e("span",[t._v(t._s(a.mobileMan)+":")]):t._e(),t._v(" "),1==t.dataDetail.index?e("span",[t._v(t._s(a.mobileModel)+":")]):t._e(),t._v(" "),2==t.dataDetail.index?e("span",[t._v(t._s(a.appVersion)+":")]):t._e(),t._v(" "),3==t.dataDetail.index?e("span",[t._v(t._s(a.province)+":")]):t._e(),t._v(" "),e("span",[t._v(t._s(a.total))]),t._v(" "),e("span",[t._v(t._s(a.click))])])})),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{attrs:{type:"primary"},on:{click:t.getExcel}},[t._v("导出")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(a){t.dialogVisible=!1}}},[t._v("确 定")])],1)])],1)},staticRenderFns:[]};var n=e("46Yf")(i,l,!1,function(t){e("NR5G")},"data-v-9177d972",null);a.default=n.exports},"Ie+2":function(t,a,e){(t.exports=e("acE3")(!1)).push([t.i,'\n#Statistics p {\n  margin: 0;\n  padding: 0;\n  color: #909399;\n  font-size: 18px;\n  border-left: 4px  solid #909399;\n  padding-left: 10px;\n  line-height: 22px;\n  margin-bottom: 28px;\n}\n#Statistics .push-title {\n  display: inline-block;\n  margin-top: 20px;\n}\n#Statistics .export-btn {\n  float: right;\n}\n#Statistics .el-form:after {\n  content: "";\n  display: block;\n  clear: both;\n}\n#Statistics .el-form .el-form-item {\n  float: left;\n  width: 50%;\n}\n#Statistics .el-form .el-form-item .el-form-item__label {\n    color: #909399 !important;\n    font-size: 18px !important;\n}\n#Statistics .el-form .el-form-item span {\n    font-size: 15px;\n}\n',""])},Jwzc:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={data:function(){return{data:{},tableData:[],tableData2:[{}],dataDetail:{},id:"",system:""}},methods:{getIdData:function(){var t=this;this.$http({url:this.$http.adornUrl("/iospush/pushDetail/info/"+this.id),method:"get",params:this.$http.adornParams()}).then(function(a){var e=a.data;0===e.code?(t.tableData=[],t.data=e.data,t.tableData.push(e.data)):t.$message({type:"error",message:e.msg})}).catch(function(){})},failDetail:function(){this.$router.push({name:"FailDetail",params:{messageId:this.id}})},handleClick:function(t,a){var e=this,i="/iospush/pushDetail";i=0==a?i+"/androidMan/"+this.id:1==a?i+"/androidModel/"+this.id:2==a?i+"/androidApp/"+this.id:i+"/androidProvince/"+this.id,this.$http({url:this.$http.adornUrl(i),method:"get",params:this.$http.adornParams()}).then(function(i){var l=i.data;0==l.code?e.dataDetail={index:a,title:t.column.label,data:l.data}:e.$message({type:"error",message:l.msg})}).catch(function(){})},exportAll:function(){window.location.href=this.$http.adornUrl("/iospush/pushDetail/infoDownload/"+this.id)},init:function(){this.id=this.$route.params.id,this.system=this.$route.params.system,this.getIdData()}},activated:function(){this.init()},components:{detailToast:e("2dmQ").default}},l={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"Statistics"}},[e("p",[t._v(" 统计详情及分析")]),t._v(" "),t.data?e("el-form",{ref:"form",attrs:{model:t.data,"label-width":"120px",id:"elForm",size:"small"}},[e("el-form-item",{attrs:{label:"主标题："}},[e("span",[t._v(t._s(t.data.title))])]),t._v(" "),e("el-form-item",{attrs:{label:"内容："}},[e("span",[t._v(t._s(t.data.contents))])]),t._v(" "),e("el-form-item",{attrs:{label:"url："}},[e("span",[t._v(t._s(t.data.url))])]),t._v(" "),e("el-form-item",{attrs:{label:"推送日期："}},[e("span",[t._v(t._s(t.data.pushDate))])]),t._v(" "),e("el-form-item",{attrs:{label:"频率："}},[e("span",[t._v(t._s(t.data.pushTime))])]),t._v(" "),e("el-form-item",{attrs:{label:"发送状态："}},[e("span",[t._v(t._s(t.data.pushStatus))])])],1):t._e(),t._v(" "),e("div",[e("p",{staticClass:"push-title"},[t._v(" 推送数据")]),t._v(" "),"待推送"!==t.data.pushStatus?e("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"text"},on:{click:function(a){t.failDetail()}}},[t._v("查看失败详情")]):t._e(),t._v(" "),e("el-button",{staticClass:"export-btn",attrs:{type:"primary"},on:{click:t.exportAll}},[t._v("导出")])],1),t._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},["ios"!=t.system?e("el-table-column",{attrs:{prop:"total",label:"推送数",align:"center"}}):t._e(),t._v(" "),e("el-table-column",{attrs:{prop:"arrive",label:"到达数",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"fail",label:"失败数",align:"center"}}),t._v(" "),"ios"!=t.system?e("div",[e("el-table-column",{attrs:{prop:"arriveRate",label:"到达率",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"click",label:"点击数",align:"center"}}),t._v(" "),e("el-table-column",{attrs:{prop:"clickRate",label:"点击率",align:"center"}})],1):t._e()],1),t._v(" "),"ios"!=t.system?e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData2,border:""}},[e("el-table-column",{attrs:{label:"品牌手机",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){t.handleClick(a,0)}}},[t._v("查看")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"型号",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){t.handleClick(a,1)}}},[t._v("查看")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"应用版本",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){t.handleClick(a,2)}}},[t._v("查看")])]}}])}),t._v(" "),e("el-table-column",{attrs:{label:"省份",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[e("el-button",{attrs:{type:"text",size:"small"},on:{click:function(e){t.handleClick(a,3)}}},[t._v("查看")])]}}])}),t._v(" "),e("el-table-column"),t._v(" "),e("el-table-column")],1):t._e(),t._v(" "),e("detailToast",{attrs:{dataDetail:t.dataDetail}})],1)},staticRenderFns:[]};var n=e("46Yf")(i,l,!1,function(t){e("tK61")},null,null);a.default=n.exports},NR5G:function(t,a,e){var i=e("shf8");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("XkoO")("9d084a0c",i,!0)},shf8:function(t,a,e){(t.exports=e("acE3")(!1)).push([t.i,"\n.detail-toast .detail-info div[data-v-9177d972] {\n  float: left;\n  width: 33.3%;\n  margin-bottom: 10px;\n}\n.detail-toast .detail-info div span[data-v-9177d972] {\n    margin-right: 10px;\n}\n.detail-toast .detail-info div span[data-v-9177d972]:nth-of-type(3) {\n      color: red;\n}\n",""])},tK61:function(t,a,e){var i=e("Ie+2");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("XkoO")("1660c4a1",i,!0)}});