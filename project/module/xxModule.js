var mysql=require('mysql');
var db=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project3'
});

var json={
	x1:function(tel,fn){
		var sql=`SELECT * FROM user_table WHERE tel='${tel}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	x2:function(tel,fn){
		var sql=`SELECT * FROM user_table WHERE tel='${tel}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	x21:function(tel,tjm,Time,Mail,Sex,name,fn){
		var sql=`UPDATE user_table SET name='${name}',TIME='${Time}',sex='${Sex}',mail='${Mail}',tjm='${tjm}' WHERE tel='${tel}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	getPage:function(tel,fn){
		var sql=`SELECT COUNT(1) as num FROM user_table JOIN address ON user_table.id=address.\`USER\` GROUP BY user_table.tel='${tel}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	
	getPageCon:function(tel,num,fn){
		var sql=`SELECT * FROM user_table JOIN address ON user_table.id=address.USER WHERE tel='${tel}' limit ${(num-1)*5},5`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	del:function(id,fn){
		var sql=`delete from address where ID='${id}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	update:function(tel,name,province,city,county,address,id,fn){
		var sql=`UPDATE address SET province='${province}',city='${city}',county='${county}',address='${address}',phone='${tel}',name='${name}' WHERE ID='${id}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	tj:function(tel,name,province,city,county,address,id,user,fn){
		var sql=`INSERT INTO address VALUES (DEFAULT,'${user}','${province}','${city}','${county}','${address}','${tel}','${name}')`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	
	x41:function(tel,fn){
		var sql=`SELECT COUNT(1) as num FROM user_table JOIN address ON user_table.id=address.USER WHERE tel='${tel}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	
	tj1:function(tel,fn){
		var sql=`SELECT * FROM user_table  WHERE tel='${tel}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	
	add:function(used,user,xxx,fn){
		console.log(user);
		console.log(used);
		console.log(xxx);
		var sql=`UPDATE user_table SET pass='${xxx}' WHERE tel='${used}' AND pass='${user}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	add1:function(fn){
		var sql=`SELECT * FROM user_table`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	getPage1:function(tel,fn){
		 var sql=`SELECT COUNT(1) AS num FROM user_table JOIN order_table ON order_table.USER=user_table.id  WHERE tel='${tel}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	getPageCon1:function(tel,num,fn){
		 var sql=`SELECT DATE_FORMAT(order_table.TIME,'%Y-%d-%m %T') AS sj,order_table.id,user_table.name,order_table.money,order_table.state FROM user_table JOIN order_table ON order_table.USER=user_table.id WHERE tel='${tel}' LIMIT ${(num-1)*5},5`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	
	del1:function(id,fn){
		 var sql=`DELETE FROM order_table WHERE id=${id}`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	del2:function(id,fn){
		 var sql=`DELETE FROM order_table WHERE id=${id} and state='待付款'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	
	del3:function(id,fn){
		 var sql=`DELETE FROM order_table WHERE id=${id} and state='已完成'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	
	getPageCon2:function(tel,num,fn){
		 var sql=`SELECT DATE_FORMAT(order_table.TIME,'%Y-%d-%m %T') AS sj,order_table.id,user_table.name,order_table.money,order_table.state FROM user_table JOIN order_table ON order_table.USER=user_table.id WHERE tel='${tel}' and state='待付款' LIMIT ${(num-1)*5},5`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	getPage2:function(tel,fn){
		var sql=`SELECT COUNT(1) AS num FROM user_table JOIN order_table ON order_table.USER=user_table.id  WHERE tel='${tel}' and state='待付款'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	getPageCon3:function(tel,num,fn){
		 var sql=`SELECT DATE_FORMAT(order_table.TIME,'%Y-%d-%m %T') AS sj,order_table.id,user_table.name,order_table.money,order_table.state FROM user_table JOIN order_table ON order_table.USER=user_table.id WHERE tel='${tel}' and state='已完成' LIMIT ${(num-1)*5},5`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	getPage3:function(tel,fn){
		var sql=`SELECT COUNT(1) AS num FROM user_table JOIN order_table ON order_table.USER=user_table.id  WHERE tel='${tel}' and state='已完成'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	getPageCon4:function(tel,num,oIpt,fn){
		var sql=`SELECT DATE_FORMAT(order_table.TIME,'%Y-%d-%m %T') AS sj,order_table.id AS ID,user_table.name,order_table.money,order_table.state FROM order_table JOIN user_table ON order_table.USER=user_table.id AND order_table.id LIKE '%${oIpt}%' WHERE tel='${tel}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	x71:function(tel,fn){
		 var sql=`SELECT COUNT(1) AS num FROM user_table JOIN order_table ON order_table.USER=user_table.id  WHERE tel='${tel}'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	x72:function(tel,fn){
		var sql=`SELECT COUNT(1) AS num FROM user_table JOIN order_table ON order_table.USER=user_table.id  WHERE tel='${tel}' and state='待付款'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	 
	 x73:function(tel,fn){
		var sql=`SELECT COUNT(1) AS num FROM user_table JOIN order_table ON order_table.USER=user_table.id  WHERE tel='${tel}' and state='已完成'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	x74:function(id,fn){
		var sql=`SELECT goods,number FROM order_table WHERE id=${id}`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	x75:function(id,fn){
		var sql=`SELECT * FROM order_table JOIN ddb JOIN picture JOIN goods ON goods.id=ddb.goods1 AND order_table.sp=ddb.SP AND picture.id=ddb.goods1 WHERE order_table.id=${id}`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	x76:function(id,fn){
		var sql=`UPDATE order_table SET state='已完成' WHERE sp=${id}`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	GoodsWarehousing1:function(fn){
		var sql=`SELECT g_name,s_name,size,sex,goods.id,number,rmb FROM series JOIN goods ON series.id=goods.series WHERE number<=20 and state='已上架' ORDER BY sales DESC `;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	GoodsWarehousing2:function(input,fn){
		var sql=`SELECT g_name,s_name,size,sex,goods.id,number,rmb FROM series JOIN goods ON series.id=goods.series  WHERE number<=20 and state='已上架' and goods.id like '%${input}%'`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	
	
	GoodsWarehousing3:function(input1,fn){
		var sql=`SELECT g_name,s_name,size,sex,goods.id,number,rmb FROM series JOIN goods ON series.id=goods.series and sales<='${input1}' WHERE number<=20 and state='已上架' `;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	GoodsWarehousing4:function(id,fn){
		var sql=`UPDATE goods SET state='已下架' WHERE id=${id}`;
		db.query(sql,function(err,data){
			fn(err,data)
		})
	},
	
	
}

module.exports=json;
