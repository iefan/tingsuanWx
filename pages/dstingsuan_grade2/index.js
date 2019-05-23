//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '反馈请扫描',
  },
  //事件处理函数
  Grade99DivTinsuan: function () {
    wx.navigateTo({
      url: '../dstingsuan_99div/index'
    })
  },

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
  onLoad: function () {
    // this.ceshi();
  },
})
