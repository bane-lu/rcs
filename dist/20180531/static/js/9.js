webpackJsonp([9],{BlAy:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("E4LH"),n={props:{to_app_type:{type:Array}},data:function(){return{on_submit_loading:!1,visible:!1,dataForm:{id:null,createBy:null,managerVersionId:null,version:null,status:null,os:[],remark:null,createTime:null,updateTime:null},dataRule:{managerVersionId:[{required:!0,message:"APP不能为空",trigger:"blur"}],version:[{required:!0,message:"版本不能为空",trigger:"blur"},{validator:function(e,t,a){Object(r.h)(t)?a():a(new Error("版本号格式不正确"))},trigger:"blur"}],status:[{required:!0,message:"状态不能为空",trigger:"blur"}],os:[{required:!0,message:"系统不能为空",trigger:"blur"}]}}},computed:{newOS:function(){return this.dataForm.os.join(",")}},mounted:function(){},methods:{init:function(e){var t=this;this.dataForm.id=null,e&&(this.dataForm.id=e.id),console.log(this.dataForm.id),this.visible=!0,this.$nextTick(function(){t.$refs.dataForm.resetFields(),e||(t.dataForm.createBy=null,t.dataForm.createTime=null,t.dataForm.id=null,t.dataForm.managerVersionId=null,t.dataForm.os=[],t.dataForm.remark=null,t.dataForm.status=null,t.dataForm.updateTime=null,t.dataForm.version=null)})},versionHandleChange:function(){},dataFormSubmit:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&(e.on_submit_loading=!0,e.$http({url:e.$http.adornUrl("/manager/versioninf/copyasnew"),method:"post",data:e.$http.adornData({createBy:e.dataForm.createBy,createTime:e.dataForm.createTime,id:e.dataForm.id,managerVersionId:e.dataForm.managerVersionId,os:e.newOS,remark:e.dataForm.remark,status:e.dataForm.status,updateTime:e.dataForm.updateTime,version:e.dataForm.version})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.on_submit_loading=!1,e.$emit("refreshDataList")}}):(e.$message.error(a.msg),e.on_submit_loading=!1)}).catch(function(){e.on_submit_loading=!1}))})}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{id:"copy-panel",title:e.复制新增,"close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"☆"}},[a("span",{staticClass:"title"},[e._v("请选择您要复制的版本号信息")])]),e._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-cascader",{attrs:{options:e.options},on:{change:e.versionHandleChange},model:{value:e.version,callback:function(t){e.version=t},expression:"version"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"☆"}},[a("span",{staticClass:"title"},[e._v("请输入您要创建的版本号")])]),e._v(" "),a("el-form-item",{attrs:{label:"",prop:"version"}},[a("el-input",{attrs:{placeholder:"新的版本号",maxlength:"20"},model:{value:e.dataForm.version,callback:function(t){e.$set(e.dataForm,"version",t)},expression:"dataForm.version"}})],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.on_submit_loading},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},staticRenderFns:[]};var i=a("46Yf")(n,o,!1,function(e){a("CUK4")},null,null);t.default=i.exports},CUK4:function(e,t,a){var r=a("MROs");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("XkoO")("29be0ec8",r,!0)},MROs:function(e,t,a){(e.exports=a("acE3")(!1)).push([e.i,"\n#copy-panel .el-form-item__content {\n  line-height: 40px;\n  position: relative;\n  font-size: 18px;\n  color: #999;\n}\n",""])}});