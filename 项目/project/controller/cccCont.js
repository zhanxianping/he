var proModule=require('./../module/cccModule.js');

var json={
    cccActivity:function (req,res) {
        proModule.cccActivity(function (err,data) {
            if (err){
                console.log('数据错误'+err)
            } else {
                res.send({error:0,data:data})
            }
        })
    },
    cccMale:function (req,res) {
        console.log(req.body);
        proModule.cccMale(function (err,data) {
            if (err){
                console.log('数据错误'+err)
            } else {
                res.send({error:0,data:data})
            }
        })
    },
    cccFemale:function (req,res) {
        proModule.cccFemale(function (err,data) {
            if (err){
                console.log('数据错误'+err)
            } else {
                res.send({error:0,data:data})
            }
        })
    },
    cccParts:function (req,res) {
        proModule.cccParts(function (err,data) {
            if (err){
                console.log('数据错误'+err)
            } else {
                res.send({error:0,data:data})
            }
        })
    },
    cccCg:function (req,res) {
    proModule.cccCg(function (err,data) {
            if (err){
                console.log('数据错误'+err)
            } else {
                res.send({error:0,data:data})
            }
        })
    },
    cccSgd:function (req,res) {
        var json=req.body.content;
        console.log(json);
        proModule.cccSgd(json,function (err,data) {
            if (err){
                console.log('数据错误'+err)
            } else {
                res.send({error:0})
            }
        })
    },
    cccCx:function (req,res) {
        var json=req.body;
        console.log(json);
        proModule.cccCx(json,function (err,data) {
            if (err){
                console.log('数据错误'+err)
            } else {
                res.send({error:0,data:data})
            }
        })
    }
};
module.exports=json;