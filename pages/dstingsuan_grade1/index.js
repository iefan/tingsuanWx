//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '反馈请扫描',    
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
    app.checkUpdate();
  },  
})
