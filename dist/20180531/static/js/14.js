webpackJsonp([14],{M8GE:function(e,t,a){(e.exports=a("acE3")(!1)).push([e.i,"\n.lib-add-update .el-select[data-v-200d92ce] {\n  width: 100%;\n  display: inline-block;\n  position: relative;\n}\n",""])},v9hZ:function(e,t,a){var o=a("M8GE");"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a("XkoO")("62366a68",o,!0)},xAAC:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("E4LH"),r={props:{to_app_type:{type:Array},to_province_type:{type:Array}},data:function(){return{on_submit_loading:!1,visible:!1,isEditable:!0,city_type:[],dataForm:{id:null,sectionNumber:null,provinceId:null,regionId:null,appType:null},dataRule:{sectionNumber:[{required:!0,message:"号码段不能为空",trigger:"blur"},{validator:function(e,t,a){Object(o.f)(t)?a():a(new Error("号码段式不正确"))},trigger:"blur"}],provinceId:[{required:!0,message:"省份不能为空",trigger:"blur"}],regionId:[{required:!0,message:"市不能为空",trigger:"blur"}],appType:[{required:!0,message:"app不能为空",trigger:"blur"}]}}},computed:{},mounted:function(){},methods:{init:function(e){var t=this;this.dataForm.id=null,e&&(this.dataForm.id=e.regionId),this.visible=!0,this.$nextTick(function(){t.$refs.dataForm.resetFields(),e?(t.isEditable=!1,t.get_city_type(e.regionEntity.provinceId),t.dataForm.sectionNumber=e.sectionNumber,t.dataForm.provinceId=e.regionEntity.provinceId,t.dataForm.regionId=e.regionId,t.dataForm.appType=e.appType):(t.isEditable=!0,t.dataForm.sectionNumber=null,t.dataForm.provinceId=null,t.dataForm.regionId=null,t.dataForm.appType=null)})},changeProvince:function(e){this.get_city_type(e),this.dataForm.regionId=null},get_city_type:function(e){var t=this;(new FormData).append("provinceId",e),this.$http({url:this.$http.adornUrl("/manager/region/queryByProvinceId?provinceId="+e),method:"get",data:this.$http.adornParams()}).then(function(e){var a=e.data;t.city_type=a.data}).catch(function(){})},dataFormSubmit:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&(e.on_submit_loading=!0,e.$http({url:e.$http.adornUrl("/manager/sectionNumber/"+(e.dataForm.id?"update":"save")),method:"post",data:e.$http.adornData({sectionNumber:e.dataForm.sectionNumber,provinceId:e.dataForm.provinceId,regionId:e.dataForm.regionId,appType:e.dataForm.appType})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.on_submit_loading=!1,e.$emit("refreshDataList")}}):(e.$message.error(a.msg),e.on_submit_loading=!1)}).catch(function(){e.on_submit_loading=!1}))})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{staticClass:"lib-add-update",attrs:{title:e.dataForm.id?"编辑":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"号码段",prop:"sectionNumber"}},[a("el-input",{attrs:{disabled:!e.isEditable,placeholder:"请输入号码段",maxlength:"7"},model:{value:e.dataForm.sectionNumber,callback:function(t){e.$set(e.dataForm,"sectionNumber",t)},expression:"dataForm.sectionNumber"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"关联省",prop:"provinceId"}},[a("el-select",{attrs:{placeholder:"请选择"},on:{change:e.changeProvince},model:{value:e.dataForm.provinceId,callback:function(t){e.$set(e.dataForm,"provinceId",t)},expression:"dataForm.provinceId"}},e._l(e.to_province_type,function(t,o){return a("el-option",{key:o,attrs:{label:t.provinceName,value:t.id}},[e._v(e._s(t.provinceName))])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"关联市",prop:"regionId"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.dataForm.regionId,callback:function(t){e.$set(e.dataForm,"regionId",t)},expression:"dataForm.regionId"}},e._l(e.city_type,function(t,o){return a("el-option",{key:o,attrs:{label:t.regionName,value:t.id}},[e._v(e._s(t.regionName))])}))],1),e._v(" "),a("el-form-item",{attrs:{label:"appType",prop:"appType"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.dataForm.appType,callback:function(t){e.$set(e.dataForm,"appType",t)},expression:"dataForm.appType"}},e._l(e.to_app_type,function(t,o){return a("el-option",{key:o,attrs:{label:t.app,value:t.app}},[e._v(e._s(t.app))])}))],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.on_submit_loading},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},staticRenderFns:[]};var n=a("46Yf")(r,i,!1,function(e){a("v9hZ")},"data-v-200d92ce",null);t.default=n.exports}});