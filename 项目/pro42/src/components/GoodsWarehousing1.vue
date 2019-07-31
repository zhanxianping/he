<template>
	<el-row>
		<el-col :span="24">
			<div id="box">
				<el-col :span='14'><div class="box1"></div></el-col>
				<el-col :span="3">
					<el-input  v-model="input" placeholder="请输入商品编号"></el-input>
				</el-col>
				<el-col :span="3"><el-input  v-model="input1" placeholder="查找销量少于多少的商品"></el-input></el-col>
				<el-col :span="1"><el-button class="btn1" icon="el-icon-search" @click="s1">搜索</el-button></el-col>
			</div>
		</el-col>
		<el-col :span="24"><div class="box1"></div></el-col>
		<el-col :span="24">
			  	<el-table ref="multipleTable" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"  style="width: 100%">
					<el-table-column type="index" :index="indexMethod" width="55"></el-table-column>
				    <el-table-column prop="g_name" label="商品名称" width="auto"></el-table-column>
				    <el-table-column prop="sales" label="销量" width="auto"></el-table-column>
				    <el-table-column prop="s_name" label="系列" width="auto"></el-table-column>
				    <el-table-column prop="size" label="规格" width="auto"></el-table-column>
				    <el-table-column prop="id" label="商品编码" width="auto"></el-table-column>
				    <el-table-column prop="number" label="库存量" width="auto"> </el-table-column>
				    <el-table-column label="操作">
				      <template slot-scope="scope">
				         <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">下架</el-button>
				      </template>
				    </el-table-column>
				  </el-table>
		</el-col>	
		
		<el-col :span="24">
			<div class="box2">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10,20,50,100]" :page-size="pagesize" background layout="prev, pager, next, jumper" :total="tableData.length">
			    </el-pagination>
			</div>
		</el-col>
		
	</el-row>
	
</template>

<script>
	 
export default {
    data() {
      return {
      	input: '',
      	input1:'',
        tableData: [],
        multipleSelection: [],
        pagesize:10,
        currentPage: 1, 
      }
    },

    methods: {
		indexMethod(index){
			return index *1
		},
		s2(){
			this.$axios({
    			method: 'post',
				url: '/GoodsWarehousing1'
    		}).then((res)=>{
    			this.tableData = res.data.data;
    			
    	})
		},
		s1(){
			let _this=this;
			if(!this.input==''){
				this.$axios.post('/GoodsWarehousing2',{
				params:{
					input:this.input,
				}
			}).then((res)=>{
				this.tableData = res.data.data;
			
			});
			}else{
				this.$axios.post('/GoodsWarehousing3',{
				params:{
					input1:this.input1,
				}
			})
			.then((res)=>{
				this.tableData =res.data.data;
				
			})	
			}	
		},
    
      
      handleEdit(index,row) {
      	let _this=this;
      	let postData = this.$qs.stringify({
                    id: row.id,
                });
       	this.$axios({
       		method:'post',
       		url:'/GoodsWarehousing4',
       		data:postData
       	}).then((res)=>_this.s2())
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      	/*初始页currentPage、初始每页数据数pagesize和数据data*/
      handleSizeChange:function(size) {
       this.pagesize =size;
      },
      handleCurrentChange:function(currentPage){
        this.currentPage = currentPage;
      }
    },
     mounted(){
        this.$axios({
    			method: 'post',
				url: '/GoodsWarehousing1'
    		}).then((res)=>{
    			this.tableData = res.data.data;	
    	})
       }
     }
	 
</script>

<style>
	#box{
		height: 70px;
		border: 1px solid #333333;
		line-height: 70px;
	}
	.box1{
		height: 40px;
	}
	.box2{
		text-align: center;
	}
	.btn1{
		height: 40px;
	}
	.box3{
		
	}
  
</style>