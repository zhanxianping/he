
//引入数据库
var mysql=require('mysql');

//建立数据库链接
var dp=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project3'
});

    var loginModule={
        login:function(user,pass,fn){
			console.log(user,pass)
            var sql=`select * from user_table where tel="${user}" and pass="${pass}"`;
            dp.query(sql,function (err,data) {
				console.log(1,data)
                fn(err,data)
                
            })
        },
        register:function (user,fn) {
            var sql=`select * from user_table where tel=${user}`;

            dp.query(sql,function (err,data) {
                fn(err,data)

            })

        },
        add:function (name,pass,tel,fn) {
            var sql=`insert into user_table value(null,"${name}","${pass}","${tel}",null,null,null,null,null)`;

            dp.query(sql,function (err,data) {
                fn(err,data);
            })
        }
    };

    //导出
module.exports=loginModule;
