webpackJsonp([25],{"/z5T":function(e,t,r){var a=r("QSDl");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r("XkoO")("1de890af",a,!0)},"8eTW":function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("MVSX"),o={data:function(){return{pickerBeginDateBefore:{disabledDate:function(e){return e.getTime()<Date.now()-864e5}},form:{title:"",body:"",url:"",pushType:"0",date:"",fileList:[],numberTag:""},invalidNums:0,validNums:0,showDialog:!1,header:{token:a.default.cookie.get("token")},rules:{title:[{required:!0,message:"请输入标题",trigger:"blur"}],body:[{required:!0,message:"请输入内容",trigger:"blur"}],url:[{required:!0,message:"请输入url",trigger:"blur"}],date:[{required:!0,message:"请选择时间",trigger:"blur"}]}}},methods:{submitUpload:function(){var e=this;this.$refs.form.validate(function(t){if(!t)return!1;e.$http({contentType:"application/json",url:e.$http.adornUrl("/iospush/pushMessageConf/createPushMessageConf"),method:"post",data:e.$http.adornData({title:e.form.title,body:e.form.body,url:e.form.url,pushType:e.form.pushType,pushStartDate:e.form.date[0],pushEndDate:e.form.date[1],numberTag:e.form.numberTag})}).then(function(t){var r=t.data;if(0!==r.code)return e.$message({type:"error",message:r.msg}),!1;e.form.fileList=[],e.$router.replace({name:"MessagePush"}),e.showDialog=!1,e.$refs.form.resetFields()}).catch(function(){})})},cancel:function(){var e=this;this.$confirm("确定放弃已编写内容？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.$router.replace({name:"MessagePush"}),e.$refs.form.resetFields()}).catch(function(e){})},beforeAvatarUpload:function(e){var t="application/vnd.ms-excel"===e.type;return t||this.$message.error("上传文件只能是 csv 格式!"),t},fileSuccess:function(e){0===e.code?(this.form.numberTag=e.numberTag,this.validNums=e.validNums,this.invalidNums=e.invalidNums,this.showDialog=!0,this.$message({type:"success",message:"文件上传成功"})):this.$message({type:"error",message:e.msg})},fileRemove:function(){this.showDialog=!1}}},s={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"fullQuantity"}},[r("p",[e._v(" 新建消息推送")]),e._v(" "),r("div",{staticClass:"formContent"},[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",rules:e.rules}},[r("el-form-item",{attrs:{label:"主标题",prop:"title"}},[r("el-input",{attrs:{maxlength:"20"},model:{value:e.form.title,callback:function(t){e.$set(e.form,"title",t)},expression:"form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"内容",prop:"body"}},[r("el-input",{attrs:{type:"textarea",maxlength:"50"},model:{value:e.form.body,callback:function(t){e.$set(e.form,"body",t)},expression:"form.body"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"URL",prop:"url"}},[r("el-input",{model:{value:e.form.url,callback:function(t){e.$set(e.form,"url",t)},expression:"form.url"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"推送机制"}},[r("el-radio-group",{model:{value:e.form.pushType,callback:function(t){e.$set(e.form,"pushType",t)},expression:"form.pushType"}},[r("el-radio",{attrs:{label:"0"}},[e._v("全量")]),e._v(" "),r("el-radio",{attrs:{label:"1"}},[e._v("指定号码")])],1)],1),e._v(" "),"0"===e.form.pushType?r("el-form-item",{attrs:{label:"时间参数",prop:"date"}},[r("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd 00:00:00",type:"datetimerange","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":["00:00:00","00:00:00"],"picker-options":e.pickerBeginDateBefore},model:{value:e.form.date,callback:function(t){e.$set(e.form,"date",t)},expression:"form.date"}})],1):r("el-form-item",{attrs:{label:"导入号码"}},[r("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"http://221.176.34.113:8761/web-manager/iospush/pushMessageConf/numberFileUpload","on-success":e.fileSuccess,headers:e.header,"on-remove":e.fileRemove,limit:1,"file-list":e.form.fileList,"before-upload":e.beforeAvatarUpload}},[r("el-button",{attrs:{slot:"trigger",size:"small"},slot:"trigger"},[e._v("选取文件")]),e._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:e.showDialog,expression:"showDialog"}],staticStyle:{float:"right"}},[r("span",[e._v("有效号码："+e._s(e.validNums))]),e._v(" "),r("span",{staticStyle:{color:"red","margin-left":"15px"}},[e._v("无效号码："+e._s(e.invalidNums))])])],1)],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.submitUpload}},[e._v("确认推送")]),e._v(" "),r("el-button",{on:{click:e.cancel}},[e._v("取消")])],1)],1)],1)])},staticRenderFns:[]};var l=r("46Yf")(o,s,!1,function(e){r("/z5T")},"data-v-dfbd848e",null);t.default=l.exports},QSDl:function(e,t,r){(e.exports=r("acE3")(!1)).push([e.i,"\n#fullQuantity p[data-v-dfbd848e] {\n  margin: 0;\n  padding: 0;\n  color: #909399;\n  font-size: 18px;\n  border-left: 4px  solid #909399;\n  padding-left: 10px;\n  line-height: 22px;\n  margin-bottom: 28px;\n}\n#fullQuantity .formContent[data-v-dfbd848e] {\n  width: 60%;\n}\n",""])}});