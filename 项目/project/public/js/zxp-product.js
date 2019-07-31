window.onload=function () {
    $(function () {
        window.onscroll=function () {

                $('#top').click(function () {
                    (function smoothscroll(){
                        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                        if (currentScroll > 0) {
                            window.requestAnimationFrame(smoothscroll);
                            window.scrollTo (0,currentScroll - (currentScroll/3));
                        }
                    })();
                })

        };

        $('#myTabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show')
        });
        $('.collapse').collapse();


        $('.nav').on('click','li',function () {
            $(this).addClass('active')
        })
    });

    //展示图片数据
    function show(click,img,sName,gName,size,rmb,id) {
        click.prepend($(`
                        <div class="col-lg-3 col-md-3 col-sm-5 zxp-img" data-id="${id}">
                        <img src="${img}" alt="">
                        <h6><span>${sName}</span>&nbsp;<span>${gName}</span></h6>
                        <p>${size}</p>
                        <p>￥${rmb}</p>
                        </div>
                    `));
    }
    //渲染数据
    function data4(url,type,click,b) {
        $.ajax({
            url: url,
            type:type,
            success:function (res) {
              
                let num=0;
                let data=res.data;
                if (res.error){
                    alert('数据传输错误')
                } else {
                    for (let i=0;i<data.length;i++){
                        num++;
                    }
                    for (let i=0;i<4;i++){
						try{
							 show(click,data[i].img1,data[i].s_name.toUpperCase(),data[i].g_name,data[i].size.toUpperCase(),data[i].rmb,data[i].goods)
						}catch(e){
							//TODO handle the exception
						}
                    }
                    if (num>4){
                        click.after($(`
                        <p class="butn"><button type="button" class="btn btn-info b1">显示全部（<span>${num}</span>）</button></p>
                    `))
                    }
                }
            }
        });
    }
    function data(url,type,click,b) {
        $.ajax({
            url: url,
            type:type,
            success:function (res) {
                let num=0;
                let data=res.data;
                if (res.error){
                    alert('数据传输错误')
                } else {
                    for (let i=0;i<data.length;i++){
                        show(click,data[i].img1,data[i].s_name.toUpperCase(),data[i].g_name,data[i].size.toUpperCase(),data[i].rmb,data[i].goods)
                    }
                }
            }
        })
    }
    //展示
    data4('/zxpProClassic','post',$('#zClassic'));
    data4('/zxpProPetite','post',$('#zPetite'));
    data4('/zxpProBlack','post',$('#zBlack'));
    data4('/zxpProDapper','post',$('#zDapper'));
    data4('/zxpProClassy','post',$('#zClassy'));

    $('#bodyImg').on('click','button',function () {
        let n=$('button').index(this);
        console.log(n, $(this));
        switch (n) {
            case 1:
                $(this).parent().prev().html('');
                data('/zxpProClassic','post',$('#zClassic'));
                $(this).parent().hide();
                break;
            case 2:
                $(this).parent().prev().html('');
                data('/zxpProPetite','post',$('#zPetite'));
                $(this).parent().hide();
                break;
            case 3:
                $(this).parent().prev().html('');
                data('/zxpProBlack','post',$('#zBlack'));
                $(this).parent().hide();
                break;
            case 4:
                $(this).parent().prev().html('');
                data('/zxpProDapper','post',$('#zDapper'));
                $(this).parent().hide();
                break;
            case 5:
                $(this).parent().prev().html('');
                data('/zxpProClassy','post',$('#zClassy'));
                $(this).parent().hide();
                break;
        }
    });

    function series() {
        $('#bodyImg').html('');
        $('#bodyImg').prepend($(`  <div class="type">
        <h3>CLASSIC</h3>
        <h4>令人怦然心动的经典系列</h4>
    </div>
    <div class="container tbody" id="zClassic">

    </div>`));
    }

    $('#pClassic').click(function () {
        series();
        data('/zxpProClassic','post',$('#zClassic'))
    });
    $('#pBlack').click(function () {
        $('#bodyImg').html('');
        $('#bodyImg').prepend($(`<div class="type">
            <h3>CLASSIC BLACK</h3>
            <h4>黑色深邃，展现都市的摩登酷感</h4>
        </div>
        <div class="container tbody" id="zBlack">

        </div>`));
        data('/zxpProBlack','post',$('#zBlack'))
    });
    $('#pPetite').click(function () {
        $('#bodyImg').html('');
        $('#bodyImg').prepend($(` <div class="type">
            <h3>CLASSIC PETITE</h3>
            <h4>纤巧表盘，腕间优雅流露</h4>
        </div>
        <div class="container tbody" id="zPetite">

        </div>`));
        data('/zxpProPetite','post',$('#zPetite'))
    });
    $('#pDepper').click(function () {
        $('#bodyImg').html('');
        $('#bodyImg').prepend($(` <div class="type">
            <h3>DAPPER</h3>
            <h4>湛蓝指针，展现从容时光</h4>
        </div>
        <div class="container tbody" id="zDapper">

        </div>`));
        data('/zxpProDapper','post',$('#zDapper'))
    });
    $('#pClassy').click(function () {
        $('#bodyImg').html('');
        $('#bodyImg').prepend($(` <div class="type">
            <h3>CLASSY</h3>
            <h4>璀璨水钻刻度，闪耀迷人魅力</h4>
        </div>
        <div class="container tbody" id="zClassy">

        </div>`));
        data('/zxpProClassy','post',$('#zClassy'))
    });

    $('#bodyImg').on('click','.col-lg-3',function () {
        setCookie('g-id',$(this).data('id'),0.1);
        window.location='http://127.0.0.1:8080/public/pages/Detailsshopping.html?__hbt=1561606772298';
    });

};