<template>
	<el-row id='tablee'>
		<el-dialog title="收货地址" :visible.sync="dialogVisible" style="padding-bottom: 0;padding-top: 0;">
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="订单编号">
				</el-table-column>
				<el-table-column prop="money" label="订单金额">
				</el-table-column>
				<el-table-column prop="state" label="订单状态">
				</el-table-column>
				<el-table-column prop="pay" label="支付方式">
				</el-table-column>
			</el-table>
			<el-table :data="tableData1" style="width: 100%">
				<el-table-column prop="goodsid" label="商品编号" width="180">
				</el-table-column>
				<el-table-column prop="goodsnum" label="商品数量" width="180">
				</el-table-column>
			</el-table>
			<el-table :data="tableData2" style="width: 100%">
				<el-table-column label="收货人姓名" width="180">
					<template slot-scope="scope">{{ scope.row.name }}</template>
				</el-table-column>
				<el-table-column label="收货人电话" width="180">
					<template slot-scope="scope">{{ scope.row.tel }}</template>
				</el-table-column>
				<el-table-column label="收货人地址">
					<template slot-scope="scope">{{ scope.row.address }}</template>
				</el-table-column>
			</el-table>
			
				<el-button v-show="this.$store.state.order.tabindex==1||this.$store.state.order.tabindex==2" size="mini" style="margin: 10px;position: absolute;right: 15px;" @click="hideaddres=!hideaddres">修改地址</el-button>
				<el-table :data="tableData3" style="width: 100%" v-show="hideaddres">
					<el-table-column prop="name" label="收货人姓名" width="180">
					</el-table-column>
					<el-table-column prop="tel" label="收货人电话" width="180">
					</el-table-column>
					<el-table-column prop="address" label="收货人地址">
					</el-table-column>
					<el-table-column label="操作" style="text-align: center;">
						<template slot-scope="scope">
							<el-button size="mini" @click="handleSel(scope.$index, scope.row)">选择</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div slot="footer" class="dialog-footer" style="margin-top: 15px;"  v-show="this.$store.state.order.tabindex==1||this.$store.state.order.tabindex==2">
					<el-button @click="dialogVisible=!dialogVisible">取 消</el-button>
					<el-button type="primary" @click="save">保 存</el-button>
				</div>
		</el-dialog>
	</el-row>
</template>

<script>
	import oVue from './../vm.js'
	export default {
		data() {
			return {
				dialogVisible: false,
				formLabelWidth: '120px',
				tableData: [],
				tableData1: [],
				tableData2: [],
				tableData3: [],
				hideaddres: false
			};
		},
		methods: {
			handleSel(index, row) {
				this.tableData2[0].name = row.name;
				this.tableData2[0].tel = row.tel;
				this.tableData2[0].address = row.address;
				this.hideaddres = !this.hideaddres
				// console.log(index, row, this.$parent.$children);
			},
			chage(data) {
				this.$axios.get('/changeaddres', {
					params: {
						data: data
					}
				}).then(function(res) {
				})
				this.start(this.$store.state.order.tabindex.toString())
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
			},
			save() {
				// 
				this.$confirm('是否保存修改?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.dialogVisible = false;
					let data = {
						id: this.tableData[0].id,
						address: this.tableData2[0]
					}
					this.chage(data);

					this.$message({
						type: 'success',
						message: '修改成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消修改'
					});
				});
				// 
			}
		},
		mounted() {
			let _this = this;
			oVue.$on('showf', function(res) {
				// tableData
				_this.tableData = [{
					id: res.id,
					money: res.money,
					state: res.state,
					pay: res.pay
				}]
				// tableData1
				let goodsid = res.goodsid.split(',');
				let goodsnum = res.goodsnum.split(',');
				for (let i = 0; i < goodsid.length; i++) {
					_this.tableData1[i] = {
						goodsid: goodsid[i],
						goodsnum: goodsnum[i]
					}
				}
				// tableData2
				let addre = res.addre.split(',');
				_this.tableData2 = [{
					name: addre[0],
					tel: addre[1],
					address: addre[2]
				}]
				// tableData3
				res.address.forEach(function(v, i) {
					_this.tableData3[i] = {
						name: v.name,
						tel: v.phone,
						address: v.address
					}
				})
				// 
				_this.dialogVisible = true
			})
		}
	}
</script>

<style scoped="scoped">
	.el-dialog__body {
		padding-top: 0;
		padding-bottom: 0;
	}
	#tablee .el-dialog{
		width: 50%;
		height: 75%;
		overflow-y: scroll;
	}
</style>
