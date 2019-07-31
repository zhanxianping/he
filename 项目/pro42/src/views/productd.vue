<template>
	<div class="productd">
		<productdtable></productdtable>
		<productdtable2></productdtable2>
		<el-container>
			<el-header style="height: 40px;">
				<el-row>
					<span>所在位置:</span>
					<span> 商品信息</span>
				</el-row>
			</el-header>
			<el-main>
				<productdtab></productdtab>
				<productdmain></productdmain>
				<productdbot></productdbot>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import productdtab from './../components/productdtab.vue'
	import productdmain from './../components/productdmain.vue'
	import productdbot from './../components/productdbot.vue'
	import productdtable from './../components/productdtable.vue'
	import productdtable2 from './../components/productdtable2.vue'
	import oVue from './../vm.js'
	export default {
		data() {
			return {
			};
		},
		methods: {
		},
		components: {
			productdtab,
			productdmain,
			productdbot,
			productdtable,
			productdtable2
		}
	}
</script>

<style  scoped>
	body{
		margin: 0;
	}
	.productd {
		text-align: left;
	}

	.productd .el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 40px;
	}

	.productd .el-main {
		background-color: #E9EEF3;
		color: #333;
	}
</style>
