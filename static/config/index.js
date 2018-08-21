/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // 域名
  // window.SITE_CONFIG['basePath'] = 'http://221.176.34.113';
  window.SITE_CONFIG['basePath'] = 'http://192.168.185.250';
  // api接口请求地址
  // 测试环境
  // window.SITE_CONFIG['baseUrl'] = window.SITE_CONFIG['basePath'] + ':8080/web-manager';
  window.SITE_CONFIG['baseUrl'] = window.SITE_CONFIG['basePath'] + ':10006/web-manager';


  // 预生产
  // window.SITE_CONFIG['baseUrl'] = '//221.176.34.113:8761/web-manager';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})();
