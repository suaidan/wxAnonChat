// login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    className: {
      warnNickName: 'hidden',
      warnPwd: 'hidden',
      pwdConfirm: 'hidden',
      warnPwdCon: 'hidden',
      loginBtn: 'showBlock',
      pwdfocus: '',
      usrfocus: '',
      pwdconfocus: ''
    },
    usrWarnText: '',  //'用户名已存在',  //在登录的时候为‘该用户不存在’
    pwdWarnText: '', //'密码不正确',
    pwdConWarnText: '', //'密码重复错误'
    bottomText: '忘记密码？',
    bottomBind: 'forgetPwd',
    usrok: false,
    pwdok: false,
    pwdconok: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    this.setData({
      'className.loginBtn': 'hidden',
      'className.pwdConfirm': 'showBlock',
      bottomText: '返回登录',
      bottomBind: 'bootomBind',
      usrWarnText: '密码和字符最多16个字符,不包含空格',
     
    })     //第一次点击注册按钮的时候触发的事件。
  },
  /**
   * 底部文字绑定的事件（即页面是注册模式时该组件绑定的函数）
   */
  bootomBind: function (e) {
    this.setData({
      'className.loginBtn': 'showBlock',
      'className.pwdConfirm': 'hidden',
      bottomText: '忘记密码？',
      bottomBind: 'forgetPwd',
      usrWarnTetx: ''
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
    console.log(e.currentTarget.dataset.symbol)
    var temp = e.currentTarget.dataset.symbol;
    this.setData({
      usrWarnText: ''
    })
    switch (temp) {
      case 'pwdfocus': this.setData({
        'className.pwdfocus': 'inputFocus'
      });
        break;
      case 'usrfocus': this.setData({
        'className.usrfocus': 'inputFocus'
      });
        break;
      case 'pwdconfocus': this.setData({
        'className.pwdconfocus': 'inputFocus'
      });
        break;
      default: console.log('warn: data-symbol is worng;' + temp);
    }
  },
  /**
   * 输入框失去焦点时触发的函数
   */
  inputblur: function (e) {
    var temp = e.currentTarget.dataset.symbol
    switch (temp) {
      case 'pwdfocus': this.setData({
        'className.pwdfocus': ''
      })
        break;
      case 'usrfocus': this.setData({
        'className.usrfocus': ''
      });
        break;
      case 'pwdconfocus': this.setData({
        'className.pwdconfocus': ''
      });
        break;
      default: console.log('warn: data-symbol is worng;' + temp);
    }
  }
})