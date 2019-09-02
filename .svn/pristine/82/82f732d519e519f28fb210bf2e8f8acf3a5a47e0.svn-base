export default {
  getUrlList(data) {
    const u = JSON.parse(sessionStorage.getItem('userUrl'));
    const d = [];
    let p;
    for (let i = 0; i < u.length; i++) {
      for (let j = 0; j < u[i].children.length; j++) {
        d.push(u[i].children[j]);
      }
    }
    for (let r = 0;r < d.length;r++) {
      if (d[r].path == data.path) {
        p = d[r].meta.operate;
      }
    }
    return p;
  }
};
