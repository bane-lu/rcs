webpackJsonp([14],{"0BWY":function(t,e,a){var n=a("oVzQ");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("XkoO")("2453b080",n,!0)},"O/m4":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{app_type:[],filter:{sectionNumber:null,app:null,desc:"",minTime:null,maxTime:null},dataList:[],pageIndex:1,pageSize:8,totalPage:0,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,form:{methodVal:""},method:""}},methods:{transforIndex:function(t){return t+this.pageSize*(this.pageIndex-1)+1},get_app_type:function(){var t=this;this.$http({url:this.$http.adornUrl("/mobapp/apps"),method:"get",data:this.$http.adornParams()}).then(function(e){var a=e.data;0==a.code&&(t.app_type=a.data)}).catch(function(){})},transformTime:function(t){return t},getDataList:function(){var t=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/mobapp/list"),method:"post",data:this.$http.adornData({page:this.pageIndex.toString(),limit:this.pageSize.toString(),app:this.filter.app,mobile:""==this.filter.sectionNumber?null:this.filter.sectionNumber,startDate:this.filter.minTime,endDate:this.filter.maxTime})}).then(function(e){var a=e.data;a&&0===a.code?(t.dataList=a.page.list,t.totalPage=a.page.totalCount):a&&500==a.code?(t.$message({message:a.msg,type:"warning"}),t.dataList=[],t.totalPage=0):(t.dataList=[],t.totalPage=0),t.dataListLoading=!1}).catch(function(e){e.data;t.dataListLoading=!1})},onSubmit:function(){this.getDataList()},addOrUpdateHandle:function(t){this.$router.push({name:"addOrUpdate"})},deleteHandle:function(t){var e=this,a=t.id;this.$confirm("确定删除","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http({url:e.$http.adornUrl("/mobapp/delete/"+a),method:"get"}).then(function(t){var a=t.data;a&&0==a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.getDataList()}}):e.$message.error(a.msg)})}).catch(function(t){t.data})},reset:function(){this.pageIndex=1,this.filter.app=null,this.filter.sectionNumber=null,this.filter.desc="",this.filter.minTime=null,this.filter.maxTime=null,this.getDataList()},sizeChangeHandle:function(t){this.pageSize=t,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(t){this.pageIndex=t,this.getDataList()},selectionChangeHandle:function(t){this.dataListSelections=t}},mounted:function(){this.get_app_type(),this.getDataList()},components:{AddOrUpdate:a("c490").default}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"webFamily"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("名称")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.filter.urlName,callback:function(e){t.$set(t.filter,"urlName",e)},expression:"filter.urlName"}})],1)]),t._v(" "),a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("url")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.filter.url,callback:function(e){t.$set(t.filter,"url",e)},expression:"filter.url"}})],1)]),t._v(" "),a("el-col",{attrs:{span:14}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("有效时间")]),t._v(" "),a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始时间"},on:{change:t.transformTime},model:{value:t.filter.minTime,callback:function(e){t.$set(t.filter,"minTime",e)},expression:"filter.minTime"}}),t._v(" "),a("span",[t._v(" - ")]),t._v(" "),a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"结束时间"},on:{change:t.transformTime},model:{value:t.filter.maxTime,callback:function(e){t.$set(t.filter,"maxTime",e)},expression:"filter.maxTime"}})],1)])],1),t._v(" "),a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("模块")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.filter.description,callback:function(e){t.$set(t.filter,"description",e)},expression:"filter.description"}})],1)]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple"},[t.isAuth("manager:url:list")?a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.search()}}},[t._v("查询")]):t._e(),t._v(" "),t.isAuth("manager:url:save")?a("el-button",{attrs:{type:"success"},on:{click:function(e){t.addOrUpdateHandle()}}},[t._v("新增")]):t._e(),t._v(" "),t.isAuth("urlmanage:urlmanage:reset")?a("el-button",{attrs:{type:"info"},on:{click:function(e){t.reset()}}},[t._v("重置")]):t._e(),t._v(" "),t.isAuth("manager:url:delete")?a("el-button",{attrs:{type:"danger",disabled:t.dataListSelections.length<=0},on:{click:function(e){t.deleteHandle()}}},[t._v("排序")]):t._e()],1)])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList,border:""},on:{"selection-change":t.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"index",index:t.transforIndex,"header-align":"center",align:"center",label:"序列",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"mobile","header-align":"center",align:"center",width:"120",label:"业务名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"app","header-align":"center",align:"center",width:"180",label:"APP"}}),t._v(" "),a("el-table-column",{attrs:{prop:"desc","header-align":"center",align:"center",label:"模块",width:"290"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(e.row.startDate+" — "+e.row.endDate)}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"desc","header-align":"center",align:"center","show-overflow-tooltip":!0,label:"url",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(""==e.row.desc||null==e.row.desc?"--":e.row.desc)}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"regionCode","header-align":"center",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.addOrUpdateHandle(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){t.deleteHandle(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageIndex,"page-size":t.pageSize,total:t.totalPage,layout:"total, prev, pager, next"},on:{"size-change":t.sizeChangeHandle,"current-change":t.currentChangeHandle}}),t._v(" "),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",attrs:{to_app_type:t.app_type},on:{refreshDataList:t.getDataList}}):t._e()],1)},staticRenderFns:[]};var l=a("46Yf")(n,i,!1,function(t){a("0BWY")},"data-v-d273cb10",null);e.default=l.exports},oVzQ:function(t,e,a){(t.exports=a("acE3")(!1)).push([t.i,'\n@charset "UTF-8";\n.grid-content[data-v-d273cb10] {\n  padding: 10px 0px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: start;\n}\n.item_label[data-v-d273cb10] {\n  font-size: 14px;\n  padding: 0px 10px;\n  word-break: keep-all;\n  white-space: nowrap;\n}\n.date_picker[data-v-d273cb10] {\n  margin-right: 10px;\n}\n/* 时间选择框 */\n.el-date-editor--daterange.el-input[data-v-d273cb10], .el-date-editor--daterange.el-input__inner[data-v-d273cb10], .el-date-editor--timerange.el-input[data-v-d273cb10], .el-date-editor--timerange.el-input__inner[data-v-d273cb10] {\n  width: 360px;\n}\n',""])}});