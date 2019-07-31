export default {
	state: {
		tabindex: 0,
		height: 0,
		date: "0",
		pages:0,
		productdstate:'',
		flag:true
	},
	getters: {
		// change(state,index){
		// 	state.tabindex = index
		// }
	},
	mutations: {
		change(state, index) {
			state.tabindex = index
		},
		setheight(state) {
			state.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			state.height = (parseInt((state.height - 308) / 53 + 1) < 5 ? 9 : parseInt((state.height - 308) / 53 + 2)) * 53;
		},
		changedate(state, date) {
			state.date = date;
		},
		changepages(state,pages){
			state.pages=pages
		},
		changeproductdstate(state,state2){
			state.productdstate=state2
		},
		setheight2(state) {
			state.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
			state.height = state.height-180<550?550:state.height-180;
		},
		chflag(state){
			state.flag=false
		}
	},
	actions: {
		// red(context){
		// 	setTimeout(function(){
		// 		context.commit('red')
		// 	},1000)
		// }
	}
}
