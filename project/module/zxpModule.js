var mysql=require('mysql');

var db=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project3',
	timezone: '08:00'
});

var json={
    zxpProClassic:function (fn) {

        let sql=`SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND colour='#F2DCBD' AND series.s_name="classic"`;
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    zxpProPetite:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.series=series.id AND goods.id=picture.id AND colour='#F2DCBD' AND series.s_name="classic petite"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpProBlack:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.series=series.id AND goods.id=picture.id AND colour='#F2DCBD' AND series.s_name="classic black"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpProDapper:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.series=series.id AND goods.id=picture.id AND colour='#F2DCBD' AND series.s_name="dapper"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpProClassy:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.series=series.id AND goods.id=picture.id AND colour='#F2DCBD' AND series.s_name="classy"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpMaleC:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND colour='#F2DCBD' AND sex='男' AND series.s_name="classic"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpMaleB:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND colour='#F2DCBD' AND sex='男' AND series.s_name="classic black"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpMaleD:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND colour='#F2DCBD' AND sex='男' AND series.s_name="dapper"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpWomClassic:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND colour='#F2DCBD' AND series.s_name="classic"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpWomBlack:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND colour='#F2DCBD' AND series.s_name="classic black"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpWomPetite:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND colour='#F2DCBD' AND series.s_name="classic petite"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpWomDapper:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND colour='#F2DCBD' AND sex='女' AND series.s_name="dapper"`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpWomClassy:function (fn) {
        let sql = `SELECT * FROM picture JOIN goods JOIN series ON goods.\`series\`=series.\`id\` AND goods.\`id\`=picture.\`id\` AND sex='女' AND series.s_name="classy" GROUP BY g_name`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpWrist:function (fn) {
        let sql = `SELECT * FROM goods JOIN picture ON goods.\`id\`=picture.\`id\` AND a_group='a1'`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpWatch:function (fn) {
        let sql = `SELECT * FROM goods JOIN picture ON goods.\`id\`=picture.\`id\` AND a_group='a2'`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
    zxpLovers:function (fn) {
        let sql = `SELECT * FROM goods JOIN picture ON goods.\`id\`=picture.\`id\` AND a_group='a3'`;
        db.query(sql, function (err, data) {
            fn(err, data)
        })
    },
	zxpBHPage:function (fn) {
	    let sql = `SELECT *,(sales*rmb) AS aa FROM goods JOIN series ON goods.\`series\`=series.\`id\` ORDER BY aa DESC LIMIT 0,10`;
	    db.query(sql, function (err, data) {
	        fn(err, data)
	    })
	},
	zxpTotal:function (fn) {
		
		let msg={};
		msg['arr']=[];
		msg['state']=[];
		let sql=`SELECT SUM(YEAR(TIME) = YEAR(NOW())) AS year,SUM(MONTH(TIME) = MONTH(NOW())) AS month,SUM(WEEK(TIME) = WEEK(NOW())) AS week,SUM(DAY(TIME) = DAY(NOW())-1) AS day FROM order_table`;
		let yearSale = `SELECT number FROM order_table WHERE YEAR(TIME) = YEAR(NOW())`;
		let monthSale = `SELECT number FROM order_table WHERE MONTH(TIME) = MONTH(NOW())`;
		let weekSale = `SELECT number FROM order_table WHERE WEEK(TIME) = WEEK(NOW())`;
		let daySale = `SELECT number FROM order_table WHERE DAY(TIME) = DAY(NOW())-1`;
		let yearRmb=`SELECT SUM(money) AS yearRmb FROM order_table WHERE YEAR(TIME) = YEAR(NOW())`;
		let monthRmb=`SELECT SUM(money) AS monthRmb FROM order_table WHERE MONTH(TIME) = MONTH(NOW())`;
		let weekRmb=`SELECT SUM(money) AS weekRmb FROM order_table WHERE WEEK(TIME) = WEEK(NOW())`;
		let dayRmb=`SELECT SUM(money) AS dayRmb FROM order_table WHERE DAY(TIME) = DAY(NOW())-1`;
		
		let oneState=`SELECT COUNT(*) as aa FROM order_table WHERE state='已付款' OR state='待支付'`;
		let twoState=`SELECT COUNT(*) as aa FROM order_table WHERE state='已收货'`;
		let threeState=`SELECT COUNT(*) as aa FROM order_table WHERE state='待收货'`;
		let fourState=`SELECT COUNT(*) as aa FROM order_table WHERE state='已作废'`;
		let urgent=`SELECT COUNT(*) as aa FROM goods WHERE number<=20`;
		let typeT=`SELECT COUNT(*) as aa FROM series`;
		let totalT=`SELECT SUM(number) as aa FROM goods`;
		
		db.query(typeT, function (err, data) {
			msg['typeT']=data[0].aa;
		});
		db.query(totalT, function (err, data) {
			msg['totalT']=data[0].aa;
		});
		
		db.query(oneState, function (err, data) {
			msg['state'].push(data[0].aa);
		});
		db.query(twoState, function (err, data) {
			msg['state'].push(data[0].aa);
		});
		db.query(threeState, function (err, data) {
			msg['state'].push(data[0].aa);
		});
		db.query(fourState, function (err, data) {
			msg['state'].push(data[0].aa);
		});
		db.query(urgent, function (err, data) {
			msg['state'].push(data[0].aa);
		});
		
		db.query(sql, function (err, data) {
			msg['sql']=data;
		});
		db.query(yearRmb, function (err, data) {
			if (!data[0].yearRmb){
				data[0].yearRmb=0;
			}
			return msg['arr'].push(data[0].yearRmb)
		});
		db.query(monthRmb, function (err, data) {
			if (!data[0].monthRmb){
				data[0].monthRmb=0;
			}
			return msg['arr'].push(data[0].monthRmb)
		});
		db.query(weekRmb, function (err, data) {
			if (!data[0].weekRmb){
				data[0].weekRmb=0;
			}
			return msg['arr'].push(data[0].weekRmb)
		});
		db.query(dayRmb, function (err, data) {
			if (!data[0].dayRmb){
				data[0].dayRmb=0;
			}
			return msg['arr'].push(data[0].dayRmb)
		});
		db.query(daySale, function (err, data) {
			let arr;
			let sum=0;
			for(let i=0;i<data.length;i++){
				arr=data[i].number.split(',');
				for(let n=0;n<arr.length;n++){
					sum+=Number(arr[n]);
				}
			}
			msg['daySale']=sum;
		});
		db.query(weekSale, function (err, data) {
			let arr;
			let sum=0;
			for(let i=0;i<data.length;i++){
				arr=data[i].number.split(',');
				for(let n=0;n<arr.length;n++){
					sum+=Number(arr[n]);
				}
			}
			msg['weekSale']=sum;
		});
		db.query(monthSale, function (err, data) {
			let arr;
			let sum=0;
			for(let i=0;i<data.length;i++){
				arr=data[i].number.split(',');
				for(let n=0;n<arr.length;n++){
					sum+=Number(arr[n]);
				}
			}
			msg['monthSale']=sum;
		});
		
		db.query(yearSale, function (err, data) {
			let arr;
			let sum=0;
			for(let i=0;i<data.length;i++){
				arr=data[i].number.split(',');
				for(let n=0;n<arr.length;n++){
					sum+=Number(arr[n]);
				}
			}
			msg['yearSale']=sum;
			fn(err, msg)
		});
		
		
	},
	
	//client
	zxpClient:function (page,n,s,con,fn) {
		if(n<=1){
			n=1
		}
		let msg={};
		let whole=`SELECT DISTINCT * FROM user_table WHERE user_table.state='${page}'`;
	    let sql = `SELECT DISTINCT * FROM user_table WHERE user_table.state='${page}' ORDER BY user_table.id LIMIT ${(n-1)*s},${s}`;
	    let num = `SELECT *,COUNT(order_table.\`USER\`) AS aa,SUM(order_table.\`money\`)AS bb FROM user_table JOIN order_table ON user_table.\`id\`=order_table.\`USER\` GROUP BY order_table.\`USER\``;
		let look=`SELECT DISTINCT * FROM user_table WHERE user_table.state='${page}' AND NAME='${con}' OR tel='${con}'`;
		db.query(whole, function (err, data) {
		    msg['whole']=data;
		})
		db.query(num, function (err, data) {
			msg['num']=data;
		})
		db.query(look, function (err, data) {
			msg['look']=data;
		})
	    db.query(sql, function (err, data) {
			msg['sql']=data;
	        fn(err, msg);
	    })
	},
	zxpClient2:function (id,fn) {
	    let sql = `SELECT * FROM address WHERE USER=${id}`;
	    db.query(sql, function (err, data) {
	        fn(err, data)
	    })
	},
	zxpClient3:function (tel,fn) {
	    let sql = `UPDATE user_table SET state='禁用' WHERE tel=${tel}`;
	    db.query(sql, function (err, data) {
	        fn(err, data)
	    })
	},
	zxpClientEnable:function (tel,fn) {
	    let sql = `UPDATE user_table SET state='在线' WHERE tel=${tel}`;
	    db.query(sql, function (err, data) {
	        fn(err, data)
	    })
	},
	
};


module.exports=json;