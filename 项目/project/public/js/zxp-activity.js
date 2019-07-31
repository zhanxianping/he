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
    });

    function show(click,img,series,gName,size,rmb,id) {
        click.prepend($(`
                        <div class="col-lg-3 col-md-3 col-sm-5" data-id="${id}">
                        <img src="${img}" alt="">
                        <h6><span>${series}</span>&nbsp;<span></span></h6>
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
                    if (num>=4){
                        for (let i=0;i<4;i++){
                            show(click,data[i].img1,data[i].g_name,data[i].a_name,data[i].size,data[i].rmb,data[i].id)
                        }
                    } else {
                        for (let i=0;i<3;i++){
                            show(click,data[i].img1,data[i].g_name,data[i].a_name,data[i].size,data[i].rmb,data[i].id)
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
                        show(click,data[i].img1,data[i].g_name,data[i].a_name,data[i].size,data[i].rmb,data[i].id)
                    }
                }
            }
        })
    }

    data4('/zxpWrist','post',$('#actWrist'));
    data4('/zxpWatch','post',$('#actWatch'));
    data4('/zxpLovers','post',$('#actLovers'));

    $('body').on('click','button',function () {
        let n=$('button').index(this);
        switch (n) {
            case 1:
                $(this).parent().prev().html('');
                data('/zxpWrist','post',$('#actWrist'));
                $(this).parent().hide();
                break;
            case 2:
                $(this).parent().prev().html('');
                data('/zxpWatch','post',$('#actWatch'));
                $(this).parent().hide();
                break;
            case 3:
                $(this).parent().prev().html('');
                data('/zxpLovers','post',$('#actLovers'));
                $(this).parent().hide();
                break;
        }
    });

    $('#content').on('click','.col-lg-3',function () {
        setCookie('g-id',$(this).data('id'),0.1);
		window.location='http://127.0.0.1:8080/public/pages/Detailsshopping.html?__hbt=1561606772298';
    });
};