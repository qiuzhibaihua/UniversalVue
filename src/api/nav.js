import request from '@/utils/request'

export function menuNav() {
  return request({
    url: '/sys/menu/nav',
    method: 'get'
  })
}
