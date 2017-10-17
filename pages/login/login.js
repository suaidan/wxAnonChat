// login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode:0,  //对登录页面和注册页面进行区分，登录页面是0，注册页面是1
    className: {  //感觉把这写数据写成对象的形式更好，待改进
      warnNickName: 'hidden',
      warnPwd: 'hidden',
      warnPwdCon: 'hidden',
      pwdConfirm: 'hidden',
      loginBtn: 'showBlock',
      pwdfocus: '',
      usrfocus: '',
      pwdconfocus: '',
      inputWarnU: '',
      inputWarnP: '',
      inputWarnPC: '',
    },
    usrWarnText: '',  //'用户名已存在',  //在登录的时候为‘该用户不存在’
    pwdWarnText: '', //'密码不正确',
    pwdConWarnText: '', //'密码重复错误'
    bottomText: '忘记密码？',
    bottomBind: 'forgetPwd',
    usrok: false,
    pwdok: false,
    pwdconok: false,
    autofocus: true,
    rightIcon:{//输入框右边的icon样式
      usricon:'',
      usriconcol:'',
      pwdicon:'',
      pwdiconcol:'',
      pwdconicon:'',
      pwdconiconcol:''
    },
    pwdvalue:'',//密码输入框的值
    pwdconvalue:'',
    inputformat:''//输入的格式声明
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
    if(!this.data.mode){
      this.setData({
        'className.loginBtn': 'hidden',
        'className.pwdConfirm': 'showBlock',
        bottomText: '返回登录',
        bottomBind: 'bootomBind',
        inputformat: '密码和字符最多16个字符,不包含空格',
        autofocus: true,
        'className.usrfocus': 'inputFocus',
        'className.inputWarnU': '',
        'className.warnNickName': 'hidden',
        mode:1
      })  
    }else{
      console.log("进行注册")
    }
       //第一次点击注册按钮的时候触发的事件。
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
      inputformat: '',
      mode:0
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
    var temp = e.currentTarget.dataset.symbol;
    var value = e.detail.value.replace(/\s+/g, '');
    var reg = /\S{1,16}/g, result = reg.test(value);
    //当输入框失去焦点的时候更改样式
    switch (temp) {
      case 'pwdfocus': this.setData({//密码
        'className.inputWarnP': 'inputWarn',
        'className.pwdfocus': '',
        pwdok: result && (this.data.pwdconvalue ? value === this.data.pwdconvalue:true),
        pwdvalue:value
      });
        if (!this.data.pwdok) {//内容检测失败
          this.setData({
            'className.warnPwd': 'showBlock',
            'rightIcon.pwdicon':'warn',
            'rightIcon.pwdiconcol':'red'
          })
        }else{
          this.setData({//内容检测成功
            'className.warnPwd': 'showBlock',
            'rightIcon.pwdicon': 'success',
            'rightIcon.pwdiconcol': '#59C34B'
          })
        }
        break;
      case 'usrfocus': this.setData({//昵称
        'className.inputWarnU': 'inputWarn',
        'className.usrfocus': '',
        usrok: result
      });
        if (!this.data.usrok) {
          this.setData({
            'className.warnNickName': 'showBlock',
            'rightIcon.usricon':'warn',
            'rightIcon.usriconcol':'red'
          })
        }else{
          this.setData({
            'className.warnNickName': 'showBlock',
            'rightIcon.usricon': 'success',
            'rightIcon.usriconcol': '#59C34B'
          })
        }
        break;
      case 'pwdconfocus': this.setData({//确认密码
        'className.inputWarnPC': 'inputWarn',
        'className.pwdconfocus': '',
        pwdconvalue:value,
        pwdconok: result && (value===this.data.pwdvalue)
      });
      console.log(value+'+'+this.data.pwdvalue)
      console.log((!this.data.pwdconok) || (value !== this.data.pwdvalue))

        if (!this.data.pwdconok) {
          this.setData({
            'className.warnPwdCon': 'showBlock',
            'rightIcon.pwdconicon':'warn',
            'rightIcon.pwdconiconcol':'red'
          })
        }else{
          
            this.setData({
              'className.warnPwdCon': 'showBlock',
              'rightIcon.pwdconicon': 'success',
              'rightIcon.pwdconiconcol': '#59C34B'
            })
         
        }
        break;
      default: console.log('warn: data-symbol is worng;' + temp);
    }
  },
  hideFormattext:function(e){  //隐藏格式说明
    this.setData({
      inputformat:''
    })
  },
  removeStyle:function(){ //切换到登录模式的时候移除在注册模式下的样式
    this.setData({
        'className.pwdfocus':'',

    })
  }
})