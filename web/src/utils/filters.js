/* eslint-disable no-param-reassign,arrow-body-style */
import constants from '../data/constants';

export const constantsFilter = (value, constName) => {
  /*
  * constants 中常量翻译过滤
  * @vaule ： 表示管道符前面的值
  * @constName ： 表示 constants 中常量名
  * return ： constants中，对应vaule的text。
  * 示例：
  * html ： {{form.currency | filter('MONEY_TYPE')}} //默认第一个参数是管道前的值
  * js：
  *  filters: {
  *     filter(arg1, arg2) {
  *        return filters.constantsFilter(arg1, arg2);
  *      },
  *  },
  * */
  let result = '';
  if (!value) return result;
  try {
    if (constName !== 'INDUSTRY_TYPE') {
      constants[constName].forEach((v, i) => {
        if (constants[constName][i].id === value.toString()) {
          result = constants[constName][i].text;
          throw new Error('StopIteration');
        }
      });
    } else {
      constants[constName].forEach((v, i) => {
        constants[constName][i].options.forEach((item, j) => {
          if (constants[constName][i].options[j].id === value.toString()) {
            result = constants[constName][i].options[j].text;
            throw new Error('StopIteration');
          }
        });
      });
    }
  } catch (e) {
    if (e.message !== 'StopIteration') throw e;
  }
  return result;
};


export const numberFilter = (num, n) => {
  /*
   * 将数据进行小数位处理，保留 n位
   * num: string、number 需要处理的数据
   * n: number 位数
   * @return ：处理后的数据
   * */
  return isNaN(parseFloat(num).toFixed(n)) ? '' : parseFloat(num).toFixed(n);
};

export default {
  constantsFilter,
  numberFilter,
};
