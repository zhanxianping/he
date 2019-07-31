$(function(){
	let tImg=$('.j-ds-top-left-top-img>img');
	let tDmiv=$('.j-ds-top-left-top-img');
	let mDiv=$('.j-ds-top-left-top-img>div')
	let bImg=$('.j-ds-top-left-bottom-img>img');
	let oCon=$('.ds-content');
	let tDiv=$('.j-ds-top-left-top-t');
	let tDImg=$('.j-ds-top-left-top-t>img');
	let l4Btn=$('.j-ds-li4-btn');
	let oNe=$('#ds-op');
	let l4lD=$('.j-li4>div');
	let jIage=$('.ds-top-right-jiage');
	let jIfen=$('.ds-top-right-jf');
	let fTbtn=$('.ds-footer-top>button');
	let htmm=$('.ds-top-right-li4-dx');
	//
	let l=parseInt(oCon.css('margin-left'));
	let t=parseInt(oCon.css('margin-top'));
	let w=parseInt(tImg.css('width'));
	let h=parseInt(tImg.css('height'));
	//	接口
	run();
	$('.ds-top-right-li6-btn1').on('click',function(){
		if(getCookie('u-id')){
			che();
			open('http://127.0.0.1:8080/public/pages/che.html?__hbt=1561606405500','_self');
		}else{
			open('http://127.0.0.1:8080/public/pages/FLand.html','_self');
		}
	})
	function che(){
		$.ajax({
			type:"get",
			url:"/dsche",
			async:true,
			data:{user:getCookie('u-id'),goods:getCookie('g-id'),num:$('.ds-top-right-li5-in').val()},
			success:function(res){
				if(res.stat==0){
					$('#ds-top-right-li6-btn2-s').css({'transform': 'translate(4px,-6px)','display':'block'})
					setTimeout(function(){
						$('#ds-top-right-li6-btn2-s').css({'display':'none'})
					},800);
				}
			}
		});
	}
	$('.j-ds-top-right-li6-btn2').on('click',che)
	function run(){
		let id=getCookie('g-id');
		dsall(id);
		dsser(id);
	}
	function dsall(id,chicun){
		$.ajax({
			type:"get",
			url:"/dsczyall",
			async:true,
			data:{num:id},
			success:function(res){
				if(res.stat==0){
					let o=res.data.o[0];
					let p=res.data.p;
					//加载图片
					$.each(bImg, function(i,v) {
						switch (i){
							case 0:
							tImg.attr('src',o.img1);
							$(v).attr({'src':o.img1});
							break;
							case 1:
							$(v).attr('src',o.img2);
							break;
							case 2:
							$(v).attr('src',o.img3);
							break;
						}
					});
					let jIada=$('.ds-top-right-li1>span');
					let jIah=$('.ds-top-right-li1>h2');
					let cl=$('.ds-top-right-li4-color');
					let rkc=$('.ds-top-right-li5-kc');
					jIada.html(`${o.s_name.toUpperCase()} | ${o.size.toUpperCase()}`)
					jIah.html(`${o.g_name.toUpperCase()}`)
					
					function jiaa(rmb){
						if(!isNaN(parseInt(rmb))){
							return rmb;
						}else{
							let rmbb=rmb.split('￥');
							return rmbb[1];
						}
					}
					let ormb=parseInt(jiaa(o.rmb));
					if(parseInt(chicun)>parseInt(o.size)){
						ormb+=100;
					}
					jIage.html(ormb);
					jIfen.html(Math.round(ormb/100));
					cl.css({'background':o.colour,'data-cl':o.colour});
					if(!chicun){
						htmm.html(o.size.toLowerCase());
						$('.j-ds-gg-r-cc').html(o.size.toLowerCase());
					}else{
						htmm.html(chicun.toLowerCase());
						$('.j-ds-gg-r-cc').html(chicun.toLowerCase());
					}
					rkc.html(o.number);
					$(l4lD.children()[0]).html('');
					if(p.length==2){
						l4lD.css({'marginTop':'-100px','height':'100px'});
						$(l4lD.children()[0]).append($(`<li data-id="${p[0].id}"><p class="ds-li4-color" style="background: ${p[0].colour};">11</p><p>${p[0].size.toLowerCase()}</p></li>`));
						$(l4lD.children()[0]).append($(`<li data-id="${p[0].id}"><p class="ds-li4-color" style="background: ${p[0].colour};">11</p><p>${(parseInt(p[0].size)+4+'MM').toLowerCase()}</p></li>`));
						$(l4lD.children()[0]).append($(`<li data-id="${p[1].id}"><p class="ds-li4-color" style="background: ${p[1].colour};">11</p><p>${p[0].size.toLowerCase()}</p></li>`));
						$(l4lD.children()[0]).append($(`<li data-id="${p[1].id}"><p class="ds-li4-color" style="background: ${p[1].colour};">11</p><p>${(parseInt(p[0].size)+4+'MM').toLowerCase()}</p></li>`));
					}else if(p.length==1){
						$(l4lD.children()[0]).append($(`<li data-id="${p[0].id}"><p class="ds-li4-color" style="background: ${p[0].colour};">11</p><p>${p[0].size.toLowerCase()}</p></li>`));
						$(l4lD.children()[0]).append($(`<li data-id="${p[0].id}"><p class="ds-li4-color" style="background: ${p[0].colour};">11</p><p>${(parseInt(p[0].size)+4+'MM').toLowerCase()}</p></li>`));
						l4lD.css({'marginTop':'-50px','height':'50px'});
					} 
					if(o.sex=='女'){
						$('.ds-footer-gg>img').attr('src','../images/ds-nv.jpg')
					}else{
						$('.ds-footer-gg>img').attr('src','../images/ds-nan.jpg')
					}
				
					if(o.colour=='#F2DCBD'){
						$('.j-ds-gg-r-cl').html('金色');
					}else{
						$('.j-ds-gg-r-cl').html('银色');
					}
					let iVal=$('.ds-top-right-li5-in');
					iVal.on('blur',function(){
						if(!isNaN(parseInt(iVal.val()))){
							if(parseInt(iVal.val())<0){
								iVal.val('1');
							}else if(parseInt(iVal.val())>parseInt(o.number)){
								iVal.val(o.number);
							}
						}else{
							iVal.val('1');
						}
					});
				}
				
			}
		});
	}

	function dsser(id){
		$.ajax({
			type:"get",
			url:"/dsczyser",
			async:true,
			data:{num:id},
			success:function(res){
				console.log(res);
				if(res.stat==0){
					let cUl=$('.ds-center>div>ul');
					let o=res.data;
					cLi(o);
					function cLi(o){
						cUl.html(' ');
						for(let i=0;i<4;i++){
							cUl.append($(`
								<li data-id='${o[i].id}'>
									<img src="${o[i].img1}"/>
									<p>${o[i].s_name} | ${o[i].g_name}</p>
									<p>${o[i].size.toUpperCase()} | ${parseInt(o[i].size)+4+'MM'}</p>
									<p>${o[i].rmb}</p>
								</li>	
							`));
						}
					}
					cUl.on('click','li',function(){
						chid();
						setCookie('g-id',$(this).attr('data-id'));
						dsall($(this).attr('data-id'));
					});
					
					let hHbtn=$('.ds-center>button')
					hHbtn.on('click',function(){
						o=qh(o,4);
						cLi(o);
					});
					function uniq(array){
					    var temp = []; 
					    for(var i = 0; i < array.length; i++){
					        if(temp.indexOf(array[i]) == -1){
					            temp.push(array[i]);
					        }
					    }
					    return temp;
					}
					function qh(o,co){
						for(let i=0;i<co;i++){
							o[o.length]=o[i];
						}
						for(let i=0;i<o.length-co;i++){
							o[i]=o[i+co];
						}
						o=uniq(o);
						return o;
					}
				}
			}
		})
	}
	//功能
	l4lD.on('click','li',function(){
		chid();
		l4lD.css({'display':'none'});
		dsall($(this).attr('data-id'),$($(this).children()[1]).html());
	});
	l4Btn.on('click',function(){
		if(l4lD.css('display')=='none'){
			l4lD.css({'display':'block'});
		}else{
			l4lD.css({'display':'none'});
		}
	});
	fTbtn.on('click',function(){
		fTbtn.attr('id',' ');
		$(this).attr('id','ds-footer-top-c');
		$('.ds-footer-xq').removeClass('ds-footer-ds');
		$('.ds-footer-gg').removeClass('ds-footer-ds');
		if($(this).attr('data-id')==1){
			$('.ds-footer-xq').addClass('ds-footer-ds');
		}else{
			$('.ds-footer-gg').addClass('ds-footer-ds');
		}
	});
	function chid(){
		$.each(bImg, function(i,v) {
			$(v).attr('id',' ');
		});
		$(bImg[0]).attr('id','ds-op');
	}
	//设置top右侧底部图片
	bImg.on('click',function(){
		tImg.attr('src',this.src);
		$.each(bImg, function(i,v) {
			$(v).attr('id',' ');
		});
		$(this).attr('id','ds-op');
	});
	function tdmIn(ev){
		let x=ev.pageX;
		let y=ev.pageY;
		if(x-50>l&&x+50<l+w&&y-50>t&&y+50<t+h){
			mDiv.css({'display':'block','left':x-50,'top':y-50});
		}
	}
	function tdmOut(){
		if(tDiv.css('display')=='none'){
			mDiv.css({'display':'none'});
		}
	}
	function mdIn(){
		let l2=(parseInt($(this).css('left'))-l)*5/4;
		let t2=(parseInt($(this).css('top'))-t)*5/4;
		tDImg.attr('src',tImg.attr('src'));
		tDiv.css({'display':'block','left':l+w+0.3,'top':t});
		tDImg.css({'left':-l2,'top':-t2});
	}
	function mdOut(){
		mDiv.css({'display':'none'});
		tDiv.css({'display':'none'});
	}
	tDmiv.on('mousemove',tdmIn);
	tDmiv.on('mouseout',tdmOut);
	mDiv.on('mousemove',mdIn);
	mDiv.on('mouseout',mdOut);
});