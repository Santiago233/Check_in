// miniprogram/pages/index.js
var app = getApp();
//console.log(app.globalData.users)

Page({

  data: {
    users: [],
    openId: "",
    name: "",
    school: "南京大学",
    birthday: "2000-01-01",
    show_flag: false,
    school_online: [{value: "南京大学", checked: 'true'}, {value: "东北师范大学"}]
  },

  onLoad: function () {
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
    var that = this
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
              openId: res,
              users: app.globalData.users
            })
            that.searchUser();
          })
        }
      })
    }
  },

  searchUser: function(){
    //console.log(this.data.openId)
    //console.log(this.data.users.length)
    var that = this
    var flag = 0
    for(var i = 0; i < this.data.users.length; i++){
      if(this.data.users[i].openId == this.data.openId){
        flag = 1
      }
    }
    if(flag == 0){
      //console.log("User missing!")
      that.showInfo()
    }else{
      that.saveInfo()
    }
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },

  showInfo: function(){
    this.setData({
      show_flag: true
    })
  },

  hideInfo: function(){
    this.setData({
      show_flag: false
    })
  },

  onGotUserName: function(e){
    //console.log(e.detail.value)
    this.setData({
      name: e.detail.value
    })
  },

  onGotUserSchool: function(e){
    //console.log(e.detail.value)
    this.setData({
      school: e.detail.value
    })
  },

  onGotUserBirthday: function(e){
    this.setData({
      birthday: e.detail.value
    })
  },

  MakeSure: function(e){
    var that = this
    const db = wx.cloud.database()
    db.collection('users').add({
      data:{
        openId: that.data.openId,
        name: that.data.name,
        school: that.data.school,
        birthday: that.data.birthday,
        days: []
      },
      success: res => {
        //console.log(res)
      },
      fail: err => {
        //console.log(err)
      }
    })
    that.saveInfo()
  },

  saveInfo: function(){
    var userdata = {
      openId: this.data.openId,
      name: this.data.name,
      school: this.data.school,
      birthday: this.data.birthday
    }
    wx.setStorage({
      key: 'user',
      data: userdata
    })
  }
})