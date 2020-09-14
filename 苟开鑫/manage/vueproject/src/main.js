/*
 * @Author: happy
 * @Date: 2020-09-12 13:35:01
 * @LastEditTime: 2020-09-12 13:46:04
 * @LastEditors: happy
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import Axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
