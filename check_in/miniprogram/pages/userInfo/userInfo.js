// miniprogram/pages/userInfo/userInfo.js
Page({

  data: {
    openId: "",
    name: "",
    school: "",
    birthday: ""
  },

  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'user',
      success: function(res){
        //console.log(res.data)
        that.setData({
          openId: res.data.openId,
          name: res.data.name,
          school: res.data.school,
          birthday: res.data.birthday
        })
      }
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})