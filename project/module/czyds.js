var mysql = require('mysql');
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'project3',
	timezone: '08:00'
});

function json() {
	this.sqlall = function(sql, fn) {
		db.query(sql, function(err, data) {
			fn(err, data);
		});
	}
}
json.prototype = {
	delorder: function(id,arr,arr2,address,zj, fn) {
		var oDate=new Date();
		var year=oDate.getYear();
		var moth=oDate.getMonth();
		var day=oDate.getDate();
		var hour=oDate.getHours();
		var minute=oDate.getMinutes();
		var second=oDate.getSeconds();
		year="20"+year.toString().charAt(1)+year.toString().charAt(2);
		moth+=1;
		moth.toString().length<2?moth='0'+moth:moth;
		day.toString().length<2?day='0'+day:day;
		hour.toString().length<2?hour='0'+hour:hour;
		minute.toString().length<2?minute='0'+minute:minute;
		second.toString().length<2?second='0'+second:second;
		var time=year+'-'+moth+'-'+day+' '+hour+':'+minute+':'+second;
		arr.forEach(function(v, i) {
			var sql = `DELETE FROM car WHERE id=${v}`;
			db.query(sql, function(err, data) {});
		})
		var arra=arr.toString();
		var arr2a=arr2.toString();
		address=JSON.parse(address[0])
		address=address.name+address.number+address.address;
		var sql=`INSERT INTO order_table VALUES(NULL,${id},${zj},'${arra}','${arr2a}',"${time}"
		,"已支付","在线支付","${address}",NULL)`;
		db.query(sql,function(err,data1){
			var sql1=`UPDATE order_table SET sp=${data1.insertId} WHERE id=${data1.insertId}`;
			db.query(sql1,function(err,data){
				arr.forEach((v,i)=>{
					var sql2=`INSERT INTO ddb VALUES(NULL,${arr[i]},${arr2[i]},${data1.insertId})`;
					console.log(sql2)
					db.query(sql2,function(err,data){
					})
				})
			})
		})
	},
	order: function(id, arr, fn) {
		let wdata = {
			user: [],
			shop: []
		}
		arr.forEach(function(v, i) {
			var sql =
				` SELECT a.id,g_name,size,rmb,img1,a.number FROM car a JOIN goods b  JOIN picture c
			ON a.goods=b.id AND c.goods=b.id WHERE a.id=${v} `;
			db.query(sql, function(err, data) {
				wdata.shop.push(data);
			});
		})
		var sql =
			` SELECT b.name,b.phone,province,city,address FROM user_table a JOIN address b
		ON a.id=b.user WHERE a.id=${id} `;
		console.log(sql)
		db.query(sql, function(err, data) {
		console.log(data)
			wdata.user.push(data);
			fn(err, wdata);
		});
	},
	changeg: function(data, fn) {
		var sql =
			`UPDATE goods a SET a.g_name='${data["data[g_name]"]}',a.colour='${data["data[colour]"]}', 
			a.size='${data["data[size]"]}',a.sex='${data["data[sex]"]}',
			a.number='${data["data[number]"]}',a.rmb='${data["data[rmb]"]}',
			a.state='${data["data[state]"]}',a.series='${data["data[series]"]||data["data[cid]"]}'
			WHERE a.id = ${data["data[id]"]}`;
		sql1 =
			`UPDATE picture a SET a.img1='${data["data[img1]"]}',
			a.img2='${data["data[img2]"]}',a.img3='${data["data[img3]"]}'
			WHERE a.goods= ${data["data[id]"]}`;
		db.query(sql, function(err, data) {});
		db.query(sql1, function(err, data) {
			fn(err, data);
		});
	},
	propictrue: function(id, file, fn) {
		var sql =
			`UPDATE goods a JOIN picture b ON a.id=b.goods SET b.img1=${file} WHERE a.id = ${id}`;
		db.query(sql, function(err, data) {
			fn(err, data);
		});
	},
	changegoods: function(id, fn) {
		var sql =
			`SELECT a.id,a.g_name,c.s_name,a.colour,a.size,a.sex,a.rmb,a.number,a.sales,a.state,b.img1,b.img2,b.img3,c.id cid,b.id bid
			FROM goods a JOIN picture b JOIN series c ON a.id=b.goods AND a.series=c.id WHERE a.id=${id}`;
		var sql1 =
			`SELECT c.id,c.s_name FROM series c`;
		db.query(sql, function(err, data) {
			db.query(sql1, function(err, data1) {
				let odata = {
					data: data,
					data1: data1
				}
				fn(err, odata);
			})
		});
	},
	productdxj: function(id, fn) {
		var sql = `UPDATE goods SET state ='已下架' WHERE id = ${id}`;
		db.query(sql, function(err, data) {
			fn(err, data);
		});
	},
	productdsel: function(data, fn) {
		var sql = '';
		var sql1 = '';
		var num = 1;
		var flag = false;
		data = data.split(',')
		if (data[1] == 0) {
			var id = parseInt(data[0]);
			sql = `SELECT a.id,b.img1,a.g_name,a.rmb,a.number FROM goods a JOIN picture b on
			a.id=b.goods WHERE a.id=${id}`;
			sql1 = `SELECT a.id FROM goods a WHERE a.id=${id}`;
			flag = true;
		} else if (data[1] == 1) {
			sql =
				`SELECT a.id,b.img1,a.g_name,a.rmb,a.number FROM goods a JOIN picture b on
			a.id=b.goods WHERE a.g_name like "%${data[0]}%"`;
			sql1 = `SELECT a.id FROM goods a WHERE a.g_name like "%${data[0]}%"`;
			flag = true;
		} else {
			if (data[0] == 1) {
				sql =
					`SELECT a.id,b.img1,a.g_name,a.rmb,a.number FROM goods a JOIN picture b on
				a.id=b.goods WHERE a.number>20 ORDER BY a.id DESC LIMIT ${(num-1)*5},${num*5}`;
				sql1 = `SELECT a.id FROM goods a WHERE a.number>20`;
			} else {
				sql =
					`SELECT a.id,b.img1,a.g_name,a.rmb,a.number FROM goods a JOIN picture b on
				a.id=b.goods WHERE a.number<21 ORDER BY a.id DESC LIMIT ${(num-1)*5},${num*5}`;
				sql1 = `SELECT a.id FROM goods a WHERE a.number<21`;
			}
		}
		var pages = 1;
		var data2 = {};
		db.query(sql, function(err, data) {
			if (data) {
				if (data.length > 5) {
					data.length = 5;
				}
			}
			db.query(sql1, function(err, data1) {
				pages = Math.ceil(data1.length / 5) - 1;
				if (flag) {
					pages = 1;
				}
				data2 = {
					data: data,
					pages: pages
				};
				fn(err, data2);
			});
		});
	},
	productdnow: function(num, state, fn) {
		var sql = '';
		var sql1 = '';
		if (state.length) {
			if (state == 1) {
				sql =
					`SELECT a.id,b.img1,a.g_name,a.rmb,a.number FROM goods a JOIN picture b on
				a.id=b.goods WHERE a.number>29 ORDER BY a.id DESC LIMIT ${(num-1)*5},${num*5}`;
				sql1 = `SELECT a.id FROM goods a WHERE a.number>29`;
			} else {
				sql =
					`SELECT a.id,b.img1,a.g_name,a.rmb,a.number FROM goods a JOIN picture b on
				a.id=b.goods WHERE a.number<30 ORDER BY a.id DESC LIMIT ${(num-1)*5},${num*5}`;
				sql1 = `SELECT a.id FROM goods a WHERE a.number<30`;
			}
		} else {
			sql =
				`SELECT a.id,b.img1,a.g_name,a.rmb,a.number FROM goods a JOIN picture b on
				a.id=b.goods ORDER BY a.id DESC LIMIT ${(num-1)*5},${num*5}`;
			sql1 = `SELECT a.id FROM goods a`;
		}
		var pages = 1;
		var data2 = {};
		db.query(sql, function(err, data) {
			if (data.length > 5) {
				data.length = 5;
			}
			db.query(sql1, function(err, data1) {
				pages = Math.ceil(data1.length / 5) - 1;
				data2 = {
					data: data,
					pages: pages
				};
				fn(err, data2);
			});
		});
	},
	productdstart: function(fn) {
		var now = 1;
		var pages = 1;
		var data2 = {};
		var sql =
			`SELECT a.id,b.img1,a.g_name,a.rmb,a.number FROM goods a JOIN picture b on
				a.id=b.goods ORDER BY a.id DESC LIMIT ${(now-1)*5},${now*5}`;
		var sql1 = `SELECT a.id FROM goods a`;
		db.query(sql, function(err, data) {
			db.query(sql1, function(err, data1) {
				pages = Math.ceil(data1.length / 5) - 1;
				data2 = {
					data: data,
					pages: pages
				};
				fn(err, data2);
			});
		});
	},
	changeaddres: function(id, address, fn) {
		var sql = `UPDATE order_table SET address ='${address}' WHERE id = ${id}`;
		db.query(sql, function(err, data) {
			fn(err, data);
		});
	},
	dsczyall: function(id, fn) {
		let msg = {};
		var sql =
			`SELECT g_name,colour,size,sex,number,rmb,s_name,img1,img2,img3 FROM goods a JOIN series b JOIN picture c ON a.series=b.id AND a.id=c.goods WHERE a.id=${id}`;
		var sql2 =
			`SELECT id,colour,size FROM goods WHERE g_name=(SELECT g_name FROM goods WHERE id=${id}) AND series=(SELECT series FROM goods WHERE id=${id})`;
		db.query(sql, function(err, data) {
			msg['o'] = data;
		});
		db.query(sql2, function(err, data) {
			msg['p'] = data;
			fn(err, msg);
		});
	},
	dsczyser: function(id, fn) {
		var sql =
			`SELECT  a.id,g_name,size,rmb,s_name,img1 FROM goods a JOIN series b JOIN picture c ON a.series=b.id AND a.id=c.goods WHERE 
		series=(SELECT series FROM goods WHERE id=${id})`;
		db.query(sql, function(err, data) {
			fn(err, data);
		});
	},
	scall: function(id, fn) {
		var sql =
			` SELECT a.id,g_name,size,rmb,a.number,s_name,sex,img1,series,b.number num FROM car a JOIN goods b JOIN series c JOIN picture d 
 		ON a.goods=b.id AND b.series=c.id AND d.goods=b.id WHERE a.user=${id}`;
		db.query(sql, function(err, data) {
			fn(err, data);
		});
	},
	scser: function(ser, sex, fn) {
		var sql =
			`SELECT  a.id,g_name,size,rmb,s_name,img1 FROM goods a JOIN series b JOIN picture c ON a.series=b.id AND 
		a.id=c.goods WHERE series=${ser} AND sex='${sex}'`;
		db.query(sql, function(err, data) {
			fn(err, data);
		});
	},
	dsche: function(user, goods, num, fn) {
		var sql = `SELECT goods FROM car WHERE goods=${goods}`;
		var sql2 = `DELETE FROM car WHERE goods=${goods}`;
		var sql3 = `INSERT INTO car VALUES (NULL,${user},${goods},${num});`;
		var con = false;
		db.query(sql, function(err, data) {
			if (data.length != 0) {
				con = true;
			}
			if (con) {
				db.query(sql2, function(err, data) {});
			}
			db.query(sql3, function(err) {
				fn(err);
			});
		});
	},
	scdel: function(id, fn) {
		var sql = `DELETE FROM car WHERE id=${id}`;
		db.query(sql, function(err, data) {
			fn(err);
		});
	},
	shuliang: function(num, id, fn) {
		var sql = `UPDATE car SET number = ${num} WHERE id = ${id}`;
		db.query(sql, function(err, data) {
			fn(err);
		});
	},
	ordervue: function(data, fn) {
		let now = 1;
		let date = '';
		let flag = data instanceof Object;
		let sql = '';
		let sql1 = '';
		let sql2 = '';
		let pages = 0;
		let odata = [];
		let odata2 = [];
		let user = [];
		if (data.length !== 1 && data[0] && !flag) {
			data = JSON.parse(data);
			now = parseInt(data.now);
			date = data.data;
			if (date.length !== 1) {
				// date=data.data.split(',')
			}
		}
		if (date) {
			data = date;
		}
		run(data);

		function run(data) {
			if (data.length == 1) {
				switch (data) {
					case '0':
						data = ``;
						break;
					case '1':
						data = `WHERE a.state='已付款' OR a.state='待支付'`;
						break;
					case '2':
						data = `WHERE a.state='待出库'`;
						break;
					case '3':
						data = `WHERE a.state='待收货'`;
						break;
					case '4':
						data = `WHERE a.state='已收货'`;
						break;
					case '5':
						data = `WHERE a.state='已完成'`;
						break;
					case '6':
						data = `WHERE a.state='已作废'`;
						break;
				}
				// state
				sql = `SELECT a.id FROM order_table a ${data}`;
				sql1 =
					`SELECT a.id,a.USER,a.money,a.goods,a.number,a.time,
				a.state,a.pay,a.address FROM order_table a ${data} 
				ORDER BY a.id DESC LIMIT ${(now-1)*8},${now*8}`;
				db.query(sql1, function(err, data) {
					if (data.length > 8) {
						data.length = 8;
					}
					data.forEach(function(v, i) {
						odata.push(v);
						user[i] = v.USER;
					})
					user.forEach(function(v, i) {
						sql2 = `SELECT b.name,b.phone,b.province,b.city
						,b.address FROM address b WHERE b.USER=${v}`;
						db.query(sql2, function(err, data1) {
							odata2.push(data1)
							db.query(sql, function(err, data1) {
								pages = Math.ceil(data1.length / 8);
								data[i] = {
									data: odata,
									data1: odata2,
									pages: pages
								}
								if (i == user.length - 1) {
									fn(err, data[0])
								}
							});
						});
					})
				});
			} else {
				if (data[0]) {
					data = `WHERE a.id=${data[0]}`;
					sql = `SELECT a.id FROM order_table a ${data}`;
					sql1 =
						`SELECT a.id,a.USER,a.money,a.goods,a.number,a.time,
					a.state,a.pay,a.address FROM order_table a ${data} 
					ORDER BY a.id DESC LIMIT ${(now-1)*8},${now*8}`;
					db.query(sql1, function(err, data) {
						if (data.length > 8) {
							data.length = 8;
						}
						data.forEach(function(v, i) {
							odata.push(v);
							user[i] = v.USER;
						})
						user.forEach(function(v, i) {
							sql2 = `SELECT b.name,b.phone,b.province,b.city
							,b.address FROM address b WHERE b.USER=${v}`;
							db.query(sql2, function(err, data1) {
								odata2.push(data1)
								db.query(sql, function(err, data1) {
									pages = Math.ceil(data1.length / 8);
									data[i] = {
										data: odata,
										data1: odata2,
										pages: pages
									}
									if (i == user.length - 1) {
										fn(err, data[0])
									}
								});
							});
						})
					});
				} else if (data[2] == 1) {
					sql = `SELECT a.address,a.id FROM order_table a`;
					db.query(sql, function(err, date) {
						if (date.length > 8) {
							date.length = 8;
						}
						date.forEach(function(v, i) {
							v.address = v.address.split(',')[0];
							if (v.address == data[1]) {
								odata.push(v.id);
							}
						})
						odata = odata.reverse();
						if (odata.length) {
							pages = Math.ceil(odata.length / 8);
							odata2 = ''
							odata.forEach(function(v, i) {
								v += ',';
								odata2 += v;
							})
							odata2 = odata2.substr(0, odata2.length - 1);
							data = `WHERE a.id in (${odata2})`;
							sql1 =
								`SELECT a.id,a.USER,a.money,a.goods,a.number,a.time,
								a.state,a.pay,a.address FROM order_table a ${data} 
								ORDER BY a.id DESC LIMIT ${(now-1)*8},${now*8}`;
							db.query(sql1, function(err, data) {
								odata = [];
								odata2 = [];
								data.forEach(function(v, i) {
									odata.push(v);
									user[i] = v.USER;
								})
								user.forEach(function(v, i) {
									sql2 = `SELECT b.name,b.phone,b.province,b.city
										,b.address FROM address b WHERE b.USER=${v}`;
									db.query(sql2, function(err, data1) {
										odata2.push(data1)
										data[i] = {
											data: odata,
											data1: odata2,
											pages: pages
										}
										if (i == user.length - 1) {
											fn(err, data[0])
										}
									});
								})
							})
						}
					});
				} else {
					sql = `SELECT a.address,a.id FROM order_table a`;
					db.query(sql, function(err, date) {
						if (date.length > 8) {
							date.length = 8;
						}
						date.forEach(function(v, i) {
							v.address = v.address.split(',')[1];
							if (v.address == data[1]) {
								odata.push(v.id);
							}
						})
						odata = odata.reverse();
						if (odata.length) {
							pages = Math.ceil(odata.length / 8);
							odata2 = ''
							odata.forEach(function(v, i) {
								v += ',';
								odata2 += v;
							})
							odata2 = odata2.substr(0, odata2.length - 1);
							data = `WHERE a.id in (${odata2})`;
							sql1 =
								`SELECT a.id,a.USER,a.money,a.goods,a.number,a.time,
								a.state,a.pay,a.address FROM order_table a ${data} 
								ORDER BY a.id DESC LIMIT ${(now-1)*8},${now*8}`;
							db.query(sql1, function(err, data) {
								odata = [];
								odata2 = [];
								data.forEach(function(v, i) {
									odata.push(v);
									user[i] = v.USER;
								})
								user.forEach(function(v, i) {
									sql2 = `SELECT b.name,b.phone,b.province,b.city
										,b.address FROM address b WHERE b.USER=${v}`;
									db.query(sql2, function(err, data1) {
										odata2.push(data1)
										data[i] = {
											data: odata,
											data1: odata2,
											pages: pages
										}
										if (i == user.length - 1) {
											fn(err, data[0])
										}
									});
								})
							})
						}
					});
				}
			}
		}
	},
	Liuchen: function(data, id, fn) {
		let sql = ';'
		switch (data) {
			case '0':
				sql = `UPDATE order_table SET state = '待出库' WHERE id = ${id}`;
				break;
			case '1':
				sql = `UPDATE order_table SET state = '待收货' WHERE id = ${id}`;
				break;
			case '2':
				sql = `UPDATE order_table SET state = '已作废' WHERE id = ${id}`;
				break;
		}
		db.query(sql, function(err, data) {
			fn(err, data)
		});
	}
}
module.exports = new json;
