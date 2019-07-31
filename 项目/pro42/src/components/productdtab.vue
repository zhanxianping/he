<template>
	<div class="ordertab">
		
		<el-input placeholder="请输入商品名称" v-model="input1" clearable style="width: 20%;" size="small"></el-input>
		<el-input placeholder="请输入商品编号" v-model="input2" clearable style="width: 20%;margin-left: 3%;margin-right: 1%;" size="small"></el-input>
		
		<el-select v-model="value1" placeholder="库存状态" size="small" style="width: 8%;margin-left: 3%;margin-right: 1%;">
			<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
		
		<el-button icon="el-icon-search" size="small"  style="margin-left: 3%;" @click="sel">搜索</el-button>
		
	</div>
</template>

<script>
	import oVue from './../vm.js'
	export default {
		data() {
			return {
				input1:'',
				input2:'',
				value1: '',
				options1: [{
					value: '1',
					label: '库存充足'
				},{
					value: '2',
					label: '库存告警'
				}]
			}
		},
		methods:{
			sel(){
				let input='';
				if(this.input2){
					this.input1='';
					this.value1= '';
					input=this.input2+',0';
				}else if(this.input1){
					this.value1= '';
					input=this.input1+',1';
				}else if(this.value1){
					input=this.value1+',2';
				}else{
					input=''
				}
				this.$store.commit('changeproductdstate',input);
				if(input){
					this.start(input);
				}
			},
			start(input) {
				let _this=this;
				this.$axios.get('/productdsel', {
					params: {
						data: input
					}
				}).then(function(res) {
					oVue.$emit('prosend',res)
				})
			}
		},
		mounted(){
			let _this=this;
			oVue.$on('/chstatr',()=>{
				let state=this.$store.state.order.productdstate;
					_this.start(state);
			})
		}
	}
</script>

<style  scoped="scoped"></style>
