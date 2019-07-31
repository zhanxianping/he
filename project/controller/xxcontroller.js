var xxModule=require("./../module/xxModule.js")





var xxx={
	"x1":function (req,res) {
		xxModule.x1(req.body.tel,function(err,data){
		if(err){
			console.log('查询失败')
		}else{
			res.send({error:0,data:data})
		}
		
	})
},
	"x2":function (req,res) {

	xxModule.x2(req.body.tel,function(err,data){
		if(err){
			console.log('查询失败')
		}else{
			res.send({error:0,data:data})
		}
		
	})
},
	"x21":function (req,res) {
    	
    	xxModule.x21(req.body.tel,req.body.tjm,req.body.Time,req.body.Mail,req.body.Sex,req.body.name,function(err,data){
			if(err){
				console.log('查询失败')
			}else{
				res.send({error:0,data:data})
			}
		
		})
},
	"getPage":function (req,res) {
    xxModule.getPage(req.body.tel,function(err,data){
		 if(err){
            console.log('数据库错误');
            res.send({error:1,msg:err})
        }else{
//          console.log(data);
            // data[0].num
            //5 6 10 11
            //1 2 2  3
            if (data.length){
                res.send({error:0,num:Math.ceil(data[0].num/5)})
            }else {
                console.log('没有数据');
                res.send(data.id);
            }

        }
		
	})
},
	"getPageCon":function (req,res) {
    xxModule.getPageCon(req.query.tel,req.query.num,function(err,data){
		 if (err){
            console.log('查询失败')
        } else{
            res.send({error:0,data:data})
        }
		
	})
},
	"del":function (req,res) {
    xxModule.del(req.body.id,function(err,data){
		if (err){
            alert('没有删除数据')
        } else {
            res.send({error:0})
        }
		
	})
},
	"update":function (req,res) {
     xxModule.update(req.body.name,req.body.tel,req.body.province,req.body.city,req.body.county,req.body.address,req.body.id,function(err,data){
		if (err){
            console.log(11)
        } else {
            res.send({error:0});
        }
		
	})
},
	"tj":function (req,res) {
     xxModule.tj(req.body.name,req.body.tel,req.body.province,req.body.city,req.body.county,req.body.address,req.body.id,req.body.user,function(err,data){
		 if (err){
            console.log('失败');
        }else {
            console.log('成功')
        }
		
	})

},
	"x41":function (req,res) {
	 
      xxModule.x41(req.query.tel,function(err,data){
		if (err){
                console.log('数据库错误');
            } else {
                res.send({error:0,data:data[0].num})
            }
		
	})
},
	"tj1":function (req,res) {
     xxModule.tj1(req.body.tel,function(err,data){
        if (err){
            console.log('数据库错误');
        } else {
            res.send({data:data});
        } 
		
	})
    
},
	"add":function (req,res) {
      xxModule.add(req.body.user,req.body.used,req.body.xxx,function(err,data){
        if (err){
            console.log('数据库错误');
        } else {
            console.log('成功');
        } 
		
	})
},
	"add1":function (req,res) {
     xxModule.add1(function(err,data){
        if (err){
            console.log('错误' + err);
        } else {
            res.send({error:0,data:data})
        } 
		
	})
},
	"getPage1":function (req,res) {
	
    xxModule.getPage1(req.query.tel,function(err,data){
        if(err){
            console.log('数据库错误');
            res.send({error:1,msg:err})
        }else{
            // data[0].num
            //5 6 10 11
            //1 2 2  3
            res.send({error:0,num:Math.ceil(data[0].num/5)})
        }
	})
},
	"getPageCon1":function (req,res) {
     xxModule.getPageCon1(req.query.tel,num=req.query.num,function(err,data){
        if(err){
            console.log('查询失败')
        }else{
            res.send({error:0,data:data})
        }
	})
},
	"del1":function (req,res) {
     xxModule.del1(req.body.id,function(err,data){
        if (err){
            alert('没有删除数据')
        } else {
            res.send({error:0})
        }
	})
},
	"del2":function (req,res) {
    xxModule.del2(req.body.id,function(err,data){
        if (err){
            alert('没有删除数据')
        } else {
            res.send({error:0})
        }
	})
},
	"del3":function (req,res) {
    xxModule.del3(req.body.id,function(err,data){
        if (err){
            alert('没有删除数据')
        } else {
            res.send({error:0})
        }
	})
},
	"getPageCon2":function (req,res) {
     xxModule.getPageCon2(req.query.tel,num=req.query.num,function(err,data){
        if(err){
            console.log('查询失败')
        }else{
            res.send({error:0,data:data})
        }
	})
},
	"getPage2":function (req,res) {
    xxModule.getPage2(req.query.tel,function(err,data){
        if(err){
            console.log('数据库错误');
            res.send({error:1,msg:err})
        }else{
            // data[0].num
            //5 6 10 11
            //1 2 2  3
            res.send({error:0,num:Math.ceil(data[0].num/5)})
        }
	})
},
	"getPageCon3":function (req,res) {
     xxModule.getPageCon3(req.query.tel,num=req.query.num,function(err,data){
        if(err){
            console.log('查询失败')
        }else{
            res.send({error:0,data:data})
        }
	})
},
	"getPage3":function (req,res) {
    xxModule.getPage3(req.query.tel,function(err,data){
        if(err){
            console.log('数据库错误');
            res.send({error:1,msg:err})
        }else{
            // data[0].num
            //5 6 10 11
            //1 2 2  3
            res.send({error:0,num:Math.ceil(data[0].num/5)})
        }
	})
},
	"getPageCon4":function (req,res) {
     xxModule.getPageCon4(req.query.tel,num=req.query.num,req.query.oIpt,function(err,data){
        if(err){
            console.log('查询失败')
        }else{
            res.send({error:0,data:data})
        }
	})
},
	"x71":function (req,res) {
      xxModule.x71(req.query.tel,function(err,data){
        if (err){
                console.log('数据库错误');
            } else {
                res.send({error:0,data:data[0].num})
            }
	})
},
	"x72":function (req,res) {  
      xxModule.x72(req.query.tel,function(err,data){
        if (err){
                console.log('数据库错误');
            } else {
                res.send({error:0,data:data[0].num})
            }
	})
},	
	"x73":function (req,res) {
      xxModule.x73(req.query.tel,function(err,data){
        if (err){
                console.log('数据库错误');
            } else {
                res.send({error:0,data:data[0].num})
            }
	})
},
	"x74":function(req,res){
	xxModule.x74(req.body.id,function(err,data){
        if (err){
            console.log('没有删除数据')
        } else {
            res.send({error:0,data})
        }
	})
},
	"x75":function(req,res){
	
	xxModule.x75(req.body.id,function(err,data){
         if (err){
            console.log('没有删除数据')
        } else {
            res.send({error:0,data})
        }
	})
},
	"x76":function(req,res){
	xxModule.x76(req.body.id,function(err,data){
          if (err){
            console.log('没有修改成功')
        } else {
            console.log('修改成功')
        }
	})
},
	"GoodsWarehousing1":function(req,res){
	xxModule.GoodsWarehousing1(function(err,data){
       if(err){
			console.log('查询失败')
		}else{
			res.send({error:0,data})
		}
	})
},
	"GoodsWarehousing2":function(req,res){
	xxModule.GoodsWarehousing2(req.body.params.input,function(err,data){
       if(err){
			console.log('查询失败')
		}else{
			res.send({error:0,data})
		}
	})
},
	"GoodsWarehousing3":function(req,res){
	xxModule.GoodsWarehousing3(req.body.params.input1,function(err,data){
       if(err){
			console.log('查询失败')
		}else{
			res.send({error:0,data})
		}
	})
},
	"GoodsWarehousing4":function(req,res){
	

	xxModule.GoodsWarehousing4(req.body.id,function(err,data){
       if(err){
			console.log('查询失败')
		}else{
			res.send({error:0,data})
		}
	})
},

}


module.exports=xxx;