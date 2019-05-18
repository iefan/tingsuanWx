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
    indexNumberArray_tr: [],
    totalQuestion:20,
    btnText: "开始听题",
    curDurationSecond : 3
  },

  slider3change: function(e){
    this.data.curDurationSecond = e.detail.value
    // console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
    // const pageData = {}
    // for (let i = 1; i < 5; i++) {
    //   (function (index) {
    //     pageData['slider' + index + 'change'] = function (e) {
    //       console.log('slider' + 'index' + '发生 change 事件，携带值为', e.detail.value)
    //     }
    //   }(i))
    // }
  },
  
  StartListen: function (e) {
    // var  now, exitTime;
    var number, shi, ge, start_next_text, tmpsoundarr, tmpdisparr;
    this.soundPathArray = [];
    // flagSet = 23;
    // totalQuestionNum = 2;
    // console.log(this.data.btnText==="", "btntext");
    if (this.data.btnText === "开始听题"){
      this.data.numberArrayList = []
      this.GenAllQuestion();//产生所有数组
      // console.log(this.data.numberArray, this.data.numberArray.length, '0000第一次');
      for (let j = 0; j < this.data.numberArrayList.length; j++) {
        // console.log(this.data.numberArrayList[j]);
        tmpsoundarr = [];
        for (let i = 0; i < 4; i++) {
          number = this.data.numberArrayList[j][i];
          if (typeof (number) === typeof (1)) {
            // bai = Math.floor(number / 100)
            shi = Math.floor(number / 10);
            ge = number % 10;
            if (shi !== 0) {
              if (shi === 1) {
                tmpsoundarr.push("SHI");
              } else {
                tmpsoundarr.push(shi);
                tmpsoundarr.push("SHI");
              }
            }
            if (ge !== 0) {
              tmpsoundarr.push(ge);
            }
            if (shi === 0 && ge === 0) {
              tmpsoundarr.push(ge);
            }
          } else {
            if (number == "+") {
              tmpsoundarr.push("JIA");
            }
            if (number == "-") {
              tmpsoundarr.push("JIAN");
            }
            if (number == "=") {
              tmpsoundarr.push("DENGYU");
            }
          }
        }
        // tmpsoundarr.push("ds");
        this.soundPathArray.push(tmpsoundarr);
      }
      this.innerAudioContext.src = "/Sound/" + this.soundPathArray[0][0] + ".mp3";
      this.soundPathArray[0].splice(0, 1);
      this.innerAudioContext.play();
      this.data.indexNumberArray.push(1)

      this.setData({
        numberArray: [1],
        numberArray_all: [1],
        btnDisabled : true,
        start_next_text:"正在听题",        
        flag: 0
      })
    }

    // //延时1秒
    // now = new Date();
    // exitTime = now.getTime() + 1000;
    // while (true) {
    //   now = new Date();
    //   if (now.getTime() > exitTime)
    //     break;
    // }
    // console.log(this.data.numberArrayList, '+++++')
    if (this.data.btnText === "显示答案"){
      // console.log(this.data.numberArrayList, '------')
      this.data.btnText = "开始听题";
      // this.data.numberArrayList = [];
      this.data.indexNumberArray = [];
      this.setData({
        numberArray: this.data.numberArrayList,
        flag: 1,
        btnDisabled : false,
        start_next_text: this.data.btnText
      })
      this.data.numberArrayList = [];
    }

  },

  GenAllQuestion: function (e) {
    var tmpshizi, tmpnum, num1, num2, fuhao;
    for (let i = 0; i < this.data.totalQuestion; i++){
      fuhao = Math.floor(Math.random() * 10) % 2;
      num1 = Math.floor(Math.random() * 100);
      if (fuhao == 0) {
        if (num1<10){
          //第1个数是个位数，则第二个数可以是任意两位数
          if (Math.floor(Math.random() * 10) % 2 === 1){
            num2 = Math.floor(Math.random() * 100);
          }else{
            num2 = Math.floor(Math.random() * 10)*10;
          }
        }else {
          //第1个数是两位数，则第二个数有两种情况，1、num1<=90，则num2是任意个位数都可以，2、num1>90，则num2<100-num1
          if (num1<=90){
            num2 = Math.floor(Math.random()*10);
          }else{
            num2 = Math.floor(Math.random()*(100-num1));
          }
        }
      } else {
        // 减法
        if (num1<10){
          // num2 = Math.floor(Math.random() * 100);
          if (Math.floor(Math.random() * 10) % 2 === 1) {
            num2 = Math.floor(Math.random() * 100);
          } else {
            num2 = Math.floor(Math.random() * 10) * 10;
          }
        }else{
          num2 = Math.floor(Math.random() * 10);
          if (Math.floor(Math.random() * 10) % 2 === 1) {
            num2 = Math.floor(Math.random() * (Math.floor(num1/10)))*10;
            // num2 = Math.floor(Math.random() * 100);
          } else {
            num2 = Math.floor(Math.random() * 10) * 10;
          }
        }
      }
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
    var now, exitTime;
    this.innerAudioContext = wx.createInnerAudioContext(); 
    this.innerAudioContext.onEnded((res) => { 
      // console.log(app.globalData.scene, this.soundPathArray.length);
      if (app.globalData.scene == -2){
        return;
      }
      // this.data.indexNumberArray += 1;   
      // console.log("over");
      // console.log(this.soundPathArray[0]);
      if (this.soundPathArray[0].length > 0){
        this.innerAudioContext.src = "/Sound/" + this.soundPathArray[0][0] + ".mp3"
        this.innerAudioContext.play();
        this.soundPathArray[0].splice(0,1); //切除第1个
      }else{
        // console.log("开始切除一个式子：")
        // console.log(this.soundPathArray[0]);
        this.data.indexNumberArray.push(1);
        this.data.indexNumberArray_tr = [];

        //将行数加入
        for (let i=0; i<this.data.indexNumberArray.length; i++){
          if (i%2===0){
            this.data.indexNumberArray_tr.push(1);
          }
        }
        // console.log(this.data.indexNumberArray, '--');
        // console.log(this.data.indexNumberArray_tr, '==');
        // if (this.data.indexNumberArray.length%2===0){
          // this.data.indexNumberArray_tr.push(1)
        // }

        //延时1秒
        now = new Date();
        exitTime = now.getTime() + 1000*this.data.curDurationSecond;
        while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
            break;
        }
        // console.log("callback");
        // console.log(this.data.indexNumberArray);
        // console.log(this.data.numberArray, this.data.numberArray.length);
        
        this.soundPathArray.splice(0, 1); //切除第一个式子
        if (this.soundPathArray.length != 0){
          this.innerAudioContext.src = "/Sound/" + this.soundPathArray[0][0] + ".mp3"
          this.innerAudioContext.play();
          this.soundPathArray[0].splice(0, 1); //切除第1个
          this.setData({
            numberArray: this.data.indexNumberArray_tr,
            numberArray_all : this.data.indexNumberArray,
            flag: 0
          })

        }else{
          this.data.btnText = "显示答案";
          this.data.indexNumberArray = [];
          this.data.indexNumberArray_tr = [];
          this.setData({
            start_next_text: this.data.btnText,
            btnDisabled : false
            // quesDisabled: false,
            // ansDisable: true
          })
        }
      }
      
      // 
    })    
    this.innerAudioContext.onError((res) => {      // 播放音频失败的回调      
      console.log('播放音频失败' + res);   
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
    app.globalData.scene = 1;

    this.registerAudioContext();

    this.data.numberArrayList = [];
    this.data.indexNumberArray = [];
    this.data.indexNumberArray_tr = [];
    this.soundPathArray = []
    this.setData(
      {
        numberArray: null,
        flag: 1,
        btnDisabled: false,
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

      this.setData({
        Info: null,
      })
      if (app.globalData.scene == 1){
        thos.onLoad();
      }
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // var now, exitTime;
    // console.log("hide", app.globalData.scene)
    app.globalData.scene = -1;
    this.innerAudioContext.stop();
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