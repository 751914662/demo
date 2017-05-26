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
            month = today.getMonth() + 1;  //������·��Ǽ�һ�˵ģ�������Ҫ��һ
        }

        //��ȡ���µĵ�һ��
        var firstDay = new Date(year,month - 1,1);   //������·�����ʵ���·�
        //��ȡ���µĵ�һ�������ڼ�
        var firstDayWeekDay = firstDay.getDay();
        if(firstDayWeekDay === 0) firstDayWeekDay = 7; //��������յĻ��͵���7

        //��ȡ�� �� ��ֵ
        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        //��ȡ���µ����һ��
        var lastDayofLastMonth = new Date(year,month - 1,0);  //���µĵ�0��������µ����һ��
        var lastDateofLastMonth = lastDayofLastMonth.getDate(); //�洢���ڱ���

        //�����ĵ�һ����Ҫ��ʾ���ٸ��ϸ��µ� ���������һ�Ͳ���ʾ ���������������ʾ2��
        var preMonthDayCount = firstDayWeekDay - 1;

        //��ȡ���µ����һ��  �ж�ʲôʱ������һ����
        var lastDay = new Date(year,month,0);  //��һ���µĵ�0�� ��������µ����һ��
        var lastDate = lastDay.getDate();   //�����������


        for(var i = 0; i< 7*6;i++)
        {
            var date = i + 1 - preMonthDayCount;  //��ȥ�ϸ��µ����� + 1 �õ���ǰ������
            var showDate = date;  //������Ӧ����ʾ������һ��
            var thisMonth = month;

            //������ϸ���
            if(date <= 0)
            {
                thisMonth = month - 1;
                showDate = lastDateofLastMonth + date;
            }
            else if(date > lastDate)  //�������һ��
            {
                thisMonth = month + 1;  //�·ݼ�һ
                showDate = showDate - lastDate;  //��ȥ���µ����һ�� ���Եõ��¸��µ�����
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