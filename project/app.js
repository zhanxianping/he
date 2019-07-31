var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var app = express();
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
//引入短信，邮箱验证
// 请求头
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", ' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

//zxp
var myRouter = require('./routes/zxpRoutes.js');
app.use(myRouter);
// czy
var czy = require('./routes/czyds.js');
app.use(czy);
//lw
var lw = require('./routes/lw.js');
app.use(lw);
//fhl
var FLandRoutr = require('./routes/FLandRoutr.js');
app.use(FLandRoutr);
//ll
var xxRouter = require('./routes/xxRouter.js');
app.use(xxRouter);
//ccc
var cccRoutes = require('./routes/cccRoutes.js');
app.use(cccRoutes);

app.use(czy);
app.listen(8080, function() {
	console.log('ok');
});