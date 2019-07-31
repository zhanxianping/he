var express=require('express');

var proCont=require('./../controller/cccCont.js');
var myRouter=express.Router();

myRouter.post('/cccActivity',proCont.cccActivity);
myRouter.post('/cccMale',proCont.cccMale);
myRouter.post('/cccFemale',proCont.cccFemale);
myRouter.post('/cccParts',proCont.cccParts);
myRouter.post('/cccCg',proCont.cccCg);
myRouter.post('/cccSgd',proCont.cccSgd);
myRouter.post('/cccCx',proCont.cccCx);

module.exports=myRouter;