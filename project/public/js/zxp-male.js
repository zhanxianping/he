window.onload=function () {
    $(function () {
        //回到顶部
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

    function data4(url,type,click) {
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
                        show(click,data[i].img1,data[i].s_name.toUpperCase(),data[i].g_name,data[i].size.toUpperCase(),data[i].rmb,data[i].goods)
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
    function data(url,type,click) {
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

    data4('/zxpMaleC','post',$('#meClassic'));
    data4('/zxpMaleB','post',$('#meBlack'));
    data4('/zxpMaleD','post',$('#meDapper'));

    $('body').on('click','button',function () {
        let n=$('button').index(this);
        console.log(n, $(this));
        switch (n) {
            case 1:
                $(this).parent().prev().html('');
                data('/zxpMaleC','post',$('#meClassic'));
                $(this).parent().hide();
                break;
            case 2:
                $(this).parent().prev().html('');
                data('/zxpMaleB','post',$('#meBlack'));
                $(this).parent().hide();
                break;
            case 3:
                $(this).parent().prev().html('');
                data('/zxpMaleD','post',$('#meDapper'));
                $(this).parent().hide();
                break;
        }
    });

    $('#mClassic').click(function () {
        $('.tit').html('');
        $('.tit').append(`<strong>男士手表</strong>`+'/'+$('#mClassic').text());
        $('#mBody').html('');
        $('#mBody').prepend($(`<div class="type">
                <h3>CLASSIC</h3>
                <h4>轻盈精致，腕间的细节艺术</h4>
            </div>
            <div class="tbody container" id="meClassic">

            </div>`));
        data('/zxpMaleC','post',$('#meClassic'));
    });
    $('#mBlack').click(function () {
        $('.tit').html('');
        $('.tit').append(`<strong>男士手表</strong>`+'/'+$('#mBlack').text());
        $('#mBody').html('');
        $('#mBody').prepend($(`  <div class="type">
                <h3>CLASSIC BLACK</h3>
                <h4>轻盈精致，腕间的细节艺术</h4>
            </div>
            <div class="tbody container" id="meBlack">

            </div>`));
        data('/zxpMaleB','post',$('#meBlack'));
    });
    $('#mDapper').click(function () {
        $('.tit').html('');
        $('.tit').append(`<strong>男士手表</strong>`+'/'+$('#mDapper').text());
        $('#mBody').html('');
        $('#mBody').prepend($(` <div class="type">
                <h3>DAPPER</h3>
                <h4>轻盈精致，腕间的细节艺术</h4>
            </div>
            <div class="tbody container" id="meDapper">

            </div>`));
        data('/zxpMaleD','post',$('#meDapper'));
    });

    $('#mBody').on('click','.col-lg-3',function () {
        setCookie('g-id',$(this).data('id'),0.1)
		window.location='http://127.0.0.1:8080/public/pages/Detailsshopping.html?__hbt=1561606772298';
    });
};