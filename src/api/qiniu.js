import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}

export function upload(form) {
  return request({
    url: '/sys/oss/upload', // 假地址 自行替换
    method: 'post',
    data: form
  })
}
