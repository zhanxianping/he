<template>
    <div class="cgd" style="background: #e9eef3;height: 1000px">
        <div class="ccc-wz">
            <span>所在位置: <span>手工制单</span></span>
        </div>

        <!--查询-->
        <div id="ccc-ss" >
            <el-form :label-position="labelPosition" :model="formLabelAlign" :inline="true">

                <el-input v-model="formLabelAlign.ss2" placeholder="采购名称" style="width: 150px;margin:30px 0 0 40px"></el-input>

                <el-select v-model="ss3" placeholder="支付方式" style="width: 150px;margin:30px 0 0 40px">
                    <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <el-select v-model="ss4" placeholder="单据状态"  style="width: 150px;margin:30px 0 0 40px">
                    <el-option
                            v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>

                <el-date-picker
                        v-model="ss5"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1"
                        style="width: 150px;margin: 30px 0 0 40px"
                >
                </el-date-picker>

                <el-button type="primary" style="margin:30px 0 0 40px" plain @click="submitQuery">查询</el-button>
                <el-button type="primary" style="margin:30px 0 0 40px" plain @click="dialogTableVisible2 = true">新增</el-button>
            </el-form>
            <div style="margin: 30px"></div>
        </div>
        <!--表格-->
        <div>
            <el-table
                style="width: 90%;margin: auto"
                :data="tableData1.slice((currentPage-1) * pageSize,currentPage * pageSize)"
                @selection-change="handleSelectionChange"
                @row-click="details"
            >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
                    prop="name1"
                    label="采购单号">
            </el-table-column>
            <el-table-column
                    prop="name2"
                    label="采购名称">
            </el-table-column>
            <el-table-column
                    prop="name5"
                    label="订单金额">
            </el-table-column>
            <el-table-column
                    prop="name3"
                    label="支付方式">
            </el-table-column>
            <el-table-column
                    prop="name7"
                    label="供货商名称">
            </el-table-column>
            <el-table-column
                    prop="name10"
                    label="下单时间">
            </el-table-column>
            <el-table-column
                    prop="name15"
                    label="单据号">
            </el-table-column>
            <el-table-column
                    prop="name16"
                    label="单据状态">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="150">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="deleteRow(scope.$index,tableData1)"
                            type="danger"
                            size="small"
                            plain>
                        移除
                    </el-button>
                    <el-button type="primary" size="small" plain @click="dialogTableVisible = true">查看</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-dialog title="详细信息" :visible.sync="dialogTableVisible" style="padding: auto">
                <el-form>
                    <el-form-item label="采购单号 :" style="width: 50%;float:right">{{ccc.name1}}</el-form-item>
                    <el-form-item label="采购名单 :" style="width: 50%;float:right">{{ccc.name2}}</el-form-item>
                    <el-form-item label="支付方式 :" style="width: 50%;float:right">{{ccc.name3}}</el-form-item>
                    <el-form-item label="采购单价 :" style="width: 50%;float:right">{{ccc.name4}}</el-form-item>
                    <el-form-item label="采购金额 :" style="width: 50%;float:right">{{ccc.name5}}</el-form-item>
                    <el-form-item label="采购数量 :" style="width: 50%;float:right">{{ccc.name6}}</el-form-item>
                    <el-form-item label="供货商名称 :" style="width: 50%;float:right">{{ccc.name7}}</el-form-item>
                    <el-form-item label="供货商地址 :" style="width: 50%;float:right">{{ccc.name8}}</el-form-item>
                    <el-form-item label="供货商电话 :" style="width: 50%;float:right">{{ccc.name9}}</el-form-item>
                    <el-form-item label="下单时间 :" style="width: 50%;float:right">{{ccc.name10}}</el-form-item>
                    <el-form-item label="收货地址 :" style="width: 50%;float:right">{{ccc.name11}}</el-form-item>
                    <el-form-item label="收货单位 :" style="width: 50%;float:right">{{ccc.name12}}</el-form-item>
                    <el-form-item label="运输单位 :" style="width: 50%;float:right">{{ccc.name13}}</el-form-item>
                    <el-form-item label="运输方式 :" style="width: 50%;float:right">{{ccc.name14}}</el-form-item>
                    <el-form-item label="单据编号 :" style="width: 50%;float:right">{{ccc.name15}}</el-form-item>
                    <el-form-item label="单据状态 :" style="width: 50%">{{ccc.name16}}</el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog><!--弹框详情-->
            <el-dialog title="新增采购单" :visible.sync="dialogTableVisible2" style="padding: auto" top="0">
                <el-form
                        :model="ruleForm"
                        :rules="rules"
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                        :inline="true"
                >
                    <el-form-item label="采购单号" prop="name1">
                        <el-input v-model="ruleForm.name1"></el-input>
                    </el-form-item>
                    <el-form-item label="采购名单" prop="name2">
                        <el-input v-model="ruleForm.name2"></el-input>
                    </el-form-item>
                    <el-form-item label="支付方式" prop="name3">
                        <el-select v-model="ruleForm.name3" placeholder="请选择支付方式" style="width: 200px">
                            <el-option label="在线支付" value="在线支付"></el-option>
                            <el-option label="货到付款" value="货到付款"></el-option>
                            <el-option label="转账汇款" value="转账汇款"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="采购单价" prop="name4">
                        <el-input v-model="ruleForm.name4"></el-input>
                    </el-form-item>
                    <el-form-item label="订单金额" prop="name5">
                        <el-input v-model="ruleForm.name5"  :disabled="false"></el-input>
                    </el-form-item>
                    <el-form-item label="订单数量" prop="name6">
                        <el-input v-model="ruleForm.name6"></el-input>
                    </el-form-item>
                    <el-form-item label="供货商名称" prop="name7">
                        <el-input v-model="ruleForm.name7"></el-input>
                    </el-form-item>
                    <el-form-item label="供货商地址" prop="name8">
                        <el-input v-model="ruleForm.name8"></el-input>
                    </el-form-item>
                    <el-form-item label="供货商电话" prop="name9">
                        <el-input v-model="ruleForm.name9"></el-input>
                    </el-form-item>
                    <el-form-item label="下单时间" prop="name10">
                        <el-date-picker
                                v-model="ruleForm.name10"
                                align="right"
                                type="date"
                                placeholder="选择日期"
                                :picker-options="pickerOptions2"
                                style="width: 200px"

                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="收货地址" prop="name11">
                        <el-input v-model="ruleForm.name11"></el-input>
                    </el-form-item>
                    <el-form-item label="收货单位" prop="name12">
                        <el-input v-model="ruleForm.name12"></el-input>
                    </el-form-item>
                    <el-form-item label="运输单位" prop="name13">
                        <el-input v-model="ruleForm.name13"></el-input>
                    </el-form-item>
                    <el-form-item label="运输方式" prop="name14">
                        <el-select v-model="ruleForm.name14" placeholder="请选择支付方式" style="width: 200px">
                            <el-option label="海运" value="海运"></el-option>
                            <el-option label="空运" value="空运"></el-option>
                            <el-option label="陆运" value="陆运"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单据编号" prop="name15">
                        <el-input v-model="ruleForm.name15"></el-input>
                    </el-form-item>
                    <el-form-item label="单据状态" prop="name16">
                        <el-select v-model="ruleForm.name16" placeholder="请选择支付方式" style="width: 200px">
                            <el-option label="已审核" value="已审核"></el-option>
                            <el-option label="未审核" value="未审核"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left: 35%">
                        <el-button type="primary" plain @click="submitForm('ruleForm')">创建</el-button>
                        <el-button @click="resetForm('ruleForm')" type="danger" plain >取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog><!--新增采购单-->
        </div>
        <!--分页-->
        <div>
            <el-button style="margin: 40px 50px 40px 60px" type="primary" plain @click="Import">批量导出</el-button>
            <el-pagination
                    background
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="tableData1.length"
                    style="margin: 0 100px;display: inline-block;"
                    :page-sizes="[5,10,20,30]"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @size-change="sizeChange"
                    @current-change="currentChange"
            >
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ccc-cgd",
        props: {
            msg: String
        },
        data:function(){
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    ss1: '',
                    ss2: '',
                    type: ''
                },
                options1: [
                    {
                    value: '在线支付',
                    label: '在线支付'
                },
                    {
                    value: '货到付款',
                    label: '货到付款'
                },
                    {
                    value: '转战汇款',
                    label: '转战汇款'
                },],
                ss3: '',
                options2: [
                    {
                    value: '已审核',
                    label: '已审核'
                }, {
                    value: '未审核',
                    label: '未审核'
                }],
                ss4: '',
                /*时间*/
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                ss5:'',
                tableData1:[],//数据
                dialogTableVisible: false,//详情弹框遮罩层
                dialogTableVisible2: false,//新增弹框遮罩层
                currentPage:1,//初始页
                pageSize:5,//每页的条数
                ccc:'',
                a:[],
                //新增
                ruleForm: {
                    name1:'',//采购单号
                    name2:'',//采购名单
                    name3:'',//支付方式
                    name4:'',//采购单价
                    name5:'',//订单金额
                    name6:'',//订单数量
                    name7:'',//供货商名称
                    name8:'',//供货商地址
                    name9:'',//供货商地址
                    name10:'',//下单时间
                    name11:'',//收货地址
                    name12:'',//收货单位
                    name13:'',//运输单位
                    name14:'',//运输方式
                    name15:'',//单据编号
                    name16:'',//单据状态
                    type:[]
                },//新增
                rules: {
                    name1: [
                        {required:true,message:'请输入采购单号',trigger: 'blur'},
                        {min:10,max:10,message:'数量错误,应该为10位数',trigger: 'blur'}
                    ],
                    name2:[
                        {required:true,message:'请输入采购ID',trigger: 'blur'},
                        {min:1,max:3,message:'ID错误,1~999以内',trigger: 'blur'}
                    ],
                    name3:[
                        {required:true,message:'请输入支付方式',trigger: 'blur'}
                    ],
                    name4:[
                        {required:true,message:'请输入采购单价',trigger: 'blur'}
                    ],
                    name5:[
                        {required:true,message:'请输入订单金额',trigger: 'blur'}
                    ],
                    name6:[
                        {required:true,message:'请输入订单数量',trigger: 'blur'}
                    ],
                    name7:[
                        {required:true,message:'请输入供货商名称',trigger: 'blur'}
                    ],
                    name8:[
                        {required:true,message:'请输入供货商地址',trigger: 'blur'}
                    ],
                    name9:[
                        {required:true,message:'请输入供货商电话',trigger: 'blur'},
                        {pattern:/^1[34578]\d{9}$/, message: '电话号码格式错误', trigger: 'blur'}
                    ],
                    name10:[
                        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                    ],
                    name11:[
                        {required:true,message:'请输入收货地址',trigger: 'blur'}
                    ],
                    name12:[
                        {required:true,message:'请输入收货单位',trigger: 'blur'}
                    ],
                    name13:[
                        {required:true,message:'请输入运输单位',trigger: 'blur'}
                    ],
                    name14:[
                        {required:true,message:'请选择运输方式',trigger: 'blur'}
                    ],
                    name15:[
                        {required:true,message:'请输入单据编号',trigger: 'blur'}
                    ],
                    name16:[
                        {required:true,message:'请选择单据状态',trigger: 'blur'}
                    ]
                },//判断条件 //新增
                pickerOptions2: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    //时间
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        }, {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24);
                                picker.$emit('pick', date);
                            }
                        }, {
                            text: '一周前',
                            onClick(picker) {
                                const date = new Date();
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', date);
                            }
                        }]
                },//新增
            }
        },
        methods: {
            Import(){
                let postData = this.$qs.stringify({

                });
                this.$axios({
                    method: 'post',
                    url:'/cccCg',
                    data:postData
                }).then((res)=>{
                    this.tableData1=res.data.data;
                    console.log(this.tableData1)
                })
            },//批量导出数据库数据
            deleteRow(index, rows) {
                this.dialogTableVisible=false;
                rows.splice(index, 1);
            },//删除当前行
            handleSelectionChange(val) {
                this.a = val;
                console.log(this.a[0].name_Id);
            },//多选
            details(row) {
                this.ccc=row;
                console.log(row)
            },//查看当前行详情
            sizeChange:function (Size) {
                this.pageSize = Size;
            },//改变当前条
            currentChange:function (current) {
                this.currentPage = current;
            },//改变当前页
            submitForm(formName) {//创建
                this.$refs[formName].validate((valid) => {
                    if (valid) {//成功
                        if (valid){
                            this.$axios.post('/cccSgd', {
                                content:this.ruleForm
                            });
                        }
                        alert('创建成功');
                    } else {//失败
                        alert('创建失败');
                        return false;
                    }
                });
            },//创建新数据
            resetForm(formName) {//重置
                this.$refs[formName].resetFields();
                this.dialogTableVisible2=false;
            },//重置新增页面
            submitQuery:function(){
                if (this.ss3=='' && this.formLabelAlign.ss2=='' && this.ss4=='' && this.ss5==''){
                        alert('请输入查询数据')
                }else {
                    this.$axios.post('/api/cccCx', {
                        name2:this.formLabelAlign.ss2,
                        name3:this.ss3,
                        name16:this.ss4,
                        name10:this.ss5
                    }).then((res)=>{
                        this.tableData1=res.data.data;
                        console.log(res.data)
                    })
                }
            },//查询
        },
    }
</script>

<style lang="less"  scoped>
    *{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .ccc-wz{
        background: #b3c0d1;
        padding: 15px;
    span{
        span{
            color: #4ca0ce;
                }
            }
    }
    #ccc-ss{
        border: 1px solid black;
        margin: 20px 20px;
    }
</style>