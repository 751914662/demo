/**
 * Created by Administrator on 2017/5/24.
 */
;(function () {

    //var datepicker = window.datepicker;

    var monthDate;
    var $wrapper;

    datepicker.buildUi = function (year, month) {
        monthDate = datepicker.getMonthDate(year,month); //获取这个月的数据
        var $html = '<div class="ui-datepicker-header">'  + '<a href="" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
            '<a href="" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
            '<span class="ui-datepicker-curr-month">'+ monthDate.year + '-' + monthDate.month +'</span>' +
            '</div>' +
            '<div class="ui-datepicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>七</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for(var i = 0; i < monthDate.days.length; i++  )
        {
            var date = monthDate.days[i];
            if(i % 7 === 0)  //如果能被7整除 那就是每周的第一天
            {
                $html += '<tr>';
            }

            $html += '<td data-date=" ' + monthDate.days[i].date + '">' + monthDate.days[i].showDate + '</td>';

            if(i % 7 === 6)  //如果能被6整除 那就是每周的最后一天
            {
                $html += '</tr>';
            }
        }

        $html +=  '</tbody>' +
            '</table>' +
            '</div>';

        return $html;
    };

    datepicker.render = function (direction) {

        var year,month;
        if(monthDate){
            year = monthDate.year;
            month = monthDate.month;
        }

        if(direction === 'prev') month--;  //如果是上个月 就减一
        if(direction === 'next') month++;  //如果是下个月 就加一

        if(month < 1){
            year--;
            month = 12;
        }
        if(month > 12){
            year++;
            month = 1;
        }

        var $html = datepicker.buildUi(year,month);
        // document.body.innerHTML = $html;
        // <div class="ui-datepicker-wrapper">
        /*$wrapper = document.createElement('div');
        $wrapper.className = 'ui-datepicker-wrapper';
        $wrapper.innerHTML = $html;
        document.body.appendChild($wrapper);*/
        $wrapper = document.querySelector('.ui-datepicker-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className = 'ui-datepicker-wrapper';
        }
        $wrapper.innerHTML = $html
    };

    datepicker.init = function (input) {
        datepicker.render();


        var $input = document.querySelector(input);
        //var isOpen = false;  //定义一个变量 判断当前是否是开启的

        $input.addEventListener('focus', function(){
            $wrapper.classList.add('ui-datepicker-wrapper-show');
            var left = $input.offsetLeft;
            var top = $input.offsetTop + $input.offsetHeight;
            $wrapper.style.left = left + 'px';
            $wrapper.style.top = top + 2 + 'px';
        }, false);

        $wrapper.addEventListener('click', function(e){
            var $target = e.target;
            if (!$target.classList.contains('ui-datepicker-btn')) {
                return false;
            }
            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render('prev');
                e.stopPropagation();
            } else if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
                e.stopPropagation();
            }

        }, false);

        $wrapper.addEventListener('click', function(e){
            var $target = e.target;
            if ($target.tagName.toLowerCase() !== 'td') {
                return false;
            }

            var date = new Date(monthDate.year, monthDate.month - 1, $target.dataset.date);

            $input.value = format(date);

            $wrapper.classList.remove('ui-datepicker-wrapper-show');

        }, false);


        function format (date) {
            var result = '';
            var padding = function (num) {
                if (num <= 9) {
                    return '0' + num;
                }
                return num;
            };
            result += date.getFullYear() + '-';
            result += padding(date.getMonth() + 1) + '-';
            result += padding(date.getDate());
            return result;
        }

        /*$input.addEventListener('click', function () {
            if(isOpen)
            {
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            }
            else
            {
                $wrapper.classList.add('ui-datepicker-wrapper-show');

                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;
                $wrapper.style.left = left + "px";
                $wrapper.style.top = top + height + 2 + 'px';

                isOpen = true;
            }
        },false);


        $wrapper.addEventListener('click', function (e) {

            var $target = e.target;

           if( !$target.classList.contains("ui-datepicker-btn"))
           {
               return;
           }

            if($target.classList.contains("ui-datepicker-prev-btn")){
                datepicker.render("prev");

            }else if($target.classList.contains("ui-datepicker-next-btn")){
                datepicker.render("next");
            }


        },false);*/


    };

})();