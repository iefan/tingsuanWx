//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '反馈请扫描',
    mytok:[]
    // savedFilePath:[]
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  checkUpdate: function () {
    //检查是否存在新版本
    wx.getUpdateManager().onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("是否有新版本：" + res.hasUpdate);
      if (res.hasUpdate) {//如果有新版本

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateReady(function () {//当新版本下载完成，会进行回调
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，单击确定重启应用',
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
    this.checkUpdate();
    // this.ceshi();
  },
})
