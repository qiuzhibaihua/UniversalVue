import { menuNav } from '@/api/nav'
import { asyncRouterMap, constantRouterMap } from '@/router'
import Layout from '@/views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    permissions: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve, reject) => {
        menuNav().then(({ data }) => {
          if (!data.code) {
            const vData = data.menuList
            const newDatas = vData.map(v => {
              const newRouters = {
                path: '',
                component: Layout,
                name: v.url,
                meta: {
                  title: v.name, icon: v.icon
                },
                children: v.list === null ? [] : v.list.map(res => {
                  return {
                    path: `${res.url}`,
                    name: res.url,
                    component: () => import(`@/views/${res.url}`),
                    meta: { title: res.name }
                  }
                })
              }
              return newRouters
            })
            const accessedRouters = [...asyncRouterMap, ...newDatas]
            commit('SET_ROUTERS', accessedRouters)
            commit('SET_PERMISSIONS', data.permissions)
          }
          resolve(data.code)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission

// {
//   path: '/example',
//   component: Layout,
//   redirect: '/example/table',
//   name: 'Example',
//   meta: { title: 'Example', icon: 'example' },
//   children: [
//     {
//       path: 'table',
//       name: 'Table',
//       component: () => import('@/views/table/index'),
//       meta: { title: 'Table', icon: 'table' }
//     },
//     {
//       path: 'tree',
//       name: 'Tree',
//       component: () => import('@/views/tree/index'),
//       meta: { title: 'Tree', icon: 'tree' }
//     }
//   ]
// },
// {
//   path: '/icon',
//   component: Layout,
//   children: [{
//     path: 'index',
//     component: () => import('@/views/svg-icons/index'),
//     name: 'icons',
//     meta: { title: 'icons', icon: 'icon', noCache: true }
//   }]
// }
