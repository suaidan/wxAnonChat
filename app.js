//app.js
App({
  onLaunch: function () {
    this.getUserInfo();
    var token=wx.getStorageSync("token")||"";
    wx.connectSocket({
      url: 'ws://127.0.0.1:8000',
    })
    wx.onSocketOpen(function(res){ 
      if(token){
        wx.sendSocketMessage({
          data: JSON.stringify({ "token": token, name: this.globalData.usrname })
        })
      }else{
        wx.sendSocketMessage({
          data: JSON.stringify({ "token": "notoken", name: this.globalData.usrname })
        })
      }
    })
    wx.onSocketError(function(res){
      var app=getApp();
      app.netState=false;
      console.log("websocket 打开失败");
    })
    wx.onSocketMessage(function(res){
      if(res){
        console.log(res.toString());
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
  onShow:function(){
    this.netState=false;
    console.log(this);
  },
  netState:true,
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
        app.globalData.usrname=res.data;//!!!!这里有错误
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
          }
        })
      }
    })
    
  }
})