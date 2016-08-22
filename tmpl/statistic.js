/**
 * Created by luor on 2016/8/18.
 */
define(["utils","charts"],function(utils){
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
                _this.render();
            });
        },
        render:function(){
            var ctx = document.getElementById("myChart").getContext("2d");
            var labels = [];
            var random1 = [];
            var random2 = [];
            for (var i = 1; i <= 6; i++) {
                labels.push(i * 2);
                labels.push(24 - (i - 1) * 2);
                random1.push(Math.random() * 50);
                random2.push(Math.random() * 50);
            }
            labels.sort(function (a, b) {
                return a - b
            });
            random1.sort(function (a, b) {
                return a - b
            });
            random2.sort(function (a, b) {
                return b - a
            });
            var dataset = random1.concat(random2);
            var fill = [];
            dataset.map(function (a, index) {
                if (a > 40)fill[index] = a;
            });

            var config = {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        data: fill,
                        label: "数据值",
                        fill: false,
                        backgroundColor: '#fcf5ce',
                        pointBorderColor: "#f1cd04",
                        pointBackgroundColor: "#f1cd04",
                        borderColor: "rgba(0,0,0,0)",
                        borderWidth: 0,
                        pointRadius: 5
                    }, {
                        label: "数据值",
                        data: dataset,
                        backgroundColor: '#fdf9df',
                        borderColor: "#f1cd04",
                        borderWidth: 1,
                        pointRadius: 5,
                        pointHoverRadius: 6,
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    fontSize: '10px',
                    title: {
                        display: false,
                        text: 'Chart.js Line Chart'
                    },
                    legend: {
                        display: false,
                    },
                    hover: {
                        mode: 'dataset'
                    },
                    scales: {
                        xAxes: [{
                            gridLines: {display: false},
                            ticks: {
                                fontSize: 10
                            }
                        }],
                        yAxes: [{
                            gridLines: {display: false},
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 50,
                                fontSize: 10
                            }
                        }]
                    }
                }
            };
            new Chart(ctx, config);
        }
    }
    return Controller;
});