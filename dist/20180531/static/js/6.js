webpackJsonp([6,14],{FVXz:function(e,t,a){var n=a("gKRY");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("XkoO")("db68ab1e",n,!0)},cFZF:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("0xDb"),r=a("Q7M0"),o={data:function(){var e=this;return{visible:!1,dataForm:{id:0,type:1,typeList:["目录","菜单","按钮"],name:"",parentId:0,parentName:"",url:"",perms:"",orderNum:0,icon:"",iconList:[]},dataRule:{name:[{required:!0,message:"菜单名称不能为空",trigger:"blur"}],parentName:[{required:!0,message:"上级菜单不能为空",trigger:"change"}],url:[{validator:function(t,a,n){1!==e.dataForm.type||/\S/.test(a)?n():n(new Error("菜单URL不能为空"))},trigger:"blur"}]},menuList:[],menuListTreeProps:{label:"name",children:"children"}}},created:function(){this.iconList=r.a.getNameList()},methods:{init:function(e){var t=this;this.dataForm.id=e||0,this.$http({url:this.$http.adornUrl("/sys/menu/select"),method:"get",params:this.$http.adornParams()}).then(function(e){var a=e.data;t.menuList=Object(n.c)(a.menuList,"menuId")}).then(function(){t.visible=!0,t.$nextTick(function(){t.$refs.dataForm.resetFields()})}).then(function(){t.dataForm.id?t.$http({url:t.$http.adornUrl("/sys/menu/info/"+t.dataForm.id),method:"get",params:t.$http.adornParams()}).then(function(e){var a=e.data;t.dataForm.id=a.menu.menuId,t.dataForm.type=a.menu.type,t.dataForm.name=a.menu.name,t.dataForm.parentId=a.menu.parentId,t.dataForm.url=a.menu.url,t.dataForm.perms=a.menu.perms,t.dataForm.orderNum=a.menu.orderNum,t.dataForm.icon=a.menu.icon,t.menuListTreeSetCurrentNode()}):t.menuListTreeSetCurrentNode()})},menuListTreeCurrentChangeHandle:function(e,t){this.dataForm.parentId=e.menuId,this.dataForm.parentName=e.name},menuListTreeSetCurrentNode:function(){this.$refs.menuListTree.setCurrentKey(this.dataForm.parentId),this.dataForm.parentName=(this.$refs.menuListTree.getCurrentNode()||{}).name},iconActiveHandle:function(e){this.dataForm.icon=e},dataFormSubmit:function(){var e=this;this.$refs.dataForm.validate(function(t){t&&e.$http({url:e.$http.adornUrl("/sys/menu/"+(e.dataForm.id?"update":"save")),method:"post",data:e.$http.adornData({menuId:e.dataForm.id||void 0,type:e.dataForm.type,name:e.dataForm.name,parentId:e.dataForm.parentId,url:e.dataForm.url,perms:e.dataForm.perms,orderNum:e.dataForm.orderNum,icon:e.dataForm.icon})}).then(function(t){var a=t.data;a&&0===a.code?e.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){e.visible=!1,e.$emit("refreshDataList")}}):e.$message.error(a.msg)})})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{title:e.dataForm.id?"修改":"新增","close-on-click-modal":!1,visible:e.visible},on:{"update:visible":function(t){e.visible=t}}},[a("el-form",{ref:"dataForm",attrs:{model:e.dataForm,rules:e.dataRule,"label-width":"80px"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key))return null;e.dataFormSubmit()}}},[a("el-form-item",{attrs:{label:"类型",prop:"type"}},[a("el-radio-group",{model:{value:e.dataForm.type,callback:function(t){e.$set(e.dataForm,"type",t)},expression:"dataForm.type"}},e._l(e.dataForm.typeList,function(t,n){return a("el-radio",{key:n,attrs:{label:n}},[e._v(e._s(t))])}))],1),e._v(" "),a("el-form-item",{attrs:{label:e.dataForm.typeList[e.dataForm.type]+"名称",prop:"name"}},[a("el-input",{attrs:{placeholder:e.dataForm.typeList[e.dataForm.type]+"名称"},model:{value:e.dataForm.name,callback:function(t){e.$set(e.dataForm,"name",t)},expression:"dataForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"上级菜单",prop:"parentName"}},[a("el-popover",{ref:"menuListPopover",attrs:{placement:"bottom-start",trigger:"click"}},[a("el-tree",{ref:"menuListTree",attrs:{data:e.menuList,props:e.menuListTreeProps,"node-key":"menuId","default-expand-all":!0,"highlight-current":!0,"expand-on-click-node":!1},on:{"current-change":e.menuListTreeCurrentChangeHandle}})],1),e._v(" "),a("el-input",{directives:[{name:"popover",rawName:"v-popover:menuListPopover",arg:"menuListPopover"}],staticClass:"menu-list__input",attrs:{readonly:!0,placeholder:"点击选择上级菜单"},model:{value:e.dataForm.parentName,callback:function(t){e.$set(e.dataForm,"parentName",t)},expression:"dataForm.parentName"}})],1),e._v(" "),1===e.dataForm.type?a("el-form-item",{attrs:{label:"菜单路由",prop:"url"}},[a("el-input",{attrs:{placeholder:"菜单路由"},model:{value:e.dataForm.url,callback:function(t){e.$set(e.dataForm,"url",t)},expression:"dataForm.url"}})],1):e._e(),e._v(" "),0!==e.dataForm.type?a("el-form-item",{attrs:{label:"授权标识",prop:"perms"}},[a("el-input",{attrs:{placeholder:"多个用逗号分隔, 如: user:list,user:create"},model:{value:e.dataForm.perms,callback:function(t){e.$set(e.dataForm,"perms",t)},expression:"dataForm.perms"}})],1):e._e(),e._v(" "),2!==e.dataForm.type?a("el-form-item",{attrs:{label:"排序号",prop:"orderNum"}},[a("el-input-number",{attrs:{"controls-position":"right",min:0,label:"排序号"},model:{value:e.dataForm.orderNum,callback:function(t){e.$set(e.dataForm,"orderNum",t)},expression:"dataForm.orderNum"}})],1):e._e(),e._v(" "),2!==e.dataForm.type?a("el-form-item",{attrs:{label:"菜单图标",prop:"icon"}},[a("el-row",[a("el-col",{attrs:{span:22}},[a("el-popover",{ref:"iconListPopover",attrs:{placement:"bottom-start",trigger:"click","popper-class":"mod-menu__icon-popover"}},[a("div",{staticClass:"mod-menu__icon-list"},e._l(e.iconList,function(t,n){return a("el-button",{key:n,class:{"is-active":t===e.dataForm.icon},on:{click:function(a){e.iconActiveHandle(t)}}},[a("icon-svg",{attrs:{name:t}})],1)}))]),e._v(" "),a("el-input",{directives:[{name:"popover",rawName:"v-popover:iconListPopover",arg:"iconListPopover"}],staticClass:"icon-list__input",attrs:{readonly:!0,placeholder:"菜单图标名称"},model:{value:e.dataForm.icon,callback:function(t){e.$set(e.dataForm,"icon",t)},expression:"dataForm.icon"}})],1),e._v(" "),a("el-col",{staticClass:"icon-list__tips",attrs:{span:2}},[a("el-tooltip",{attrs:{placement:"top",effect:"light"}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v("全站推荐使用SVG Sprite, 详细请参考:"),a("a",{attrs:{href:"//github.com/daxiongYang/renren-fast-vue/blob/master/src/icons/index.js",target:"_blank"}},[e._v("icons/index.js")]),e._v("描述")]),e._v(" "),a("i",{staticClass:"el-icon-warning"})])],1)],1)],1):e._e()],1),e._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.visible=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dataFormSubmit()}}},[e._v("确定")])],1)],1)},staticRenderFns:[]};var l=a("46Yf")(o,i,!1,function(e){a("FVXz")},null,null);t.default=l.exports},gKRY:function(e,t,a){(e.exports=a("acE3")(!1)).push([e.i,"\n.mod-menu .menu-list__input > .el-input__inner,\n.mod-menu .icon-list__input > .el-input__inner {\n  cursor: pointer;\n}\n.mod-menu__icon-popover {\n  max-width: 370px;\n}\n.mod-menu__icon-list {\n  max-height: 180px;\n  padding: 0;\n  margin: -8px 0 0 -8px;\n}\n.mod-menu__icon-list > .el-button {\n    padding: 8px;\n    margin: 8px 0 0 8px;\n}\n.mod-menu__icon-list > .el-button > span {\n      display: inline-block;\n      vertical-align: middle;\n      width: 18px;\n      height: 18px;\n      font-size: 18px;\n}\n.mod-menu .icon-list__tips {\n  font-size: 18px;\n  text-align: center;\n  color: #e6a23c;\n  cursor: pointer;\n}\n",""])},gpws:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("+tJV"),r=a.n(n),o={name:"table-tree-column",props:{prop:{type:String},treeKey:{type:String,default:"id"},parentKey:{type:String,default:"parentId"},levelKey:{type:String,default:"_level"},childKey:{type:String,default:"children"}},methods:{childStyles:function(e){return{"padding-left":(e[this.levelKey]>1?7*e[this.levelKey]:0)+"px"}},iconClasses:function(e){return[e._expanded?"el-icon-caret-bottom":"el-icon-caret-right"]},iconStyles:function(e){return{visibility:this.hasChild(e)?"visible":"hidden"}},hasChild:function(e){return r()(e[this.childKey])&&e[this.childKey].length>=1||!1},toggleHandle:function(e,t){var a=this;if(this.hasChild(t)){var n=this.$parent.store.states.data.slice(0);n[e]._expanded=!n[e]._expanded,n=n[e]._expanded?n.splice(0,e+1).concat(t[this.childKey]).concat(n):this.removeChildNode(n,t[this.treeKey]),this.$parent.store.commit("setData",n),this.$nextTick(function(){a.$parent.doLayout()})}},removeChildNode:function(e,t){var a=r()(t)?t:[t];if(t.length<=0)return e;for(var n=[],o=0;o<e.length;o++)-1!==a.indexOf(e[o][this.parentKey])&&-1===a.indexOf(e[o][this.treeKey])&&(n.push(e.splice(o,1)[0][this.treeKey]),o--);return this.removeChildNode(e,n)}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-table-column",e._b({attrs:{prop:e.prop},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{style:e.childStyles(t.row),on:{click:function(a){a.preventDefault(),e.toggleHandle(t.$index,t.row)}}},[a("i",{class:e.iconClasses(t.row),style:e.iconStyles(t.row)}),e._v("\n      "+e._s(t.row[e.prop])+"\n    ")])]}}])},"el-table-column",e.$attrs,!1))},staticRenderFns:[]},l=a("46Yf")(o,i,!1,null,null,null).exports,s=a("cFZF"),d=a("0xDb"),m={data:function(){return{dataForm:{},dataList:[],dataListLoading:!1,addOrUpdateVisible:!1}},components:{TableTreeColumn:l,AddOrUpdate:s.default},activated:function(){this.getDataList()},methods:{getDataList:function(){var e=this;this.dataListLoading=!0,this.$http({url:this.$http.adornUrl("/sys/menu/list"),method:"get",params:this.$http.adornParams()}).then(function(t){var a=t.data;e.dataList=Object(d.c)(a,"menuId"),e.dataListLoading=!1})},addOrUpdateHandle:function(e){var t=this;this.addOrUpdateVisible=!0,this.$nextTick(function(){t.$refs.addOrUpdate.init(e)})},deleteHandle:function(e){var t=this;this.$confirm("确定对[id="+e+"]进行[删除]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/sys/menu/delete/"+e),method:"post",data:t.$http.adornData()}).then(function(e){var a=e.data;a&&0===a.code?t.$message({message:"操作成功",type:"success",duration:1500,onClose:function(){t.getDataList()}}):t.$message.error(a.msg)})}).catch(function(){})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"mod-menu"},[a("el-form",{attrs:{inline:!0,model:e.dataForm}},[a("el-form-item",[e.isAuth("sys:user:save")?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addOrUpdateHandle()}}},[e._v("新增")]):e._e()],1)],1),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dataList,border:""}},[a("el-table-column",{attrs:{prop:"menuId","header-align":"center",align:"center",width:"80",label:"ID"}}),e._v(" "),a("table-tree-column",{attrs:{prop:"name","header-align":"center",treeKey:"menuId",width:"150",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"parentName","header-align":"center",align:"center",width:"120",label:"上级菜单"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",label:"图标"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("icon-svg",{attrs:{name:e.row.icon}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"type","header-align":"center",align:"center",label:"类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[0===t.row.type?a("el-tag",{attrs:{size:"small"}},[e._v("目录")]):1===t.row.type?a("el-tag",{attrs:{size:"small",type:"success"}},[e._v("菜单")]):2===t.row.type?a("el-tag",{attrs:{size:"small",type:"info"}},[e._v("按钮")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"orderNum","header-align":"center",align:"center",label:"排序号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"url","header-align":"center",align:"center",width:"150","show-overflow-tooltip":!0,label:"菜单URL"}}),e._v(" "),a("el-table-column",{attrs:{prop:"perms","header-align":"center",align:"center",width:"150","show-overflow-tooltip":!0,label:"授权标识"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right","header-align":"center",align:"center",width:"150",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.isAuth("sys:user:update")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.addOrUpdateHandle(t.row.menuId)}}},[e._v("修改")]):e._e(),e._v(" "),e.isAuth("sys:user:delete")?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.deleteHandle(t.row.menuId)}}},[e._v("删除")]):e._e()]}}])})],1),e._v(" "),e.addOrUpdateVisible?a("add-or-update",{ref:"addOrUpdate",on:{refreshDataList:e.getDataList}}):e._e()],1)},staticRenderFns:[]},u=a("46Yf")(m,c,!1,null,null,null);t.default=u.exports}});