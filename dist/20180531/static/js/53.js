webpackJsonp([53],{"8+CK":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s={data:function(){return{condition:"",messageData:null,page:"1",total:1,text:""}},methods:{deleteRow:function(t,e,a){var s=this,o=this;this.$confirm("确认删除？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){s.$http({url:s.$http.adornUrl("/rcsiospush/pushMessageConf/deletePushMessageConf/"+a),method:"get",params:s.$http.adornParams()}).then(function(a){var s=a.data;0===s.code?(e.splice(t,1),o.$message({type:"success",message:"删除成功"})):o.$message({type:"error",message:s.msg})}).catch(function(){o.$message({type:"error",message:"删除失败"})})}).catch(function(t){})},submite:function(t,e,a){var s=this;this.$http({url:this.$http.adornUrl("/rcsiospush/pushMessageConf/stopPushMessageConf/"+a),method:"get",params:this.$http.adornParams()}).then(function(a){var o=a.data;0===o.code?(e[t].pushStatus=3,s.$message({type:"success",message:"终止成功"})):s.$message({type:"error",message:o.msg})}).catch(function(){s.$message({type:"error",message:"终止失败"})})},check:function(){var t=this;this.$http({url:this.$http.adornUrl("/rcsiospush/pushMessageConf/list"),method:"post",data:this.$http.adornData({limit:"10",page:t.page,condition:t.condition})}).then(function(e){var a=e.data;t.messageData=a.page.list,t.total=a.page.totalCount,console.log(666,a.page.list,a.page.totalCount)})},fullQuantity:function(){this.$router.push({name:"HefeixinFullQuantity"})},statistics:function(t){this.$router.push({name:"HefeixinStatistics",params:{id:t}})},getData:function(){var t=this;this.$http({url:this.$http.adornUrl("/rcsiospush/pushMessageConf/list"),method:"post",data:this.$http.adornData({limit:"10",page:t.page})}).then(function(e){var a=e.data;0===a.code?(t.messageData=a.page.list,t.total=a.page.totalCount):t.$message({type:"error",message:a.msg})}).catch(function(){})},setPage:function(t){this.page=""+t,this.condition?this.check():this.getData()}},mounted:function(){this.getData()},deactivated:function(){this.$destroy()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:""}},[a("el-input",{model:{value:t.condition,callback:function(e){t.condition=e},expression:"condition"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.check}},[t._v("查询")])],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.fullQuantity}},[t._v("消息推送")])],1)],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%","margin-top":"20px"},attrs:{border:"",data:t.messageData,"tooltip-effect":"dark"}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"55"}}),t._v(" "),a("el-table-column",{attrs:{prop:"title",label:"主标题","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"body",label:"内容",width:"150","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"url",label:"URL","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pushStartDate",label:"推送日期","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"system",label:"推送系统","show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{prop:"pushStatus",label:"状态","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.pushStatus?a("span",[t._v("待推送")]):1===e.row.pushStatus?a("span",[t._v("推送中")]):2===e.row.pushStatus?a("span",[t._v("已推送")]):a("span",[t._v("已终止")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"pushType",label:"推送范围","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.province))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){t.statistics(e.row.id)}}},[t._v("详情分析")]),t._v(" "),a("el-button",{staticStyle:{color:"red"},attrs:{size:"small",type:"text"},nativeOn:{click:function(a){a.preventDefault(),t.deleteRow(e.$index,t.messageData,e.row.id)}}},[t._v("删除")])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"开关"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"primary",disabled:3===e.row.pushStatus||2===e.row.pushStatus},on:{click:function(a){t.submite(e.$index,t.messageData,e.row.id)}}},[t._v("终止")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{layout:"total, prev, pager, next",total:t.total},on:{"current-change":t.setPage}})],1)},staticRenderFns:[]},n=a("46Yf")(s,o,!1,null,null,null);e.default=n.exports}});