/**
 Template Name: Webadmin - Bootstrap 4 Admin Dashboard
 Dashboard
 */


!function ($) {
    "use strict";

    var Dashboard = function () {
    };


        //creates area chart
        Dashboard.prototype.createAreaChart = function (element, pointSize, lineWidth, data, xkey, ykeys, labels, lineColors) {
            Morris.Area({
                element: element,
                pointSize: 3,
                lineWidth: 1,
                data: data,
                xkey: xkey,
                ykeys: ykeys,
                labels: labels,
                resize: true,
                gridLineColor: '#eef0f2',
                hideHover: 'auto',
                lineColors: lineColors
            });
        },
        //creates Bar chart
        Dashboard.prototype.createBarChart = function (element, data, xkey, ykeys, labels, lineColors) {
            Morris.Bar({
                element: element,
                data: data,
                xkey: xkey,
                ykeys: ykeys,
                labels: labels,
                gridLineColor: '#eef0f2',
                barSizeRatio: 0.4,
                resize: true,
                hideHover: 'auto',
                barColors: lineColors
            });
        },

        Dashboard.prototype.init = function () {

            //creating area chart
            var $areaData = [
                {y: '2009', a: 10, b: 20},
                {y: '2010', a: 75, b: 65},
                {y: '2011', a: 50, b: 40},
                {y: '2012', a: 75, b: 65},
                {y: '2013', a: 50, b: 40},
                {y: '2014', a: 75, b: 65},
                {y: '2015', a: 90, b: 60},
                {y: '2016', a: 90, b: 75}
            ];
            this.createAreaChart('morris-area-example', 0, 0, $areaData, 'y', ['a', 'b'], ['Series A', 'Series B'], ['#3292e0', '#bdbdbd']);

            //creating bar chart
            var $barData = [
                {y: '2009', a: 100, b: 90},
                {y: '2010', a: 75, b: 65},
                {y: '2011', a: 50, b: 40},
                {y: '2012', a: 75, b: 65},
                {y: '2013', a: 50, b: 40},
                {y: '2014', a: 75, b: 65},
                {y: '2015', a: 100, b: 90},
                {y: '2016', a: 90, b: 75}
            ];
            this.createBarChart('morris-bar-example', $barData, 'y', ['a', 'b'], ['Series A', 'Series B'], ['#3292e0', '#dedede']);

        },
        //init
        $.Dashboard = new Dashboard, $.Dashboard.Constructor = Dashboard
}(window.jQuery),

//initializing
    function ($) {
        "use strict";
        $.Dashboard.init();
    }(window.jQuery);