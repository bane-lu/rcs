webpackJsonp([43],{MGIT:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-button",{attrs:{type:"primary"},on:{click:t.fullQuantity}},[t._v("消息推送")]),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-top":"20px"},attrs:{border:"",data:t.messageData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"主标题","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"body",label:"内容",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"url",label:"URL","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"推送日期","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pushStatus",label:"状态","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.pushStatus?a("span",[t._v("待推送")]):1===e.row.pushStatus?a("span",[t._v("推送中")]):2===e.row.pushStatus?a("span",[t._v("已推送")]):a("span",[t._v("已终止")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"pushType",label:"推送机制","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.pushType?a("span",[t._v("全量")]):a("span",[t._v("指定号码")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){t.statistics(e.row.id)}}},[t._v("详情分析")]),t._v(" "),a("el-button",{staticStyle:{color:"red"},attrs:{size:"small",type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.deleteRow(e.$index,t.messageData,e.row.id)}}},[t._v("删除")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"开关"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary",disabled:3===e.row.pushStatus},on:{click:function(a){t.submite(e.$index,t.messageData,e.row.id)}}},[t._v("终止")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.setPage}})],1)},staticRenderFns:[]},o=a("46Yf")({data:function(){return{messageData:null,page:"1",total:1}},methods:{deleteRow:function(t,e,a){var s=this,o=this;this.$confirm("确认删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){s.$http({url:s.$http.adornUrl("/iospush/pushMessageConf/deletePushMessageConf/"+a),method:"get",params:s.$http.adornParams()}).then(function(a){var s=a.data;0===s.code?(e.splice(t,1),o.$message({type:"success",message:"删除成功"})):o.$message({type:"error",message:s.msg})}).catch(function(){o.$message({type:"error",message:"删除失败"})})}).catch(function(t){})},submite:function(t,e,a){var s=this;this.$http({url:this.$http.adornUrl("/iospush/pushMessageConf/stopPushMessageConf/"+a),method:"get",params:this.$http.adornParams()}).then(function(a){var o=a.data;0===o.code?(e[t].pushStatus=3,s.$message({type:"success",message:"终止成功"})):s.$message({type:"error",message:o.msg})}).catch(function(){s.$message({type:"error",message:"终止失败"})})},fullQuantity:function(){this.$router.push({name:"FullQuantity"})},statistics:function(t){this.$router.push({name:"Statistics",params:{id:t}})},getData:function(){var t=this;this.$http({url:this.$http.adornUrl("/iospush/pushMessageConf/list"),method:"post",data:this.$http.adornData({limit:"10",page:t.page})}).then(function(e){var a=e.data;0===a.code?(t.messageData=a.page.list,t.total=a.page.totalCount):t.$message({type:"error",message:a.msg})}).catch(function(){})},setPage:function(t){this.page=""+t,this.getData()}},mounted:function(){this.getData()},deactivated:function(){this.$destroy()}},s,!1,null,null,null);e.default=o.exports}});