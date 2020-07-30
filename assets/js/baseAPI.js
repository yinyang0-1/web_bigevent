// 提前基础路径
let base='http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function (options) {
    options.url=base+options.url
})