
//引入数据库
var mysql=require('mysql');

//建立数据库链接
var dp=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'project3'
});
var loginModule=require('./../module/FLandModule.js');

  var json={
    "login":function (req,res) {

        loginModule.login(req.body.tel,req.body.pass,function (err,data){
            console.log(data);
            if (err){
                console.log(req.body.pass);
                console.log(err)
            } else{
                if(data.length){
                    res.send({error:0,data:data})
                }else{
                    res.send('账号密码错误')
                }
            }

            
        })
    },
    "register":function (req,res) {
        console.log(req.body);
        loginModule.register(req.body.tel,function (err,data) {
                if (err){
                    console.log(1+'数据库错误'+err)
                } else{
                    if (data.length){
                        res.send('此用户存在')
                    } else
                        loginModule.add(req.body.name,req.body.pass,req.body.tel,function (err,data) {
                            if (err) {
                                console.log(2+'数据库错误'+err)
                            }else{
                                res.send({error:0,data:'注册成功'})
                            }

                        })
                }

            })
    }
};


//导出
  module.exports=json;
