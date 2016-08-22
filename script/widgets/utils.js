/**
 * Created by luor on 2016/8/18.
 */
define([],function(){
    var utils = {
        template:function(url,callback) {
            var _this = this;
            $.get(url, function (data) {
                $(_this.el).html("");
                callback(data);
            });
        }
    }
    window.phyUtil = utils;
    return utils;
});