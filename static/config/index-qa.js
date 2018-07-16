/**
 * 测试环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = '//x.x.x.x:8080/web-manager';
  window.SITE_CONFIG['baseUrl'] = '//221.176.34.113:8080/web-manager';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})();
