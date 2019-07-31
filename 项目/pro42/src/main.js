import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from  'axios';
import qs from 'qs';
import echarts from 'echarts';

Vue.prototype.$qs = qs;
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
/*axios.defaults.timeout=5000;*/
Vue.prototype.$axios = axios;
axios.defaults.baseURL="http://localhost:8080";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
