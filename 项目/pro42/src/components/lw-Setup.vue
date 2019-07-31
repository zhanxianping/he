<template>
     <div id='Tin'>
        <div id="head-p">
             &nbsp;&nbsp;&nbsp;&nbsp;<span>所在位置：<span>权限</span></span>
         </div>
         <div id="Choice-l">
             <hr>
             <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" style="background: #B3C0D1">
                 <el-menu-item style="background: #B3C0D1">&nbsp;&nbsp;<i class="el-icon-menu"></i></el-menu-item>
                 <el-menu-item index="1" style="background: #B3C0D1" @click="modifyLW">权限设置</el-menu-item>
             </el-menu>
         </div>
         <div id="content-l">
             <lwModify v-if="a"></lwModify>
         </div>
     </div>
</template>

<script>

    import lwModify from './lwModify'
    import lwEstablish from  './lwEstablish'
    import lwPower from  './lwPower'

    export default {
        name: "Tin",
        data:function () {
            return {
                 input10: '',
                activeIndex: '1',
                activeIndex2: '1',
                a:true,
                b:false,
            }
        },
        methods: {
            handleSelect(key, keyPath) {
            },
            modifyLW(){
              this.a=true;

            },
        },
        components:{
            lwModify,
            lwEstablish,
            lwPower
        },
    }
</script>

<style scoped>
     #Tin{
         width: 100%;
         height: 100%;
      }
     #head-p{
         width: 100%;
         height: 60px;
         background: #B3C0D1;
         line-height:60px;
     }
    #Choice-l{
        width: 100%;
        height: 50px;
    }
    #content-l{
        width: 100%;
        height: 100%;
        background: rgba(152, 168, 184, 0.22);
    }

</style>
