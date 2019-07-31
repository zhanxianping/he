<template>
       <div id="app">
        <div id="head-t">
            <h2>PAKE后台管理系统</h2>
            <div id="head-z">
                <span>欢迎：<span><span>&nbsp;&nbsp;退出</span></span></span>
            </div>
        </div>
        <div id="side-l" style="width: 100%;height: 668px;background: #545c64; overflow: hidden">
            <el-col :span="12">
                <el-menu
                        unique-opened=''
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <router-link to="/" tag="span">
                        <el-menu-item index="1">
                            <i class="el-icon-menu"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/czyProductd" tag="span"><el-menu-item index="1-2">商品信息</el-menu-item></router-link>
                            <el-menu-item index="1-1"><router-link to="/Increase" tag="span">新增商品</router-link></el-menu-item>
                            <el-menu-item index="1-5"><router-link to="/GoodsWarehousing" tag="span">库存预警</router-link></el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <router-link to="/zxpClient" tag="span">
                        <el-menu-item index="3">
                            <i class="el-icon-menu"></i>
                            <span slot="title">客户信息</span>
                        </el-menu-item>
                    </router-link>
                    <router-link to="/czyOrder" tag="span">
                        <el-menu-item index="4">
                            <i class="el-icon-menu"></i>
                            <span slot="title">订单信息</span>
                        </el-menu-item>
                    </router-link>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>采购</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1"><router-link to="/ccccgd" tag="span">手工制单</router-link></el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="6">
                        <i class="el-icon-setting"></i>
                        <router-link to="/lwPower" tag="span">设置</router-link>
                    </el-menu-item>
                        <el-menu-item index="7">
                            <i class="el-icon-menu"></i>
							<router-link to="/lwSetup" tag="span">权限</router-link>
                        </el-menu-item>
                </el-menu>
            </el-col>
        </div>
        <div id="side-r" style="height: 92%;overflow: auto">
            <router-view></router-view>
            <div id="side-s"></div>
        </div>

    </div>
</template>

<script>
    //import  Tiron from './components/zxp-data'

    export default {
        name: 'app',
        data: function () {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        components: {
            //Tiron
        }

    }

</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    ::-webkit-scrollbar {
        width: 0 !important;
    }

    ::-webkit-scrollbar {
        width: 0 !important;
        height: 0;
    }

    #box {
        width: 100%;
        height: 660px;
        background: #333333;
		border: none
    }

    #head-t {
        width: 100%;
        height: 60px;
        background: #2f3233;
        color: white;
    }

    #side-l {
        width: 15%;
        height: 800px;
        background: #0088CC;
    }

    #head-t{
        h2{
            float: left;
            line-height: 60px;
            text-indent: 1em;
            font-family: 华文楷体;
        }
    }
    #side-r {
        width: 85%;
        height: 600px;
        background: whitesmoke;
        position: absolute;
        top: 60px;
        left: 15%;
    }

    .side-o {
        width: 100%;
    }

    #head-z {
        position: absolute;
        margin-top: 20px;
        margin-left: 90%;
    }

    #side-s {
        height: 20px
    }

</style>
