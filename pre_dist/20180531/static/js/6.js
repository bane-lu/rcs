webpackJsonp([6,15],{M8GE:function(t,e,a){(t.exports=a("acE3")(!1)).push([t.i,"\n.lib-add-update .el-select[data-v-200d92ce] {\n  width: 100%;\n  display: inline-block;\n  position: relative;\n}\n",""])},Nc3d:function(t,e,a){var n=a("t7kc");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("XkoO")("3f6fbeae",n,!0)},aHC5:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){return{province_type:[],app_type:[],city_type:[],filter:{sectionNumber:null,provinceId:null,regionId:null},dataList:[],pageIndex:1,pageSize:8,totalPage:0,dataListLoading:!1,dataListSelections:[],addOrUpdateVisible:!1}},mounted:function(){this.get_app_type(),this.get_province_type(),this.getDataList()},methods:{transforIndex:function(t){return t+this.pageSize*(this.pageIndex-1)+1},get_app_type:function(){var t=this;this.$http({url:this.$http.adornUrl("/manager/version/getList"),method:"get",data:this.$http.adornParams()}).then(function(e){var a=e.data;t.app_type=a.appList}).catch(function(){})},get_province_type:function(){var t=this;this.$http({url:this.$http.adornUrl("/manager/province/queryAll"),method:"get",data:this.$http.adornParams()}).then(function(e){var a=e.data;t.province_type=a.data}).catch(function(){})},changeProvince:function(t){this.get_city_type(t),this.filter.regionId=null},get_city_type:function(t){var e=this;this.$http({url:this.$http.adornUrl("/manager/region/queryByProvinceId?provinceId="+t),method:"get",data:this.$http.adornParams()}).then(function(t){var a=t.data;e.city_type=a.data}).catch(function(){})},reset:function(){this.filter.sectionNumber=null,this.filter.provinceId=null,this.filter.regionId=null,this.dataList=null,this.pageIndex=1,this.pageSize=8,this.totalPage=0,this.dataListLoading=!1,this.dataListSelections=[],this.addOrUpdateVisible=!1,this.get_province_type(),this.getDataList()},getDataList:function(){var t=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/manager/sectionNumber/queryList/"+this.pageIndex+"/"+this.pageSize),method:"post",data:this.$http.adornData({sectionNumber:this.filter.sectionNumber,provinceId:this.filter.provinceId,regionId:this.filter.regionId})}).then(function(e){var a=e.data;a&&0===a.code?(t.dataList=a.data.sectionNumberList,t.totalPage=a.data.total):(t.dataList=[],t.totalPage=0),t.dataListLoading=!1})},addOrUpdateHandle:function(t){var e=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){e.$refs.addOrUpdate.init(t)})},deleteHandle:function(t){var e=this,a=t.sectionNumber;console.log(t.sectionNumber),this.$confirm("确定对该条数据进行删除操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http({url:e.$http.adornUrl("/manager/sectionNumber/delete"),method:"post",data:e.$http.adornData({sectionNumber:a})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.getDataList()}}):e.$message.error(a.msg)})}).catch(function(t){t.data})},sizeChangeHandle:function(t){this.pageSize=t,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(t){this.pageIndex=t,this.getDataList()},selectionChangeHandle:function(t){this.dataListSelections=t}},components:{AddOrUpdate:a("xAAC").default}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"lib"},[a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:5}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("号码段")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入号码段",maxlength:"11"},model:{value:t.filter.sectionNumber,callback:function(e){t.$set(t.filter,"sectionNumber",e)},expression:"filter.sectionNumber"}})],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("关联省")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.changeProvince},model:{value:t.filter.provinceId,callback:function(e){t.$set(t.filter,"provinceId",e)},expression:"filter.provinceId"}},t._l(t.province_type,function(e,n){return a("el-option",{key:n,attrs:{label:e.provinceName,value:e.id}},[t._v(t._s(e.provinceName))])}))],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("关联市")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择",disabled:!t.filter.provinceId},model:{value:t.filter.regionId,callback:function(e){t.$set(t.filter,"regionId",e)},expression:"filter.regionId"}},t._l(t.city_type,function(e,n){return a("el-option",{key:n,attrs:{label:e.regionName,value:e.id}},[t._v(t._s(e.regionName))])}))],1)]),t._v(" "),a("el-col",{attrs:{span:2}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.getDataList()}}},[t._v("查找")])],1)]),t._v(" "),a("el-col",{attrs:{span:2}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.reset()}}},[t._v("重置")])],1)]),t._v(" "),a("el-col",{attrs:{span:3}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addOrUpdateHandle()}}},[t._v("新增号码库")])],1)])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList,border:""},on:{"selection-change":t.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"index",index:t.transforIndex,"header-align":"center",align:"center",label:"序号",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"sectionNumber","header-align":"center",align:"center",width:"120",label:"号码段"}}),t._v(" "),a("el-table-column",{attrs:{prop:"appType","header-align":"center",align:"center",width:"200",label:"关联版本"}}),t._v(" "),a("el-table-column",{attrs:{prop:"regionEntity","header-align":"center",align:"center","show-overflow-tooltip":!0,width:"200",label:"关联省份"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(null==e.row.regionEntity.provinceEntity.provinceName?"---":e.row.regionEntity.provinceEntity.provinceName)}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"regionEntity","header-align":"center",align:"center","show-overflow-tooltip":!0,label:"关联市",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(null==e.row.regionEntity.regionName?"---":e.row.regionEntity.regionName)}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"regionId","header-align":"center",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){t.addOrUpdateHandle(e.row)}}},[t._v("修改")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){t.deleteHandle(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageIndex,"page-size":t.pageSize,total:t.totalPage,layout:"total, prev, pager, next"},on:{"size-change":t.sizeChangeHandle,"current-change":t.currentChangeHandle}}),t._v(" "),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",attrs:{to_app_type:t.app_type,to_province_type:t.province_type},on:{refreshDataList:t.getDataList}}):t._e()],1)},staticRenderFns:[]};var r=a("46Yf")(n,i,!1,function(t){a("Nc3d")},"data-v-035b2d6b",null);e.default=r.exports},t7kc:function(t,e,a){(t.exports=a("acE3")(!1)).push([t.i,"\n.lib .el-dialog[data-v-035b2d6b] {\n  position: relative;\n  margin: 0 auto 50px;\n  background: #fff;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 10% !important;\n}\n.lib .grid-content[data-v-035b2d6b] {\n  padding: 10px 0px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: start;\n}\n.lib .item_label[data-v-035b2d6b] {\n  font-size: 14px;\n  padding: 0px 10px;\n  word-break: keep-all;\n  white-space: nowrap;\n}\n",""])},v9hZ:function(t,e,a){var n=a("M8GE");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("XkoO")("62366a68",n,!0)},xAAC:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("E4LH"),i={props:{to_app_type:{type:Array},to_province_type:{type:Array}},data:function(){return{on_submit_loading:!1,visible:!1,isEditable:!0,city_type:[],dataForm:{id:null,sectionNumber:null,provinceId:null,regionId:null,appType:null},dataRule:{sectionNumber:[{required:!0,message:"号码段不能为空",trigger:"blur"},{validator:function(t,e,a){Object(n.f)(e)?a():a(new Error("号码段式不正确"))},trigger:"blur"}],provinceId:[{required:!0,message:"省份不能为空",trigger:"blur"}],regionId:[{required:!0,message:"市不能为空",trigger:"blur"}],appType:[{required:!0,message:"app不能为空",trigger:"blur"}]}}},computed:{},mounted:function(){},methods:{init:function(t){var e=this;this.dataForm.id=null,t&&(this.dataForm.id=t.regionId),this.visible=!0,this.$nextTick(function(){e.$refs.dataForm.resetFields(),t?(e.isEditable=!1,e.get_city_type(t.regionEntity.provinceId),e.dataForm.sectionNumber=t.sectionNumber,e.dataForm.provinceId=t.regionEntity.provinceId,e.dataForm.regionId=t.regionId,e.dataForm.appType=t.appType):(e.isEditable=!0,e.dataForm.sectionNumber=null,e.dataForm.provinceId=null,e.dataForm.regionId=null,e.dataForm.appType=null)})},changeProvince:function(t){this.get_city_type(t),this.dataForm.regionId=null},get_city_type:function(t){var e=this;(new FormData).append("provinceId",t),this.$http({url:this.$http.adornUrl("/manager/region/queryByProvinceId?provinceId="+t),method:"get",data:this.$http.adornParams()}).then(function(t){var a=t.data;e.city_type=a.data}).catch(function(){})},dataFormSubmit:function(){var t=this;this.$refs.dataForm.validate(function(e){e&&(t.on_submit_loading=!0,t.$http({url:t.$http.adornUrl("/manager/sectionNumber/"+(t.dataForm.id?"update":"save")),method:"post",data:t.$http.adornData({sectionNumber:t.dataForm.sectionNumber,provinceId:t.dataForm.provinceId,regionId:t.dataForm.regionId,appType:t.dataForm.appType})}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.visible=!1,t.on_submit_loading=!1,t.$emit("refreshDataList")}}):(t.$message.error(a.msg),t.on_submit_loading=!1)}).catch(function(){t.on_submit_loading=!1}))})}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{staticClass:"lib-add-update",attrs:{title:t.dataForm.id?"编辑":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"号码段",prop:"sectionNumber"}},[a("el-input",{attrs:{disabled:!t.isEditable,placeholder:"请输入号码段",maxlength:"11"},model:{value:t.dataForm.sectionNumber,callback:function(e){t.$set(t.dataForm,"sectionNumber",e)},expression:"dataForm.sectionNumber"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"关联省",prop:"provinceId"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:t.changeProvince},model:{value:t.dataForm.provinceId,callback:function(e){t.$set(t.dataForm,"provinceId",e)},expression:"dataForm.provinceId"}},t._l(t.to_province_type,function(e,n){return a("el-option",{key:n,attrs:{label:e.provinceName,value:e.id}},[t._v(t._s(e.provinceName))])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"关联市",prop:"regionId"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.dataForm.regionId,callback:function(e){t.$set(t.dataForm,"regionId",e)},expression:"dataForm.regionId"}},t._l(t.city_type,function(e,n){return a("el-option",{key:n,attrs:{label:e.regionName,value:e.id}},[t._v(t._s(e.regionName))])}))],1),t._v(" "),a("el-form-item",{attrs:{label:"appType",prop:"appType"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.dataForm.appType,callback:function(e){t.$set(t.dataForm,"appType",e)},expression:"dataForm.appType"}},t._l(t.to_app_type,function(e,n){return a("el-option",{key:n,attrs:{label:e.app,value:e.app}},[t._v(t._s(e.app))])}))],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary",loading:t.on_submit_loading},on:{click:function(e){t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},staticRenderFns:[]};var o=a("46Yf")(i,r,!1,function(t){a("v9hZ")},"data-v-200d92ce",null);e.default=o.exports}});