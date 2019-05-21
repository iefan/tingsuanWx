//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '反馈请扫描',
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  Grade1Tinsuan_10: function () {
    wx.navigateTo({
      url: '../dstingsuan_10plus/index'
    })
  },

  Grade1Tinsuan_20: function () {
    wx.navigateTo({
      url: '../dstingsuan_20plus/index'
    })
  },

  Grade1Tinsuan_50: function () {
    wx.navigateTo({
      url: '../dstingsuan_50plus/index'
    })
  },

  Grade1Tinsuan_2plus1: function(){
    wx.navigateTo({
      url: '../dstingsuan_2plus1/index'
    })
  },

  onLoad: function () {
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  // Grade2Tinsuan: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
