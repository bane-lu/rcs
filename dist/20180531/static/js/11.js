webpackJsonp([11],{YwCS:function(a,e,t){var r=t("ZfVC");"string"==typeof r&&(r=[[a.i,r,""]]),r.locals&&(a.exports=r.locals);t("XkoO")("0dc838f3",r,!0)},ZfVC:function(a,e,t){(a.exports=t("acE3")(!1)).push([a.i,"\n.el-form-item__label[data-v-677f8ddd] {\n  width: 126px;\n}\n.reddot[data-v-677f8ddd] {\n  width: 70%;\n}\n.redFlag_tip[data-v-677f8ddd] {\n  color: #999;\n  font-size: 12px;\n}\n",""])},h7dz:function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=t("E4LH"),o={data:function(){var a=this,e=function(e,t,r){a.timeCheck?r():r(new Error("起止时间间隔须为24小时以上"))},t=function(e,t,r){a.docTimeCheck?r():r(new Error("文案起止时间间隔须为24小时以上"))};return{enterStatus:!1,app_type:[],on_submit_loading:!1,visible:!1,isEditable:!1,version_type:[],dataForm:{createTime:"",id:"",app:"",appId:"",urlName:"",url:"",version:"",description:"",redFlag:"",adCode:"",minTime:"",maxTime:"",docFlag:!0,docContent:"",docRule:"",docMinTime:"",docMaxTime:"",shareTitle:"",shareContent:"",shareDetails:"",os:["android","iphone"]},androidStatus:!1,iosStatus:!1,timeCheck:!1,docTimeCheck:!1,dataRule:{app:[{required:!0,message:"请选择APP",trigger:"blur"}],urlName:[{required:!0,message:"请输入urlName",trigger:"blur"},{validator:function(a,e,t){Object(r.c)(e)?t():t(new Error("只能输入英文"))},trigger:"blur"}],url:[{required:!0,message:"请输入url地址不能为空",trigger:"blur"},{validator:function(a,e,t){Object(r.g)(e)?t():t(new Error("url格式错误"))},trigger:"blur"}],version:[{required:!0,message:"请输入版本号",trigger:"blur"},{validator:function(a,e,t){Object(r.i)(e)?t():t(new Error("版本格式错误（如:2.4.3)"))},trigger:"blur"}],minTime:[{required:!0,message:"请选择开始时间",trigger:"blur"},{validator:e,trigger:"blur"}],maxTime:[{required:!0,message:"请选择结束时间",trigger:"blur"},{validator:e,trigger:"blur"}],adCode:[{required:!0,message:"请输入识别码",trigger:"blur"},{validator:function(a,e,t){Object(r.e)(e)?t():t(new Error("识别码格式错误（如:20180606)"))},trigger:"blur"}],docContent:[{required:!0,message:"请输入文案文字",trigger:"blur"}],docRule:[{required:!0,message:"请选择展示规则",trigger:"blur"}],docMinTime:[{required:!0,message:"请选择文案开始时间",trigger:"blur"},{validator:t,trigger:"blur"}],docMaxTime:[{required:!0,message:"请选择文案结束时间",trigger:"blur"},{validator:t,trigger:"blur"}],shareTitle:[{required:!1,message:"请输入文案标题",trigger:"blur"}],shareContent:[{required:!1,message:"请输入文案内容",trigger:"blur"}],shareDetails:[{required:!1,message:"请输入文案详情",trigger:"blur"}],os:[{required:!0,message:"请选择系统",trigger:"blur"}]}}},watch:{},computed:{newOS:function(){return this.dataForm.os.join(",")},newDocFlag:function(){return this.dataForm.docFlag?1:0}},created:function(){this.get_app_type()},mounted:function(){this.enterStatus=!0},methods:{url_input:function(){this.dataForm.url=this.dataForm.url.replace(/\s+/g,"")},changeVersion:function(){this.get_version_type(this.dataForm.app,this.newOS),this.dataForm.version=""},redDot_input:function(){},init:function(a){var e=this;this.visible=!0,this.on_submit_loading=!1,this.androidStatus=!1,this.iosStatus=!1,this.$nextTick(function(){e.$refs.dataForm.resetFields(),a?(e.get_version_type(a.app,a.os),e.dataForm.id=a.id,e.$http({url:e.$http.adornUrl("/manager/url/info/"+e.dataForm.id),method:"get"}).then(function(a){var t=a.data;if(t&&0===t.code){e.dataForm.createTime=t.url.createTime,e.dataForm.app=t.url.app,e.dataForm.appId=t.url.managerVersionInfoId,e.dataForm.urlName=t.url.urlName,e.dataForm.url=t.url.url,e.dataForm.version=t.url.version,e.dataForm.description=t.url.description,e.dataForm.redFlag=t.url.redFlag,e.dataForm.adCode=t.url.adCode,e.dataForm.minTime=t.url.minTime,e.dataForm.maxTime=t.url.maxTime,e.timeCheck=!0,1==t.url.docFlag?(e.dataForm.docFlag=!0,e.docTimeCheck=!0):(e.dataForm.docFlag=!1,e.docTimeCheck=!1),e.dataForm.docContent=t.url.docContent,e.dataForm.docRule=t.url.docRule,e.dataForm.docMinTime=t.url.docMinTime,e.dataForm.docMaxTime=t.url.docMaxTime,e.dataForm.shareTitle=t.url.shareTitle,e.dataForm.shareContent=t.url.shareContent,e.dataForm.shareDetails=t.url.shareDetails,e.dataForm.os=t.url.os.split(","),console.log(e.dataForm.version);var r=e;e.dataForm.os.forEach(function(a,e){"android"==a?r.androidStatus=!0:"iphone"==a&&(r.iosStatus=!0)})}}).catch(function(){})):(e.get_version_type("",""),e.dataForm.createTime="",e.dataForm.id="",e.dataForm.app="",e.dataForm.urlName="",e.dataForm.url="",e.dataForm.appId="",e.dataForm.version="",e.dataForm.description="",e.dataForm.redFlag="",e.dataForm.adCode="",e.dataForm.minTime="",e.dataForm.maxTime="",e.dataForm.docFlag=!1,e.dataForm.docContent="",e.dataForm.docRule="",e.dataForm.docMinTime="",e.dataForm.docMaxTime="",e.dataForm.shareTitle="",e.dataForm.shareContent="",e.dataForm.shareDetails="",e.dataForm.os=["android","iphone"],e.androidStatus=!1,e.iosStatus=!1)})},dataFormSubmit:function(){var a=this;this.$refs.dataForm.validate(function(e){if(e){if(a.on_submit_loading=!0,""==a.dataForm.id){var t=a;a.app_type.forEach(function(a,e){a.app==t.dataForm.app&&(t.dataForm.appId=a.id),console.log(t.dataForm.appId)})}var r={createTime:a.dataForm.createTime,id:a.dataForm.id,app:a.dataForm.app,urlName:a.dataForm.urlName,url:a.dataForm.url,managerVersionInfoId:a.dataForm.appId,version:a.dataForm.version,description:a.dataForm.description,redFlag:a.dataForm.redFlag,adCode:a.dataForm.adCode,minTime:a.dataForm.minTime,maxTime:a.dataForm.maxTime,docFlag:a.newDocFlag,docContent:a.dataForm.docContent,docRule:a.dataForm.docRule,docMinTime:a.dataForm.docMinTime,docMaxTime:a.dataForm.docMaxTime,shareTitle:a.dataForm.shareTitle,shareContent:a.dataForm.shareContent,shareDetails:a.dataForm.shareDetails,os:a.newOS};a.$http({url:a.$http.adornUrl("/manager/url/"+(a.dataForm.id?"update":"save")),method:"post",data:a.$http.adornData(r)}).then(function(e){var t=e.data;t&&0===t.code?a.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){a.visible=!1,a.on_submit_loading=!1,a.$emit("refreshDataList")}}):(a.$message.error(t.msg),a.on_submit_loading=!1)}).catch(function(){a.on_submit_loading=!1})}})},showDocument:function(){console.log(this.dataForm.docFlag),this.dataForm.docFlag||(this.dataForm.docContent="",this.dataForm.docRule="",this.dataForm.docMinTime="",this.dataForm.docMaxTime="",this.dataForm.adCode="")},get_app_type:function(){var a=this;this.$http({url:this.$http.adornUrl("/manager/version/getList"),method:"get",data:this.$http.adornParams()}).then(function(e){var t=e.data;a.app_type=t.appList}).catch(function(){})},get_version_type:function(a,e){var t=this;this.$http({url:this.$http.adornUrl("/manager/versioninf/getVersionList"),method:"post",data:this.$http.adornData({app:a,os:e})}).then(function(a){var e=a.data;t.version_type=e.appVersionList}).catch(function(){})},transformTime:function(a){var e=Object(r.a)(this.dataForm.minTime,this.dataForm.maxTime,864e5);return this.timeCheck=!!e,a},transformDocTime:function(a){var e=Object(r.a)(this.dataForm.docMinTime,this.dataForm.docMaxTime,864e5);return this.docTimeCheck=!!e,a}}},i={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("el-dialog",{attrs:{title:a.dataForm.id?"编辑":"新增","close-on-click-modal":!1,visible:a.visible},on:{"update:visible":function(e){a.visible=e}}},[t("el-form",{ref:"dataForm",attrs:{model:a.dataForm,rules:a.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){if(!("button"in e)&&a._k(e.keyCode,"enter",13,e.key))return null;a.dataFormSubmit()}}},[t("el-row",{attrs:{gutter:30}},[t("el-col",{attrs:{span:12}},[t("div",{staticClass:"grid-content"},[t("el-form-item",{attrs:{label:"app",prop:"app","label-width":"100px"}},[t("el-select",{attrs:{placeholder:"请选择",disabled:""!=a.dataForm.id},on:{change:a.changeVersion},model:{value:a.dataForm.app,callback:function(e){a.$set(a.dataForm,"app",e)},expression:"dataForm.app"}},a._l(a.app_type,function(e,r){return t("el-option",{key:r,attrs:{label:e.app,value:e.app}},[a._v(a._s(e.app))])}))],1)],1)]),a._v(" "),t("el-col",{attrs:{span:12}},[t("div",{staticClass:"grid-content"},[t("el-form-item",{attrs:{label:"系统选择",prop:"os","label-width":"100px"}},[t("el-checkbox-group",{on:{change:a.changeVersion},model:{value:a.dataForm.os,callback:function(e){a.$set(a.dataForm,"os",e)},expression:"dataForm.os"}},[t("el-checkbox",{attrs:{label:"android",disabled:a.androidStatus}},[a._v("Android")]),a._v(" "),t("el-checkbox",{attrs:{label:"iphone",disabled:a.iosStatus}},[a._v("IOS")])],1)],1)],1)])],1),a._v(" "),t("el-form-item",{attrs:{label:"版本号",prop:"version","label-width":"100px"}},[t("el-select",{attrs:{placeholder:"请先选择版本号和系统"},model:{value:a.dataForm.version,callback:function(e){a.$set(a.dataForm,"version",e)},expression:"dataForm.version"}},a._l(a.version_type,function(e,r){return t("el-option",{key:r,attrs:{label:e.version,value:e.version}},[a._v(a._s(e.version))])}))],1),a._v(" "),t("el-form-item",{attrs:{label:"urlName",prop:"urlName","label-width":"100px"}},[t("el-input",{attrs:{placeholder:"urlName",maxlength:"64",disabled:""!=a.dataForm.id},model:{value:a.dataForm.urlName,callback:function(e){a.$set(a.dataForm,"urlName",e)},expression:"dataForm.urlName"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"url",prop:"url","label-width":"100px"}},[t("el-input",{attrs:{placeholder:"请输入url",maxlength:"64"},on:{input:a.url_input},model:{value:a.dataForm.url,callback:function(e){a.$set(a.dataForm,"url",e)},expression:"dataForm.url"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"添加描述",prop:"description","label-width":"100px"}},[t("el-input",{attrs:{placeholder:"请输入不超过20个字",maxlength:"20"},model:{value:a.dataForm.description,callback:function(e){a.$set(a.dataForm,"description",e)},expression:"dataForm.description"}})],1),a._v(" "),t("el-row",{attrs:{gutter:10}},[t("el-col",{attrs:{span:10}},[t("div",{staticClass:"grid-content"},[t("el-form-item",{attrs:{label:"有效期选择",prop:"minTime","label-width":"100px"}},[t("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始时间",editable:a.isEditable},on:{change:a.transformTime},model:{value:a.dataForm.minTime,callback:function(e){a.$set(a.dataForm,"minTime",e)},expression:"dataForm.minTime"}})],1)],1)]),a._v(" "),t("el-col",{attrs:{span:10}},[t("div",{staticClass:"grid-content"},[t("el-form-item",{attrs:{label:"-",prop:"maxTime","label-width":"80px"}},[t("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"结束时间",editable:a.isEditable},on:{change:a.transformTime},model:{value:a.dataForm.maxTime,callback:function(e){a.$set(a.dataForm,"maxTime",e)},expression:"dataForm.maxTime"}})],1)],1)])],1),a._v(" "),t("el-form-item",{attrs:{label:"是否显示小红点","label-width":"110px"}},[t("el-input",{staticClass:"reddot",attrs:{placeholder:"是否显示小红点",maxlength:"8"},on:{input:a.redDot_input},model:{value:a.dataForm.redFlag,callback:function(e){a.$set(a.dataForm,"redFlag",e)},expression:"dataForm.redFlag"}}),a._v(" "),t("span",{staticClass:"redFlag_tip"},[a._v("8位数字（年月日）")])],1),a._v(" "),t("el-form-item",{attrs:{label:"文案展示","label-width":"100px"}},[t("el-checkbox",{on:{change:a.showDocument},model:{value:a.dataForm.docFlag,callback:function(e){a.$set(a.dataForm,"docFlag",e)},expression:"dataForm.docFlag"}},[a._v("需要")])],1),a._v(" "),a.dataForm.docFlag?t("el-form-item",{attrs:{label:"文案文字",prop:"docContent","label-width":"100px"}},[t("el-input",{attrs:{placeholder:"文案文字",maxlength:"20"},model:{value:a.dataForm.docContent,callback:function(e){a.$set(a.dataForm,"docContent",e)},expression:"dataForm.docContent"}})],1):a._e(),a._v(" "),a.dataForm.docFlag?t("el-form-item",{attrs:{label:"展示规则",prop:"docRule","label-width":"100px"}},[t("el-radio-group",{model:{value:a.dataForm.docRule,callback:function(e){a.$set(a.dataForm,"docRule",e)},expression:"dataForm.docRule"}},[t("el-radio",{attrs:{label:"0"}},[a._v("一直存在")]),a._v(" "),t("el-radio",{attrs:{label:"1"}},[a._v("点击后消失")])],1)],1):a._e(),a._v(" "),a.dataForm.docFlag?t("el-row",{attrs:{gutter:10}},[t("el-col",{attrs:{span:10}},[t("div",{staticClass:"grid-content"},[t("el-form-item",{attrs:{label:"展示时间",prop:"docMinTime","label-width":"100px"}},[t("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"文案开始时间",editable:a.isEditable},on:{change:a.transformDocTime},model:{value:a.dataForm.docMinTime,callback:function(e){a.$set(a.dataForm,"docMinTime",e)},expression:"dataForm.docMinTime"}})],1)],1)]),a._v(" "),t("el-col",{attrs:{span:10}},[t("div",{staticClass:"grid-content"},[t("el-form-item",{attrs:{label:"-",prop:"docMaxTime"}},[t("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"文案结束时间",editable:a.isEditable},on:{change:a.transformDocTime},model:{value:a.dataForm.docMaxTime,callback:function(e){a.$set(a.dataForm,"docMaxTime",e)},expression:"dataForm.docMaxTime"}})],1)],1)])],1):a._e(),a._v(" "),a.dataForm.docFlag?t("el-form-item",{attrs:{label:"识别码","label-width":"100px",prop:"adCode"}},[t("el-input",{staticClass:"reddot",attrs:{placeholder:"广告后台配置识别码",maxlength:"8"},model:{value:a.dataForm.adCode,callback:function(e){a.$set(a.dataForm,"adCode",e)},expression:"dataForm.adCode"}}),a._v(" "),t("span",{staticClass:"redFlag_tip"},[a._v("8位数字（年月日）")])],1):a._e(),a._v(" "),t("h3",[a._v("分享文案")]),a._v(" "),t("el-form-item",{attrs:{label:"标题",prop:"shareTitle","label-width":"100px"}},[t("el-input",{attrs:{type:"text",placeholder:"0/20",maxlength:"20"},model:{value:a.dataForm.shareTitle,callback:function(e){a.$set(a.dataForm,"shareTitle",e)},expression:"dataForm.shareTitle"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"内容",prop:"shareContent","label-width":"100px"}},[t("el-input",{attrs:{placeholder:"0/30",maxlength:"30"},model:{value:a.dataForm.shareContent,callback:function(e){a.$set(a.dataForm,"shareContent",e)},expression:"dataForm.shareContent"}})],1),a._v(" "),t("el-form-item",{attrs:{label:"详情",prop:"shareDetails","label-width":"100px"}},[t("el-input",{attrs:{placeholder:"0/50",maxlength:"50"},model:{value:a.dataForm.shareDetails,callback:function(e){a.$set(a.dataForm,"shareDetails",e)},expression:"dataForm.shareDetails"}})],1)],1),a._v(" "),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:function(e){a.visible=!1}}},[a._v("取消")]),a._v(" "),t("el-button",{attrs:{type:"primary",loading:a.on_submit_loading},on:{click:function(e){a.dataFormSubmit()}}},[a._v("确定")])],1)],1)},staticRenderFns:[]};var d=t("46Yf")(o,i,!1,function(a){t("YwCS")},"data-v-677f8ddd",null);e.default=d.exports}});