/**
 * Created by luor on 2016/8/18.
 */
define(["utils"],function(utils){
    var Controller = function(template){
        this.template = template;
    }
    Controller.prototype = {
        el:".content",
        events:function(){

        },
        init:function(){
            var _this = this;
            utils.template.call(this,this.template,function(data){
               $(_this.el).html(data);
                _this.events();
            });
        },
        render:function(){
            
        }
    }
    return Controller;
});