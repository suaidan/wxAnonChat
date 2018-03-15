//app.js
App({
  onLaunch: function () {
    wx.login({
      timeout: 10000,
      success: function (res) {
        if(res.code){
          wx.request({
            url: 'ws://127.0.0.1:8000',
            data:res.code
          })
        }else{
          console.log("登录失败"+res.errMsg);
        }
      }
    });
    this.getUserInfo();
    var token = wx.getStorageSync("token") || "";
    wx.connectSocket({
      url: 'ws://127.0.0.1:8000',
    })
    var app = this;
    // console.log(this)
    // console.log("name is"+this.globalData.usrname)不知道为什么为空？
    var usrname = wx.getStorageSync("userWxName")
    console.log(usrname);
    wx.onSocketOpen(function (res) {
      if (token) {
        wx.sendSocketMessage({
          data: JSON.stringify({ "token": token, "type": "token", name: usrname })
        })
      } else {
        wx.sendSocketMessage({
          data: JSON.stringify({ "token": "notoken", "type": "token", name: usrname })
        })
      }
    })
    wx.onSocketError(function (res) {
      app.netState = false;
      console.log("websocket 打开失败");
    })
    wx.onSocketMessage(function (res) {
      var resData = JSON.parse(res.data);
      if (resData.token) {
        wx.setStorage({
          key: 'token',
          data: resData.token
        })
      }
      console.log(resData);
      //后台判断token有效,然后分为长期有效还是临时的，再采取相应的办法

    })
    //调用API从本地缓存中获取数据
    var timeNow = +new Date();
    var storTime = wx.getStorageSync("invokeTime") || 0;
    var invoked = wx.getStorageSync('invoked') || false;
    if (invoked && (timeNow - storTime < 1.8144E10)) {//在本地存储一个月
      wx.setStorageSync("invokTime", Date.now());
      this.invoked = true;
    }
  },
  onShow: function () {
    this.netState = false;
  },
  netState: true,
  invoked: false,
  globalData: {
    // peopleId: new Date().getTime(),
    usrname: "",
    userInfo: {}
  },
  getUserInfo: function () {
    var app = this;
    wx.getStorage({//获取微信用户名
      key: 'userWxName',
      success: function (res) {
        app.globalData.usrname = res.data;
        console.log("2name is" + app.globalData.usrname)
      },
      fail: function () {
        wx.getUserInfo({
          success: function (res) {
            var userInfo = res.userInfo;
            var nickName = userInfo.nickName;
            wx.setStorage({
              key: 'usrInfor',
              data: userInfo
            })
            wx.setStorage({
              key: 'userWxName',
              data: nickName
            })
          },
          fail: function (res) {
            console.log(res);
          },
          complete: function (res) {
            console.log("get user's information finished");
          }
        })
      }
    })

  }
})