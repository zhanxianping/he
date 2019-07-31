<template>
    <div>
        <el-main style="height: auto;overflow: hidden;">
            <el-button type="" size="small" @click="all(sql)" style="margin-left: 20px">全选</el-button>
            <el-button type="" size="small" @click="noAll(sql)">全不选</el-button>
            <el-button type="" size="small" @click="back(sql)">反选</el-button>
            <el-button type="primary" plain style="margin-left: 20px" size="small" @click="prohibit">启用</el-button>
            <el-input v-model="formInline" placeholder="请输入姓名或电话号吗"
                      style="width: 200px;margin-left: 40%" size="small"></el-input>
            <el-button type="primary" :plain="true" style="margin-left: 15px" size="small" @click="look">查看</el-button>
            <el-divider></el-divider>
        </el-main>

        <el-table ref="multipleTable" :data="sql" calss="aa" style="width: 95%; margin-left: 3%;"
                  @selection-change="handleSelectionChange"
                  tooltip-effect="dark">
            <el-table-column type="selection" width="30px">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="auto"></el-table-column>
            <el-table-column prop="sex" label="性别" width="auto"></el-table-column>
            <el-table-column prop="tel" label="电话" width="auto"></el-table-column>
            <el-table-column prop="mail" label="邮箱" width="165"></el-table-column>
            <el-table-column prop="number" label="订单数量" width="115"></el-table-column>
            <el-table-column prop="rmb" label="消费金额" width="auto"></el-table-column>
            <el-table-column label="操作" width="162">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">详情
                    </el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            plain
                            @click="handleDelete(scope.$index, scope.row)">启用
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: center;margin-top: 15px"
                background
                :page-sizes="[10, 20, 50, 100]"
                v-show="display"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="prev, pager, next"
                :total="tableData.length">
        </el-pagination>

        <el-dialog title="个人详情" :visible.sync="dialogFormVisible">
            <el-table :data="frame1">
                <el-table-column label="姓名" width="auto">
                    <template slot-scope="scope">{{frame.name}}</template>
                </el-table-column>
                <el-table-column label="性别" width="auto">
                    <template slot-scope="scope">{{frame.sex}}</template>
                </el-table-column>
                <el-table-column label="电话" width="auto">
                    <template slot-scope="scope">{{frame.tel}}</template>
                </el-table-column>
                <el-table-column label="密码" width="auto">
                    <template slot-scope="scope">{{frame.pass}}</template>
                </el-table-column>
            </el-table>
            <el-table :data="frame1">
                <el-table-column property="" label="随机码" width="auto">
                    <template slot-scope="scope">{{frame.code}}</template>
                </el-table-column>
                <el-table-column property="" label="邀请码" width="auto">
                    <template slot-scope="scope">{{frame.code}}</template>
                </el-table-column>
                <el-table-column property="" label="订单数量" width="auto">
                    <template slot-scope="scope">{{frame.number}}</template>
                </el-table-column>
                <el-table-column property="" label="消费金额" width="auto">
                    <template slot-scope="scope">{{frame.rmb}}</template>
                </el-table-column>
            </el-table>
            <el-form :model="form">
                <el-form-item label="收货地址" :label-width="formLabelWidth" style="font-weight:bold">
                    <p v-for="v in frameAdd">{{v.province}}{{v.city}}{{v.county}}{{v.address}}</p>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    // import zxpDisabling from './zxp-disabling';

    export default {
        name: "zxp-data",
        data() {
            return {
                pageTheme:'禁用',
                msg: '',//全选全不选数据
                display:true,//显示隐藏页面
                brown:false,
                activeName: 'first',
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },


                formInline:'',//搜索
                form: {
                    delivery: false,
                },
                sql:[],  //五条数据
                currentPage: 1, //初始页
                pagesize: 6,    //    每页的数据
                tableData: [], //数据
                num:[],
                multipleSelection: [],
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '120px',
                frame:[],//弹框数据
                frame1:[1],//弹框数据
                frameAdd:[],//弹框地址
            }
        },
        props:['title'],
        watch:{
            formInline(a){
                if (!this.a) {
                    this.handleCurrentChange(this.currentPage)
                }
            },
            title(a,b){
                this.display=true;
                if (a==1){
                    this.show()
                }
            }
        },
        methods: {
            // 初始页currentPage、初始每页数据数pagesize和数据data
            handleSizeChange: function (size) {
                this.pagesize = size;
                //this.handleCurrentChange1(this.currentPage1);
            },
            //刷新
            show(){
                let postData = this.$qs.stringify({
                    currentPage: this.currentPage,
                    pagesize:this.pagesize,
                    page:this.pageTheme,
                });
                this.$axios({
                    method: 'post',
                    url: '/zxpClient',
                    data: postData
                }).then((res) => {
                    this.tableData = res.data.data.whole;
                    this.sql = res.data.data.sql;
                    this.num=res.data.data.num;
                    for (let i=0;i<this.sql.length;i++){
                        for (let n=0;n<this.num.length;n++){
                            if (this.sql[i].id==this.num[n].USER){
                                this.sql[i].number=this.num[n].aa;
                                this.sql[i].rmb=this.num[n].bb;
                            }
                        }
                    }
                    if (Math.ceil(this.tableData.length/this.pagesize)<=1){
                        this.display=false
                    }
                });
            },
            //展示分页的数据
            handleCurrentChange: function (currentPage) {
                this.currentPage = currentPage;
                let postData = this.$qs.stringify({
                    currentPage: currentPage,
                    pagesize:this.pagesize,
                    page:this.pageTheme,
                });
                this.$axios({
                    method: 'post',
                    url: '/zxpClient',
                    data: postData
                }).then((res) => {
                    this.tableData = res.data.data.whole;
                    this.sql = res.data.data.sql;
                    this.num=res.data.data.num;
                    for (let i=0;i<this.sql.length;i++){
                        for (let n=0;n<this.num.length;n++){
                            if (this.sql[i].id==this.num[n].USER){
                                this.sql[i].number=this.num[n].aa;
                                this.sql[i].rmb=this.num[n].bb;
                            }
                        }
                    }
                });
            },

            handleClick(tab, event) {
                console.log(tab, event);
            },
            //点击详情
            handleEdit(index, row) {
                this.dialogFormVisible=true;
                this.frame=row;
                let postData = this.$qs.stringify({
                    id: row.id,
                });
                this.$axios({
                    method: 'post',
                    url: '/zxpClient2',
                    data: postData
                }).then((res) => {
                    this.frameAdd=res.data.data;
                });
            },
            //点击启用
            handleDelete(index, row) {
                let postData = this.$qs.stringify({
                    tel: row.tel,
                });
                this.$axios({
                    method: 'post',
                    url: '/zxpClientEnable',
                    data: postData
                });
                this.show();
                if (!index){
                    this.handleCurrentChange(this.currentPage-1);
                }
            },
            toggleSelection(rows) {
                alert(1);
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.msg=val;
                this.multipleSelection = val;
            },

            //点击查看
            look(){
                if (!this.formInline){
                    this.$message({
                        message: '请输入用户的姓名或电话',
                        type: 'warning'
                    });
                }else {
                    let postData = this.$qs.stringify({
                        currentPage: this.currentPage,
                        pagesize:this.pagesize,
                        look:this.formInline,
                        page:this.pageTheme,
                    });
                    this.$axios({
                        method: 'post',
                        url: '/zxpClient',
                        data: postData
                    }).then((res) => {
                        if (!res.data.data.look.length){
                            this.$message({
                                message: '对不起，没有此用户',
                                type: 'warning'
                            });
                        }else {
                            this.tableData = res.data.data.look;
                            this.sql = res.data.data.look;
                            this.num=res.data.data.num;
                            for (let i=0;i<this.sql.length;i++){
                                for (let n=0;n<this.num.length;n++){
                                    if (this.sql[i].id==this.num[n].USER){
                                        this.sql[i].number=this.num[n].aa;
                                        this.sql[i].rmb=this.num[n].bb;
                                    }
                                }
                            }
                        }

                    });
                }
            },
            onSubmit() {
                console.log('submit!');
            },
            //全选 禁用
            all(row){
                this.msg=row;
                this.sql.forEach(row => {
                    this.$refs.multipleTable.toggleAllSelection(row);
                });
            },
            noAll(row){
                this.$refs.multipleTable.clearSelection();
            },
            back(row){
                this.msg=row;
                row.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            },
            prohibit(){
                for (let i=0;i<this.msg.length;i++){
                    let postData = this.$qs.stringify({
                        tel: this.msg[i].tel,
                    });
                    this.$axios({
                        method: 'post',
                        url: '/zxpClientEnable',
                        data: postData
                    });
                }
                this.show();
                this.handleCurrentChange(this.currentPage-1)
            }
        },
        mounted() {
            let postData = this.$qs.stringify({
                currentPage: this.currentPage,
                pagesize:this.pagesize,
                page:this.pageTheme,
            });
            this.$axios({
                method: 'post',
                url: '/zxpClient',
                data: postData
            }).then((res) => {
                this.tableData = res.data.data.whole;
                this.sql = res.data.data.sql;
                this.num=res.data.data.num;
                for (let i=0;i<this.sql.length;i++){
                    for (let n=0;n<this.num.length;n++){
                        if (this.sql[i].id==this.num[n].USER){
                            this.sql[i].number=this.num[n].aa;
                            this.sql[i].rmb=this.num[n].bb;
                        }
                    }
                }
                if (Math.ceil(this.tableData.length/this.pagesize)<=1){
                    this.display=false
                }
            });
        },
    }
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    body {
        background: #fcfcfc;
    }

    .el-header, .el-footer {
        background-color: #B3C0D1;
        line-height: 40px;
    }

    .el-input__inner {
        height: 35px;
    }

    .el-divider--horizontal {
        margin: 17px 0;
    }
    .el-main{
        padding: 5px;
    }
    .el-tabs__nav-wrap .el-tabs__nav{
        margin-left: 15px;
    }
    .el-form-item{
        margin-bottom: 0;
    }
    .el-dialog__body{
        padding: 10px 20px;
    }
    .el-dialog{
        margin-top: 5vh;
    }
    .el-main{
        padding: 10px;
    }
</style>