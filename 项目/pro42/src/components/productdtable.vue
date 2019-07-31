<template>
	<el-row id='table'>
		<el-dialog title="商品信息" :visible.sync="dialogVisible" style="padding-bottom: 0;padding-top: 0;">
			<!-- 手表名称  手表系列 手表颜色  手表型号  手表性别  手表售价   手表库存  手表状态 -->
			<el-row>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
					<el-table-column label="手表名称 " width="200">
						<template slot-scope="scope">
							<el-input placeholder="" v-model="scope.row.g_name " clearable style="width: 100%;" size="small"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="手表系列" width="200">
						<template slot-scope="scope">
							<el-select v-model="scope.row.s_name" placeholder="系列" size="small" style="width: 100%;margin-left: 3%;margin-right: 1%;">
								<el-option v-for="item in options" :key="item.id" :label="item.s_name" :value="item.id"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="手表颜色" width="200">
						<template slot-scope="scope">
							<el-input placeholder="" v-model="scope.row.colour" clearable style="width: 100%;" size="small"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="手表型号" width="200">
						<template slot-scope="scope">
							<el-input placeholder="" v-model="scope.row.size" clearable style="width: 100%;" size="small"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="手表性别" width="200">
						<template slot-scope="scope">
							<el-select v-model="scope.row.sex" placeholder="性别" size="small" style="width: 100%;margin-left: 3%;margin-right: 1%;">
								<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<el-row>
				<el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
					<el-table-column label="手表售价 " width="200">
						<template slot-scope="scope">
							<el-input placeholder="" v-model="scope.row.rmb " clearable style="width: 100%;" size="small">元</el-input>
						</template>
					</el-table-column>
					<el-table-column label="手表销量" width="200">
						<template slot-scope="scope">{{ scope.row.sales }}</template>
					</el-table-column>
					<el-table-column label="手表库存 " width="200">
						<template slot-scope="scope">
							<el-input placeholder="" v-model="scope.row.number" clearable style="width: 100%;" size="small"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="手表状态 " width="200">
						<template slot-scope="scope">
							<el-select v-model="scope.row.state" placeholder="性别" size="small" style="width: 100%;margin-left: 3%;margin-right: 1%;">
								<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</template>
					</el-table-column>
				</el-table>
			</el-row>
			<!-- 商品图片 -->
			<el-row>
				<el-upload class="avatar-uploader" action="http://127.0.0.1:8080/czyfileupload" :show-file-list="false" :on-success="handleAvatarSuccess"
				 :before-upload="beforeAvatarUpload" name="files">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-upload class="avatar-uploader" action="http://127.0.0.1:8080/czyfileupload" :show-file-list="false" :on-success="handleAvatarSuccess1"
				 :before-upload="beforeAvatarUpload" name="files">
					<img v-if="imageUrl1" :src="imageUrl1" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-upload class="avatar-uploader" action="http://127.0.0.1:8080/czyfileupload" :show-file-list="false" :on-success="handleAvatarSuccess2"
				 :before-upload="beforeAvatarUpload" name="files">
					<img v-if="imageUrl2" :src="imageUrl2" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-row>
			<!--  -->
			<div slot="footer" class="dialog-footer" style="margin-top: 15px;">
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
				tableData: [],
				imageUrl: '',
				imageUrl1: '',
				imageUrl2: '',
				options: [],
				options1: [{
					value: '男',
					label: '男'
				}, {
					value: '女',
					label: '女'
				}],
				options2: [{
					value: '已上架',
					label: '已上架'
				}, {
					value: '已下架',
					label: '已下架'
				}]
			};
		},
		methods: {
			handleAvatarSuccess(response, file, fileList) {
				this.imageUrl = URL.createObjectURL(file.raw);
				let arr = response.path.split('\\');
				this.tableData[0].img1 = "http://localhost:8080/public/"+arr[1]+'/'+ arr[2];
			},
			handleAvatarSuccess1(response, file, fileList) {
				this.imageUrl1 = URL.createObjectURL(file.raw);
				let arr = response.path.split('\\');
				this.tableData[0].img2 = "http://localhost:8080/public/"+arr[1]+'/'+ arr[2];
			},
			handleAvatarSuccess2(response, file, fileList) {
				this.imageUrl2 = URL.createObjectURL(file.raw);
				let arr = response.path.split('\\');
				console.log(arr[1])
				this.tableData[0].img3 = "http://localhost:8080/public/"+arr[1]+'/'+ arr[2];
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			hide() {
				this.dialogVisible = false;
			},
			msg() {
				let _this = this;
				this.$confirm('您确定要保存修改吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.hide()
					_this.changegoods();
					this.$message({
						type: 'success',
						message: '修改成功!'
					});
				}).catch(() => {
					_this.hide()
					this.$message({
						type: 'info',
						message: '取消修改'
					});
				});
			},
			save() {
				this.msg()
			},
			changegoods(data) {
				
				
				// let postData = this.$qs.stringify({
				//     currentPage: this.currentPage,
				//     pagesize:this.pagesize,
				//     page:this.pageTheme,
				// });
				// this.$axios({
				//     method: 'post',
				//     url: '/zxpClient',
				//     data: postData
				// })
				
				
				let _this = this;
				let json = this.$qs.stringify({
				   data:this.tableData[0]
				});
				this.$axios({
					method:'post',
					url:'/changeg',
					data:json
				}).then(function(res) {
					oVue.$emit('/chstatr')
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
					_this.goodstart(res.data.data.data[0]);
					_this.series(res.data.data.data1);
				})
			},
			goodstart(res) {
				this.imageUrl = res.img1;
				this.imageUrl1 = res.img2;
				this.imageUrl2 = res.img3;
			},
			series(res) {
				let _this = this;
				this.options = [];
				res.forEach(v => {
					_this.options.push(v)
				})
			}
		},
		mounted() {
			let _this = this;
			oVue.$on('proshow', function(res) {
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
