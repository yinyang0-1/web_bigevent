// 提前基础路径
let base='http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
    options.url = base + options.url
    
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        options.complete = function (res) {
            var data = res.responseJSON
            // console.log(data);
            if (data.status == 1 && data.message == '身份认证失败！') {
                localStorage.removeItem('token')
                location.href='/login.html'
            }
        }
    }
})


