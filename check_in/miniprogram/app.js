//app.js
App({
  globalData:{
    users: [],
    canteens: [],
  },

  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    const db = wx.cloud.database()
    db.collection('users').get().then(res => {      
      //console.log(res.data)
      this.globalData.users = res.data
    })
  }
})
