// miniprogram/pages/index.js
var app = getApp();

Page({

  data: {
    users: [],
    openId: "",
  },

  onLoad: function (options) {
    const db = wx.cloud.database({
      env: 'check-in-0766'
    })
    db.collection('users').get({
      success:res =>{
        this.setData({
          users: res.data
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

  },

  onGotUserInfo: function (e){
    var that = this;
    if(e.detail.errMsg == "getUserInfo:ok"){
      //console.log(e.detail.userInfo)
      /*wx.login({
        success(res){
          //console.log(res.code);
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: app.globalData.openid,
              secret: app.globalData.secret,
              js_code: res.code,
              grant_type : 'authorization_code'
            },
            method: "GET",
            success(res){
              console.log(res.data.openid)
            }
          })
        }
      })*/
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res =>{
          new Promise((resolve, reject) => {
            //console.log(res.result.openId)
            resolve(res.result.openId)
          }).then(res => {
            that.setData({
              openId: res
            })
            that.searchUser();
          })
        }
      })
    }
  },

  searchUser: function(){
    console.log(this.data.openId)
    console.log(this.data.users.length)
    var that = this;
    var flag = 0;
    for(var i = 0; i < this.data.users.length; i++){
      if(this.data.users[i].openId == this.data.openId){
        flag = 1;
      }
    }
    if(flag == 0){
      console.log("User missing!")
      that.registerUser();
    }
  },

  registerUser: function(){}
})