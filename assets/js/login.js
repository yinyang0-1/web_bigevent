$(function () {
    // 注册登入切换
    $('#reg_link').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#login_link').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //  账户密码验证
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码为6-12位，且不能有空格'],

        repwd: function (value) {
            if ($('#reg-pwd').val() !== value) {
                return '两次密码输入不同'
            }
        }
    })
    // 注册提交
    let layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password').val(),
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.msg)
                $('#login_link').click()
                $('#form_reg')[0].reset()

            }
        })
    })
    // 登入
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data:  $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.msg)
                localStorage.setItem('token', res.token)
                location.href='/index.html'
            }
        })
    })

})