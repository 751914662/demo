/**
 * Created by Administrator on 2017/5/24.
 */
(function () {
    var datepicker = {};
    datepicker.getMonthDate = function (year,month) {
        var ret = [];

        if(!year || !month)
        {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;  //这里的月份是减一了的，所以需要加一
        }

        //获取当月的第一天
        var firstDay = new Date(year,month - 1,1);   //这里的月份是真实的月份
        //获取当月的第一天是星期几
        var firstDayWeekDay = firstDay.getDay();
        if(firstDayWeekDay === 0) firstDayWeekDay = 7; //如果是周日的话就等于7

        //获取年 月 的值
        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        //获取上月的最后一天
        var lastDayofLastMonth = new Date(year,month - 1,0);  //当月的第0天就是上月的最后一天
        var lastDateofLastMonth = lastDayofLastMonth.getDate(); //存储日期变量

        //日历的第一行需要显示多少个上个月的 如果是星期一就不显示 如果是星期三就显示2个
        var preMonthDayCount = firstDayWeekDay - 1;

        //获取当月的最后一天  判断什么时候是下一个月
        var lastDay = new Date(year,month,0);  //下一个月的第0天 就是这个月的最后一天
        var lastDate = lastDay.getDate();   //保存这个变量


        for(var i = 0; i< 7*6;i++)
        {
            var date = i + 1 - preMonthDayCount;  //减去上个月的天数 + 1 得到当前的日期
            var showDate = date;  //用来算应该显示的是那一天
            var thisMonth = month;

            //如果是上个月
            if(date <= 0)
            {
                thisMonth = month - 1;
                showDate = lastDateofLastMonth + date;
            }
            else if(date > lastDate)  //如果是下一月
            {
                thisMonth = month + 1;  //月份加一
                showDate = showDate - lastDate;  //减去当月的最后一天 可以得到下个月的日期
            }

            if(thisMonth === 0 ) thisMonth = 12;
            if(thisMonth === 13) thisMonth = 1;

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            })
        }

        return {
            year: year,
            month: month,
            days: ret
        };

    };






    window.datepicker = datepicker;
})();