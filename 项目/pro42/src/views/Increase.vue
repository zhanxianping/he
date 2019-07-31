<template>
<div id="Increase" style="background: #E9EEF3;border: none;">
    <el-container>
        <el-header style="text-align: left;height: 40px">所在位置：新增商品</el-header>
        <el-main id="box" style="height: 80px;overflow: hidden">
            <el-button style="margin-left: 1200px" type="primary" icon="el-icon-circle-plus-outline" @click="fhladd1">添加新商品</el-button>

            <el-dialog  title="添加商品" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="商品" :label-width="formLabelWidth">
                        <el-input style="width: 300px;" v-model="form.date" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="商品系列" :label-width="formLabelWidth">
                        <el-input style="width:300px;" v-model="form.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="颜色" :label-width="formLabelWidth">
                        <el-select v-model="form.yanse" placeholder="请选择颜色">
                            <el-option label="银色" value="shanghai"></el-option>
                            <el-option label="金色" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="大小" :label-width="formLabelWidth">
                        <el-select v-model="form.daxiao" placeholder="请选择大小">
                            <el-option label="32mm" value="shanghai"></el-option>
                            <el-option label="34mm" value="beijing"></el-option>
                            <el-option label="40mm" value="chengdu"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="类别" :label-width="formLabelWidth">
                        <el-select v-model="form.leibie" placeholder="请选择类别">
                            <el-option label="男士" value="shanghai"></el-option>
                            <el-option label="女士" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="价格" :label-width="formLabelWidth">
                        <el-input style="width:300px;" v-model="form.jiage" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="库存" :label-width="formLabelWidth">
                        <el-input style="width:300px;" v-model="form.kucun" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="fhladd">确 定</el-button>
                </div>
            </el-dialog>
            <el-divider></el-divider>
            <el-divider></el-divider>
        </el-main>
    </el-container>
    <el-table :data="tableData" style="width: 95%; margin-left: 3%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="商品" width="auto"></el-table-column>
        <el-table-column prop="name" label="商品系列" width="auto"></el-table-column>
        <el-table-column prop="yanse" label="颜色" width="auto"></el-table-column>
        <el-table-column prop="daxiao" label="大小" width="auto"></el-table-column>
        <el-table-column prop="leibie" label="类别" width="auto"></el-table-column>
        <el-table-column prop="jiage" label="价格" width="auto"></el-table-column>
        <el-table-column prop="kucun" label="库存" width="auto"></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button size="mini"  type="danger"@click="handleEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button></template>
        </el-table-column>
    </el-table>
    <!--删除-->
    <el-dialog
            title="提示"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
        <span>删除此项数据后将无法恢复，你确定删除吗？</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="delData">确 定</el-button>
  </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog  title="商品修改" :visible.sync="msg">
        <el-form :model="form1">
            <el-form-item label="商品" :label-width="formLabelWidth">
                <el-input style="width: 300px;" v-model="form1.date" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品系列" :label-width="formLabelWidth">
                <el-input style="width:300px;" v-model="form1.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="颜色" :label-width="formLabelWidth">
                <el-select v-model="form1.yanse" placeholder="请选择颜色">
                    <el-option label="银色" value="shanghai"></el-option>
                    <el-option label="金色" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="大小" :label-width="formLabelWidth">
                <el-select v-model="form1.daxiao" placeholder="请选择大小">
                    <el-option label="32mm" value="shanghai"></el-option>
                    <el-option label="34mm" value="beijing"></el-option>
                    <el-option label="40mm" value="chengdu"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="类别" :label-width="formLabelWidth">
                <el-select v-model="form1.leibie" placeholder="请选择类别">
                    <el-option label="男士" value="shanghai"></el-option>
                    <el-option label="女士" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
                <el-input style="width:300px;" v-model="form1.jiage" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="库存" :label-width="formLabelWidth">
                <el-input style="width:300px;" v-model="form1.kucun" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="msg = false">取 消</el-button>
            <el-button type="primary" @click="fhlbianji">确 定</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
    export default {
        name: "zxp-data",
        data() {
            return {
                formInline: {
                    user: '',
                },
                dialogFormVisible: false,
                form:{
                    date: '',
                    name: '',
                    yanse:'',
                    daxiao:'',
                    leibie:'',
                    jiage:'',
                    kucun:''
                },
                formLabelWidth: '120px',
                tableData: [
                    {
                        date: 'Angel',
                        name: 'DAPPER',
                        yanse:'银色',
                        daxiao:'34mm',
                        leibie:'男士',
                        jiage:'1499',
                        kucun:'32'

                    },
                    {
                        date: 'Angel',
                        name: 'DAPPER',
                        yanse:'银色',
                        daxiao:'34mm',
                        leibie:'男士',
                        jiage:'1499',
                        kucun:'32'

                    },
                    {
                        date: 'Angel',
                        name: 'DAPPER',
                        yanse:'银色',
                        daxiao:'34mm',
                        leibie:'男士',
                        jiage:'1499',
                        kucun:'32'

                    },
                    {
                        date: 'Angel',
                        name: 'DAPPER',
                        yanse:'银色',
                        daxiao:'34mm',
                        leibie:'男士',
                        jiage:'1499',
                        kucun:'32'

                    }
                ],
                centerDialogVisible:false,
                oIndex:0,
                sIndex:0,
                msg:false,
                form1:{
                    date: '',
                    yanse:'',
                    daxiao:'',
                    leibie:'',
                    jiage:'',
                    kucun:''
                },
                form2:{},
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');

            },
            fhladd1(){
                this.dialogFormVisible = true;
                this.form={};
            },
            fhladd(){
                this.dialogFormVisible = false;
                this.tableData.push(this.copyContent());
                this.form={};

            },
            copyContent:function(){
                const copy={};
                for(let item in this.form){
                    copy[item]=this.form[item]
                }
                return copy
            },
            handleDelete(index,row){
                this.centerDialogVisible=true;
                this.oIndex=index
            },
            delData(){
                this.centerDialogVisible=false;

                this.tableData.splice(this.oIndex,1)
            },
            handleEdit(index,row){
                console.log(row)
                console.log(this.tableData)
                this.msg=true
                this.sIndex=index
                var copy1={};
                for (let item in this.tableData[index]){
                    copy1[item]=this.tableData[index][item]
                };
                this.form1=copy1;

            },
            fhlbianji(){

               /* console.log(this.form1)
                console.log(this.sIndex);*/
                this.form2=this.form1
                this.tableData[this.sIndex]=this.form2
                console.log(this.tableData[this.sIndex])
                this.msg=false;

            }
        }
    }
</script>

<style lang="less" scoped>
    *{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    body{
        background: #fcfcfc;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        line-height: 40px;
    }
    .el-input__inner{
        height: 35px;
    }
    .el-divider--horizontal{
        margin: 17px 0;
    }

</style>