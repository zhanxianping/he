var express = require('express');
var myRouter = express.Router();
var multer = require('./../util/multer.js');
//3
var ds = require('./../controller/czyds');
myRouter.get('/dsczyall', ds.dsczyall);
myRouter.get('/dsczyser', ds.dsczyser);
myRouter.get('/dsche', ds.dsche);
myRouter.get('/scall', ds.scall);
myRouter.get('/scser', ds.scser);
myRouter.get('/scdel', ds.scdel);
myRouter.get('/shuliang', ds.shuliang);
myRouter.get('/order', ds.order);
myRouter.get('/delorder', ds.delorder);
// 4
myRouter.get('/ordervue', ds.ordervue);
myRouter.get('/Liuchen', ds.Liuchen);
myRouter.get('/changeaddres', ds.changeaddres);
myRouter.get('/productdstart', ds.productdstart);
myRouter.get('/productdnow', ds.productdnow);
myRouter.get('/productdsel', ds.productdsel);
myRouter.get('/productdxj', ds.productdxj);
myRouter.get('/changegoods', ds.changegoods);
myRouter.post('/changeg', ds.changeg);
myRouter.get('/propictrue', ds.propictrue);
//文件上传
myRouter.post('/czyfileupload', multer.single('files'), ds.czyfileupload)
// 文件下载
myRouter.get('/download', ds.download)
module.exports = myRouter;
