//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '反馈请扫描',
    mytok:[],
    savedFilePath:[]
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  //下载合成音频文件
  hechengDownload: function(){
    this.innerAudioContext = wx.createInnerAudioContext();
    let that=this;
    
    var url1 = "http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=" + this.data.mytok['access_token'] + "&tex=" + encodeURI(encodeURI("潘晟(sheng4)尧，欢迎您来到大晟(sheng4)听算！"))+ "&vol=9&per=0&spd=5&pit=5&aue=3"
    // var url = "https://tsn.baidu.com/text2audio?txt=" + encodeURI(encodeURI('1+1=2')) + "&lan=zh&tok=" + this.data.mytok['access_token'] + "&cuid=Iklsljfdskl21&ctp=1&spd=5";
    console.log(url1);

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

  hechengceshi: function () {
    this.hechengDownload();
    // // this.innerAudioContext = wx.createInnerAudioContext();
    // this.filesystem = wx.getFileSystemManager();
    // //合成语音
    // // this.ceshi();
    // let that=this;
    // console.log("hecheng====", this.data.mytok)
    // wx.request({
    //   url: 'http://tsn.baidu.com/text2audio',
    //   // method: 'POST',
    //   data: {
    //     tex: encodeURI(encodeURI('百度')),
    //     lan: 'zh',
    //     tok: this.data.mytok['access_token'],
    //     cuid: "Iklsljfdskl21",
    //     ctp: 1,
    //     spd: 5,
    //   },
    //   // header: {
    //   //   'content-type': 'application/json'
    //   // },
    //   header: {
    //     'content-type': 'application/json'
    //     // 'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res) {
    //     console.log("audio=================="),
    //       console.log(wx.env.USER_DATA_PATH),
    //     that.filesystem.writeFile({
    //       filePath: wx.env.USER_DATA_PATH + "x1.mp3",
    //         data: res.data,
        
    //        fail: function(res){
    //         console.log(res)
    //        }
    //   });
    //     // that.innerAudioContext.src = wx.env.USER_DATA_PATH + "x1.mp3";
    //     //   that.innerAudioContext.play()
    //       // console.log(res.data)
    //   }
    // })

  },

  ceshi: function(){    
    var tex, tok, cuid, ctp, lan='zh', spd;
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
      // header: {
      //   'content-type': 'application/json'
      // },
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },      
      success: function (res) {
        // that.setData({
        //   mytok:res.data
        // })
        // console.log("post=================="),
        // console.log(res.data),
        // // console.log(res.data['access_token']),
        // // console.log("tok====:", tok)
        that.setData({
          mytok : res.data
        })
        console.log(res.data['expires_in'])
        // console.log(encodeURI("百度你好")),
        // console.log(encodeURI(encodeURI("百度你好")))
      }
    })

    // console.log("items====:", this.data.mytok);
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
  Grade1Tinsuan: function(){
    wx.navigateTo({
      url: '../dstingsuan_grade1/index'
    })
  },
 
  onLoad: function () {
    this.ceshi();
    // this.hechengDownload();
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
