webpackJsonp([2,12,33],{"95Fj":function(t,a,e){(t.exports=e("acE3")(!1)).push([t.i,"\n.el-dialog[data-v-db476740] {\n  position: relative;\n  margin: 0 auto 50px;\n  background: #fff;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 25% !important;\n}\n",""])},GF1M:function(t,a,e){var n=e("95Fj");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("XkoO")("385c9e72",n,!0)},HT2X:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={data:function(){return{visible:!1,dataForm:{id:null,secret:"",paramStatus:""},dataRule:{secret:[{required:!0,message:"请输入密令",trigger:"blur"}]}}},methods:{init:function(t){this.visible=!0,this.dataForm.id=t.id,this.dataForm.secret="",0==t.status?this.dataForm.paramStatus=1:this.dataForm.paramStatus=0},dataFormSubmit:function(){var t=this;this.$refs.dataForm.validate(function(a){console.log(t.dataForm),a&&(console.log(t.dataForm),t.$http({url:t.$http.adornUrl("/manager/version/update"),method:"post",data:t.$http.adornData({id:t.dataForm.id,secret:t.dataForm.secret,status:t.dataForm.paramStatus})}).then(function(a){var e=a.data;e&&0===e.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.visible=!1,t.$emit("refreshDataList")}}):t.$message.error(e.msg)}))})}}},r={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-dialog",{attrs:{title:"请输入密令","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(a){t.visible=a}}},[e("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"0px"},nativeOn:{keyup:function(a){if(!("button"in a)&&t._k(a.keyCode,"enter",13,a.key))return null;t.dataFormSubmit()}}},[e("el-form-item",{attrs:{prop:"secret"}},[e("el-input",{attrs:{type:"password",placeholder:""},model:{value:t.dataForm.secret,callback:function(a){t.$set(t.dataForm,"secret",a)},expression:"dataForm.secret"}})],1)],1),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.visible=!1}}},[t._v("   取消   ")]),t._v(" "),e("el-button",{attrs:{type:"primary"},on:{click:function(a){t.dataFormSubmit()}}},[t._v("   确定   ")])],1)],1)},staticRenderFns:[]};var i=e("46Yf")(n,r,!1,function(t){e("GF1M")},"data-v-db476740",null);a.default=i.exports},INRw:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("E4LH"),r={data:function(){return{on_submit_loading:!1,visible:!1,dataForm:{id:0,paramApp:null,paramDes:null,paramStatus:null},dataRule:{paramApp:[{required:!0,message:"APP不能为空",trigger:"blur"},{validator:function(t,a,e){Object(n.c)(a)?e():e(new Error("只能输入英字"))},trigger:"blur"}],paramDes:[{required:!0,message:"描述不能为空",trigger:"blur"},{validator:function(t,a,e){Object(n.i)(a)?e():e(new Error("不能输入特殊字符"))},trigger:"blur"}],paramStatus:[{required:!0,message:"请选择一种状态",trigger:"blur"}]}}},methods:{init:function(t){var a=this;this.$nextTick(function(){a.visible=!0,a.dataForm.paramApp=null,a.dataForm.paramDes=null,a.dataForm.paramStatus=null})},dataFormSubmit:function(){var t=this;this.$refs.dataForm.validate(function(a){a&&(t.on_submit_loading=!0,t.$http({url:t.$http.adornUrl("/manager/version/save"),method:"post",data:t.$http.adornData({id:t.dataForm.id,app:t.dataForm.paramApp,description:t.dataForm.paramDes,status:t.dataForm.paramStatus})}).then(function(a){var e=a.data;e&&0===e.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.visible=!1,t.on_submit_loading=!1,t.$emit("refreshDataList")}}):(t.$message.error(e.msg),t.on_submit_loading=!1)}).catch(function(){t.on_submit_loading=!1}))})}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("el-dialog",{attrs:{title:t.dataForm.id?"编辑":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(a){t.visible=a}}},[e("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(a){if(!("button"in a)&&t._k(a.keyCode,"enter",13,a.key))return null;t.dataFormSubmit()}}},[e("el-form-item",{attrs:{label:"APP",prop:"paramApp"}},[e("el-input",{attrs:{placeholder:"APP",maxlength:"20"},model:{value:t.dataForm.paramApp,callback:function(a){t.$set(t.dataForm,"paramApp",a)},expression:"dataForm.paramApp"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"描述",prop:"paramDes"}},[e("el-input",{attrs:{placeholder:"描述",maxlength:"20"},model:{value:t.dataForm.paramDes,callback:function(a){t.$set(t.dataForm,"paramDes",a)},expression:"dataForm.paramDes"}})],1),t._v(" "),e("el-form-item",{attrs:{label:"状态",prop:"paramStatus"}},[e("el-radio-group",{model:{value:t.dataForm.paramStatus,callback:function(a){t.$set(t.dataForm,"paramStatus",a)},expression:"dataForm.paramStatus"}},[e("el-radio",{attrs:{label:"1"}},[t._v("启用")]),t._v(" "),e("el-radio",{attrs:{label:"0"}},[t._v("禁用")])],1)],1)],1),t._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(a){t.visible=!1}}},[t._v("取消")]),t._v(" "),e("el-button",{attrs:{type:"primary",loading:t.on_submit_loading},on:{click:function(a){t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},staticRenderFns:[]},o=e("46Yf")(r,i,!1,null,null,null);a.default=o.exports},duMW:function(t,a,e){(t.exports=e("acE3")(!1)).push([t.i,"\n.el-dialog[data-v-6a43e94a] {\n  position: relative;\n  margin: 0 auto 50px;\n  background: #fff;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 25% !important;\n}\n",""])},kk2x:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("INRw"),r=e("HT2X"),i={data:function(){return{dataForm:{paramApp:""},dataList:[],pageIndex:1,pageSize:10,totalPage:0,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1,enableOrDisableVisible:!1}},components:{AddOrUpdate:n.default,EnableOrDisable:r.default},activated:function(){this.getDataList()},methods:{changeEn:function(t){},search:function(){this.pageIndex=1,this.getDataList()},getDataList:function(){var t=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/manager/version/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,app:this.dataForm.paramApp})}).then(function(a){var e=a.data;e&&0===e.code?(t.dataList=e.page.list,t.totalPage=e.page.totalCount):(t.dataList=[],t.totalPage=0),t.dataListLoading=!1})},sizeChangeHandle:function(t){this.pageSize=t,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(t){this.pageIndex=t,this.getDataList()},selectionChangeHandle:function(t){this.dataListSelections=t},addOrUpdateHandle:function(){var t=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){t.$refs.addOrUpdate.init()})},enableOrDisable:function(t){var a=this;this.enableOrDisableVisible=!0,this.$nextTick(function(){a.$refs.enableOrDisable.init(t)})},deleteHandle:function(t){var a=this,e=t?[t]:this.dataListSelections.map(function(t){return t.id});this.$confirm("确定对[id="+e.join(",")+"]进行["+(t?"删除":"批量删除")+"]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.$http({url:a.$http.adornUrl("/sys/config/delete"),method:"post",data:a.$http.adornData(e,!1)}).then(function(t){var e=t.data;e&&0===e.code?a.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){a.getDataList()}}):a.$message.error(e.msg)})}).catch(function(){})}}},o={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"mod-config"},[e("el-form",{attrs:{inline:!0,model:t.dataForm},nativeOn:{keyup:function(a){if(!("button"in a)&&t._k(a.keyCode,"enter",13,a.key))return null;t.getDataList()}}},[e("el-form-item",[e("el-input",{attrs:{placeholder:"APP版本查询",maxlength:"20",clearable:""},on:{input:function(a){t.changeEn(t.dataForm.paramApp)}},model:{value:t.dataForm.paramApp,callback:function(a){t.$set(t.dataForm,"paramApp",a)},expression:"dataForm.paramApp"}})],1),t._v(" "),e("el-form-item",[t.isAuth("manager:version:list")?e("el-button",{on:{click:function(a){t.search()}}},[t._v("查询")]):t._e(),t._v(" "),t.isAuth("manager:version:save")?e("el-button",{attrs:{type:"primary"},on:{click:function(a){t.addOrUpdateHandle()}}},[t._v("新增")]):t._e()],1)],1),t._v(" "),e("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList,border:""},on:{"selection-change":t.selectionChangeHandle}},[e("el-table-column",{attrs:{type:"selection","header-align":"center",align:"center",width:"50"}}),t._v(" "),e("el-table-column",{attrs:{prop:"app","header-align":"center",align:"center",width:"190",label:"APP"}}),t._v(" "),e("el-table-column",{attrs:{prop:"appKey","header-align":"center",align:"center","show-overflow-tooltip":!0,label:"appKey"}}),t._v(" "),e("el-table-column",{attrs:{prop:"appSecret","header-align":"center",align:"center","show-overflow-tooltip":!0,label:"appSecret"}}),t._v(" "),e("el-table-column",{attrs:{prop:"description","header-align":"center",align:"center",label:"描述",width:"310"}}),t._v(" "),e("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){return[t.isAuth("manager:version:update")?e("el-button",{attrs:{type:0==a.row.status?"success":"danger",size:"mini"},domProps:{textContent:t._s(1==a.row.status?"禁用":"启用")},on:{click:function(e){t.enableOrDisable(a.row)}}}):t._e()]}}])})],1),t._v(" "),e("el-pagination",{attrs:{"current-page":t.pageIndex,"page-size":t.pageSize,total:t.totalPage,layout:"total, prev, pager, next"},on:{"size-change":t.sizeChangeHandle,"current-change":t.currentChangeHandle}}),t._v(" "),t.addOrUpdateVisible?e("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e(),t._v(" "),t.enableOrDisableVisible?e("enable-or-disable",{ref:"enableOrDisable",on:{refreshDataList:t.getDataList}}):t._e()],1)},staticRenderFns:[]};var s=e("46Yf")(i,o,!1,function(t){e("uTu0")},"data-v-6a43e94a",null);a.default=s.exports},uTu0:function(t,a,e){var n=e("duMW");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);e("XkoO")("13923170",n,!0)}});