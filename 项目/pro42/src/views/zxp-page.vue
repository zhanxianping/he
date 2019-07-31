<template>
    <div id="page">
        <el-container>
            <el-header style="text-align: left;height: 40px">所在位置：商品仓库</el-header>
        </el-container>
        <ul class="z-ul">
            <li class="z-li">
                <div class="li-left">
                    <i class="el-icon-receiving z-icon"></i><br>
                    <span class="z-icon-font">商品种类</span>
                </div>
                <div class="li-right">{{type}}</div>
            </li>
            <li class="z-li">
                <div class="li-left">
                    <i class="el-icon-s-shop z-icon"></i><br>
                    <span class="z-icon-font">库存总数</span>
                </div>
                <div class="li-right">{{total}}</div>
            </li>
            <li class="z-li">
                <div class="li-left">
                    <i class="el-icon-s-marketing z-icon"></i><br>
                    <span class="z-icon-font">本月订单</span>
                </div>
                <div class="li-right">{{sql.month}}</div>
            </li>
            <li class="z-li">
                <div class="li-left">
                    <i class="el-icon-s-claim z-icon"></i><br>
                    <span class="z-icon-font">本月出货</span>
                </div>
                <div class="li-right">{{monthSale}}</div>
            </li>
            <li class="z-li">
                <div class="li-left">
                    <i class="el-icon-s-order z-icon"></i><br>
                    <span class="z-icon-font">出货金额</span>
                </div>
                <div class="li-right">{{rmb[1]}}</div>
            </li>
        </ul>
        <div id="second">
            <div class="second-left">
                <h4 class="second-head"><span></span>&nbsp;&nbsp;统计简报</h4>
                <ol class="second-ol">
                    <li><strong>时间</strong></li>
                    <li><strong>订单量</strong></li>
                    <li><strong>销售量</strong></li>
                    <li><strong>订单金额</strong></li>
                </ol>
                <ul class="second-ol">
                    <li><strong>昨天</strong></li>
                    <li>{{sql.day}}</li>
                    <li>{{daySale}}</li>
                    <li>{{rmb[3]}}</li>
                </ul>
                <ul class="second-ol">
                    <li><strong>本周</strong></li>
                    <li>{{sql.week}}</li>
                    <li>{{weekSale}}</li>
                    <li>{{rmb[2]}}</li>
                </ul>
                <ul class="second-ol">
                    <li><strong>本月</strong></li>
                    <li>{{sql.month}}</li>
                    <li>{{monthSale}}</li>
                    <li>{{rmb[1]}}</li>
                </ul>
                <ul class="second-ol">
                    <li><strong>今年</strong></li>
                    <li>{{sql.year}}</li>
                    <li>{{yearSale}}</li>
                    <li>{{rmb[0]}}</li>
                </ul>
            </div>
            <div class="second-right" id="container">
                <!--<h4 class="second-head"><span></span>&nbsp;&nbsp;待处理订单</h4>
                <ul class="sUl-left">
                    <li><strong>待审核：</strong><span>{{state[0]}}</span></li>
                    <li><strong>已收货：</strong><span>{{state[1]}}</span></li>
                    <li><strong>库存告急：</strong><span>{{state[4]}}</span></li>
                </ul>
                <ul class="sUl-right">
                    <li><strong>待收货：</strong><span>{{state[2]}}</span></li>
                    <li><strong>已作废：</strong><span>{{state[3]}}</span></li>
                </ul>-->
            </div>
        </div>
        <div id="third">
            <h4 class="second-head"><span></span>&nbsp;&nbsp;销售简报</h4>
            <ul class="third-ul">
                <li><strong>商品名称</strong></li>
                <li><strong>系列</strong></li>
                <li><strong>颜色</strong></li>
                <li><strong>大小</strong></li>
                <li><strong>销售量</strong></li>
                <li><strong>销售额（元）</strong></li>
            </ul>
            <ul v-for="(v,i) in arr1" v-if="i<5" class="third-ul">
                <li>{{v.g_name}}</li>
                <li>{{v.s_name}}</li>
                <li>{{v.colour}}</li>
                <li>{{v.size}}</li>
                <li>{{v.sales}}</li>
                <li>{{v.sales*Number(v.rmb)}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'zxpPage',
        data: function () {
            return {
                sql:'',
                type:'',//商品种类
                total:'',//库存总数
                yearSale:'',//年销售
                monthSale:'',
                weekSale:'',
                daySale:'',
                rmb:'',//销售金额

                state:[],//待处理订单

                arr1:[],
                arr: '',
            }
        },
        mounted() {
             let postData = this.$qs.stringify({
                    user:this.as,
                    pass:this.ad
             });
            this.$axios({
                method: 'post',
                url:'/zxpBHPage',
                data:postData
            }).then((res)=>{
                for (let i=0;i<res.data.data.length;i++){
                    if (res.data.data[i].colour=='#C1C0C0') {
                        res.data.data[i].colour='银色';
                    }else {
                        res.data.data[i].colour='金色';
                    }
                } 
                this.arr1=res.data.data;
                console.log(res.data.data);
            });
            this.$axios({
                method: 'post',
                url:'/zxpTotal',
                data:postData
            }).then((res)=>{
                this.sql=res.data.data.sql[0];
                this.yearSale=res.data.data.yearSale;
                this.monthSale=res.data.data.monthSale;
                this.weekSale=res.data.data.weekSale;
                this.daySale=res.data.data.daySale;
                this.rmb=res.data.data.arr;
                this.state=res.data.data.state;
                this.type=res.data.data.typeT;
                this.total=res.data.data.totalT;
                console.log(res.data.data);
                this.draw(this.state);
            });

        },
        methods:{
            draw(aa){
                let that=this;
                console.log(aa);
                // 初始化echarts实例
                let container = this.$echarts.init(document.getElementById('container'));
                // 绘制图表
                /*var option = {
                    title : {
                        text: '待处理业务',
                        //subtext: '纯属虚构',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['待审核'+that.state[0]+'','待收货'+that.state[2]+'','已收货'+that.state[1]+'','已作废'+that.state[3]+'','库存告急'+that.state[4]+'']
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:that.state[0], name:'待审核'+that.state[0]+''},
                                {value:that.state[2], name:'待收货'+that.state[2]+''},
                                {value:that.state[1], name:'已收货'+that.state[1]+''},
                                {value:that.state[3], name:'已作废'+that.state[3]+''},
                                {value:that.state[4], name:'库存告急'+that.state[4]+''}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                        },

                    ]
                };*/
                var option = {
                    title : {
                        text: '待处理业务',
                        left:'left',
                        x:'center',
                        textStyle:{
                            fontSize:14,
                            color:'#525252'
                        }
                    },
                    legend: {
                        data : ['待审核', '待收货', '已收货', '已作废', '库存告急'],
                    },
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '1%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['待审核', '待收货', '已收货', '已作废', '库存告急'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'数据',
                            type:'bar',
                            barWidth: '40%',
                            data:[that.state[0], that.state[2], that.state[1], that.state[3], that.state[4]]
                        }
                    ]
                };
                //防止越界，重绘canvas
                window.onresize = container.resize;
                container.setOption(option);//设置option
            },
        },
        props: {
            msg: String
        }
    }
</script>
<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .z-ul {
        margin-top: 30px;
        height: 80px;
    }

    .z-li {
        width: 150px;
        height: 80px;
        background: #e8edf2;
        float: left;
        margin-left: 4%;

        .li-left {
            width: auto;
            height: 80px;
            float: left;
            margin-left: 17px;
            margin-top: 15px;

            .z-icon {
                font-size: 30px;
            }
            .z-icon-font {
                font-size: 11px;
            }
        }

        .li-right {
            font-size: 20px;
            text-align: center;
            line-height: 80px;

        }
    }

    #second {
        width: 85%;
        height: 260px;
        margin-top: 30px;
        margin-left: 5%;
        font-size: 14px;
        color: #676665;

        .second-left {
            width: 42%;
            height: 200px;
            background: #e8edf2;
            float: left;
            margin-left: 30px;
            margin-top: 25px;
        }
        .second-right {
            width: 42%;
            height: 200px;
            background: #e8edf2;
            float: right;
            margin-right: 30px;
            margin-top: 25px;
        }
    }

    .second-head {
        margin-top: 2px;
        padding: 4px;

       /* span {
            display: inline-block;
            width: 5px;
            height: 15px;
            background: blue;
        }*/
    }

    .second-ol {
        width: 100%;
        margin-left: 10px;

        li {
            width: 23%;
            float: left;
            text-align: center;
            margin-top: 7px;
            padding: 3px;
            //background: #f0f1f5;
        }
    }

    .second-right {
        .sUl-left {
            float: left;

        }
        .sUl-right {
            float: left;
            margin-left: 10%;
        }
        li {
            width: 150px;
            height: 40px;
            //background: rgba(205,212,232,.3);
            margin-top: 10px;
            margin-left: 30%;
            line-height: 40px;
            text-indent: 1em;
        }
    }

    #third {
        width: 80%;
        height: 250px;
        //border: 1px solid blue;
        background: #e8edf2;
        margin-left: 7.5%;
        font-size: 14px;
        color: #676665;
        padding-bottom: 20px;
        .third-ul {
            width: 100%;
            margin-left: 17px;

            li {
                width: 15.5%;
                float: left;
                //background: rgba(215, 181, 205, 0.2);
                padding: 3px;
                text-align: center;
                margin-top: 13px;
            }
        }
    }

</style>
