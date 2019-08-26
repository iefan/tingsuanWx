//app.js
App({
  checkUpdate: function () {
    //检查是否存在新版本
    wx.getUpdateManager().onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log("是否有新版本：" + res.hasUpdate);
      if (res.hasUpdate) {//如果有新版本

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateReady(function () {//当新版本下载完成，会进行回调
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，更新了新的acess_token。单击确定重启应用',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                wx.getUpdateManager().applyUpdate();
              }
            }
          })

        })

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateFailed(function () {//当新版本下载失败，会进行回调
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请检查网络设置',
            showCancel: false,
          })
        })
      }
    });
  },

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
        console.log(res.data)
        // that.setData({
        //   baidutoken: res.data
        // })
      }
    })
  },

  onLaunch: function () {
    this.checkUpdate();
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
    // this.getBaiduToken();
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
    baidutoken: {
      "access_token": "24.a15e7ecbabb40c0c626cef266c35b368.2592000.1569389601.282335-16302304"},
    autoBaiduVoice:0

  }
})