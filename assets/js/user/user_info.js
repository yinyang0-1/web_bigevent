$(function () {
    let form = layui.form
    let layer=layui.layer
    
    form.verify({
        nickname: function (value) {
            if (value.trim().length>6) {
                return '昵称不能超过6位'
            }
        }
    })

    intiUserInfo()

    function intiUserInfo() {
        $.ajax({
            // type:'get',
            url:'/my/userinfo',
            success:function(res){
                if (res.status!==0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo',res.data)
            }
        })
    }

    $('#btnReset').on('click',function (e) {
        e.preventDefault()

        intiUserInfo()
    })

    $('.layui-form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url: '/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if (res.status!==0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})