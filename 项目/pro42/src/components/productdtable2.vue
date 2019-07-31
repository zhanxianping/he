<template>
	<el-row id='table' v-if="tableData.length">
		<el-dialog title="商品信息" :visible.sync="dialogVisible" style="padding-bottom: 0;padding-top: 0;">
			<!-- 手表名称  手表系列 手表颜色  手表型号  手表性别  手表售价   手表库存  手表状态 -->
			<el-row>
				<el-table ref="multipleTable1" :data="tableData" tooltip-effect="dark" style="width: 100%">
					<el-table-column label="手表名称 " width="200" prop="g_name"></el-table-column>
					<el-table-column label="手表系列" width="200" prop="s_name"></el-table-column>
					<el-table-column label="手表颜色" width="200" prop="colour"></el-table-column>
					<el-table-column label="手表型号" width="200" prop="size"></el-table-column>
					<el-table-column label="手表性别" width="200" prop="sex"></el-table-column>
				</el-table>
			</el-row>
			<el-row>
				<el-table ref="multipleTable1" :data="tableData" tooltip-effect="dark" style="width: 100%">
					<el-table-column label="手表售价 " width="200" prop="rmb"></el-table-column>
					<el-table-column label="手表销量" width="200" prop="sales"></el-table-column>
					<el-table-column label="手表库存 " width="200" prop="number"></el-table-column>
					<el-table-column label="手表状态 " width="200" prop="state"></el-table-column>
				</el-table>
			</el-row>
			<!-- 商品图片 -->
			<el-image style="width: 22%;margin-left: 8%;margin-top: 2%;" :src="tableData[0].img1" :fit="cover"></el-image>
			<el-image style="width: 22%;margin-left: 8%;margin-top: 2%;" :src="tableData[0].img2" :fit="cover"></el-image>
			<el-image style="width: 22%;margin-left: 8%;margin-top: 2%;" :src="tableData[0].img3" :fit="cover"></el-image>
		</el-dialog>
	</el-row>
</template>
<script>
	import oVue from './../vm.js'
	export default {
		data() {
			return {
				dialogVisible: false,
				cover: 'cover',
				tableData: []
			};
		},
		methods: {
			hide() {
				this.dialogVisible = false;
			},
			save() {
				this.msg()
			},
			changegoods(data) {
				let _this = this;
				this.$axios.get('/changeg', {
					params: {
						data: _this.tableData[0]
					}
				}).then(function(res) {

				})
			},
			showgoods(id) {
				let _this = this;
				this.$axios.get('/changegoods', {
					params: {
						id: id
					}
				}).then(function(res) {
					_this.tableData = [];
					_this.tableData.push(res.data.data.data[0]);
				})
			}
		},
		mounted() {
			let _this = this;
			oVue.$on('proshow2', function(res) {
				_this.dialogVisible = true;
				_this.showgoods(res)
			})
		}
	}
</script>

<style>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.avatar-uploader {
		margin-top: 3%;
		display: inline-block;
		width: 33%;
	}

	.el-upload {
		margin-left: 20%;
	}

	.productd .el-dialog__body {
		padding-top: 0;
		padding-bottom: 0;
	}

	.productd #table .el-dialog {
		width: 70%;
		height: 560px;
	}
</style>
