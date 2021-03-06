'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://10.1.200.173/v1/"',
  BASE_Login: '"http://10.1.200.173/"', //登录
  //BASE_API: '"http://10.1.2.168/v1/"',
})
