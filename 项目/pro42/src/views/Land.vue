
<template>
    <div id="Fand" style="height:100%;background: #e6dddd;">
        <div id="box" style="height:500px;">
            <P>PATEK PHILPPE</P>
            <el-input v-model="user" placeholder="帐号"></el-input>
            <el-input type="password" v-model="pass" placeholder="密码"></el-input>
            <el-button @click="login" type="success">登录</el-button>
        </div>
    </div>
</template>

<script>
    //import HelloWorld from '@/components/HelloWorld.vue'
	import oVue from './../vm.js'
    export default {
        name:'Land',
        data:function () {
            return{
                user:'',
                pass:'',
                str:''
            }
        },
        methods:{
            login(){
                let postData =this.$qs.stringify({
                    user:this.user,
                    pass:this.pass
                });
                this.$axios({
                    method:'post',
                    url:'/fhllogin',
                    data:postData
                }).then((res)=>{
                    if (!res.data.error){
						open('http://localhost:8066/Navigation','_self')
                    }else {
                        alert(res.data.data)
                    }

                })
            },

        },
        components:{

        }
    }

</script>
<style lang="less"  scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #box{
        width:100%;
        height:100%;
        background:url("../assets/bj.jpg");
		background-size: cover;
        text-align: center;
        padding-top:200px;
    }
    #box P{
        font-size: 40px;
        font-family: "Helvetica Neue";
    }

    #box  input{
        margin-top: 24px;
        width: 288px;
        height: 44px;
    }
    #box  button{
        width:288px;
        margin-top: 50px;

    }
</style>