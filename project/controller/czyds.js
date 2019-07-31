var ds = require('./../module/czyds');
var json = {
	download: function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.download('public/' + req.query.filePath)
	},
	czyfileupload: function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
		res.send({
			path: req.file.path
		})
	},
	changeg: function(req, res) {
		var data = req.body;
		ds.changeg(data, function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	propictrue: function(req, res) {
		var file = req.query.file;
		var id = req.query.id;
		ds.propictrue(id, file, function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	changegoods: function(req, res) {
		var id = req.query.id;
		ds.changegoods(id, function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	productdxj: function(req, res) {
		var id = req.query.id;
		ds.productdxj(id, function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	productdsel: function(req, res) {
		var data = req.query.data;
		ds.productdsel(data, function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	productdnow: function(req, res) {
		var num = req.query.num;
		var state = req.query.state;
		ds.productdnow(num, state, function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	productdstart: function(req, res) {
		ds.productdstart(function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	changeaddres: function(req, res) {
		var data = req.query.data;
		data = JSON.parse(data);
		var id = data.id;
		var address = `${data.address.name},${data.address.tel},${data.address.address}`;
		ds.changeaddres(id, address, function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	dsczyall: function(req, res) {
		var id = req.query.num;
		ds.dsczyall(id, function(err, data) {
			if (!err) {
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	dsczyser: function(req, res) {
		var id = req.query.num;
		ds.dsczyser(id, function(err, data) {
			if (!err) {
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	scall: function(req, res) {
		var id = req.query.id;
		ds.scall(id, function(err, data) {
			if (!err) {
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	scser: function(req, res) {
		var ser = req.query.ser;
		var sex = req.query.sex;
		ds.scser(ser, sex, function(err, data) {
			if (!err) {
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	dsche: function(req, res) {
		var user = req.query.user;
		var goods = req.query.goods;
		var num = req.query.num;
		ds.dsche(user, goods, num, function(err) {
			if (!err) {
				res.send({
					stat: 0
				});
			} else {
				res.send({
					stat: 1
				});
			}
		})
	},
	scdel: function(req, res) {
		var id = req.query.id;
		ds.scdel(id, function(err) {
			if (!err) {
				res.send({
					stat: 0
				});
			} else {
				res.send({
					stat: 1
				});
			}
		})
	},
	shuliang: function(req, res) {
		var num = req.query.num;
		var id = req.query.id;
		ds.shuliang(num, id, function(err) {
			if (!err) {
				res.send({
					stat: 0
				});
			} else {
				res.send({
					stat: 1
				});
			}
		})
	},
	order: function(req, res) {
		var id = req.query.id;
		var arr = req.query.arr;
		// res.header("Access-Control-Allow-Origin", "*");   //设置跨域访问
		// res.send({data:111,heloo:'woaini'});
		ds.order(id, arr, function(err, data) {
			if (!err) {
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	delorder: function(req, res) {
		var arr = req.query.arr;
		var arr2 = req.query.arr2;
		var id = req.query.id;
		var addres = req.query.addres;
		var zj = req.query.zj;
		ds.delorder(id,arr,arr2,addres,zj, function(err) {})
	},
	ordervue: function(req, res) {
		var data = req.query.data;
		ds.ordervue(data, function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
	Liuchen: function(req, res) {
		var data = req.query.data;
		var id = req.query.id;
		ds.Liuchen(data, id, function(err, data) {
			if (!err) {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 0,
					data: data
				});
			} else {
				res.header("Access-Control-Allow-Origin", "*");
				res.send({
					stat: 1,
					error: err
				});
			}
		})
	},
}
module.exports = json;
