/**
 * Created by luor on 2016/8/18.
 */
define(["utils","amap"],function(utils) {
    var Controller = function (template) {
        this.template = template;
    }
    Controller.prototype = {
        el: ".content",
        markers:[],
        events: function () {
            $("#markpopup").on("click","#collapse",function(){
                $("#markpopup").addClass("hide");
            });
            $("#markpopup").on("click","#details",function(){
                 
            });
        },
        init: function () {
            var _this = this;
            utils.template.call(this, this.template, function (data) {
                $(_this.el).html(data);
                _this.events();
                _this.render();
            });
        },
        render:function(){
            this.mapInit();
        },
        mapInit:function(){
            var map = new AMap.Map('mapContainer', {
                resizeEnable: true,
                zoom:11,
                center: [116.28710, 39.90923]
            });
            this.map = map;
            this.addMark();
        },
        addMark:function(){
            var _this = this;
            var dataset = [{
                icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b1.png',
                position: [116.205467, 39.907761]
            }, {
                icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b2.png',
                position: [116.368904, 39.913423]
            }, {
                icon: 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png',
                position: [116.305467, 39.807761]
            }];
            // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
            dataset.forEach(function(data,index) {
                var marker = new AMap.Marker({
                    map: _this.map,
                    icon: data.icon,
                    position: [data.position[0], data.position[1]],
                    offset: new AMap.Pixel(-12, -36)
                });
                marker.on("click",function(){
                    $("#markpopup").removeClass("hide");
                });
                _this.markers.push({index:index,mark:marker});
            });
        }
    }
    return Controller;
});