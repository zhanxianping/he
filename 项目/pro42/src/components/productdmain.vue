<template>
	<div class="main" v-cloak>
		<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :height="this.$store.state.order.height"
		 @selection-change="handleSelectionChange">
			<el-table-column label="商品图片">
				<template slot-scope="scope"><img :src="scope.row.img1" alt="" style="width: 100px;height: 100px;"></template>
			</el-table-column>
			<el-table-column label="商品名称">
				<template slot-scope="scope">{{ scope.row.g_name }}</template>
			</el-table-column>
			<el-table-column label="商品售价">
				<template slot-scope="scope">{{ scope.row.rmb }}</template>
			</el-table-column>
			<el-table-column label="商品库存">
				<template slot-scope="scope">{{ scope.row.number }}</template>
			</el-table-column>
			<el-table-column label="操作" style="text-align: center;">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleXj(scope.$index, scope.row)">下架</el-button>
					<el-button size="mini" @click="handleBj(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" @click="handleSel(scope.$index, scope.row)">详情</el-button>
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
				this.multipleSelection = val;
			},
			handleXj(index, row) {
				this.$confirm('您确定要下架该商品吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.get('/productdxj', {
						params:{
							id:row.id
						}
					}).then(function(res) {
					})
					this.$message({
						type: 'success',
						message: '下架成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消下架'
					});
				});
			},
			handleBj(index, row) {
				oVue.$emit('proshow',row.id)
			},
			handleSel(index, row) {
				oVue.$emit('proshow2',row.id)
			},
			start() {
				let _this=this;
				this.$axios.get('/productdstart', {
				}).then(function(res) {
					console.log(res)
					_this.show(res);
				})
			},
			show(res){
				let _this=this;
				this.tableData=[];
				res.data.data.data.forEach(function(v,i){
					_this.tableData.push(v)
				})
				oVue.$emit('changepages',res.data.data.pages)
			}
		},
		mounted() {
			let _this=this;
			this.start();
			oVue.$on('prosend',function(res){
				_this.show(res);
			})
		},
		beforeMount() {
			this.$store.commit('setheight2');
		},
	}
</script>

<style  scoped="scoped">
	.productd .cell {
		text-align: center;
	}

	.productd .main {
		margin-top: 1%;
	}
</style>
