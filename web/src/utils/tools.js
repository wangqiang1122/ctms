Date.prototype.Format = function (fmt) {
  /**
   * 对Date的扩展，将 Date 转化为指定格式的String
   * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
   * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
   * 例子：
   * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
   * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
   * */
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

Date.prototype.DateAddORSub = function(interval, type, number, mydate) {
  /*
   * 功能:实现Script的Date加减功能.
   * 参数:interval,字符串表达式，表示要添加的时间间隔.
   * 参数:number,数值表达式，表示要添加的时间间隔的个数.
   * 参数:type,加减类型.h
   * 参数:mydate,以mydate日期为参考点加减时间。为空,则相对当前日期加减
   * 返回:新的时间对象.
   * var newDate =new Date().DateAddORSub("d","+",5,yourDate);
   */
  var date = mydate ? new Date(mydate) : new Date();

  switch (interval) {
    case "y" :
    {
      if (type == "+") {
        date.setFullYear(date.getFullYear() + number);
      } else {
        date.setFullYear(date.getFullYear() - number);
      }
      return date;
    }
    case "q" :
    {
      if (type == "+") {
        date.setMonth(date.getMonth() + number * 3);
      } else {
        date.setMonth(date.getMonth() - number * 3);
      }
      return date;
    }
    case "mo" :
    {
      if (type == "+") {
        date.setMonth(date.getMonth() + number);
      } else {
        date.setMonth(date.getMonth() - number);
      }
      return date;
    }
    case "w" :
    {
      if (type == "+") {
        date.setDate(date.getDate() + number * 7);
      } else {
        date.setDate(date.getDate() - number * 7);
      }
      return date;
    }
    case "d" :
    {
      if (type == "+") {
        date.setDate(date.getDate() + number);
      } else {
        date.setDate(date.getDate() - number);
      }
      return date;
    }
    case "h" :
    {
      if (type == "+") {
        date.setHours(date.getHours() + number);
      } else {
        date.setHours(date.getHours() - number);
      }
      return date;
    }
    case "mi" :
    {
      if (type == "+") {
        date.setMinutes(date.getMinutes() + number);
      } else {
        date.setMinutes(date.getMinutes() - number);
      }
      return date;
    }
    case "s" :
    {
      if (type == "+") {
        date.setSeconds(date.getSeconds() + number);
      } else {
        date.setSeconds(date.getSeconds() - number);
      }
      return date;
    }
    default :
    {
      if (type == "+") {
        date.setDate(d.getDate() + number);
      } else {
        date.setDate(d.getDate() - number);
      }
      return date;
    }
  }
}
