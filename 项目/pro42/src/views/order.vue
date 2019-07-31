<template>
	<div class="order">
		<el-container>
			<el-header style="height: 40px;">
				<el-row>
					<span>所在位置:</span>
					<span>订单信息</span>
				</el-row>
			</el-header>
			<el-main>
				<ordertable></ordertable>
				<el-row>
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-tab-pane label="订单信息" name="first">
							<ordertab></ordertab>
							<ordermain></ordermain>
							<orderbot></orderbot>
						</el-tab-pane>
						<el-tab-pane label="待审核订单" name="second">
							<ordertab></ordertab>
							<ordermain1></ordermain1>
							<orderbot></orderbot>
						</el-tab-pane>
						<el-tab-pane label="待出库" name="third">
							<ordertab></ordertab>
							<ordermain2></ordermain2>
							<orderbot></orderbot>
						</el-tab-pane>
						<el-tab-pane label="待收货" name="five">
							<ordertab></ordertab>
							<ordermain3></ordermain3>
							<orderbot></orderbot>
						</el-tab-pane>
						<el-tab-pane label="已收货" name="six">
							<ordertab></ordertab>
							<ordermain4></ordermain4>
							<orderbot></orderbot>
						</el-tab-pane>
						<el-tab-pane label="已完成" name="seven">
							<ordertab></ordertab>
							<ordermain5></ordermain5>
							<orderbot></orderbot>
						</el-tab-pane>
						<el-tab-pane label="已作废" name="eight">
							<ordertab></ordertab>
							<ordermain6></ordermain6>
							<orderbot></orderbot>
						</el-tab-pane>
					</el-tabs>
				</el-row>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import ordertab from './../components/ordertab.vue'
	import ordermain from './../components/ordermain.vue'
	import ordermain1 from './../components/ordermain1.vue'
	import ordermain2 from './../components/ordermain2.vue'
	import ordermain3 from './../components/ordermain3.vue'
	import ordermain4 from './../components/ordermain4.vue'
	import ordermain5 from './../components/ordermain5.vue'
	import ordermain6 from './../components/ordermain6.vue'
	import orderbot from './../components/orderbot.vue'
	import ordertable from './../components/ordertable.vue'
	import oVue from './../vm.js'
	export default {
		name: 'order',
		data() {
			return {
				activeName: 'first'
			};
		},
		methods: {
			handleClick(tab, event) {
				this.$store.commit('change',tab.index);
				this.$store.commit('setheight');
				oVue.$emit('iclear');
				this.toindex(tab.index);
			},
			toindex(index){
				oVue.$emit('changepages',0);
				switch(index){
					case '0':
						oVue.$emit('tabindex1',index);
						break;
					case '1':
						oVue.$emit('tabindex2',index);
						break;
					case '2':
						oVue.$emit('tabindex3',index);
						break;
					case '3':
						oVue.$emit('tabindex4',index);
						break;
					case '4':
						oVue.$emit('tabindex5',index);
						break;
					case '5':
						oVue.$emit('tabindex6',index);
						break;
					case '6':
						oVue.$emit('tabindex7',index);
						break;
				}
			}
		},
		components: {
			ordertab,
			orderbot,
			ordermain,
			ordermain1,
			ordermain2,
			ordermain3,
			ordermain4,
			ordermain5,
			ordermain6,
			ordertable
		}
	}
</script>

<style  scoped>
	body{
		margin: 0;
	}
	.order {
		text-align: left;
	}

	.order .el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 40px;
	}

	.order .el-main {
		background-color: #E9EEF3;
		color: #333;
	}
</style>
