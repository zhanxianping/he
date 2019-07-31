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
                        <div class="col-lg-3 col-md-3 col-sm-5 zxp-img zxp-img" data-id="${id}">
                        <img src="${img}" alt="">
                        <h6><span>${sName}</span>&nbsp;<span>${gName}</span></h6>
                        <p>${size}</p>
                        <p>￥${rmb}</p>
                        </div>
                    `));
    }

    function data4(url,type,click,size) {
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
                    if (num>=4){
                        for (let i=0;i<4;i++){
                            show(click,data[i].img1,data[i].s_name.toUpperCase(),data[i].g_name,size,data[i].rmb,data[i].goods)
                        }
                    } else {
                        for (let i=0;i<3;i++){
                            show(click,data[i].img1,data[i].s_name.toUpperCase(),data[i].g_name,size,data[i].rmb,data[i].goods)
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
    function data(url,type,click,size) {
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
                        show(click,data[i].img1,data[i].s_name.toUpperCase(),data[i].g_name,size,data[i].rmb,data[i].goods)
                    }
                }
            }
        })
    }

    data4('/zxpWomClassic','post',$('#woClassic'),'36MM');
    data4('/zxpWomBlack','post',$('#woBlack'),'36MM');
    data4('/zxpWomPetite','post',$('#woPetite'),'28MM');
    data4('/zxpWomDapper','post',$('#woDapper'),'34MM');
    data4('/zxpWomClassy','post',$('#woClassy'),'34MM');//这句话有点问题

    $('body').on('click','button',function () {
        let n=$('button').index(this);
        console.log(n, $(this));
        switch (n) {
            case 1:
                $(this).parent().prev().html('');
                data('/zxpWomClassic','post',$('#woClassic'),'36MM');
                $(this).parent().hide();
                break;
            case 2:
                $(this).parent().prev().html('');
                data('/zxpWomBlack','post',$('#woBlack'),'36MM');
                $(this).parent().hide();
                break;
            case 3:
                $(this).parent().prev().html('');
                data('/zxpWomPetite','post',$('#woPetite'),'28MM');
                $(this).parent().hide();
                break;
            case 4:
                $(this).parent().prev().html('');
                data('/zxpWomDapper','post',$('#woDapper'),'34MM');
                $(this).parent().hide();
                break;
            case 5:
                $(this).parent().prev().html('');
                data('/zxpWomClassy','post',$('#woClassy'),'34MM');
                $(this).parent().hide();
                break;
        }
    });

    $('#wClassic').click(function () {
        $('.tit').html('');
        $('.tit').append(`<strong>女士手表</strong>`+'/'+$('#wClassic').text());
        $('#womanBody').html('');
        $('#womanBody').append($(` <div class="type">
                <h3>CLASSIC</h3>
                <h4>简约经典的诠释</h4>
            </div>
            <div class="tbody container" id="woClassic">

            </div>`));
        data('/zxpWomClassic','post',$('#woClassic'),'36MM');
    });
    $('#wBlack').click(function () {
        $('.tit').html('');
        $('.tit').append(`<strong>女士手表</strong>`+'/'+$('#wBlack').text());
        $('#womanBody').html('');
        $('#womanBody').append($(` <div class="type">
                <h3>CLASSIC BLACK</h3>
                <h4>黑色深邃，展现都市的摩登酷感</h4>
            </div>
            <div class="tbody container" id="woBlack">

            </div>`));
        data('/zxpWomBlack','post',$('#woBlack'),'36MM');
    });
    $('#wPetite').click(function () {
        $('.tit').html('');
        $('.tit').append(`<strong>女士手表</strong>`+'/'+$('#wPetite').text());
        $('#womanBody').html('');
        $('#womanBody').append($(`<div class="type">
                <h3>CLASSIC PETITE</h3>
                <h4>轻盈精致，腕间的细节艺术</h4>
            </div>
            <div class="tbody container" id="woPetite">

            </div>`));
        data('/zxpWomPetite','post',$('#woPetite'),'28MM');
    });
    $('#wDepper').click(function () {
        $('.tit').html('');
        $('.tit').append(`<strong>女士手表</strong>`+'/'+$('#wDepper').text());
        $('#womanBody').html('');
        $('#womanBody').append($(` <div class="type">
                <h3>DAPPER</h3>
                <h4>拥有深蓝指针、罗马数字和日期显示功能，细节高雅出众</h4>
            </div>
            <div class="tbody container" id="woDapper">

            </div>`));
        data('/zxpWomDapper','post',$('#woDapper'),'34MM');
    });
    $('#wClassy').click(function () {
        $('.tit').html('');
        $('.tit').append(`<strong>女士手表</strong>`+'/'+$('#wClassy').text());
        $('#womanBody').html('');
        $('#womanBody').append($(` <div class="type">
                <h3>CLASSY</h3>
                <h4>璀璨夺目的精致水钻，时刻闪耀迷人魅力</h4>
            </div>
            <div class="tbody container" id="woClassy">

            </div>`));
        data('/zxpWomClassy','post',$('#woClassy'),'34MM');
    });

    $('#content').on('click','.col-lg-3',function () {
        setCookie('g-id',$(this).data('id'),0.1);
		window.location='http://127.0.0.1:8080/public/pages/Detailsshopping.html?__hbt=1561606772298';
    });
};