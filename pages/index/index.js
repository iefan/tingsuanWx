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
  Grade99Tinsuan: function () {
    wx.navigateTo({
      url: '../dstingsuan_99times/index'
    })
  },

  Grade2_2Tinsuan: function(){
    wx.navigateTo({
      url: '../dstingsuan_200/index'
    })
  },

  Grade2Tinsuan: function() {
    wx.navigateTo({
      url: '../dstingsuan_zd/index'
    })
  },
  Grade1Tinsuan: function(){
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
