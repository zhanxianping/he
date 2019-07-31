<template>
	<div class="ordertab">
		
		<el-input placeholder="请输入订单编号" v-model="input" clearable style="width: 20%;" size="small"></el-input>
		
		<el-select v-model="value" placeholder="收货人姓名" size="small" style="width: 8%;margin-left: 3%;margin-right: 1%;">
			<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
		</el-select>
		
		<el-input placeholder="" v-model="input2" clearable style="width: 20%;" size="small"></el-input>
		
		<el-button icon="el-icon-search" size="small"  style="margin-left: 3%;" @click="sel">搜索</el-button>
		
	</div>
</template>

<script>
	import oVue from './../vm.js'
	export default {
		name: 'ordertab',
		data() {
			return {
				input:'',
				input2:'',
				value: '',
				options: [{
					value: '1',
					label: '收货人姓名'
				},{
					value: '2',
					label: '收货人电话'
				}]
			}
		},
		methods:{
			sel(){
				if(!this.value){
					this.input2=''
				}
				if(this.input.trim() || this.input2.trim()){
					if(this.input.trim()){
						this.input2='';
						this.value=''
					}
					let arr=[this.input,this.input2,this.value];
					this.$parent.$parent.$data.currentName='first';
					this.toindex(arr)
				}
			},
			toindex(arr){
				oVue.$emit('tabindex1',arr);
			},
			iclear(){
				this.input=''
				this.input2=''
				this.value=''
			}
		},
		mounted(){
			let _this=this;
			oVue.$on('iclear',function(){
				_this.iclear()
			});
		}
	}
</script>

<style scoped="scoped">
</style>
