var express = require('express');
var app = express.Router();
var mysql=require('mysql');
var db=mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'project3',
	timezone: '08:00'
});
app.post('/lwadd', function(req, res) {
	console.log(req.body.s_name);
	console.log(req.body.size);
	console.log(req.body.colour);
	var sql =
		`SELECT * 
FROM goods JOIN series JOIN picture
ON goods.id=picture.\`id\` AND goods.\`series\`=series.\`id\` 
WHERE s_name='${req.body.s_name}' AND size='${req.body.size}' AND colour='${req.body.colour}'
`;

	db.query(sql, function(err, data) {
		if (err) {
			console.log('错误' + err);
		} else {
			console.log(data);
			res.send({
				error: 0,
				data: data
			})
		}
	})

});

app.post('/Ring', function(req, res) {

	var sql =
		`SELECT *
FROM goods JOIN series JOIN picture
ON goods.\`series\`=series.\`id\` AND  goods.id=picture.\`id\`
WHERE  s_name='Ring'   `;

	db.query(sql, function(err, data) {
		if (err) {
			console.log('失败' + err);
		} else {
			console.log(data);
			res.send({
				error: 0,
				data: data
			})
		}
	})
});


app.post('/Aset', function(req, res) {
	var sql =
		`SELECT *
FROM goods JOIN series JOIN picture
ON goods.\`series\`=series.\`id\` AND  goods.id=picture.\`id\`
WHERE s_name='PETITE' `;
	db.query(sql, function(err, data) {
		if (err) {
			console.log('失败' + err);
		} else {
			console.log(data);
			res.send({
				error: 0,
				data: data
			})
		}
	})
});



/*四阶段 接口*/


app.get('/Tin', function(req, res) {
	var aaa = function() {
		if (0 == false) {

		}
	}
	var sql = `SELECT * FROM account`;
	db.query(sql, function(err, data, aaa) {
		if (err) {
			console.log('失败' + err);
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			console.log(data);
			res.send({
				error: 0,
				data: data,
				aaa: aaa
			})

		}
	})
	/* res.header("Access-Control-Allow-Origin", "*");*/ //设置跨域访问
	// console.log(query);

});

app.get('/Aro', function(req, res) {
	var akt = req.query.akt;
	var kat = req.query.kat;
	/*var tak=req.query.tak;*/
	console.log(req.query);
	var sql =
		`INSERT INTO account VALUES(NULL,'${akt}','${kat}','自行更改','自行更改','自行更改',DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT)`;
	db.query(sql, function(err, data) {
		if (err) {
			console.log('失败' + err);
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.send({
				error: 0,
				akt,
				kat
			})

		}
	})
});

app.get('/skt', function(req, res) {
	var ccc = req.query.ccc;
	console.log(ccc);
	var sql = `DELETE FROM account WHERE id=${ccc}`;
	db.query(sql, function(err, data) {
		if (err) {
			console.log('错');
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.send({
				error: 0,
				ccc
			})
		}
	})
})



app.get('/ccc', function(req, res) {
	var id = req.query.id;
	var sname = req.query.sname;
	var sposition = req.query.sposition;
	var number = req.query.number;
	console.log(id, sname, sposition, number);
	var sql = `UPDATE account SET sname='${sname}',sposition='${sposition}',number='${number}' WHERE id=${id}`;
	db.query(sql, function(err, data) {
		if (err) {
			console.log('错' + err);
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.send({
				error: 0,
				id,
				sname,
				sposition,
				number
			})
		}
	})
});

app.get('/Newl', function(req, res) {
	var Newl = req.query.Newl;
	var id = req.query.id;
	var account = req.query.account;
	console.log(Newl, id);
	var sql = `UPDATE account SET pass='${Newl}',account='${account}' WHERE id=${id}`;
	db.query(sql, function(err, data) {
		if (err) {
			console.log('错' + err);
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.send({
				error: 0,
				id,
				Newl,
				account
			})
		}
	})
})



app.get('/nod', function(req, res) {
	var id = req.query.id;
	var commodity = req.query.commodity;
	var Warehouse = req.query.Warehouse;
	var sOrder = req.query.sOrder;
	var Purchase = req.query.Purchase;
	var Jurisdiction = req.query.Jurisdiction;
	var sql =
		`UPDATE account SET commodity='${commodity}',Warehouse='${Warehouse}',sOrder='${sOrder}',Purchase='${Purchase}',Jurisdiction='${Jurisdiction}' WHERE id=${id}`;
	db.query(sql, function(err, data) {
		if (err) {
			console.log('错' + err);
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.send({
				error: 0,
				id,
				commodity,
				Warehouse,
				sOrder,
				Purchase,
				Jurisdiction
			})
		}
	})
});

app.get('/zzz', function(req, res) {
	var zzz = req.query.zzz;
	var id = req.query.id;
	console.log(zzz, id);
	var sql = `UPDATE account SET pass='${zzz}' WHERE id=${id}`
	db.query(sql, function(err, data) {
		if (err) {
			console.log('错' + err);
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.send({
				error: 0,
				id,
				zzz,
			})
		}
	})
})

app.get('/Jurisdictionoo', function(req, res) {
	var commodity = req.query.commodity;
	var Warehouse = req.query.Warehouse;
	var sOrder = req.query.sOrder;
	var Purchase = req.query.Purchase;
	var Setuo = req.query.Setuo;
	var id = req.query.id;

	var sql =
		`UPDATE account SET commodity='${commodity}',Warehouse='${Warehouse}',sOrder='${sOrder}',Purchase='${Purchase}',Setuo='${Setuo}' WHERE id=${id}`;
	db.query(sql, function(err, data) {
		if (err) {
			console.log('错' + err);
		} else {
			res.header("Access-Control-Allow-Origin", "*");
			res.send({
				error: 0,
				id,
				commodity,
				Warehouse,
				sOrder,
				Purchase,
				Setuo
			})
		}
	})

})
module.exports = app;