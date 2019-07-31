var express=require('express');
var xxcontroller=require('./../controller/xxcontroller.js');
var myRouter=express.Router();




myRouter.post('/x1',xxcontroller.x1);
myRouter.post('/x2',xxcontroller.x2);

myRouter.post('/x2-1',xxcontroller.x21);

myRouter.get('/getPage',xxcontroller.getPage);
myRouter.get('/getPageCon',xxcontroller.getPageCon);
myRouter.post('/del',xxcontroller.del);

myRouter.post('/update',xxcontroller.update);
myRouter.post('/tj',xxcontroller.tj);
myRouter.get('/x4-1',xxcontroller.x41);
myRouter.post('/tj1',xxcontroller.tj1);
myRouter.post('/add',xxcontroller.add);
myRouter.post('/add1',xxcontroller.add1);
myRouter.get('/getPage1',xxcontroller.getPage1);
myRouter.get('/getPageCon1',xxcontroller.getPageCon1);
myRouter.post('/del1',xxcontroller.del1);
myRouter.post('/del2',xxcontroller.del2);
myRouter.post('/del3',xxcontroller.del3);

myRouter.get('/getPageCon2',xxcontroller.getPageCon2);
myRouter.get('/getPage2',xxcontroller.getPage2);

myRouter.get('/getPageCon3',xxcontroller.getPageCon3);
myRouter.get('/getPage3',xxcontroller.getPage3);
myRouter.get('/getPageCon4',xxcontroller.getPageCon4);



myRouter.get('/x7-1',xxcontroller.x71);
myRouter.get('/x7-2',xxcontroller.x72);
myRouter.get('/x7-3',xxcontroller.x73);
myRouter.post('/x7-4',xxcontroller.x74);
myRouter.post('/x7-5',xxcontroller.x75);
myRouter.post('/x7-6',xxcontroller.x76);
myRouter.post('/GoodsWarehousing1',xxcontroller.GoodsWarehousing1)
myRouter.post('/GoodsWarehousing2',xxcontroller.GoodsWarehousing2)
myRouter.post('/GoodsWarehousing3',xxcontroller.GoodsWarehousing3)
myRouter.post('/GoodsWarehousing4',xxcontroller.GoodsWarehousing4)

module.exports=myRouter;
