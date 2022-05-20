//每次调用$.get $.post $.ajax会先调用这个函数 可以拿到我们给ajx提供的配置对象
$.ajaxPrefilter(function(options) {
    console.log(options.url);
    options.url = 'http://www.liulongbin.top:3007' + options.url;
})