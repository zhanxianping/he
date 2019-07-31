<template>
     <div id="box-w">
          <div>
               <div id="content-ol">
                    <div id="content-oz" style="margin: 0 50px">
                         <el-button @click="centerDialogVisible = true" style="margin: 0 20px" >创建账户</el-button>
                         <el-input v-model="input" placeholder="请输入内容" style="width: 300px"></el-input>
                         <el-button @click="SearchLW"><a href="">确认</a></el-button>
                    </div>
               </div>
               <template>
                    <el-table :data="tableData" style="width: 100%">
                         <el-table-column prop="account" label="账户" width="180"></el-table-column>
                       <!--  <el-table-column prop="account" label="日期" width="180"></el-table-column>-->
                         <el-table-column prop="sname" label="姓名" width="180"></el-table-column>
                         <el-table-column prop="sposition" label="职位"></el-table-column>
                         <el-table-column prop="number" label="号码"></el-table-column>
                         <el-table-column label="操作">
                              <template slot-scope="scop">
                                   <el-button size="small "  @click="send(scop.$index)">恢复默认</el-button>
                                   <el-button type="danger" size="small " @click="showtk(scop.$index)"  plain>信息情况</el-button>
                                   <el-button  ype="danger" size="small "  @click="del(scop.$index)" plain>删除</el-button>
                              </template>
                         </el-table-column>
                    </el-table>
               </template>

               <el-dialog
                       title="新建账户"
                       :visible.sync="centerDialogVisible"
                       width="30%"
                       center>
                    <p>账户 ：<el-input placeholder="账户ID" v-model="input10" clearable style="width: 200px; margin: 10px"></el-input></p>
                    <p>密码 ：<el-input placeholder="密码" v-model="input11" clearable style="width: 200px;margin: 10px"></el-input></p>
                    <p>姓名 ：<el-input placeholder="密码" v-model="input12" clearable style="width: 200px;margin: 10px"></el-input></p>
                    <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ddd">确 定</el-button>
  </span>
               </el-dialog>

               <el-dialog title="虎虎生威有限公司" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                         <div>
                              <el-card class="box-card">
                                   <div slot="header" class="clearfix">
                                        <span>名称：{{tableData[i].sname}}</span>
                                        <p><el-input v-model="input1"  value="input1"  style="width: 300px" size="small "></el-input></p>
                                   </div>
                                   <div class="text item">
                                        <span>职位：{{tableData[i].sposition}}</span>
                                        <p><el-input v-model="input2"  placeholder="" style="width: 300px" size="small "></el-input></p>
                                   </div>
                                   <div class="text item">
                                        <span>联系号码：{{tableData[i].number}}</span>
                                        <p><el-input v-model="input3"  placeholder="" style="width: 300px" size="small "></el-input></p>
                                   </div>
                                   <span>权限更改:</span>
                                   <hr>
                                   <p>&nbsp;</p>
                                   <div class="text item">
                                        <span>商品：{{tableData[i].commodity}}</span>&nbsp;
                                        <el-input v-model="inp1"  placeholder="" style="width: 60px" size="small "></el-input>
                                        &nbsp;<span>仓库：{{tableData[i].Warehouse}}</span>&nbsp;
                                        <el-input v-model="inp2"  placeholder="" style="width: 60px" size="small "></el-input>
                                        &nbsp;<span>订单：{{tableData[i].sOrder}}</span>&nbsp;
                                        <el-input v-model="inp3"  placeholder="" style="width: 60px" size="small "></el-input>
                                   </div>
                                   <div class="text item">
                                        <span>采购：{{tableData[i].Purchase}}</span>&nbsp;
                                        <el-input v-model="inp4"  placeholder="" style="width: 60px" size="small "></el-input>
                                        &nbsp;<span>设置：{{tableData[i].Setuo}}</span>&nbsp;
                                        <el-input v-model="inp5"  placeholder="" style="width: 60px" size="small "></el-input>
                                   </div>
                                   <el-button type="info" plain size="small " style="float: right" @click="Jurisdictionoo">确认</el-button>
                              </el-card>
                         </div>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                         <el-button @click="dialogFormVisible = false">取 消</el-button>
                         <el-button type="primary" @click="modifyL" >确 定</el-button>
                    </div>
               </el-dialog>

          </div>
     </div>
</template>

<script>
    export default {
        name: "lwModify",
         data() {
              return {
                   input10:'',
                   input11:'',
                   input12:'',
                   input1:'',
                   input2:'',
                   input3:'',
                   input4:'',
                   input6:'',
                   input7:'',
                   inp1:'',
                   inp2:'',
                   inp3:'',
                   inp4:'',
                   inp5:'',
                   i:0,
                   c:0,
                   input: '',
                   tableData: [
                        {pass:''}
                   ],
                   dialogTableVisible: false,
                   dialogFormVisible: false,
                   centerDialogVisible: false,
                   form: {
                        name: '',
                        region: '',
                        date1: '',
                        date2: '',
                        delivery: false,
                        type: [],
                        resource: '',
                        desc: ''
                   },
              };
         },
         methods:{
             /* 失去焦点更改数值*/
            /*  chan(){
                   this.tableData[this.i].id=this.input6;
                   this.tableData[this.i].sname=this.input1;
                   this.tableData[this.i].sposition=this.input2;
                   this.tableData[this.i].number=this.input3;

              },*/
            /*  确认后为空*/
              modifyL(){
                   let  a=this.input1;
                   let  b=this.input2;
                   let  c=this.input3;
                   if (!a.trim() && !b.trim() && !c.trim()){
                        alert('不能为空')
                   }else {
                        let _this=this;
                        this.centerDialogVisible = false;
                        this.$axios.get('/ccc',{
                             params:{
                                  sname:_this.tableData[_this.i].sname=_this.input1,
                                  sposition:_this.tableData[_this.i].sposition=_this.input2,
                                  number:_this.tableData[_this.i].number=_this.input3,
                                  id:_this.tableData[_this.i].id,
                             }
                        }).then((res)=>{
                             _this.start()
                        });
                   }
                   this.dialogFormVisible=false;
                   this.input1='';
                   this.input2='';
                   this.input3='';

              },
              Jurisdictionoo(){

                   let a=this.inp1;
                   let b=this.inp2;
                   let c=this.inp3;
                   let d=this.inp4;
                   let e=this.inp5;
                if(!a.trim() || !b.trim()|| !c.trim()|| !d.trim()|| !e.trim()){
                     alert('内容不能为空！');
                }else {
                     let _this=this
                     this.$axios.get('/Jurisdictionoo',{
                          params:{
                               commodity:_this.tableData[_this.i].commodity=_this.inp1,
                               Warehouse:_this.tableData[_this.i].Warehouse=_this.inp2,
                               sOrder:_this.tableData[_this.i].sOrder=_this.inp3,
                               Purchase:_this.tableData[_this.i].Purchase=_this.inp4,
                               Setuo:_this.tableData[_this.i].Setuo=_this.inp5,
                               id:_this.tableData[_this.i].id,
                          }
                     }).then((res)=>{
                          _this.start()
                     });
                }
                   this.dialogFormVisible=false;
                   this.inp1='';
                   this.inp2='';
                   this.inp3='';
                   this.inp4='';
                   this.inp5='';


              },
             /* 创建账户*/
              ddd(){


                   let a=this.input10;
                   let b=this.input10;
                   let c=this.input10;
                   if(!a.trim() || !b.trim()|| !c.trim()){
                        alert('内容不能为空！');
                   }else {
                        let _this = this;
                        this.centerDialogVisible = false;
                        this.$axios.get('/Aro', {
                             params: {
                                  akt: this.input10,
                                  kat: this.input11,
                                  tak: this.input12
                             }
                        }).then((res) => {
                             _this.start()
                        });
                        this.input10 = '';
                        this.input11 = '';
                        this.input12 = '';
                   }
              },
             /* 删除*/
              del(index){
                   this.i=index;
                   let _this=this;
                   let ccc=this.tableData[this.i].id;
                   console.log(ccc);
                   this.$axios.get('/skt',{
                        params :{
                             ccc
                        }
                   }).then((res)=>{
                            _this.start()

                   })
              },
              SearchLW(){
                 alert(1)
              },
              showtk(index){
                   this.dialogFormVisible = true;
                   this.i=index;
              },
              send(index){
                  let _this=this;
                  let i=index;
                   if (this.tableData[index].pass=this.tableData[index].pass){
                        let zzz='666666'
                        this.$axios.get('/zzz',{
                             params :{
                                  zzz,
                                  id:_this.tableData[i].id
                             }
                        }).then((res)=>{
                             _this.start()

                        })

                   } else{}
              },
              start(){
                   this.$axios.get('/Tin',{
                        id:this.id,
                        Number:this.Number,
                        data:this.tableData,

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
     #box-w{
         width: 100%;
         height: 100%;
         background: #e5e5e5;
     }
     #content-ol{
          width: 100%;
          height: 80px;
          line-height: 100px;
     }
     #content-oz{
         float: right;
     }
     .text {
          font-size: 14px;
     }

     .item {
          margin-bottom: 18px;
     }

     .clearfix:before,
     .clearfix:after {
          display: table;
          content: "";
     }
     .clearfix:after {
          clear: both
     }

     .box-card {
          width: 480px;
     }
</style>