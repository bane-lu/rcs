webpackJsonp([2,7],{"+Lkn":function(e,t,a){(e.exports=a("acE3")(!1)).push([e.i,'\n@charset "UTF-8";\n.grid-content[data-v-6249ec49] {\n  padding: 10px 0px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: start;\n}\n.item_label[data-v-6249ec49] {\n  font-size: 14px;\n  padding: 0px 10px;\n  word-break: keep-all;\n  white-space: nowrap;\n}\n.date_picker[data-v-6249ec49] {\n  margin-right: 10px;\n}\n/* 时间选择框 */\n.el-date-editor--daterange.el-input[data-v-6249ec49], .el-date-editor--daterange.el-input__inner[data-v-6249ec49], .el-date-editor--timerange.el-input[data-v-6249ec49], .el-date-editor--timerange.el-input__inner[data-v-6249ec49] {\n  width: 360px;\n}\n',""])},UnYO:function(e,t,a){(e.exports=a("acE3")(!1)).push([e.i,"\n.el-form-item__label[data-v-051b071e] {\n  width: 126px;\n}\n.reddot[data-v-051b071e] {\n  width: 70%;\n}\n.redFlag_tip[data-v-051b071e] {\n  color: #999;\n  font-size: 12px;\n}\n",""])},Wt9J:function(e,t,a){var r=a("+Lkn");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("XkoO")("bbc02c00",r,!0)},h7dz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("E4LH"),i={data:function(){var e=this,t=function(t,a,r){e.timeCheck?r():r(new Error("起止时间间隔须为24小时以上"))},a=function(t,a,r){e.docTimeCheck?r():r(new Error("文案起止时间间隔须为24小时以上"))};return{app_type:[],on_submit_loading:!1,visible:!1,isEditable:!1,dataForm:{id:"",app:"",urlName:"",url:"",version:"",description:"",redFlag:"",minTime:"",maxTime:"",docFlag:!0,docContent:"",docRule:"",docMinTime:"",docMaxTime:"",shareTitle:"",shareContent:"",shareDetails:"",os:[]},pickerOptions0:{disabledDate:function(e){return e.getTime()>Date.now()}},pickerOptions1:{disabledDate:function(t){return t.getTime()<e.dataForm.minTime||t.getTime()>Date.now()}},timeCheck:!1,docTimeCheck:!1,dataRule:{app:[{required:!0,message:"请选择APP",trigger:"blur"}],urlName:[{required:!0,message:"请输入urlName",trigger:"blur"},{validator:function(e,t,a){Object(r.b)(t)?a():a(new Error("只能输入汉字"))},trigger:"blur"}],url:[{required:!0,message:"请输入url地址不能为空",trigger:"blur"},{validator:function(e,t,a){Object(r.f)(t)?a():a(new Error("url格式错误"))},trigger:"blur"}],version:[{required:!0,message:"请输入版本号",trigger:"blur"},{validator:function(e,t,a){Object(r.h)(t)?a():a(new Error("版本格式错误（如:2.4.3)"))},trigger:"blur"}],minTime:[{required:!0,message:"请选择开始时间",trigger:"blur"},{validator:t,trigger:"blur"}],maxTime:[{required:!0,message:"请选择结束时间",trigger:"blur"},{validator:t,trigger:"blur"}],docContent:[{required:!0,message:"请输入文案文字",trigger:"blur"}],docRule:[{required:!0,message:"请选择展示规则",trigger:"blur"}],docMinTime:[{required:!0,message:"请选择文案开始时间",trigger:"blur"},{validator:a,trigger:"blur"}],docMaxTime:[{required:!0,message:"请选择文案结束时间",trigger:"blur"},{validator:a,trigger:"blur"}],shareTitle:[{required:!0,message:"请输入文案标题",trigger:"blur"}],shareContent:[{required:!0,message:"请输入文案内容",trigger:"blur"}],shareDetails:[{required:!0,message:"请输入文案详情",trigger:"blur"}],os:[{required:!0,message:"请选择系统",trigger:"blur"}]}}},computed:{newOS:function(){return this.dataForm.os.join(",")},newDocFlag:function(){return this.dataForm.docFlag?1:0}},created:function(){this.get_app_type()},methods:{url_input:function(){this.dataForm.url=this.dataForm.url.replace(/\s+/g,"")},redDot_input:function(){console.log(this.dataForm.redFlag)},init:function(e){var t=this;this.visible=!0,this.on_submit_loading=!1,this.$nextTick(function(){t.$refs.dataForm.resetFields(),e?(t.dataForm.id=e.id,t.$http({url:t.$http.adornUrl("/manager/url/info/"+t.dataForm.id),method:"get"}).then(function(e){var a=e.data;a&&0===a.code&&(t.dataForm.app=a.url.app,t.dataForm.urlName=a.url.urlName,t.dataForm.url=a.url.url,t.dataForm.version=a.url.version,t.dataForm.description=a.url.description,t.dataForm.redFlag=a.url.redFlag,t.dataForm.minTime=a.url.minTime,t.dataForm.maxTime=a.url.maxTime,t.timeCheck=!0,1==a.url.docFlag?(console.log(1212),t.dataForm.docFlag=!0,t.docTimeCheck=!0):(console.log(4545),t.dataForm.docFlag=!1,t.docTimeCheck=!1),t.dataForm.docContent=a.url.docContent,t.dataForm.docRule=a.url.docRule,t.dataForm.docMinTime=a.url.docMinTime,t.dataForm.docMaxTime=a.url.docMaxTime,t.dataForm.shareTitle=a.url.shareTitle,t.dataForm.shareContent=a.url.shareContent,t.dataForm.shareDetails=a.url.shareDetails,t.dataForm.os=a.url.os.split("-"))}).catch(function(){})):(t.dataForm.id="",t.dataForm.app="",t.dataForm.urlName="",t.dataForm.url="",t.dataForm.version="",t.dataForm.description="",t.dataForm.redFlag="",t.dataForm.minTime="",t.dataForm.maxTime="",t.dataForm.docFlag=!1,t.dataForm.docContent="",t.dataForm.docRule="",t.dataForm.docMinTime="",t.dataForm.docMaxTime="",t.dataForm.shareTitle="",t.dataForm.shareContent="",t.dataForm.shareDetails="",t.dataForm.os=[])})},dataFormSubmit:function(){var e=this;this.$refs.dataForm.validate(function(t){if(t){e.on_submit_loading=!0;var a={id:e.dataForm.id,app:e.dataForm.app,urlName:e.dataForm.urlName,url:e.dataForm.url,version:e.dataForm.version,description:e.dataForm.description,redFlag:e.dataForm.redFlag,minTime:e.dataForm.minTime,maxTime:e.dataForm.maxTime,docFlag:e.newDocFlag,docContent:e.dataForm.docContent,docRule:e.dataForm.docRule,docMinTime:e.dataForm.docMinTime,docMaxTime:e.dataForm.docMaxTime,shareTitle:e.dataForm.shareTitle,shareContent:e.dataForm.shareContent,shareDetails:e.dataForm.shareDetails,os:e.newOS};e.$http({url:e.$http.adornUrl("/manager/url/"+(e.dataForm.id?"update":"save")),method:"post",data:e.$http.adornData(a)}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.on_submit_loading=!0,e.$emit("refreshDataList")}}):(e.$message.error(a.msg),e.on_submit_loading=!0)}).catch(function(){e.on_submit_loading=!0})}})},showDocument:function(){console.log(this.dataForm.docFlag),this.dataForm.docFlag||(this.dataForm.docContent="",this.dataForm.docRule="",this.dataForm.docMinTime="",this.dataForm.docMaxTime="")},get_app_type:function(){var e=this;this.$http({url:this.$http.adornUrl("/manager/version/getList"),method:"get",data:this.$http.adornParams()}).then(function(t){var a=t.data;e.app_type=a.appList}).catch(function(){})},transformTime:function(e){var t=Object(r.a)(this.dataForm.minTime,this.dataForm.maxTime,864e5);return this.timeCheck=!!t,e},transformDocTime:function(e){var t=Object(r.a)(this.dataForm.docMinTime,this.dataForm.docMaxTime,864e5);return this.docTimeCheck=!!t,e}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dataForm.id?"编辑":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.dataFormSubmit()}}},[a("el-row",{attrs:{gutter:30}},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"app",prop:"app","label-width":"100px"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:""!=e.dataForm.id},model:{value:e.dataForm.app,callback:function(t){e.$set(e.dataForm,"app",t)},expression:"dataForm.app"}},e._l(e.app_type,function(t,r){return a("el-option",{key:r,attrs:{label:t.app,value:t.app}},[e._v(e._s(t.app))])}))],1)],1)]),e._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"urlName",prop:"urlName","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"urlName",maxlength:"8",disabled:""!=e.dataForm.id},model:{value:e.dataForm.urlName,callback:function(t){e.$set(e.dataForm,"urlName",t)},expression:"dataForm.urlName"}})],1)],1)])],1),e._v(" "),a("el-form-item",{attrs:{label:"url",prop:"url","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"请输入url",maxlength:"64"},on:{input:e.url_input},model:{value:e.dataForm.url,callback:function(t){e.$set(e.dataForm,"url",t)},expression:"dataForm.url"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"版本号",prop:"version","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"2.4.3"},model:{value:e.dataForm.version,callback:function(t){e.$set(e.dataForm,"version",t)},expression:"dataForm.version"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"添加描述",prop:"description","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"请输入不超过20个字",maxlength:"20"},model:{value:e.dataForm.description,callback:function(t){e.$set(e.dataForm,"description",t)},expression:"dataForm.description"}})],1),e._v(" "),a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"有效期选择",prop:"minTime","label-width":"100px"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始时间",editable:e.isEditable,"picker-options":e.pickerOptions0},on:{change:e.transformTime},model:{value:e.dataForm.minTime,callback:function(t){e.$set(e.dataForm,"minTime",t)},expression:"dataForm.minTime"}})],1)],1)]),e._v(" "),a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"-",prop:"maxTime","label-width":"80px"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"结束时间",editable:e.isEditable,"picker-options":e.pickerOptions1},on:{change:e.transformTime},model:{value:e.dataForm.maxTime,callback:function(t){e.$set(e.dataForm,"maxTime",t)},expression:"dataForm.maxTime"}})],1)],1)])],1),e._v(" "),a("el-form-item",{attrs:{label:"是否显示小红点","label-width":"110px"}},[a("el-input",{staticClass:"reddot",attrs:{placeholder:"是否显示小红点",maxlength:"8"},on:{input:e.redDot_input},model:{value:e.dataForm.redFlag,callback:function(t){e.$set(e.dataForm,"redFlag",t)},expression:"dataForm.redFlag"}}),e._v(" "),a("span",{staticClass:"redFlag_tip"},[e._v("8位数字（年月日）")])],1),e._v(" "),a("el-form-item",{attrs:{label:"文案展示","label-width":"100px"}},[a("el-checkbox",{on:{change:e.showDocument},model:{value:e.dataForm.docFlag,callback:function(t){e.$set(e.dataForm,"docFlag",t)},expression:"dataForm.docFlag"}},[e._v("需要")])],1),e._v(" "),e.dataForm.docFlag?a("el-form-item",{attrs:{label:"文案文字",prop:"docContent","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"文案文字",maxlength:"5"},model:{value:e.dataForm.docContent,callback:function(t){e.$set(e.dataForm,"docContent",t)},expression:"dataForm.docContent"}})],1):e._e(),e._v(" "),e.dataForm.docFlag?a("el-form-item",{attrs:{label:"展示规则",prop:"docRule","label-width":"100px"}},[a("el-radio-group",{model:{value:e.dataForm.docRule,callback:function(t){e.$set(e.dataForm,"docRule",t)},expression:"dataForm.docRule"}},[a("el-radio",{attrs:{label:"0"}},[e._v("一直存在")]),e._v(" "),a("el-radio",{attrs:{label:"1"}},[e._v("点击后消失")])],1)],1):e._e(),e._v(" "),e.dataForm.docFlag?a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"展示时间",prop:"docMinTime","label-width":"100px"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"文案开始时间",editable:e.isEditable,"picker-options":e.pickerOptions0},on:{change:e.transformDocTime},model:{value:e.dataForm.docMinTime,callback:function(t){e.$set(e.dataForm,"docMinTime",t)},expression:"dataForm.docMinTime"}})],1)],1)]),e._v(" "),a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"-",prop:"docMaxTime"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"文案结束时间",editable:e.isEditable,"picker-options":e.pickerOptions1},on:{change:e.transformDocTime},model:{value:e.dataForm.docMaxTime,callback:function(t){e.$set(e.dataForm,"docMaxTime",t)},expression:"dataForm.docMaxTime"}})],1)],1)])],1):e._e(),e._v(" "),a("h3",[e._v("分享文案")]),e._v(" "),a("el-form-item",{attrs:{label:"标题",prop:"shareTitle","label-width":"100px"}},[a("el-input",{attrs:{type:"text",placeholder:"0/20",maxlength:"20"},model:{value:e.dataForm.shareTitle,callback:function(t){e.$set(e.dataForm,"shareTitle",t)},expression:"dataForm.shareTitle"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"内容",prop:"shareContent","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"0/30",maxlength:"30"},model:{value:e.dataForm.shareContent,callback:function(t){e.$set(e.dataForm,"shareContent",t)},expression:"dataForm.shareContent"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"详情",prop:"shareDetails","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"0/50",maxlength:"50"},model:{value:e.dataForm.shareDetails,callback:function(t){e.$set(e.dataForm,"shareDetails",t)},expression:"dataForm.shareDetails"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"系统选择",prop:"os","label-width":"100px"}},[a("el-checkbox-group",{attrs:{disabled:""!=e.dataForm.id},model:{value:e.dataForm.os,callback:function(t){e.$set(e.dataForm,"os",t)},expression:"dataForm.os"}},[a("el-checkbox",{attrs:{label:"1"}},[e._v("IOS")]),e._v(" "),a("el-checkbox",{attrs:{label:"2"}},[e._v("Android")])],1)],1)],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.on_submit_loading},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},staticRenderFns:[]};var o=a("46Yf")(i,l,!1,function(e){a("lApY")},"data-v-051b071e",null);t.default=o.exports},lApY:function(e,t,a){var r=a("UnYO");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("XkoO")("667e06c4",r,!0)},plct:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("E4LH"),i={data:function(){return{id:null,app_type:[],addOrUpdateVisible:!1,timerange:null,filter:{id:null,app:null,urlName:null,urlsearch:null,status:null,description:null,minTime:null,maxTime:null},dataList:[],pageIndex:1,pageSize:8,totalPage:0,dataListLoading:!1,dataListSelections:[],pickerOptions0:{disabledDate:function(e){return e.getTime()>Date.now()-864e5}},pickerOptions1:{disabledDate:function(e){return e.getTime()>Date.now()}}}},components:{AddOrUpdate:a("h7dz").default},created:function(){this.get_app_type()},activated:function(){this.getDataList()},methods:{search:function(){this.pageIndex=1,this.getDataList()},reset:function(){this.pageIndex=1,this.filter.app=null,this.filter.urlName=null,this.filter.urlsearch=null,this.filter.status=null,this.filter.description=null,this.filter.minTime=null,this.filter.maxTime=null,this.getDataList()},getDataList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/manager/url/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,app:this.filter.app,urlName:this.filter.urlName,url:this.filter.url,status:this.filter.status,description:this.filter.description,minTime:this.filter.minTime,maxTime:this.filter.maxTime})}).then(function(t){var a=t.data;a&&0===a.code?(e.dataList=a.page.list,e.totalPage=a.page.totalCount):(e.dataList=[],e.totalPage=0),e.dataListLoading=!1}).catch(function(t){t.data;e.dataListLoading=!1})},sizeChangeHandle:function(e){this.pageSize=e,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(e){this.pageIndex=e,this.getDataList()},selectionChangeHandle:function(e){this.dataListSelections=e},addOrUpdateHandle:function(e){var t=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){t.$refs.addOrUpdate.init(e)})},get_app_type:function(){var e=this;this.$http({url:this.$http.adornUrl("/manager/version/getList"),method:"get",data:this.$http.adornParams()}).then(function(t){var a=t.data;e.app_type=a.appList}).catch(function(){})},transformTime:function(e){if(this.filter.minTime)if(this.filter.maxTime){Object(r.a)(this.filter.minTime,this.filter.maxTime,864e5)||this.$message({message:"结束时间必须多于开始时间24小时以上",type:"warning"})}else this.$message("请选择结束时间");else this.$message({message:"请选择开始时间",type:"warning"});return e},deleteHandle:function(e){var t=this,a=e.id,r=a?[a]:this.dataListSelections.map(function(e){return e.roleId});this.$confirm("确定对[ id = "+r.join(",")+"]进行["+(a?"删除":"批量删除")+"]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/manager/url/delete"),method:"post",data:t.$http.adornData(r,!1)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.getDataList()}}):t.$message.error(a.msg)})}).catch(function(e){e.data})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[e._v("APP")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.filter.app,callback:function(t){e.$set(e.filter,"app",t)},expression:"filter.app"}},e._l(e.app_type,function(t,r){return a("el-option",{key:r,attrs:{label:t.app,value:t.app}},[e._v(e._s(t.app))])}))],1)]),e._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[e._v("urlName")]),e._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.filter.urlName,callback:function(t){e.$set(e.filter,"urlName",t)},expression:"filter.urlName"}})],1)]),e._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[e._v("Url查询")]),e._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:e.filter.urlsearch,callback:function(t){e.$set(e.filter,"urlsearch",t)},expression:"filter.urlsearch"}})],1)]),e._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[e._v("开启状态")]),e._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.filter.status,callback:function(t){e.$set(e.filter,"status",t)},expression:"filter.status"}},[a("el-option",{attrs:{label:"请选择",value:""}}),e._v(" "),a("el-option",{attrs:{label:"开启",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"关闭",value:"0"}})],1)],1)])],1),e._v(" "),a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[e._v("描述")]),e._v(" "),a("el-input",{attrs:{placeholder:"请输入描述"},model:{value:e.filter.description,callback:function(t){e.$set(e.filter,"description",t)},expression:"filter.description"}})],1)]),e._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[e._v("有效时间")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始时间","picker-options":e.pickerOptions0},on:{change:e.transformTime},model:{value:e.filter.minTime,callback:function(t){e.$set(e.filter,"minTime",t)},expression:"filter.minTime"}}),e._v(" "),a("span",[e._v(" - ")]),e._v(" "),a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"结束时间","picker-options":e.pickerOptions1},on:{change:e.transformTime},model:{value:e.filter.maxTime,callback:function(t){e.$set(e.filter,"maxTime",t)},expression:"filter.maxTime"}})],1)]),e._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),a("el-button",{attrs:{type:"success"},on:{click:function(t){e.addOrUpdateHandle()}}},[e._v("新增")]),e._v(" "),a("el-button",{attrs:{type:"info"},on:{click:function(t){e.reset()}}},[e._v("重置")]),e._v(" "),a("el-button",{attrs:{type:"danger",disabled:e.dataListSelections.length<=0},on:{click:function(t){e.deleteHandle()}}},[e._v("批量删除")])],1)])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:e.dataList,border:""},on:{"selection-change":e.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"selection","header-align":"center",align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"app","header-align":"center",align:"center","show-overflow-tooltip":!0,width:"110",label:"APP"}}),e._v(" "),a("el-table-column",{attrs:{prop:"urlName","header-align":"center",align:"center","show-overflow-tooltip":!0,width:"110",label:"urlName"}}),e._v(" "),a("el-table-column",{attrs:{prop:"version","header-align":"center",align:"center",label:"版本号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"url","header-align":"center",align:"center",label:"Url","show-overflow-tooltip":!0,width:"270"}}),e._v(" "),a("el-table-column",{attrs:{prop:"system","header-align":"center",align:"center",label:"系统"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{domProps:{textContent:e._s(1==t.row.os?"IOS":"Android")}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"status","header-align":"center",align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{domProps:{textContent:e._s(1==t.row.status?"开启":"关闭")}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"description","header-align":"center",align:"center","show-overflow-tooltip":!0,label:"描述",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{prop:"description","header-align":"center",align:"center",label:"时间",width:"290"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{domProps:{textContent:e._s(t.row.minTime+"-"+t.row.maxTime)}})]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.addOrUpdateHandle(t.row)}}},[e._v("编辑")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.deleteHandle(t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.pageIndex,"page-size":e.pageSize,total:e.totalPage,layout:"total, prev, pager, next"},on:{"size-change":e.sizeChangeHandle,"current-change":e.currentChangeHandle}}),e._v(" "),e.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e()],1)},staticRenderFns:[]};var o=a("46Yf")(i,l,!1,function(e){a("Wt9J")},"data-v-6249ec49",null);t.default=o.exports}});