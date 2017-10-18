function inputData() {

}
inputData.prototype = {
  constructor: inputData,
  ok: false,
  class: {
    focus: '',
    inputwrong: ''
  },
  warnicon: {
    icon: 'warn',
    color: 'red',
    display: 'hidden'
  },
  warntext: '',//'密码不正确',
  value: '',
  addPro: function (string, value) {//根据路径名便可以添加属性。但是路径中包含的属性不是对象的话
    var route = string.split('.');  // 就不会添加成功
    var temp, that = this;
    var existpro = routes = [];
    for (let j = 0; j < route.length; j++) {
      if (that.hasOwnProperty(route[j])) {
        that = that[route[j]]
      } else {
        existpro = route.slice(0, j)
        routes = route.slice(j);
        break;
      }
    }
    var result = value;
    var len = routes.length
    for (let i = len - 1; i > 0; i--) {
      var obj = {};
      obj[routes[i]] = result;
      result = obj;
    }
    if (existpro.length > 0) {
      var temp = [], lenexist = existpro.length, rsltObj = this[existpro[0]];//temp数组用来存储对象已有的属性值
      temp.push(rsltObj);                                       //existpro用来存储路径中的对象已有属性
      for (var k = 1; k < lenexist; k++) {//将对象已经有的属性值存进数组
        rsltObj = rsltObj[existpro[k]];
        temp.push(rsltObj);
      }
      for (let i = lenexist - 1; i >= 0; i--) {
        var obj = temp[i];
        obj[route[i + 1]] = result;
        result = obj;
      }
    }
    this[route[0]] = result;
  }
}

module.exports=inputData;