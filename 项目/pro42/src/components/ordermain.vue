<template>
	<div class="ordermain" v-cloak>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :height="this.$store.state.order.height"
		 @selection-change="handleSelectionChange">
			<el-table-column label="订单编号">
				<template slot-scope="scope">{{ scope.row.id }}</template>
			</el-table-column>
			<el-table-column label="订单金额">
				<template slot-scope="scope">{{ scope.row.money }}</template>
			</el-table-column>
			<el-table-column label="下单时间">
				<template slot-scope="scope">{{ scope.row.time }}</template>
			</el-table-column>
			<el-table-column label="订单状态">
				<template slot-scope="scope">{{ scope.row.state }}</template>
			</el-table-column>
			<el-table-column label="操作" style="text-align: center;">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleSel(scope.$index, scope.row)">查看订单</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import oVue from './../vm.js'

	export default {
		data() {
			return {
				tableData: [],

				multipleSelection: []
			}
		},
		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				console.log(val)
				this.multipleSelection = val;
			},
			handleSel(index, row) {
				oVue.$emit('showf', row);
				// console.log(index, row, this.$parent.$children);
			},
			start(data) {
				let _this=this;
				this.$axios.get('/ordervue', {
					params: {
						data: data,
					}
				}).then(function(res) {
					_this.showt(res)
				})
			},
			showt(res){
				this.tableData=[];
				let _this=this;
				let data1 = res.data.data.data1;
				let pages=res.data.data.pages;
				res.data.data.data.forEach(function(v, i) {
					 let data= {
						id: v.id,
						money: v.money,
						goodsid: v.goods,
						goodsnum: v.number,
						time: v.time,
						state:v.state,
						pay: v.pay,
						addre: v.address,
						address:[],
					}
					data1[i].forEach(function(v){
						let address={
							name:v.name,
							phone:v.phone,
							address:v.province+v.city+v.address
						}
						data.address.push(address);
					})
					_this.tableData.push(data)
				})
				oVue.$emit('changepages',pages);
			}
		},
		mounted() {
			this.start('0');
			let _this = this;
			oVue.$on('tabindex1', function(res) {
				_this.$store.commit('changedate', res);
				_this.start(res)
			});
			oVue.$on('send0',function(res){
				_this.showt(res)
			})
		},
		beforeMount() {
			this.$store.commit('setheight');
		},
		components: {}
	}
</script>

<style scoped="scoped">
	.order .cell {
		text-align: center;
	}

	.order .ordermain {
		margin-top: 1%;
	}
</style>
