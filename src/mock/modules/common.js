// 登录
export function login () {
  return {
    isOpen: true,
    url: '/sys/login',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'expire': 43200,
      'token': '573a5cb08506e7ee35a3445ab3aff3da'
    }
  }
}

// 退出
export function logout () {
  return {
    isOpen: true,
    url: '/sys/logout',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
