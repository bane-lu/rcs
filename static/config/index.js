/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {};

  // 域名
  // 测试环境
  // window.SITE_CONFIG['basePath'] = 'http://221.176.34.113:8080';
  // window.SITE_CONFIG['basePath'] = 'http://192.168.203.250:10006';
  window.SITE_CONFIG['basePath'] = 'https://mywxtest.zone139.com:9000';

  // 预发布
  // window.SITE_CONFIG['basePath'] = 'http://221.176.34.113:8761';
// 
  // api接口请求地址
  window.SITE_CONFIG['baseUrl'] = window.SITE_CONFIG['basePath'] + '/web-manager';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version
})();
