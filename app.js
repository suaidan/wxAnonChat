//app.js
App({
  onLaunch: function () {
    var token=wx.getStorageSync("token")||"";
    wx.connectSocket({
      url: 'ws://127.0.0.1:8000',
    })
    wx.onSocketOpen(function(res){
      if(token){
        wx.sendSocketMessage({
          data: token,
        })
      }else{
        wx.sendSocketMessage({
          data: "notoken"
        })
      }
    })
    wx.onSocketMessage(function(res){
      if(res.ok){
        //后台判断token有效,然后分为长期有效还是临时的，再采取相应的办法
      }
    })
    //调用API从本地缓存中获取数据
    var timeNow=+new Date();  
    var storTime=wx.getStorageSync("invokeTime")||0;
    var invoked = wx.getStorageSync('invoked')||false;
    if(invoked&&(timeNow-storTime<1.8144E10)){//在本地存储一个月
      wx.setStorageSync("invokTime", Date.now());
      this.invoked=true;
    }
  },
  invoked:false,
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