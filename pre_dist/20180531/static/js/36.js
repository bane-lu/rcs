webpackJsonp([36],{wFwb:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t("E4LH"),o={props:{to_app_type:{type:Array}},data:function(){return{on_submit_loading:!1,visible:!1,isEditable:!0,dataForm:{id:null,createBy:null,appId:null,version:null,status:null,os:[],remark:null,createTime:null,updateTime:null},dataRule:{appId:[{required:!0,message:"APP不能为空",trigger:"blur"}],version:[{required:!0,message:"版本不能为空",trigger:"blur"},{validator:function(a,e,t){Object(r.j)(e)?t():t(new Error("版本号格式不正确"))},trigger:"blur"}],status:[{required:!0,message:"状态不能为空",trigger:"blur"}],os:[{required:!0,message:"系统不能为空",trigger:"blur"}]}}},computed:{newOS:function(){return this.dataForm.os.join(",")}},mounted:function(){},methods:{init:function(a){var e=this;this.dataForm.id=null,a&&(this.dataForm.id=a.id),this.visible=!0,this.$nextTick(function(){e.$refs.dataForm.resetFields(),a?(e.isEditable=!0,e.dataForm.createBy=a.createBy,e.dataForm.createTime=a.createTime,e.dataForm.id=a.id,e.dataForm.appId=a.managerVersionId,e.dataForm.os.push(a.os),e.dataForm.remark=a.remark,e.dataForm.status=a.status,e.dataForm.updateTime=a.updateTime,e.dataForm.version=a.version):(e.isEditable=!1,e.dataForm.createBy=null,e.dataForm.createTime=null,e.dataForm.id=null,e.dataForm.appId=null,e.dataForm.os=[],e.dataForm.remark=null,e.dataForm.status=null,e.dataForm.updateTime=null,e.dataForm.version=null)})},dataFormSubmit:function(){var a=this;console.log(this.dataForm),this.$refs.dataForm.validate(function(e){e&&(a.on_submit_loading=!0,a.$http({url:a.$http.adornUrl("/manager/versioninf/"+(a.dataForm.id?"update":"save")),method:"post",data:a.$http.adornData({createBy:a.dataForm.createBy,createTime:a.dataForm.createTime,id:a.dataForm.id,managerVersionId:a.dataForm.appId,os:a.newOS,remark:a.dataForm.remark,status:a.dataForm.status,updateTime:a.dataForm.updateTime,version:a.dataForm.version})}).then(function(e){var t=e.data;t&&0===t.code?a.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){a.visible=!1,a.on_submit_loading=!1,a.$emit("refreshDataList")}}):(a.$message.error(t.msg),a.on_submit_loading=!1)}).catch(function(){a.on_submit_loading=!1}))})}}},i={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("el-dialog",{attrs:{title:a.dataForm.id?"编辑":"新增","close-on-click-modal":!1,visible:a.visible},on:{"update:visible":function(e){a.visible=e}}},[t("el-form",{ref:"dataForm",attrs:{model:a.dataForm,rules:a.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){if(!("button"in e)&&a._k(e.keyCode,"enter",13,e.key))return null;a.dataFormSubmit()}}},[t("el-form-item",{attrs:{label:"APP",prop:"appId"}},[t("el-select",{attrs:{placeholder:"请选择",disabled:a.isEditable},model:{value:a.dataForm.appId,callback:function(e){a.$set(a.dataForm,"appId",e)},expression:"dataForm.appId"}},a._l(a.to_app_type,function(e,r){return t("el-option",{key:r,attrs:{label:e.app,value:e.id}},[a._v(a._s(e.app))])}))],1),a._v(" "),t("el-form-item",{attrs:{label:"版本号",prop:"version"}},[t("el-input",{attrs:{placeholder:"请输入版本号",maxlength:"20"},model:{value:a.dataForm.version,callback:function(e){a.$set(a.dataForm,"version",e)},expression:"dataForm.version"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"描述",prop:"remark"}},[t("el-input",{attrs:{placeholder:"请输入相关描述",maxlength:"200"},model:{value:a.dataForm.remark,callback:function(e){a.$set(a.dataForm,"remark",e)},expression:"dataForm.remark"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"系统",prop:"os"}},[t("el-checkbox-group",{model:{value:a.dataForm.os,callback:function(e){a.$set(a.dataForm,"os",e)},expression:"dataForm.os"}},[t("el-checkbox",{attrs:{label:"android",disabled:a.isEditable}},[a._v("android")]),a._v(" "),t("el-checkbox",{attrs:{label:"iphone",disabled:a.isEditable}},[a._v("iphone")])],1)],1)],1),a._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){a.visible=!1}}},[a._v("取消")]),a._v(" "),t("el-button",{attrs:{type:"primary",loading:a.on_submit_loading},on:{click:function(e){a.dataFormSubmit()}}},[a._v("确定")])],1)],1)},staticRenderFns:[]},l=t("VU/8")(o,i,!1,null,null,null);e.default=l.exports}});