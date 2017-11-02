const app = getApp()
import { formatTime } from '../../utils/util'
var socket = require('../../utils/socket')
Page({
    data:{
      list: [
        {
          id:1,
          name:"wonder",
          text:"hello,someone",
          count:4,
          update:"2017:10:23"
        },
        {
          id: 1,
          name: "wonder",
          text: "hello,someone",
          count: 4,
          update: "2017:10:23"
        },
        {
          id: 1,
          name: "wonder",
          text: "hello,someone",
          count: 4,
          update: "2017:10:23"
        }
      ]
    },
    goPage(e) {
        let newlist = this.data.list
        const index = e.currentTarget.dataset.index
        newlist[index].count=0;
        this.setData({
            list: newlist
        });
        console.log(this.data);
        wx.navigateTo({
            url: '../message/message?name='+e.currentTarget.dataset.name+"&id="+e.currentTarget.dataset.id
        })
    },
    onLoad(){
      // socket.initSocket();
      // var that = this;
      // wx.onSocketMessage(function (res) {
      //   console.log(res.data); 
      //   var data = JSON.parse(res.data);
      //   if (data.cmd != "CMD" || data.subCmd != 'ROOMS')
      //     return
      //   data.rooms.forEach((room) => {
      //     room.updated = formatTime(room.updated)
      //   })
      //   if (data.cmd == 'CMD' && data.subCmd == 'ROOMS') {
      //     that.setData({
      //       list: data.rooms
      //     })
      //   }
      //   console.log(data);
      // })
    }
})