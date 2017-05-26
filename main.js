;(function(){

    var monthData, $wrapper;

    datepicker.buildUi = function (year, month){
        monthData = datepicker.getMonthDate(year, month);
        var html = 	'<div class="ui-datepicker-header">' +
            '<a class="ui-datepicker-btn ui-datepicker-prev-btn" href="#">&lt;</a>' +
            '<a class="ui-datepicker-btn ui-datepicker-next-btn" href="#">&gt;</a>' +
            '<span class="ui-datepicker-current-month">' + monthData.year + '-' + monthData.month + '</span>' +
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
            '<th>日</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for (var i = 0; i < monthData.days.length; i++) {

            if (i%7 === 0) {
                html += '<tr>';
            }

            html += '<td data-date="' + monthData.days[i].date + '">' + monthData.days[i].showDate + '</td>';

            if (i%7 === 6) {
                html += '</tr>';
            }

        }

        html += 		'</tbody>' +
            '</table>' +
            '</div>';

        return html;
    };

    datepicker.render = function (direction){
        var year, month;
        if (monthData) {
            year = monthData.year;
            month = monthData.month;
        }
        if (direction === 'next') month ++;
        if (direction === 'prev') month --;

        if (month < 1) {
            year--;
            month = 12;
        }
        if(month > 12) {
            year++;
            month = 1;
        }

        var html = datepicker.buildUi(year, month);
        $wrapper = document.querySelector('.ui-datepicker-wrapper');
        if (!$wrapper) {
            $wrapper = document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className = 'ui-datepicker-wrapper';
        }
        $wrapper.innerHTML = html
    };

    datepicker.init = function (input) {

        var $input = document.querySelector(input);

        datepicker.render();

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
            } else if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
            }

        }, false);

        $wrapper.addEventListener('click', function(e){
            var $target = e.target;
            if ($target.tagName.toLowerCase() !== 'td') {
                return false;
            }

            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

            $input.value = format(date);

            $wrapper.classList.remove('ui-datepicker-wrapper-show');

        }, false)

    };

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

})();



/*(function () {

    var datepicker = window.datepicker;

    datepicker.buildUi = function (year, month) {
        var monthDate = datepicker.getMonthDate(year,month); //获取这个月的数据
        var html = '<div class="ui-datepicker-header">'  + '<a href="" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
            '<a href="" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
            '<span class="ui-datepicker-curr-month">2017-5-24</span>' +
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

        for(var i = 0; i < monthDate.length; i++  )
        {
            var date = monthDate[i];
            if(i % 7 === 0)  //如果能被7整除 那就是每周的第一天
            {
                html += '<tr>';
            }

            html += '<td>' + date.showDate + '</td>';

            if(i % 6 === 0)  //如果能被6整除 那就是每周的最后一天
            {
                html += '</tr>';
            }
        }

          html +=  '</tbody>' +
              '</table>' +
          '</div>';

        return html;
    };

        datepicker.init = function ($dom) {
            var html = datepicker.buildUi();
            $dom.innerHTML = html;
        }

})();*/
