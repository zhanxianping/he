import Vue from 'vue'
import Router from 'vue-router'
// 詹先平
import ZxpPage from './views/zxp-page.vue'
import zxpClient from './views/zxp-client'
//陈中怡
import productd from './views/productd.vue'
import order from './views/order.vue'
// 李林
import GoodsWarehousing from './views/GoodsWarehousing.vue'
// 龙文
import lwSetup from './components/lw-Setup'
import lwPower from './components/lwPower'
import Navigation from './views/Navigation'

//fhl
import Increase from './views/Increase'
// import Land from './views/Land'

import ccccgd from './views/ccccgd'

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/ccccgd',
			name: 'ccccgd',
			component: ccccgd
		},{
			path: '/Navigation',
			name: 'Navigation',
			component: Navigation
		},{
			path: '/Increase',
			name: 'Increase',
			component: Increase
		},{
			path: '/czyProductd',
			name: 'productd',
			component: productd
		},
		{
			path: '/czyOrder',
			name: 'order',
			component: order
		},
		{
			path: '/',
			name: 'zxpPage',
			component: ZxpPage
		},
		{
			path: '/zxpClient',
			name: 'zxpClient',
			component: zxpClient
		}, {
			path: '/GoodsWarehousing',
			name: 'GoodsWarehousing',
			component: GoodsWarehousing
		}, {
			path: '/lwSetup',
			name: 'lwSetup',
			component: lwSetup
		},
		{
			path: '/lwPower',
			name: 'lwPower',
			component: lwPower
		},
	]
})
