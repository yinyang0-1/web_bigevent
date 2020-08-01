$(function () {
    getUserInfo()
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        type:'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renderUser(res.data)
        }
        
    })
}
// 渲染用户信息
function renderUser(user) {
    var username = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + username)
    
    if (user.user_pic) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(username[0].toUpperCase())
    }
    
}
// 退出功能
$('#btnLogout').on('click',function () {
    layer.confirm('是否确定退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        layer.close(index);
        localStorage.removeItem('token')
        location.href='/login.html'
      });
})


