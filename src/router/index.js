/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有开发环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)
console.log(process.env.NODE_ENV)
     
// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
    { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
    { path: '/versionmanage', component: _import('modules/versionmanage/versionmanage'), name: 'versionmanage', meta: { title: '版本管理' } },
    { path: '/urlmanage', component: _import('modules/urlmanage/urlmanage'), name: 'urlmanage', meta: { title: 'url管理' } },
    { path: '/messagePush', component: _import('modules/MessagePush/MessagePush'), name: 'MessagePush', meta: { title: '消息推送' }},
    { path: '/fullQuantity', component: _import('modules/MessagePush/FullQuantity'), name: 'FullQuantity', meta: { title: '全量' }},
    { path: '/statistics/:id/:system', component: _import('modules/MessagePush/Statistics'), name: 'Statistics', meta: { title: '统计详情及分析' }},
    { path: '/failDetail/:id', component: _import('modules/MessagePush/failDetail'), name: 'FailDetail', meta: { title: '失败详情' }},
    { path: '/addOrUpdate', component: _import('modules/webFamily/addOrUpdate'), name: 'addOrUpdate', meta: { title: '新增或修改' } },    
    { path: '/HefeixinFullQuantity', component: _import('modules/HefeixinMessagePush/HefeixinFullQuantity'), name: 'HefeixinFullQuantity', meta: { title: '全量' } },
    { path: '/HefeixinStatistics/:id', component: _import('modules/HefeixinMessagePush/HefeixinStatistics'), name: 'HefeixinStatistics', meta: { title: '统计详情及分析' } },
    { path: '/HeifeixinFailDetail/:id', component: _import('modules/HefeixinMessagePush/HefeixinFailDetail'), name: 'HefeixinFailDetail', meta: { title: '失败详情' } },
    {
      path: '/demo-01',
      component: null, // 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
      name: 'demo-01',
      meta: {
        title: '我是一个通过iframe嵌套展示内容, 并通过tab打开 demo',
        isTab: true,
        iframeUrl: 'http://fast.demo.renren.io/'
      }
    }
  ],
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      next({ name: 'login' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes)
})

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to) === 'global') {
    next()
  } else {
    http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',
      params: http.adornParams()
    }).then(({data}) => {
      if (data && data.code === 0) {
        // var versionMenu = {
        //   icon: 'log',
        //   list: [],
        //   menuId: 10,
        //   name: '消息推送',
        //   open: null,
        //   orderNum: 0,
        //   parentId: 0,
        //   parentName: null,
        //   perms: null,
        //   type: 0,
        //   url: 'MessagePush/MessagePush'
        // }
        // var urlMenu = {
        //   icon: 'log',
        //   list: [],
        //   menuId: 11,
        //   name: 'url管理',
        //   open: null,
        //   orderNum: 0,
        //   parentId: 0,
        //   parentName: null,
        //   perms: null,
        //   type: 0,
        //   url: 'urlmanage/urlmanage'
        // }
        // data.menuList.push(versionMenu)
        // data.menuList.push(urlMenu)
        fnAddDynamicMenuRoutes(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url != null) {
      // if (menuList.length > 7) {
      //   menuList.splice(3, 1)
      // };
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // menuList[i].con = menuList[i].url

      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    // console.log('\n%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    // console.log(mainRoutes.children)
    // console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->\n\n', 'color:blue')
  }
}

export default router
