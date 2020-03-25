import request from '@/utils/request'

// 管理员API
export function userList(params) {
  return request({
    url: '/sys/user/list',
    method: 'get',
    params
  })
}

export function getRoleList() {
  return request({
    url: '/sys/role/select',
    method: 'get'
  })
}

export function userDataFormSubmit(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function userDelete(data) {
  return request({
    url: '/sys/user/delete',
    method: 'post',
    data
  })
}

export function userUpdate(url) {
  return request({
    url,
    method: 'get'
  })
}

// 角色管理API
export function roleInfo(url) {
  return request({
    url,
    method: 'get'
  })
}

export function roleList(params) {
  return request({
    url: '/sys/role/list',
    method: 'get',
    params
  })
}

export function roleDataFormSubmit(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function roleDelete(data) {
  return request({
    url: '/sys/role/delete',
    method: 'post',
    data
  })
}

// 菜单管理API
export function menuInfo(url) {
  return request({
    url,
    method: 'get'
  })
}

export function menuList() {
  return request({
    url: '/sys/menu/list',
    method: 'get'
  })
}

export function menuSelect() {
  return request({
    url: '/sys/menu/select',
    method: 'get'
  })
}

export function menuDataFormSubmit(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

export function menuDelete(url) {
  return request({
    url,
    method: 'post'
  })
}

// 文件上传
export function ossList(params) {
  return request({
    url: '/sys/oss/list',
    method: 'get',
    params
  })
}

export function ossConfig() {
  return request({
    url: '/sys/oss/config',
    method: 'get'
  })
}

export function ossSaveConfig(data) {
  return request({
    url: '/sys/oss/saveConfig',
    method: 'post',
    data
  })
}

export function ossDelete(data) {
  return request({
    url: '/sys/oss/delete',
    method: 'post',
    data
  })
}
// 系统日记
export function logList(params) {
  return request({
    url: '/sys/log/list',
    method: 'get',
    params
  })
}
// 参数管理
export function configList(params) {
  return request({
    url: '/sys/config/list',
    method: 'get',
    params
  })
}

export function configDelete(data) {
  return request({
    url: '/sys/config/delete',
    method: 'post',
    data
  })
}

export function configInfo(url) {
  return request({
    url,
    method: 'get'
  })
}

export function configDataFormSubmit(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

// 定时任务

export function jobList(params) {
  return request({
    url: '/sys/schedule/list',
    method: 'get',
    params
  })
}

export function jobDelete(data) {
  return request({
    url: '/sys/schedule/delete',
    method: 'post',
    data
  })
}

export function jobPause(data) {
  return request({
    url: '/sys/schedule/pause',
    method: 'post',
    data
  })
}

export function jobResume(data) {
  return request({
    url: '/sys/schedule/resume',
    method: 'post',
    data
  })
}

export function jobRun(data) {
  return request({
    url: '/sys/schedule/run',
    method: 'post',
    data
  })
}

export function jobLogList(params) {
  return request({
    url: '/sys/scheduleLog/list',
    method: 'get',
    params
  })
}

export function jobLogInfo(url) {
  return request({
    url,
    method: 'get'
  })
}

export function jobInfo(url) {
  return request({
    url,
    method: 'get'
  })
}

export function jobDataFormSubmit(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

