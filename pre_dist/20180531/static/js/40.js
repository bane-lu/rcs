webpackJsonp([40],{TdIe:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={data:function(){return{updatePassowrdVisible:!1}},components:{UpdatePassword:e("cdA+").default},computed:{navbarLayoutType:{get:function(){return this.$store.state.common.navbarLayoutType}},sidebarFold:{get:function(){return this.$store.state.common.sidebarFold},set:function(t){this.$store.commit("common/updateSidebarFold",t)}},mainTabs:{get:function(){return this.$store.state.common.mainTabs},set:function(t){this.$store.commit("common/updateMainTabs",t)}},userName:{get:function(){return this.$store.state.user.name}}},methods:{updatePasswordHandle:function(){var t=this;this.updatePassowrdVisible=!0,this.$nextTick(function(){t.$refs.updatePassowrd.init()})},logoutHandle:function(){var t=this;this.$confirm("确定进行[退出]操作?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.$http({url:t.$http.adornUrl("/sys/logout"),method:"post",data:t.$http.adornData()}).then(function(a){var e=a.data;e&&0===e.code&&(t.$cookie.delete("token"),t.$router.push({name:"login"},function(){location.reload()}))})}).catch(function(){})}}},s={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("nav",{staticClass:"site-navbar",class:"site-navbar--"+t.navbarLayoutType},[n("div",{staticClass:"site-navbar__header"},[n("h1",{staticClass:"site-navbar__brand",on:{click:function(a){t.$router.push({name:"home"})}}},[n("a",{staticClass:"site-navbar__brand-lg",attrs:{href:"javascript:;"}},[t._v("密友圈运维支撑后台")]),t._v(" "),n("a",{staticClass:"site-navbar__brand-mini",attrs:{href:"javascript:;"}},[t._v("M")])])]),t._v(" "),n("div",{staticClass:"site-navbar__body clearfix"},[n("el-menu",{staticClass:"site-navbar__menu",attrs:{mode:"horizontal"}},[n("el-menu-item",{staticClass:"site-navbar__switch",attrs:{index:"0"},on:{click:function(a){t.sidebarFold=!t.sidebarFold}}},[n("icon-svg",{attrs:{name:"zhedie"}})],1)],1),t._v(" "),n("el-menu",{staticClass:"site-navbar__menu site-navbar__menu--right",attrs:{mode:"horizontal"}},[n("el-menu-item",{staticClass:"site-navbar__avatar",attrs:{index:"3"}},[n("el-dropdown",{attrs:{"show-timeout":0,placement:"bottom"}},[n("span",{staticClass:"el-dropdown-link"},[n("img",{attrs:{src:e("zQrT"),alt:t.userName}}),t._v(t._s(t.userName)+"\n          ")]),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[n("el-dropdown-item",{nativeOn:{click:function(a){t.updatePasswordHandle()}}},[t._v("修改密码")]),t._v(" "),n("el-dropdown-item",{nativeOn:{click:function(a){t.logoutHandle()}}},[t._v("退出")])],1)],1)],1)],1)],1),t._v(" "),t.updatePassowrdVisible?n("update-password",{ref:"updatePassowrd"}):t._e()],1)},staticRenderFns:[]},o=e("46Yf")(n,s,!1,null,null,null);a.default=o.exports},zQrT:function(t,a,e){t.exports=e.p+"static/img/avatar.9165e69.png"}});