//app.js
App({
  getBaiduToken: function () {
    var tex, tok, cuid, ctp, lan = 'zh', spd;
    let that = this;

    //get method
    // wx.request({
    //   url: 'https://aip.baidubce.com/oauth/2.0/token', 
    //   data: {
    //     grant_type: 'client_credentials',
    //     client_id: 'LGRH7Xu607DIz6OsGnoef7jG',
    //     client_secret: '0g9YbnhvOjp8f0FGjDBALE0NBXcnLQmO'
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res.data),
    //     console.log(res.data['access_token']),
    //     console.log(res.data['expires_in'])
    //   }
    // }),

    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      method: 'POST',
      data: {
        grant_type: 'client_credentials',
        client_id: 'LGRH7Xu607DIz6OsGnoef7jG',
        client_secret: '0g9YbnhvOjp8f0FGjDBALE0NBXcnLQmO'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        // console.log(res.data['expires_in']);
        that.globalData.baidutoken = res.data
        // that.setData({
        //   baidutoken: res.data
        // })
      }
    })
  },

  onLaunch: function () {
    // console.log('123');
    this.getBaiduToken();
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    scene : 0,
    baidutoken:[],
    autoBaiduVoice:0
  }
})