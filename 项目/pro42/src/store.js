import Vue from 'vue'
import Vuex from 'vuex'
import order from './../public/order'
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
  	order
  }
})
