$(function(){
	if(getCookie('u-id')){
		scall(getCookie('u-id'));
	}else{
		open('http://127.0.0.1:8080/public/pages/FLand.html','_self');
	}
	let count=0,num=0;
	function shnum(nu){
		let num=0;
		nu.each(function(i,v){
			if(v.parentElement.parentElement.children[0].children[0].checked){
				v=parseInt($(v).val());
				num+=v;
			}
		})
		$('.sc-sh-num').html(`已选${num}件商品`);
	}
	function shmon(mo){
		let mon=0;
		mo.each(function(i,v){
			if(v.parentElement.parentElement.children[0].children[0].checked){
				v=parseInt($(v).html());
				mon+=v;
			}
		})
		$('.sc-sh-mone').html(`总价${mon}`);
	}
	let cen=$('.sc-center');
	$('.sc-footer li button').on('click',function(){
		let arr=[];
		$.each(cen.children(),function(i,v){
			let id=$(v).attr('data-id');
			if($(v).children().children()[0].checked){
				arr.push(id)
			}
		})
		if(getCookie('u-id')){
			setCookie('sh-cart',arr);
			open('http://127.0.0.1:8080/public/pages/order.html?__hbt=1561606405500','_self');
		}else{
			open('http://127.0.0.1:8080/public/pages/FLand.html','_self');
		}
	})
	function scall(id){
		$.ajax({
			type:"get",
			url:"/scall",
			data:{id:id},
			async:true,
			success:function(res){
				if(res.stat==0){
					let o=res.data;
					let cen=$('.sc-center');
					cen.html(' ');
					$.each(o, function(i,v) {
						cen.append($(`
							<ul class="clearfix" data-id="${v.id}">
								<li>
									<input type="checkbox" name="" id="" value=""  checked="true"/>
								</li>
								<li id="sc-shopimg"><img src="${v.img1}"/></li>
								<li><span>${v.g_name}</span></li>
								<li><span>${v.size.toUpperCase()}</span></li>
								<li><span>${v.rmb}</span></li>
								<li class="sc-li-num"><input class="sc-cen-num" type="text" name="" id="" value="${v.number}" /></li>
								<li><span class="sc-cen-rmb">${v.rmb*v.number}</span></li>
								<li><button>删除</button></li>
							</ul>
						`));
						count=o.length;
						scser(v.series,v.sex);
					});
					shnum($('.sc-center .sc-cen-num'));
					shmon($('.sc-center .sc-cen-rmb'));
					$.each($('.sc-center .sc-cen-num'), function(i,v) {
						$(v).on('blur',function(){
							if(!isNaN(parseInt($(this).val()))){
								if(parseInt($(this).val())>parseInt(o[i].num)){
								$(this).val(parseInt(o[i].num));
								}else if($(this).val()<1){
									$(this).val(1);
								}
							}else{
								$(this).val(1);
							}
							$(this).parent().next().children().html(parseInt($(this).val())*parseInt(o[i].rmb))
							shnum($('.sc-center .sc-cen-num'));
							shmon($('.sc-center .sc-cen-rmb'));
							let _this=this;
							$.ajax({
								type:"get",
								url:"/shuliang",
								data:{num:$(_this).val(),id:$(_this).parent().parent().attr('data-id')},
								async:true,
								success:function(res){
									
								}
							})
							
						})
					});
					$('.sc-center button').on('click',function(){
						let con=confirm('你确定要删除吗');
						if(con){
							$.ajax({
								type:"get",
								url:"/scdel",
								async:true,
								data:{id:$(this).parent().parent().attr('data-id')}
							});
							$(this).parent().parent().remove();
							shnum($('.sc-center .sc-cen-num'));
							shmon($('.sc-center .sc-cen-rmb'));
						}
					})
					
					cen.on('click','input[type="checkbox"]',function(){
						shnum($('.sc-center .sc-cen-num'));
						shmon($('.sc-center .sc-cen-rmb'));
						let tru=true;
						if(this.checked){
							$('.sc-center input[type="checkbox"]').each(function(i,v){
								if(!v.checked){
									tru=false;
								}
							});
							if(tru){
								console.log($('.sc-footer input[type="checkbox"]')[0]);
								$('.sc-footer input[type="checkbox"]')[0].checked=true;
							}else{
								$('.sc-footer input[type="checkbox"]')[0].checked=false;
							}
						}else{
							$('.sc-footer input[type="checkbox"]')[0].checked=false;
						}
					})
					$('.sc-footer input[type="checkbox"]').on('click',function(){
						if(this.checked){
							$('.sc-center input[type="checkbox"]').each(function(i,v){
								v.checked=true;
							})
							shnum($('.sc-center .sc-cen-num'));
						shmon($('.sc-center .sc-cen-rmb'));
						}else{
							$('.sc-center input[type="checkbox"]').each(function(i,v){
								v.checked=false;
							})
							shnum($('.sc-center .sc-cen-num'));
						shmon($('.sc-center .sc-cen-rmb'));
						}
					})
				}
			}
		});
	}
	let oWna=[];
	
	
	function scser(ser,sex){
		$.ajax({
			type:"get",
			url:"/scser",
			data:{ser:ser,sex:sex},
			async:true,
			success:function(res){
				if(res.stat==0){
					num++;
					let oUl=$('.sc-love>ul');
					let o=res.data;
					$.each(o, function(i,v) {
						oWna[oWna.length]=v;
					});
					if(num==count){
						let o=oWna;
						cLi(o,8)
						function cLi(o,num){
							for(let i=0;i<num;i++){
								oUl.append($(`<li data-id='${o[i].id}'>
									<img src="${o[i].img1}"/>
									<p>${o[i].s_name} | ${o[i].g_name}</p>
									<p>${o[i].size.toUpperCase()} | ${parseInt(o[i].size)+4+'MM'}</p>
									<p>${o[i].rmb}</p>
								</li>`))
							}
						}
						oUl.on('click','li',function(){
							setCookie('g-id',$(this).attr('data-id'));
							open('http://127.0.0.1:8080/public/pages/Detailsshopping.html?__hbt=1561605611989','_self');
						})
						function uniq(array){
						    var temp = []; 
						    for(var i = 0; i < array.length; i++){
						        if(temp.indexOf(array[i]) == -1){
						            temp.push(array[i]);
						        }
						    }
						    return temp;
						}
						function qh(arr,co){
							for(let i=0;i<co;i++){
								o[o.length]=o[i];
							}
							for(let i=0;i<o.length-co;i++){
								o[i]=o[i+co];
							}
							o=uniq(o);
						}
						let wCon=0;
						let wNum=Math.floor(o.length/8);
						function wscr(){
							if(wCon==wNum){
								$(window).off('scroll',wscr);
							}
							let t=document.documentElement.scrollTop;
							let c=document.documentElement.scrollHeight;
							if(c-t<760){
								wCon++;
								if(wCon==wNum){
									qh(o,8);
									cLi(o,o.length%8);
								}else{
									qh(o,8);
									cLi(o,8);
								}
							}
						}
						$(window).on('scroll',wscr)
					}
				}
			}
		});
	}
})