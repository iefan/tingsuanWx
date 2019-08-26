//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // motto: '本程序使用完全免费\n\n个人公众号：娜驿站',
    motto: '名人名言',
    mingyan:[]
    // mytok:[]
    // savedFilePath:[]
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  ceshi: function(){
    // console.log(1)
    wx.navigateTo({
      url: '../dstingsuan_test/index'
    })
  },
  //读取名人名言
  readMingyan: function(){
    var rnd=0;
    // let that = this;
    // wx.chooseMessageFile({
    //   count: 10,
    //   type: 'image',
    //   success(res) {
    //     // tempFilePath可以作为img标签的src属性显示图片
    //     const tempFilePaths = res.tempFilePaths
    //     print(tempFilePaths)
    //   }
    // })

    wx.getFileSystemManager().readFile({
      filePath: "/Sound/mingyan.jpg",
      encoding: 'utf-8',
      success: res => {
        //返回临时文件路径
        this.data.mingyan = res.data.split("\n");
        rnd = Math.floor(Math.random() * this.data.mingyan.length);
        // console.log(this.data.mingyan[rnd]);
        this.setData({
          motto: "　　" + this.data.mingyan[rnd]
        })
      },
      fail: console.error
    })
    return;
  },

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
  ChangeMinyan: function(){
    var rnd = 0, tmpmingyan1 = "", tmpmingyan2 = "";
    rnd = Math.floor(Math.random() * this.data.mingyan.length);
    this.data.motto = this.data.mingyan[rnd];
    // tmpmingyan1 = this.data.motto.slice(0, this.data.motto.lastIndexOf("——"))
    // tmpmingyan2 = this.data.motto.slice(this.data.motto.lastIndexOf("——") - 1)
    // console.log(tmpmingyan1, tmpmingyan2);
    this.setData({
      motto: "　　" +this.data.motto,
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
    this.readMingyan();
    // this.ceshi();
  },
})
