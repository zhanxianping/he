<template>
   <div id="lwPower">
        <div id="headO">
             &nbsp;&nbsp;&nbsp;&nbsp;<span>所在位置：<span>设置</span></span>
             <div style="width: 100%;height: 40px;background: #0088CC">
                  <p style="text-align: center;line-height:40px">后续功能，尽情期待</p>
             </div>
        </div>
        <div id="inputL">
             <p><el-input v-model="input" placeholder="请输入账户"  style="width: 300px;margin: 10px"></el-input></p>
             <p><el-input v-model="input1" placeholder="请输入旧密码"  style="width: 300px;margin: 10px"></el-input></p>
             <p><el-input v-model="input2" placeholder="请输入新密码"  style="width: 300px;margin: 10px"></el-input></p>
             <el-button size="medium "  @click="tableData.forEach(modifyTi)" style="float: right">确认</el-button>
        </div>
   </div>
</template>

<script>
    export default {
        name: "lwPower",
         data:function () {
              return{
                   input:'',
                   input1:'',
                   input2:'',
                   tableData:[],
                   id:[],
              }
         },
         methods:{
              modifyTi(item,index){
                   let _this=this
                if ( this.tableData[index].account==this.input && this.tableData[index].pass==this.input1){
                      this.$axios.get('/Newl',{
                           params:{
                                account:_this.tableData[index].account=_this.input,
                                Newl:_this.tableData[index].pass=_this.input2,
                                id:_this.tableData[index].id
                           }
                      }).then((res)=>{
                           _this.start()
                      });
                     _this.input='';
                     _this.input1='';
                     _this.input2='';

                }else {
                   console.log('账户密码错误');
                }

              },
              start(){
                   this.$axios.get('/Tin',{


                   }).then((res)=>{
                        this.tableData=res.data.data;
                         console.log(res.data.data);

                   });
              }
         },
         mounted(){
              this.start()


         }
    }
</script>

<style scoped>
     #inputL{
          width: 350px;
          height: 400px;
          margin: 100px  100px;
     }
     #headO{
          width: 100%;
          height: 60px;
          background: #B3C0D1;
          line-height:60px;
     }
</style>