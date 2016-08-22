/**
 * Created by luor on 2015/10/30.
 */
require.config({
    paths:{
        /* 插件    */
        zepto:"http://g.alicdn.com/sj/lib/zepto/zepto.min",
        sui:"http://g.alicdn.com/msui/sm/0.6.2/js/sm.min",
        director:"../lib/director.min",
        charts:"../lib/chart.min",

        amap:"http://webapi.amap.com/maps?v=1.3&key=9828d4ef8dfd778e838309629f96f9b0",

        utils:"widgets/utils",
        config:"widgets/config",
        list:"../tmpl/list",
        statistic:"../tmpl/statistic",
        monitor:"../tmpl/monitor",
        setting:"../tmpl/setting",
    },
    shim:{
        "sui":{
            deps:["zepto"]
        },
        "config":{
            deps:["zepto"]
        }
    }
});
require(['director','zepto','config','sui'],function(){
    /**
     *模版页面配置-并配置每个模版页面对应的控制器
     */
    var config = {
        "list":{
            "template":"tmpl/list.html",
            "controller":"list"
        },
        "statistic":{
            "template":"tmpl/statistic.html",
            "controller":"statistic"
        },
        "monitor":{
            "template":"tmpl/monitor.html",
            "controller":"monitor"
        },
        "setting":{
            "template":"tmpl/setting.html",
            "controller":"setting"
        },
        "otherwise":{
            "template":"tmpl/list.html",
            "controller":"list"
        },
    }
    //路由配置，匹配指定的hash地址触发renderPage函数
    var routes = {
        ":params":renderPage
    }
    function renderPage(hash){
        /**
         *根据hash值获取到当前hash 应加载 的模版页面及其控制器
         */
        var result = config[hash] || config.otherwise;
        var controller = result.controller;
        var template = result.template;
        var value = hash?'#'+hash:$(".tab-item.active").attr("href");
        var $link = $(".tab-item[href='"+value+"']");
        $link.addClass("active").siblings(".active").removeClass("active");
        /**
         *加载控制器，通过控制器中的init方法渲染模版页面
         */
        require([controller], function (ctrl) {
            new ctrl(template).init();
        });
    }
    Router(routes).init();
    if(!window.location.hash){
        renderPage();
    };
});