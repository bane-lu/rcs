webpackJsonp([23],{"UZE+":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i={data:function(){return{tableData:null,page:"1",total:1}},methods:{failDetail:function(){var t=this,a=this.$route.params.messageId;this.$http({url:this.$http.adornUrl("/iospush/errorDetail/list"),method:"post",data:this.$http.adornData({messageId:a,limit:"10",page:this.page})}).then(function(a){var e=a.data;0===e.code?(t.tableData=e.page.list,t.total=e.page.totalCount):self.$message({type:"error",message:e.msg})}).catch(function(){})},setPage:function(t){this.page=""+t,this.failDetail()}},mounted:function(){this.failDetail()}},n={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{attrs:{id:"failDetail"}},[a("p",[this._v(" 失败详情")]),this._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:this.tableData}},[a("el-table-column",{attrs:{prop:"mobile",label:"手机号"}}),this._v(" "),a("el-table-column",{attrs:{prop:"errorMsg",label:"失败原因"}})],1),this._v(" "),a("el-pagination",{attrs:{layout:"total, prev, pager, next",total:this.total},on:{"current-change":this.setPage}})],1)},staticRenderFns:[]};var s=e("46Yf")(i,n,!1,function(t){e("edT4")},"data-v-911524a4",null);a.default=s.exports},Z4sV:function(t,a,e){(t.exports=e("acE3")(!1)).push([t.i,"\n#failDetail p[data-v-911524a4] {\n  margin: 0;\n  padding: 0;\n  color: #909399;\n  font-size: 18px;\n  border-left: 4px  solid #909399;\n  padding-left: 10px;\n  line-height: 22px;\n  margin-bottom: 28px;\n}\n",""])},edT4:function(t,a,e){var i=e("Z4sV");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e("XkoO")("292e7b5e",i,!0)}});