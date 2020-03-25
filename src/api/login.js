import request from '@/utils/request'

export function login(username, password, uuid, captcha) {
  const data = {
    username,
    password,
    uuid,
    captcha
  }
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'post'
  })
}
