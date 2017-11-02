//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  globalData: {
    // peopleId: new Date().getTime(),
    usrname: "",
    userInfo: {}
  },
  getUserInfo:function(){
    var app=getApp();
    wx.getStorage({//获取微信用户名
      key: 'userWxName',
      success: function(res) {
        console.log(res.data);
        console.log(app);
        app.globalData.usrname=res.data;
        return;
      },
      fail:function(){
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
            console.log(res);
          }
        })
      }
    })
    
  }
})