<template>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="sname" label="姓名" width="180"></el-table-column>
        <el-table-column prop="sposition" label="职位" width="180"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                    <el-checkbox v-model="scope.sFirst" disabled>首页</el-checkbox>
                    <el-checkbox v-model="scope.commodity" @change="show(scope.row,)">商品</el-checkbox>
                    <el-checkbox v-model="scope.Warehouse" @change="show(scope.row)">商品仓库</el-checkbox>
                    <el-checkbox v-model="scope.sOrder" @change="show(scope.row)">订单管理</el-checkbox>
                    <el-checkbox v-model="scope.Purchase" @change="show(scope.row)">采购</el-checkbox>
                    <el-checkbox v-model="scope.Setup" disabled @change="show(scope.row)">设置</el-checkbox>
                    <el-checkbox v-model="scope.Jurisdiction" @change="show(scope.row)">权限</el-checkbox>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "lwEstablish",
        data:function() {
            return {
                tableData: [
                ],
               zzz:false,
                xxx:true
        }
    },
        methods:{
            show(val){

                /* let _this=this;
                 this.$axios.get('/api/nod',{
                     params:{
                         id:val.id,
                         commodity:val.commodity,
                         Warehouse:val.Warehouse,
                         sOrder:val.sOrder,
                         Purchase:val.Purchase,
                         Jurisdiction:val.Jurisdiction
                     }
                 }).then((res)=>{
                     _this.start()
                 });*/

            },
            start(){
                this.$axios.get('/api/Tin',{


                }).then((res)=>{
                    this.tableData=res.data.data;
                   function a() {
                       if (res.data.data==0) {
                           this.xxx=true
                       }else {
                           this.zzz=false
                       }
                   }
                   /* console.log(res.data.data);*/
                });
            }
        },
        mounted(){
            this.start();
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        list-style: none;
    }
</style>