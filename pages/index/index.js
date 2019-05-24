//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '反馈请扫描'
    // mytok:[]
    // savedFilePath:[]
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  //下载合成音频文件
  welcomeDsTinsuan: function(){
    this.innerAudioContext = wx.createInnerAudioContext();
    let that=this;
    
    var url1 = "http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=" + app.globalData.baidutoken['access_token'] + "&tex=" + encodeURI(encodeURI("欢迎您来到大晟(sheng4)听算！"))+ "&vol=9&per=0&spd=5&pit=5&aue=3"
    // var url = "https://tsn.baidu.com/text2audio?txt=" + encodeURI(encodeURI('1+1=2')) + "&lan=zh&tok=" + this.data.mytok['access_token'] + "&cuid=Iklsljfdskl21&ctp=1&spd=5";
    // console.log(url1);

    // wx.downloadFile({
    //   url: url1,
    //   success(res){
    //     if (res.statusCode === 200){
    //       console.log(res.tempFilePath)
    //       wx.saveFile({
    //         tempFilePath: res.tempFilePath,
    //         success(res1) {
    //           console.log(res1.savedFilePath),
    //           that.setData({                
    //             savedFilePath : res1
    //           }) 
    //           // console.log(savedFilePath)             
    //         }
    //       })
    //     }
    //   }
    // })
    // console.log(that.data.savedFilePath, 'shiji');
    // console.log(encodeURI(encodeURI("1+1=2")));
    // console.log(encodeURI(encodeURI("百度你好")));
    that.innerAudioContext.src = url1;
    that.innerAudioContext.play()
  },

  // hechengceshi: function () {
  //   this.welcomeDsTinsuan();
  //   // // this.innerAudioContext = wx.createInnerAudioContext();
  //   // this.filesystem = wx.getFileSystemManager();
  //   // //合成语音
  //   // // this.ceshi();
  //   // let that=this;
  //   // console.log("hecheng====", this.data.mytok)
  //   // wx.request({
  //   //   url: 'http://tsn.baidu.com/text2audio',
  //   //   // method: 'POST',
  //   //   data: {
  //   //     tex: encodeURI(encodeURI('百度')),
  //   //     lan: 'zh',
  //   //     tok: this.data.mytok['access_token'],
  //   //     cuid: "Iklsljfdskl21",
  //   //     ctp: 1,
  //   //     spd: 5,
  //   //   },
  //   //   // header: {
  //   //   //   'content-type': 'application/json'
  //   //   // },
  //   //   header: {
  //   //     'content-type': 'application/json'
  //   //     // 'content-type': 'application/x-www-form-urlencoded'
  //   //   },
  //   //   success: function (res) {
  //   //     console.log("audio=================="),
  //   //       console.log(wx.env.USER_DATA_PATH),
  //   //     that.filesystem.writeFile({
  //   //       filePath: wx.env.USER_DATA_PATH + "x1.mp3",
  //   //         data: res.data,
        
  //   //        fail: function(res){
  //   //         console.log(res)
  //   //        }
  //   //   });
  //   //     // that.innerAudioContext.src = wx.env.USER_DATA_PATH + "x1.mp3";
  //   //     //   that.innerAudioContext.play()
  //   //       // console.log(res.data)
  //   //   }
  //   // })

  // },

  Grade2_2Tinsuan: function(){
    wx.navigateTo({
      url: '../dstingsuan_200/index'
    })
  },

  Grade2Tingsuan: function() {
    wx.navigateTo({
      url: '../dstingsuan_grade2/index'
    })
  },
  Grade1Tingsuan: function(){
    wx.navigateTo({
      url: '../dstingsuan_grade1/index'
    })
  },
 
  onLoad: function () {
    app.checkUpdate();
    this.welcomeDsTinsuan();
    // this.ceshi();
  },
})
