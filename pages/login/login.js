// login.js
var inputData = require('dataConstruct.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginBtn: 'showBlock',
    bottom: {
      text: '忘记密码？',
      bind: 'forgetPwd'
    },
    inputFormat: '',//输入的格式声明
    mode: 0 //对登录页面和注册页面进行区分，登录页面是0，注册页面是1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      usr: new inputData(),
      pwd: new inputData(),
      pwdcon: new inputData()
    })
    this.setData({
      'usr.autofocus': true,
      'pwdcon.display': 'hidden'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 登录函数
   */
  login: function (e) {
    console.log(e.detail.value);
  },
  tap: function () {
    console.log("tap")
  },
  /**
   * 注册按钮绑定的事件
   */
  chooseSignup: function (e) {
    if (!this.data.mode) {
      this.setData({
        loginBtn: 'hidden',
        'pwdcon.display': 'showBlock',
        'bottom.text': '返回登录',
        'bottom.bind': 'bootomBind',
        inputFormat: '密码和字符4~16位,不包含空格',
        'usr.autofocus': true,
        'usr.class.focus': 'inputFocus',
        'usr.class.inputwrong': '',
        'usr.warnicon.display': 'hidden',
        mode: 1
      })
    } else {
      console.log("进行注册")
    }
    //第一次点击注册按钮的时候触发的事件。
  },
  /**
   * 底部文字绑定的事件（即页面是注册模式时该组件绑定的函数）
   */
  bootomBind: function (e) {
    this.setData({
      loginBtn: 'showBlock',
      'pwdcon.display': 'hidden',
      'bottom.text': '忘记密码？',
      'bottom.bind': 'forgetPwd',
      inputFormat: '',
      mode: 0
    })
  },
  /**
   * 点击忘记密码的时候触发的函数
   */
  forgetPwd: function (e) {
    console.log('forget pwd')
  },
  /**
   * 输入框获得焦点时触发的函数
   */
  inputfocus: function (e) {
    var temp = e.currentTarget.dataset.symbol;
    // this.setData({
    //   usrWarnText: ''
    // })
    switch (temp) {
      case 'pwdfocus': this.setData({
        'pwd.class.focus': 'inputFocus'
      });
        break;
      case 'usrfocus': this.setData({
        'usr.class.focus': 'inputFocus'
      });
        break;
      case 'pwdconfocus': this.setData({
        'pwdcon.class.focus': 'inputFocus'
      });
        break;
      default: console.log('warn: data-symbol is worng;' + temp);
    }
  },
  /**
   * 输入框失去焦点时触发的函数
   */
  inputblur: function (e) {
    var temp = e.currentTarget.dataset.symbol;
    var value = e.detail.value.replace(/\s+/g, '');
    var reg = /\S{4,16}/g, result = reg.test(value);
    //当输入框失去焦点的时候更改样式
    switch (temp) {
      case 'pwdfocus': this.setData({//密码
        'pwd.class.inputwrong': 'inputWarn',
        'pwd.class.focus': '',
        'pwd.ok': result && (this.data.pwdcon.value ? value === this.data.pwdcon.value : true),
        'pwd.value': value
      });
        if (!this.data.pwd.ok) {//内容检测失败
          this.setData({
            'pwd.warnicon.display': 'showBlock',
            'pwd.warnicon.icon': 'warn',
            'pwd.warnicon.color': 'red'
          })
        } else {
          this.setData({//内容检测成功
            'pwd.warnicon.display': 'showBlock',
            'pwd.warnicon.icon': 'success',
            'pwd.warnicon.color': '#59C34B',
            'pwdcon.ok': true,
            'pwdcon.warnicon.icon': 'success',
            'pwdcon.warnicon.color': '#59C34B'
          })
        }
        break;
      case 'usrfocus': this.setData({//昵称
        'usr.class.inputwrong': 'inputWarn',
        'usr.class.focus': '',
        'usr.ok': result
      });
        if (!this.data.usr.ok) {
          this.setData({
            'usr.warnicon.display': 'showBlock',
            'usr.warnicon.icon': 'warn',
            'usr.warnicon.color': 'red'
          })
        } else {
          this.setData({
            'usr.warnicon.display': 'showBlock',
            'usr.warnicon.icon': 'success',
            'usr.warnicon.color': '#59C34B'
          })
        }
        break;
      case 'pwdconfocus': this.setData({//确认密码
        'pwdcon.class.inputwrong': 'inputWarn',
        'pwdcon.class.focus': '',
        'pwdcon.value': value,
        'pwdcon.ok': result && (value === this.data.pwd.value)
      });
        // console.log(value+'+'+this.data.pwd.value)
        // console.log((!this.data.pwdcon.ok) || (value !== this.data.pwd.value))

        if (!this.data.pwdcon.ok) {
          this.setData({
            'pwdcon.warnicon.display': 'showBlock',
            'pwdcon.warnicon.icon': 'warn',
            'pwdcon.warnicon.color': 'red'
          })
        } else {

          this.setData({
            'pwdcon.warnicon.display': 'showBlock',
            'pwdcon.warnicon.icon': 'success',
            'pwdcon.warnicon.color': '#59C34B',
            'pwd.ok': true,
            'pwd.warnicon.icon': 'success',
            'pwd.warnicon.color': '#59C34B'
          })

        }
        break;
      default: console.log('warn: data-symbol is worng;' + temp);
    }
  },
  hideFormattext: function (e) {  //隐藏格式说明
    this.setData({
      inputFormat: ''
    })
  },
  removeStyle: function () { //切换到登录模式的时候移除在注册模式下的样式
    this.setData({
      'pwd.class.focus': '',
      'pwdcon.class.focus': '',
    })
  }
})