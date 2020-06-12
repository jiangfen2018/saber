// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import bootstrap from './core/bootstrap'
import './core/lazy_use'
import './permission' // permission control
import './utils/filter' // global filter
import './global.less'

import moment from 'moment'

Vue.config.productionTip = false

// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

// 默认时分秒
Vue.filter('timeFilter', function (value, formatString) {
  // formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  formatString = formatString || 'YYYY-MM-DD'
  if (value) {
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(value) || value instanceof Date) {
        // var val = String(value)
     return moment(value).format(formatString)
    } else {
      return value
    }
  }
  return ''
})

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
