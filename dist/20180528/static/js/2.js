webpackJsonp([2,7],{"+Lkn":function(t,e,a){(t.exports=a("acE3")(!1)).push([t.i,'\n@charset "UTF-8";\n.grid-content[data-v-6249ec49] {\n  padding: 10px 0px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: start;\n}\n.item_label[data-v-6249ec49] {\n  font-size: 14px;\n  padding: 0px 10px;\n  word-break: keep-all;\n  white-space: nowrap;\n}\n.date_picker[data-v-6249ec49] {\n  margin-right: 10px;\n}\n/* 时间选择框 */\n.el-date-editor--daterange.el-input[data-v-6249ec49], .el-date-editor--daterange.el-input__inner[data-v-6249ec49], .el-date-editor--timerange.el-input[data-v-6249ec49], .el-date-editor--timerange.el-input__inner[data-v-6249ec49] {\n  width: 360px;\n}\n',""])},UnYO:function(t,e,a){(t.exports=a("acE3")(!1)).push([t.i,"\n.el-form-item__label[data-v-051b071e] {\n  width: 126px;\n}\n.reddot[data-v-051b071e] {\n  width: 70%;\n}\n.redFlag_tip[data-v-051b071e] {\n  color: #999;\n  font-size: 12px;\n}\n",""])},Wt9J:function(t,e,a){var r=a("+Lkn");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("XkoO")("bbc02c00",r,!0)},h7dz:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("E4LH"),i={data:function(){var t=this,e=function(e,a,r){t.timeCheck?r():r(new Error("起止时间间隔须为24小时以上"))},a=function(e,a,r){t.docTimeCheck?r():r(new Error("文案起止时间间隔须为24小时以上"))};return{app_type:[],on_submit_loading:!1,visible:!1,isEditable:!1,dataForm:{createTime:"",id:"",app:"",urlName:"",url:"",version:"",description:"",redFlag:"",minTime:"",maxTime:"",docFlag:!0,docContent:"",docRule:"",docMinTime:"",docMaxTime:"",shareTitle:"",shareContent:"",shareDetails:"",os:[]},timeCheck:!1,docTimeCheck:!1,dataRule:{app:[{required:!0,message:"请选择APP",trigger:"blur"}],urlName:[{required:!0,message:"请输入urlName",trigger:"blur"},{validator:function(t,e,a){Object(r.b)(e)?a():a(new Error("只能输入汉字"))},trigger:"blur"}],url:[{required:!0,message:"请输入url地址不能为空",trigger:"blur"},{validator:function(t,e,a){Object(r.f)(e)?a():a(new Error("url格式错误"))},trigger:"blur"}],version:[{required:!0,message:"请输入版本号",trigger:"blur"},{validator:function(t,e,a){Object(r.h)(e)?a():a(new Error("版本格式错误（如:2.4.3)"))},trigger:"blur"}],minTime:[{required:!0,message:"请选择开始时间",trigger:"blur"},{validator:e,trigger:"blur"}],maxTime:[{required:!0,message:"请选择结束时间",trigger:"blur"},{validator:e,trigger:"blur"}],docContent:[{required:!0,message:"请输入文案文字",trigger:"blur"}],docRule:[{required:!0,message:"请选择展示规则",trigger:"blur"}],docMinTime:[{required:!0,message:"请选择文案开始时间",trigger:"blur"},{validator:a,trigger:"blur"}],docMaxTime:[{required:!0,message:"请选择文案结束时间",trigger:"blur"},{validator:a,trigger:"blur"}],shareTitle:[{required:!0,message:"请输入文案标题",trigger:"blur"}],shareContent:[{required:!0,message:"请输入文案内容",trigger:"blur"}],shareDetails:[{required:!0,message:"请输入文案详情",trigger:"blur"}],os:[{required:!0,message:"请选择系统",trigger:"blur"}]}}},computed:{newOS:function(){return this.dataForm.os.join(",")},newDocFlag:function(){return this.dataForm.docFlag?1:0}},created:function(){this.get_app_type()},methods:{url_input:function(){this.dataForm.url=this.dataForm.url.replace(/\s+/g,"")},redDot_input:function(){},init:function(t){var e=this;this.visible=!0,this.on_submit_loading=!1,this.$nextTick(function(){e.$refs.dataForm.resetFields(),t?(e.dataForm.id=t.id,e.$http({url:e.$http.adornUrl("/manager/url/info/"+e.dataForm.id),method:"get"}).then(function(t){var a=t.data;a&&0===a.code&&(e.dataForm.createTime=a.url.createTime,e.dataForm.app=a.url.app,e.dataForm.urlName=a.url.urlName,e.dataForm.url=a.url.url,e.dataForm.version=a.url.version,e.dataForm.description=a.url.description,e.dataForm.redFlag=a.url.redFlag,e.dataForm.minTime=a.url.minTime,e.dataForm.maxTime=a.url.maxTime,e.timeCheck=!0,1==a.url.docFlag?(e.dataForm.docFlag=!0,e.docTimeCheck=!0):(e.dataForm.docFlag=!1,e.docTimeCheck=!1),e.dataForm.docContent=a.url.docContent,e.dataForm.docRule=a.url.docRule,e.dataForm.docMinTime=a.url.docMinTime,e.dataForm.docMaxTime=a.url.docMaxTime,e.dataForm.shareTitle=a.url.shareTitle,e.dataForm.shareContent=a.url.shareContent,e.dataForm.shareDetails=a.url.shareDetails,e.dataForm.os=a.url.os.split("-"))}).catch(function(){})):(e.dataForm.createTime="",e.dataForm.id="",e.dataForm.app="",e.dataForm.urlName="",e.dataForm.url="",e.dataForm.version="",e.dataForm.description="",e.dataForm.redFlag="",e.dataForm.minTime="",e.dataForm.maxTime="",e.dataForm.docFlag=!1,e.dataForm.docContent="",e.dataForm.docRule="",e.dataForm.docMinTime="",e.dataForm.docMaxTime="",e.dataForm.shareTitle="",e.dataForm.shareContent="",e.dataForm.shareDetails="",e.dataForm.os=[])})},dataFormSubmit:function(){var t=this;this.$refs.dataForm.validate(function(e){if(e){t.on_submit_loading=!0;var a={createTime:t.dataForm.createTime,id:t.dataForm.id,app:t.dataForm.app,urlName:t.dataForm.urlName,url:t.dataForm.url,version:t.dataForm.version,description:t.dataForm.description,redFlag:t.dataForm.redFlag,minTime:t.dataForm.minTime,maxTime:t.dataForm.maxTime,docFlag:t.newDocFlag,docContent:t.dataForm.docContent,docRule:t.dataForm.docRule,docMinTime:t.dataForm.docMinTime,docMaxTime:t.dataForm.docMaxTime,shareTitle:t.dataForm.shareTitle,shareContent:t.dataForm.shareContent,shareDetails:t.dataForm.shareDetails,os:t.newOS};t.$http({url:t.$http.adornUrl("/manager/url/"+(t.dataForm.id?"update":"save")),method:"post",data:t.$http.adornData(a)}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.visible=!1,t.on_submit_loading=!1,t.$emit("refreshDataList")}}):(t.$message.error(a.msg),t.on_submit_loading=!1)}).catch(function(){t.on_submit_loading=!1})}})},showDocument:function(){console.log(this.dataForm.docFlag),this.dataForm.docFlag||(this.dataForm.docContent="",this.dataForm.docRule="",this.dataForm.docMinTime="",this.dataForm.docMaxTime="")},get_app_type:function(){var t=this;this.$http({url:this.$http.adornUrl("/manager/version/getList"),method:"get",data:this.$http.adornParams()}).then(function(e){var a=e.data;t.app_type=a.appList}).catch(function(){})},transformTime:function(t){var e=Object(r.a)(this.dataForm.minTime,this.dataForm.maxTime,864e5);return this.timeCheck=!!e,t},transformDocTime:function(t){var e=Object(r.a)(this.dataForm.docMinTime,this.dataForm.docMaxTime,864e5);return this.docTimeCheck=!!e,t}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{title:t.dataForm.id?"编辑":"新增","close-on-click-modal":!1,visible:t.visible},on:{"update:visible":function(e){t.visible=e}}},[a("el-form",{ref:"dataForm",attrs:{model:t.dataForm,rules:t.dataRule,"label-width":"80px"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key))return null;t.dataFormSubmit()}}},[a("el-row",{attrs:{gutter:30}},[a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"app",prop:"app","label-width":"100px"}},[a("el-select",{attrs:{placeholder:"请选择",disabled:""!=t.dataForm.id},model:{value:t.dataForm.app,callback:function(e){t.$set(t.dataForm,"app",e)},expression:"dataForm.app"}},t._l(t.app_type,function(e,r){return a("el-option",{key:r,attrs:{label:e.app,value:e.app}},[t._v(t._s(e.app))])}))],1)],1)]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"urlName",prop:"urlName","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"urlName",maxlength:"8",disabled:""!=t.dataForm.id},model:{value:t.dataForm.urlName,callback:function(e){t.$set(t.dataForm,"urlName",e)},expression:"dataForm.urlName"}})],1)],1)])],1),t._v(" "),a("el-form-item",{attrs:{label:"url",prop:"url","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"请输入url",maxlength:"64"},on:{input:t.url_input},model:{value:t.dataForm.url,callback:function(e){t.$set(t.dataForm,"url",e)},expression:"dataForm.url"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"版本号",prop:"version","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"2.4.3"},model:{value:t.dataForm.version,callback:function(e){t.$set(t.dataForm,"version",e)},expression:"dataForm.version"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"添加描述",prop:"description","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"请输入不超过20个字",maxlength:"20"},model:{value:t.dataForm.description,callback:function(e){t.$set(t.dataForm,"description",e)},expression:"dataForm.description"}})],1),t._v(" "),a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"有效期选择",prop:"minTime","label-width":"100px"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始时间",editable:t.isEditable},on:{change:t.transformTime},model:{value:t.dataForm.minTime,callback:function(e){t.$set(t.dataForm,"minTime",e)},expression:"dataForm.minTime"}})],1)],1)]),t._v(" "),a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"-",prop:"maxTime","label-width":"80px"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"结束时间",editable:t.isEditable},on:{change:t.transformTime},model:{value:t.dataForm.maxTime,callback:function(e){t.$set(t.dataForm,"maxTime",e)},expression:"dataForm.maxTime"}})],1)],1)])],1),t._v(" "),a("el-form-item",{attrs:{label:"是否显示小红点","label-width":"110px"}},[a("el-input",{staticClass:"reddot",attrs:{placeholder:"是否显示小红点",maxlength:"8"},on:{input:t.redDot_input},model:{value:t.dataForm.redFlag,callback:function(e){t.$set(t.dataForm,"redFlag",e)},expression:"dataForm.redFlag"}}),t._v(" "),a("span",{staticClass:"redFlag_tip"},[t._v("8位数字（年月日）")])],1),t._v(" "),a("el-form-item",{attrs:{label:"文案展示","label-width":"100px"}},[a("el-checkbox",{on:{change:t.showDocument},model:{value:t.dataForm.docFlag,callback:function(e){t.$set(t.dataForm,"docFlag",e)},expression:"dataForm.docFlag"}},[t._v("需要")])],1),t._v(" "),t.dataForm.docFlag?a("el-form-item",{attrs:{label:"文案文字",prop:"docContent","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"文案文字",maxlength:"5"},model:{value:t.dataForm.docContent,callback:function(e){t.$set(t.dataForm,"docContent",e)},expression:"dataForm.docContent"}})],1):t._e(),t._v(" "),t.dataForm.docFlag?a("el-form-item",{attrs:{label:"展示规则",prop:"docRule","label-width":"100px"}},[a("el-radio-group",{model:{value:t.dataForm.docRule,callback:function(e){t.$set(t.dataForm,"docRule",e)},expression:"dataForm.docRule"}},[a("el-radio",{attrs:{label:"0"}},[t._v("一直存在")]),t._v(" "),a("el-radio",{attrs:{label:"1"}},[t._v("点击后消失")])],1)],1):t._e(),t._v(" "),t.dataForm.docFlag?a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"展示时间",prop:"docMinTime","label-width":"100px"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"文案开始时间",editable:t.isEditable},on:{change:t.transformDocTime},model:{value:t.dataForm.docMinTime,callback:function(e){t.$set(t.dataForm,"docMinTime",e)},expression:"dataForm.docMinTime"}})],1)],1)]),t._v(" "),a("el-col",{attrs:{span:10}},[a("div",{staticClass:"grid-content"},[a("el-form-item",{attrs:{label:"-",prop:"docMaxTime"}},[a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"文案结束时间",editable:t.isEditable},on:{change:t.transformDocTime},model:{value:t.dataForm.docMaxTime,callback:function(e){t.$set(t.dataForm,"docMaxTime",e)},expression:"dataForm.docMaxTime"}})],1)],1)])],1):t._e(),t._v(" "),a("h3",[t._v("分享文案")]),t._v(" "),a("el-form-item",{attrs:{label:"标题",prop:"shareTitle","label-width":"100px"}},[a("el-input",{attrs:{type:"text",placeholder:"0/20",maxlength:"20"},model:{value:t.dataForm.shareTitle,callback:function(e){t.$set(t.dataForm,"shareTitle",e)},expression:"dataForm.shareTitle"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"内容",prop:"shareContent","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"0/30",maxlength:"30"},model:{value:t.dataForm.shareContent,callback:function(e){t.$set(t.dataForm,"shareContent",e)},expression:"dataForm.shareContent"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"详情",prop:"shareDetails","label-width":"100px"}},[a("el-input",{attrs:{placeholder:"0/50",maxlength:"50"},model:{value:t.dataForm.shareDetails,callback:function(e){t.$set(t.dataForm,"shareDetails",e)},expression:"dataForm.shareDetails"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"系统选择",prop:"os","label-width":"100px"}},[a("el-checkbox-group",{attrs:{disabled:""!=t.dataForm.id},model:{value:t.dataForm.os,callback:function(e){t.$set(t.dataForm,"os",e)},expression:"dataForm.os"}},[a("el-checkbox",{attrs:{label:"1"}},[t._v("IOS")]),t._v(" "),a("el-checkbox",{attrs:{label:"2"}},[t._v("Android")])],1)],1)],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.visible=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary",loading:t.on_submit_loading},on:{click:function(e){t.dataFormSubmit()}}},[t._v("确定")])],1)],1)},staticRenderFns:[]};var o=a("46Yf")(i,l,!1,function(t){a("lApY")},"data-v-051b071e",null);e.default=o.exports},lApY:function(t,e,a){var r=a("UnYO");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);a("XkoO")("667e06c4",r,!0)},plct:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("E4LH"),i={data:function(){return{id:null,app_type:[],addOrUpdateVisible:!1,timerange:null,filter:{id:null,app:null,urlName:null,url:null,status:null,description:null,minTime:null,maxTime:null},dataList:[],pageIndex:1,pageSize:8,totalPage:0,dataListLoading:!1,dataListSelections:[]}},components:{AddOrUpdate:a("h7dz").default},created:function(){this.get_app_type()},activated:function(){this.getDataList()},methods:{search:function(){(this.pageIndex=1,this.filter.minTime||this.filter.maxTime)?this.filter.minTime&&this.filter.maxTime?Object(r.a)(this.filter.minTime,this.filter.maxTime,864e5)?this.getDataList():this.$message({message:"结束时间必须多于开始时间24小时以上",type:"warning"}):this.$message({message:"请补充起止时间",type:"warning"}):this.getDataList()},reset:function(){this.pageIndex=1,this.filter.app=null,this.filter.urlName=null,this.filter.url=null,this.filter.status=null,this.filter.description=null,this.filter.minTime=null,this.filter.maxTime=null,this.getDataList()},getDataList:function(){var t=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/manager/url/list"),method:"get",params:this.$http.adornParams({page:this.pageIndex,limit:this.pageSize,app:this.filter.app,urlName:this.filter.urlName,url:this.filter.url,status:this.filter.status,description:this.filter.description,minTime:this.filter.minTime,maxTime:this.filter.maxTime})}).then(function(e){var a=e.data;a&&0===a.code?(t.dataList=a.page.list,t.totalPage=a.page.totalCount):(t.dataList=[],t.totalPage=0),t.dataListLoading=!1}).catch(function(e){e.data;t.dataListLoading=!1})},sizeChangeHandle:function(t){this.pageSize=t,this.pageIndex=1,this.getDataList()},currentChangeHandle:function(t){this.pageIndex=t,this.getDataList()},selectionChangeHandle:function(t){this.dataListSelections=t},addOrUpdateHandle:function(t){var e=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){e.$refs.addOrUpdate.init(t)})},get_app_type:function(){var t=this;this.$http({url:this.$http.adornUrl("/manager/version/getList"),method:"get",data:this.$http.adornParams()}).then(function(e){var a=e.data;t.app_type=a.appList}).catch(function(){})},transformTime:function(t){return t},deleteHandle:function(t){var e=this,a=t?[t.id]:this.dataListSelections.map(function(t){return t.id});console.log(a),this.$confirm("确定对[ id = "+a.join(",")+"]进行["+(t?"删除":"批量删除")+"]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.$http({url:e.$http.adornUrl("/manager/url/delete"),method:"post",data:e.$http.adornData(a,!1)}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.getDataList()}}):e.$message.error(a.msg)})}).catch(function(t){t.data})}}},l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("APP")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.filter.app,callback:function(e){t.$set(t.filter,"app",e)},expression:"filter.app"}},t._l(t.app_type,function(e,r){return a("el-option",{key:r,attrs:{label:e.app,value:e.app}},[t._v(t._s(e.app))])}))],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("urlName")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.filter.urlName,callback:function(e){t.$set(t.filter,"urlName",e)},expression:"filter.urlName"}})],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("Url查询")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入"},model:{value:t.filter.url,callback:function(e){t.$set(t.filter,"url",e)},expression:"filter.url"}})],1)]),t._v(" "),a("el-col",{attrs:{span:6}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("开启状态")]),t._v(" "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.filter.status,callback:function(e){t.$set(t.filter,"status",e)},expression:"filter.status"}},[a("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),a("el-option",{attrs:{label:"开启",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"关闭",value:"0"}})],1)],1)])],1),t._v(" "),a("el-row",{attrs:{gutter:24}},[a("el-col",{attrs:{span:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("描述")]),t._v(" "),a("el-input",{attrs:{placeholder:"请输入描述"},model:{value:t.filter.description,callback:function(e){t.$set(t.filter,"description",e)},expression:"filter.description"}})],1)]),t._v(" "),a("el-col",{attrs:{span:12}},[a("div",{staticClass:"grid-content bg-purple"},[a("label",{staticClass:"item_label"},[t._v("有效时间")]),t._v(" "),a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"开始时间"},on:{change:t.transformTime},model:{value:t.filter.minTime,callback:function(e){t.$set(t.filter,"minTime",e)},expression:"filter.minTime"}}),t._v(" "),a("span",[t._v(" - ")]),t._v(" "),a("el-date-picker",{attrs:{type:"datetime","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"结束时间"},on:{change:t.transformTime},model:{value:t.filter.maxTime,callback:function(e){t.$set(t.filter,"maxTime",e)},expression:"filter.maxTime"}})],1)]),t._v(" "),a("el-col",{attrs:{span:8}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.search()}}},[t._v("查询")]),t._v(" "),a("el-button",{attrs:{type:"success"},on:{click:function(e){t.addOrUpdateHandle()}}},[t._v("新增")]),t._v(" "),a("el-button",{attrs:{type:"info"},on:{click:function(e){t.reset()}}},[t._v("重置")]),t._v(" "),a("el-button",{attrs:{type:"danger",disabled:t.dataListSelections.length<=0},on:{click:function(e){t.deleteHandle()}}},[t._v("批量删除")])],1)])],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.dataListLoading,expression:"dataListLoading"}],staticStyle:{width:"100%"},attrs:{data:t.dataList,border:""},on:{"selection-change":t.selectionChangeHandle}},[a("el-table-column",{attrs:{type:"selection","header-align":"center",align:"center",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"app","header-align":"center",align:"center","show-overflow-tooltip":!0,width:"110",label:"APP"}}),t._v(" "),a("el-table-column",{attrs:{prop:"urlName","header-align":"center",align:"center","show-overflow-tooltip":!0,width:"110",label:"urlName"}}),t._v(" "),a("el-table-column",{attrs:{prop:"version","header-align":"center",align:"center",label:"版本号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"url","header-align":"center",align:"center",label:"Url","show-overflow-tooltip":!0,width:"270"}}),t._v(" "),a("el-table-column",{attrs:{prop:"system","header-align":"center",align:"center",label:"系统"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(1==e.row.os?"IOS":"Android")}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"status","header-align":"center",align:"center",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(1==e.row.status?"开启":"关闭")}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"description","header-align":"center",align:"center","show-overflow-tooltip":!0,label:"描述",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"description","header-align":"center",align:"center",label:"时间",width:"290"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(e.row.minTime+"-"+e.row.maxTime)}})]}}])}),t._v(" "),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){t.addOrUpdateHandle(e.row)}}},[t._v("编辑")]),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.deleteHandle(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.pageIndex,"page-size":t.pageSize,total:t.totalPage,layout:"total, prev, pager, next"},on:{"size-change":t.sizeChangeHandle,"current-change":t.currentChangeHandle}}),t._v(" "),t.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:t.getDataList}}):t._e()],1)},staticRenderFns:[]};var o=a("46Yf")(i,l,!1,function(t){a("Wt9J")},"data-v-6249ec49",null);e.default=o.exports}});