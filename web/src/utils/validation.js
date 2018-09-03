function isPhoneAvailable(str) { // 手机号码正则
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  let rtnTip = '';
  if (!str) {
    rtnTip = '手机号不能为空';
  } else if (!reg.test(str)) {
    rtnTip = '请输入正确的手机号';
  } else {
    rtnTip = 'ok';
  }
  return rtnTip;
}
function isEmailAvailable(str) { // 邮箱电子邮箱正则
  const reg = /[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,15}\.[a-zA-Z0-9]{1,5}/;
  let rtnTip = '';
  if (!str) {
    rtnTip = '邮箱不能为空';
  } else if (!reg.test(str)) {
    rtnTip = '请输入正确的邮箱地址';
  } else {
    rtnTip = 'ok';
  }
  return rtnTip;
}
function isIDNOAvailable(str) { // 验证身份证号
  const no15Reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; //  15位
  const no18Reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/; // 18位
  let rtnTip = '';
  if (!str) {
    rtnTip = '身份证号不能为空';
  } else if (!no15Reg.test(str) && !no18Reg.test(str)) {
    rtnTip = '请输入正确的身份证号';
  } else {
    rtnTip = 'ok';
  }
  return rtnTip;
}
function isPassportAvailable(str) { // 护照验证
  const reg = /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/;
  let rtnTip = '';
  if (!str) {
    rtnTip = '护照号不能为空';
  } else if (!reg.test(str)) {
    rtnTip = '请输入正确的护照号';
  } else {
    rtnTip = 'ok';
  }
  return rtnTip;
}
function isPasswordAvailable(str) { // 密码校验
  const reg = /^[a-zA-Z0-9_]{6,16}$/;
  let rtnTip = '';
  if (!str) {
    rtnTip = '密码不能为空';
  } else if (!reg.test(str)) {
    rtnTip = '请输入字母、数字或下划线组成的6~16位密码';
  } else {
    rtnTip = 'ok';
  }
  return rtnTip;
}

function isNumberOfDouble(str) {  // 必须保留两位小数格式
  const reg = /^\d+(\.\d{2})+?$/;
  let rtnTip = '';
  if (!str) {
    rtnTip = '内容不能为空';
  } else if (!reg.test(str)) {
    rtnTip = '请按正确格式填写,如："0.00"';
  } else {
    rtnTip = 'ok';
  }
  return rtnTip;
}

// 校验字符串是否是英文字符+符号
export const isENChar = (str) => {
  let rtnTip = '';
  if (typeof str === 'undefined' || str.length === 0) {
    return '不能为空';
  }
  const reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
  if (reg.test(str)) {
    rtnTip = '请输入英文';
  } else {
    rtnTip = 'ok';
  }
  return rtnTip;
};

// 是否是数字，可有数字分隔符
export const isNumberChar = (str) => {
  if (!str) {
    return 'ok';
  }
  let number = str;
  if (typeof str === 'number') {
    number = str.toString();
  }
  let rtnTip = '';
  const reg1 = new RegExp(',', 'g');
  const num = number.replace(reg1, '');
  const reg2 = /^(-?\d+)(\.\d+)?$/;
  if (reg2.test(num)) {
    rtnTip = 'ok';
  } else {
    rtnTip = '请输入数字';
  }
  return rtnTip;
};

export default {
  isPhoneAvailable,
  isEmailAvailable,
  isIDNOAvailable,
  isPassportAvailable,
  isPasswordAvailable,
  isNumberOfDouble,
  isENChar,
  isNumberChar,
};
