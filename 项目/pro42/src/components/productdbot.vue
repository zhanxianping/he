<template>
	<div class="orderbot" id="orderbot">
		<el-pagination @current-change="handleCurrentChange" :hide-on-single-page="value" layout=" prev, pager, next, jumper"
		 :total="pages" style='text-align: center;margin-top: 10px;' background>
		</el-pagination>
	</div>
</template>

<script>
	import oVue from './../vm.js'
	export default {
		data() {
			return {
				currentPage: 4,
				pages: 400,
				value: false
			}
		},
		methods: {
			handleCurrentChange(val) {
				let state=this.$store.state.order.productdstate.split(',');
				if(state[1]==2 || !state[1]){
					this.start(val,state[0]);
				}
			},
			start(num,state) {
				let _this=this;
				this.$axios.get('/productdnow', {
					params: {
						num: num,
						state:state
					}
				}).then(function(res) {
					oVue.$emit('prosend',res)
				})
			}
		},
		mounted() {
			let _this=this;
			oVue.$on('changepages',function(res){
				_this.pages=res*10;
				if(_this.pages<=10){
					_this.value=true
				}
			})
		}
	}
</script>

<style  scoped="scoped">
	.productd #orderbot li,.productd #orderbot .btn-prev,.productd #orderbot .btn-next{
		background: white;
	}
	.productd #orderbot .active{
		color: #efa4a4;
	}
</style>
