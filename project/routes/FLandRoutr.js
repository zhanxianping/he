var express=require('express');

//引入controller
var FLandController=require('./../controller/FLandController');
var AV=require('leanengine');

//配置短信
AV.init({
    appId:'fw7gJBzWOnXauy2E9S2sMnVy-gzGzoHsz',
    appKey:'wHJL8OH6vEdJjYoKhK76xfkY',
    masterKey:'enoSm5F3sQbfyQ1TVE1gVJ1U'
});

//只执行express里面的router模块
var myRouter=express.Router();
var mysql=require('mysql');
var db=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project3',
	timezone: '08:00'
});

//POST请求,(登陆)
myRouter.post('/f-dl',FLandController.login);
//get请求（注册）
myRouter.post('/f-zc',FLandController.register);

myRouter.post('/getCode',function (req,res) {
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber: req.body.phone,
        name: 'web190部门',
        op: '欢迎光临，赶快注册吧',
        ttl: 10                     // 验证码有效时间为 10 分钟
    }).then(function(res){
        console.log(res);
        res.send({error:0})
        //调用成功
    }, function(err){
        //调用失败
        console.log(err);
        res.send({error:1,msg:err})
    });
});
myRouter.post('/test',function (req,res) {
    AV.Cloud.verifySmsCode(req.body.yz, req.body.phone).then(function(res){
        //验证成功
        console.log(res);
        res.send({error:0})
    }, function(err){
        //验证失败
        console.log(err);
        res.send({error:1})
    });
});
myRouter.post('/fhllogin',function (req,res) {
    console.log(req.body);
    var user=req.body.user;
    var pass=req.body.pass;
    var sql=`select * from h_login where user="${user}"`;
    db.query(sql,function (err,data) {
        if(!err) {
            if (data.length == 0) {
                console.log(1);
                res.send({error:1,data:'没有此用户'});
            } else {
                console.log(data);
                if (pass == data[0].pass) {
                    console.log(2);
                    res.send({error:0,data:data});
                } else {
                    console.log(3);
                    res.send({error:1,data:'用户名错误或密码错误'});
                }

            }
        }
    })

});


//导出模块
module.exports=myRouter;
