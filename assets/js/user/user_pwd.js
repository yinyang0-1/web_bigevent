$(function () {
    let form = layui.form
    
    form.verify({
        pwd: [/^\S{6,12}$/, '密码为6到12位'],

        samePwd:function (value) {
            if (value === $(['name=oldPwd']).val()) {
                return '不能与原密码相同'
            }
        },

        rePed:function (value) {
            if (value!==$(['name=newPwd'])) {
                return '两次密码输入不一致'
            }
        }

    })

    $('.layui-form').on('submit',function (e) {
        e.preventDefault()

        $.ajax({
            type:'post',
            url: '/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if (res.status!==0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
        
    })
})