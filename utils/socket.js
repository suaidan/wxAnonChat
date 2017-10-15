// const peopleId = getApp().globalData.peopleId
// console.log('peopleId:', peopleId)

// class Socket {
//   constructor(host) {
//     this.host = host
//     this.connected = false
//     wx.connectSocket({
//       url: this.host
//     })
    
//     // 监听连接成功
//     wx.onSocketOpen((res) => {
//       console.log('WebSocket连接已打开！')
//       this.connected = true
//       wx.sendSocketMessage({
//           data: JSON.stringify({
//             peopleId: peopleId,
//             cmd: 'JOIN',
//             roomId: '1000'
//           })
//       })
//     })

//     // 监听连接断开
//     wx.onSocketError((res) => {
//       console.log('WebSocket连接打开失败，请检查！')
//       this.connected = false
//       wx.connectSocket({
//         url: this.host
//       })
//     })
//     console.log("打开了socket文件")
//     // 监听连接关闭
//     wx.onSocketClose((res) => {
//       console.log('WebSocket 已关闭！')
//       this.connected = false
//       wx.connectSocket({
//         url: this.host
//       })
//     })

//   }

//   sendMessage(data) {
//     if(!this.connected){
//       console.log('not connected')
//       return
//     }
//     wx.sendSocketMessage({
//       data: JSON.stringify(data)
//     })
//   }

  

//   onMessage(callback) {
//     if(typeof(callback) != 'function')
//       return
//     // 监听服务器消息
//     console.log("这里");
//     var tempData;
//     wx.onSocketMessage((res) => {
//       tempData = JSON.parse(res.data)
//       console.log(tempData);
//     })
//     callback(tempData);
//   }
// }
function initSocket(){
  wx.connectSocket({
    url: 'ws://127.0.0.1:8000',
  })
  wx.onSocketOpen(res=>{
    console.log("socket 已经打开")
  })
  wx.onSocketError(function(error){
    console.error(error);
  })
  wx.onSocketClose(res=>{
    console.log("socket已关闭")
  })
}
module.exports.initSocket = initSocket;