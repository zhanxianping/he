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
		name: 'ordertab',
		data() {
			return {
				currentPage: 4,
				pages: 400,
				value: false
			}
		},
		methods: {
			handleCurrentChange(val) {
				let date={
					now:`${val}`,
					data:`${this.$store.state.order.date}`
				};
				this.start(date)
			},
			start(data) {
				let _this=this;
				this.$axios.get('/ordervue', {
					params: {
						data: data,
					}
				}).then(function(res) {
					switch(_this.$store.state.order.tabindex.toString()){
						case '0':
							oVue.$emit('send0',res);
							break;
						case '1':
							oVue.$emit('send1',res);
							break;
						case '2':
							oVue.$emit('send2',res);
							break;
						case '3':
							oVue.$emit('send3',res);
							break;
						case '4':
							oVue.$emit('send4',res);
							break;
						case '5':
							oVue.$emit('send5',res);
							break;
						case '6':
							oVue.$emit('send6',res);
							break;
					}
				})
			}
		},
		mounted() {
			let _this=this;
			oVue.$on('changepages',function(res){
				_this.pages=res*10;
				if (_this.pages <= 10) {
					_this.value = true
				}
			})
		}
	}
</script>

<style scoped="scoped">
	.order #orderbot li,.order #orderbot .btn-prev,.order #orderbot .btn-next{
		background: white;
	}
	.order #orderbot .active{
		color: #efa4a4;
	}
</style>
