import axios from 'axios'

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, { act: 'contract' })
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  // 获取我的页面的后台数据
  mineBaseMsgApi() {
    return fetch(process.env.BASE_API + 'table_util/getPreData');
  }
}
