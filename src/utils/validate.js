/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 仅汉字
 * @param {*} s
 */
export function isChinese (s) {
  return /^[\u4e00-\u9fa5]{1,20}$/.test(s)
}

/**
 * 仅英文
 * @param {*} s
 */
export function isEnglish (s) {
  return /^([a-zA-Z]|[0-9]|[._])*$/.test(s)
}

/**
 * 仅数字
 * @param {*} s
 */
export function isNumber (s) {
  return /^([0-9]{8})*$/.test(s)
}

/**
 * 特殊字符不能输入
 * @param {*} s
 */
export function isUniqueChart (s) {
  return /^([a-zA-Z]|[\u4E00-\u9FA5]|[0-9]|[,.~!-]|[\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b\uff01])*$/.test(s)
}

/**
 * 非字符串限制
 * @param {*} s
 */
export function isForbiddenChart (s) {
  // return /[@#\$%\^&\*]+/g.test(s)
}

/**
 * verison   2.4.3
 * @param {*} s
 */
export function isVersion (s) {
  return /^([0-9]{1,20})+((.[0-9]{1,20}){2,5})$/.test(s)
}

/**
 * isRedDot
 * @param {*} s
 */
export function isRedDot (s) {
  return /^[0-9]{1,8}$/.test(s)
}

/**
 * 时间戳比较
 * @param {*} s
 */
export function compareTime (a, b, timeVal) {
  let minDate = new Date(a)
  let maxDate = new Date(b)
  let chazhi = maxDate.getTime() - minDate.getTime()
  // console.log(minDate.getTime())
  // console.log(maxDate.getTime())
  // console.log(chazhi)
  if (chazhi < timeVal) {
    return false
  } else {
    return true
  }
}

/**
 * 仅号码段
 * @param {*} s
 */
export function isNumberLib (s) {
  return /^([0-9])*$/.test(s)
}
