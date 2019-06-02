// pages/dstingsuan/index.js
// const myaudio = wx.createInnerAudioContext();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numberArrayList: [],
    indexNumberArray:[],
    // indexNumberArray_tr: [],
    totalQuestion:20,
    btnText: "开始听题",
    soundBaiduStringArray : [],
    curDurationSecond : 3,
    myTimerHandler : -1,
    now_Second:0,
    // userInputAnser : [],
    items: [
      { name: 0, value: '离线慢速', checked: 'true'},
      { name: 1, value: '在线快速' },
    ]
  },

  // setInterval(),

  radioChange(e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    app.globalData.autoBaiduVoice = e.detail.value;
  },
  slider3change: function(e){
    this.data.curDurationSecond = e.detail.value;
  },

  inputans: function(e){
    var curans;
    curans = new Number(e.currentTarget.id)-1;
    // this.data.userInputAnser[curans] = e.detail.value;
    if (this.data.numberArrayList[curans].length==7){
      this.data.numberArrayList[curans][5] = e.detail.value % 1000;
    }else{
      this.data.numberArrayList[curans].push(e.detail.value % 1000)
    }
    if (e.detail.value % 1000 == this.data.numberArrayList[curans][4]){
      this.data.numberArrayList[curans][6]= 1;
    }else{
      this.data.numberArrayList[curans][6] = 0 ;
    }
    
    // console.log(e.detail.value)
    // console.log(new Number(e.currentTarget.id), 'num')


  },
  
  StartListen: function (e) {
    // var  now, exitTime;
    var number, shi, ge, start_next_text, tmpsoundarr, tmpsoundstr, ansRight, ansWrong, nowsecond;
    // this.data.now_Second = 0;
    var lstNumberHanzi = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    let that = this;

    //设置滚动窗口的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          dispTimer_text:"",
          numberArray: null,
          scrollHeight: res.windowHeight*2.5
        });
      }
    });

    if (this.data.btnText =="开始听题"){
      this.data.btnText = "正在听题";
      this.soundPathArray = [];
      nowsecond = -12;

      this.data.soundBaiduStringArray = ["现在准备听题：倒计时。三"];
      // this.data.soundBaiduStringArray.push("现在准备听题：倒计时三");
      this.data.soundBaiduStringArray.push("二");
      this.data.soundBaiduStringArray.push("一。。开始");
      this.data.numberArrayList = []
      this.GenAllQuestion();//产生所有数组
      for (let j = 0; j < this.data.numberArrayList.length; j++) {
        tmpsoundarr = [];
        tmpsoundstr = "";
        for (let i = 0; i < 4; i++) {
          number = this.data.numberArrayList[j][i];
          if (typeof (number) === typeof (1)) {
            // bai = Math.floor(number / 100)
            shi = Math.floor(number / 10);
            ge = number % 10;
            if (shi !== 0) {
              if (shi === 1) {
                tmpsoundarr.push("SHI");
                tmpsoundstr += "十";
              } else {
                tmpsoundarr.push(shi);
                tmpsoundarr.push("SHI");
                tmpsoundstr += lstNumberHanzi[shi];
                tmpsoundstr += "十";
              }
            }
            if (ge !== 0) {
              tmpsoundarr.push(ge);
              tmpsoundstr += lstNumberHanzi[ge];
            }
            if (shi === 0 && ge === 0) {
              tmpsoundarr.push(ge);
              tmpsoundstr += lstNumberHanzi[ge];
            }
          } else {
            if (number == "+") {
              tmpsoundarr.push("JIA");
              tmpsoundstr += "加";
            }
            if (number == "-") {
              tmpsoundarr.push("JIAN");
              tmpsoundstr += "减";
            }
            if (number == "=") {
              tmpsoundarr.push("DENGYU");
              tmpsoundstr += "等于";
            }
          }
        }
        // tmpsoundarr.push("ds");
        this.soundPathArray.push(tmpsoundarr);
        this.data.soundBaiduStringArray.push(tmpsoundstr)
      }
      this.data.soundBaiduStringArray.push("答题完毕")

      this.innerAudioContext.src = "http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=" + app.globalData.baidutoken['access_token'] + "&tex=" + encodeURI(encodeURI(this.data.soundBaiduStringArray[0])) + "&vol=9&per=0&spd=5&pit=5&aue=3";
      this.data.soundBaiduStringArray.splice(0, 1);
      this.innerAudioContext.play();
      this.data.indexNumberArray.push(1);

      this.data.myTimerHandler = setInterval(function () {
        // that.data.now_Second += 1;
        nowsecond += 1
        if (nowsecond > 0) {
          that.setData({
            now_Second: nowsecond,
            dispTimer_text: nowsecond + "秒",
            blankScrollItem: lstNumberHanzi //补充空格
          })
        }
        if (nowsecond > 20) {
          that.setData({
            scrollTop: 500 + Math.floor((nowsecond - 20) / 5) * 100
          })
        }

      }, 1000) 
    }      
  },

  GenAllQuestion: function (e) {
    var tmpshizi, tmpnum, num1, num2, fuhao;
    for (let i = 0; i < this.data.totalQuestion; i++) {
      fuhao = Math.floor(Math.random() * 10) % 2;
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * 90) + 10;

      if (fuhao == 1) //奇数为-，偶数为+
      {
        if (num1 < num2) { tmpnum = num1; num1 = num2; num2 = tmpnum; }
        // tmpshizi = num1.toString() + "-" + num2.toString() + "=" + (num1 - num2).toString();
        tmpshizi = [num1, '-', num2, '=', num1 - num2];
      } else {
        // tmpshizi = num1.toString() + "+" + num2.toString() + "=" + (num1 + num2).toString();
        tmpshizi = [num1, '+', num2, '=', num1 + num2];
      }
      this.data.numberArrayList.push(tmpshizi);
    }
    // this.data.numberArray = this.data.numberArray.concat([tmpshizi])

  },
  
  registerAudioContext: function(e){
    var now, exitTime, duration, rightnums=0, wrongnums=0;
    this.innerAudioContext = wx.createInnerAudioContext(); 
    let that = this;
    // this.innerAudioContext.onPlay((res) => {
    //   // console.log(app.globalData.scene,);
    //   if (app.globalData.scene == -2){
    //     this.innerAudioContext.stop();
    //   }
    // });
    this.innerAudioContext.onEnded((res) => { 
      // console.log(app.globalData.scene, this.soundPathArray.length);
      if (app.globalData.scene == -2){
        return;
      }
      // console.log(this.data.soundBaiduStringArray)      
      //自动播放声音
      // console.log(this.data.now_Second, "秒")
      that.data.indexNumberArray.push(1);
      // console.log(that.data.indexNumberArray.length, that.data.indexNumberArray)
      if (that.data.indexNumberArray.length < 4 || that.data.indexNumberArray.length==24 ){
        duration = 100;
      }else{
        duration = this.data.curDurationSecond * 1000;
      }
      // console.log(duration)
      // console.log(this.data.curDurationSecond, 'this')
      setTimeout(function () { 
        //设置view
        // console.log(that.data.curDurationSecond, 111,2)
        if (that.data.soundBaiduStringArray.length != 0) {
          that.innerAudioContext.src = "http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=" + app.globalData.baidutoken['access_token'] + "&tex=" + encodeURI(encodeURI(that.data.soundBaiduStringArray[0])) + "&vol=9&per=0&spd=5&pit=5&aue=3";
          that.innerAudioContext.play();
          that.data.soundBaiduStringArray.splice(0, 1);
          // console.log(that.data.soundBaiduStringArray.length, '======')
          if (that.data.soundBaiduStringArray.length<=21){
            that.setData({
              trwidth: "600rpx",
              numberArray: that.data.indexNumberArray,
              pleaseAnswer: "请做答",
              flagResult: 0,
              numberArrayData: that.data.numberArrayList,
              // numberArray_all: that.data.indexNumberArray,
              flag: 0
            })
          }else{
            that.data.btnText = "正在听题";
            that.setData({
              numberArray:null,
              btnDisabled: true,
              // online_disable: true,
              start_next_text: "正在听题",
            })
          }          
        } else {
          clearInterval(that.data.myTimerHandler);

          for (let i = 0; i < that.data.numberArrayList.length; i++){
            // console.log(that.data.numberArrayList[i][6], '====')
            if (that.data.numberArrayList[i][6]==1){
              rightnums += 1;
            }else{
              wrongnums += 1;
            }
          }
          wx.showModal({
            title: "测试结束",
            content: "你一共答对了" + rightnums + "道，\n答错了" + wrongnums + "道，\n共用时"+that.data.now_Second +"秒",
            showCancel: false,
            success: function (res) {
              //  that.onLoad()
            }
          })

          that.data.indexNumberArray = [];
          that.data.btnText = "开始听题";
          that.setData({
            trwidth: "100%",
            start_next_text: "开始听题",
            btnDisabled: false,
            online_disable:false,
            pleaseAnswer: "",
            flagResult: 1,
            numberArrayData: that.data.numberArrayList,
            flag:0
            // quesDisabled: false,
            // ansDisable: true
          })
        }
      }, duration)      
    })    
    this.innerAudioContext.onError((res) => {      // 播放音频失败的回调      
      console.log('播放音频失败' + res);   
      wx.showModal({
        title: "播放失败",
        content: '请检查网络',
        showCancel: false,
        success: function (res) {
        //  that.onLoad()
        }
      })
      clearInterval(that.data.myTimerHandler);
    })    
    this.innerAudioContext.onStop((res) => {   
      // this.data.indexNumberArray += 1;   
      console.log('播放结束!');    
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.checkUpdate();

    app.globalData.scene = 1;
    app.globalData.autoBaiduVoice = 1;

    this.registerAudioContext();

    this.data.numberArrayList = [];
    this.data.indexNumberArray = [];
    this.data.indexNumberArray_tr = [];
    this.data.soundBaiduStringArray = [];
    this.soundPathArray = [];
    this.now_Second = 0;
    this.data.btnText = "开始听题";
    this.setData(
      {
        numberArray: null,
        flag: 1,
        btnDisabled: false,
        online_disable:false,
        start_next_text: "开始听题"
      }
    )    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("show", app.globalData.scene);
    if (app.globalData.scene == -1) {
      app.globalData.scene = 1;
      this.innerAudioContext.play();

      // this.setData({
      //   Info: null,
      // })
      // if (app.globalData.scene == 1){
      //   this.onLoad();
      // }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // var now, exitTime;
    // console.log("hide", app.globalData.scene)
    app.globalData.scene = -1;
    this.innerAudioContext.pause();

    // now = new Date();
    // exitTime = now.getTime() + 300;
    // while (true) {
    //   now = new Date();
    //   if (now.getTime() > exitTime)
    //     break;
    // }


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log("Onunload",app.globalData.scene)
    app.globalData.scene = -2;
    this.innerAudioContext.stop();
    // console.log("Onunload_-1", app.globalData.scene)
    // this.onUnload()

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})