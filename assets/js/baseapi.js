//每次调用$.get $.post $.ajax会先调用这个函数 可以拿到我们给ajx提供的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 统一为有权限的接口，设置headers请求头
    if (options.url.indexOf('/my/') !== 1)
        options.headers = { Authorization: localStorage.getItem('token') || '' }
        // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // console.log('complete');
        // console.log(res);
        // complete中 可以使用res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1) {
            // 1 强制清空token
            localStorage.removeItem('token');
            // 2 强制跳转到登录页面
            location.href = 'login.html';
        }
    }
})