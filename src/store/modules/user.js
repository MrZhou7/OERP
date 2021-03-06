import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getViews, recursionRouter } from '@/utils/auth'
import basisData from '@/api/basisData'
import axios from 'axios'
import routers from '@/router'
import { dynamicRoutes } from '@/router/index'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    act: [], // 合同类型
    editableTabs: [], // 查询内容
    tabsName: '', // 查询内容
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    act: (state, res) => {
      state.act = res
    },
    editableTabs: (state, editable) => {
      state.editableTabs = editable
    },
    tabsName: (state, tabsName) => {
      state.tabsName = tabsName
    },

    LOGIN_IN(state, token) {
      state.UserToken = token
    },
    LOGIN_OUT(state) {
      state.UserToken = ''
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.staff_num.trim();
      return new Promise((resolve, reject) => {
        const u = process.env.BASE_API;
        const s = u.substring(0, u.length - 3);
        axios.post(s + 'permission/login/doLogin', { staff_num: username, password: userInfo.password }).then(res => {
          sessionStorage.setItem('useInfo', JSON.stringify(res.data.data.info));
          // const routes = recursionRouter(JSON.parse(res.data.data.list), dynamicRoutes);
          // routes.push.apply(routes, routers.options.routes);
          // console.log(routes)
          // routers.options.routes = routes
          // routers.addRoutes(routes);
          // sessionStorage.setItem('dataInfo', JSON.stringify(routes))
          commit('SET_TOKEN', JSON.parse(res.data.data.list));
          resolve()
        }).catch((err) => {
          reject(err)
        });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles);
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      sessionStorage.removeItem('useInfo');
      sessionStorage.clear();
      routers.push({ path: '/login' });
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('SET_TOKEN', '')
      //     commit('SET_ROLES', [])
      //     removeToken()
      //     resolve()
      //   }).catch(error => {
      //     reject(error)
      //   })
      // })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 获取基础信息
    getMineBaseApi({ commit }) {
      basisData.mineBaseMsgApi()
        .then(res => {
          commit('act', res.data)
        })
    }
  }
}

export default user
