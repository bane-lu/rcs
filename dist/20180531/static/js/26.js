webpackJsonp([26],{INRw:function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("E4LH"),o={data:function(){return{on_submit_loading:!1,visible:!1,dataForm:{id:0,paramApp:null,paramDes:null,paramStatus:null},dataRule:{paramApp:[{required:!0,message:"APP不能为空",trigger:"blur"},{validator:function(a,t,e){Object(r.c)(t)?e():e(new Error("只能输入英字"))},trigger:"blur"}],paramDes:[{required:!0,message:"描述不能为空",trigger:"blur"},{validator:function(a,t,e){Object(r.h)(t)?e():e(new Error("不能输入特殊字符"))},trigger:"blur"}],paramStatus:[{required:!0,message:"请选择一种状态",trigger:"blur"}]}}},methods:{init:function(a){var t=this;this.$nextTick(function(){t.visible=!0,t.dataForm.paramApp=null,t.dataForm.paramDes=null,t.dataForm.paramStatus=null})},dataFormSubmit:function(){var a=this;this.$refs.dataForm.validate(function(t){t&&(a.on_submit_loading=!0,a.$http({url:a.$http.adornUrl("/manager/version/save"),method:"post",data:a.$http.adornData({id:a.dataForm.id,app:a.dataForm.paramApp,description:a.dataForm.paramDes,status:a.dataForm.paramStatus})}).then(function(t){var e=t.data;e&&0===e.code?a.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){a.visible=!1,a.on_submit_loading=!1,a.$emit("refreshDataList")}}):(a.$message.error(e.msg),a.on_submit_loading=!1)}).catch(function(){a.on_submit_loading=!1}))})}}},l={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("el-dialog",{attrs:{title:a.dataForm.id?"编辑":"新增","close-on-click-modal":!1,visible:a.visible},on:{"update:visible":function(t){a.visible=t}}},[e("el-form",{ref:"dataForm",attrs:{model:a.dataForm,rules:a.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){if(!("button"in t)&&a._k(t.keyCode,"enter",13,t.key))return null;a.dataFormSubmit()}}},[e("el-form-item",{attrs:{label:"APP",prop:"paramApp"}},[e("el-input",{attrs:{placeholder:"APP",maxlength:"20"},model:{value:a.dataForm.paramApp,callback:function(t){a.$set(a.dataForm,"paramApp",t)},expression:"dataForm.paramApp"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"描述",prop:"paramDes"}},[e("el-input",{attrs:{placeholder:"描述",maxlength:"20"},model:{value:a.dataForm.paramDes,callback:function(t){a.$set(a.dataForm,"paramDes",t)},expression:"dataForm.paramDes"}})],1),a._v(" "),e("el-form-item",{attrs:{label:"状态",prop:"paramStatus"}},[e("el-radio-group",{model:{value:a.dataForm.paramStatus,callback:function(t){a.$set(a.dataForm,"paramStatus",t)},expression:"dataForm.paramStatus"}},[e("el-radio",{attrs:{label:"1"}},[a._v("启用")]),a._v(" "),e("el-radio",{attrs:{label:"0"}},[a._v("禁用")])],1)],1)],1),a._v(" "),e("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[e("el-button",{on:{click:function(t){a.visible=!1}}},[a._v("取消")]),a._v(" "),e("el-button",{attrs:{type:"primary",loading:a.on_submit_loading},on:{click:function(t){a.dataFormSubmit()}}},[a._v("确定")])],1)],1)},staticRenderFns:[]},i=e("46Yf")(o,l,!1,null,null,null);t.default=i.exports}});