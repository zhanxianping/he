<template>
	<div class="home">
		<el-container>
  			<el-header><span>所在位置:</span><span class="col"> 库存预警</span></el-header>
  			<el-main>
  				<goods1></goods1>
  			</el-main>
		</el-container>
	</div>
	
</template>

<script>
	import goods1 from './../components/GoodsWarehousing1.vue'
	export default {
		name:'home',
		components: {
			goods1
		}
	}
</script>
	
<style  scoped>
	.col{
		color: #0088CC;
	}
	.el-header, .el-footer {
    	background-color: #B3C0D1;
    	color: #333;
    	line-height: 3.5rem;
  	}
  	.el-main {
    	background-color: #E9EEF3;
    	color: #333;
  }

</style>