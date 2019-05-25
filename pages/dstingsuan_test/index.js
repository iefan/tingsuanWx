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
  
  StartListen: function (e) {
    // var  now, exitTime;
    var number, shi, ge, start_next_text, tmpsoundarr, tmpsoundstr;
    var now_Second = 0;
    let that = this;

    this.soundPathArray = [];
    var lstNumberHanzi = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

    if (this.data.btnText === "开始听题"){
      this.data.soundBaiduStringArray = [];
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
      if (app.globalData.autoBaiduVoice ==0){
        this.innerAudioContext.src = "/Sound/" + this.soundPathArray[0][0] + ".mp3";
        this.soundPathArray[0].splice(0, 1);
        this.innerAudioContext.play();
        this.data.indexNumberArray.push(1);
      }else{
        this.innerAudioContext.src =  "http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=" + app.globalData.baidutoken['access_token'] + "&tex=" + encodeURI(encodeURI(this.data.soundBaiduStringArray[0])) + "&vol=9&per=0&spd=5&pit=5&aue=3";
        this.data.soundBaiduStringArray.splice(0, 1);
        this.innerAudioContext.play();
        this.data.indexNumberArray.push(1);
      }
      
      this.data.myTimerHandler = setInterval(function(){
        now_Second += 1
        that.setData({
          dispTimer_text: "已进行："+now_Second+"秒"
        })
      }, 1000),

      this.setData({
        numberArray: [1],
        numberArray_all: [1],
        btnDisabled : true,
        online_disable:true,
        start_next_text:"正在听题",        
        flag: 0
      })
    }
   
    if (this.data.btnText === "显示答案"){
      this.data.btnText = "开始听题";
      this.data.indexNumberArray = [];
      this.setData({
        numberArray: this.data.numberArrayList,
        flag: 1,
        btnDisabled : false,
        start_next_text: this.data.btnText,
        online_disable: false
      })
      this.data.numberArrayList = [];
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
    var now, exitTime;
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
      if (app.globalData.autoBaiduVoice ==0){
        if (this.soundPathArray[0].length > 0){
          this.innerAudioContext.src = "/Sound/" + this.soundPathArray[0][0] + ".mp3"
          this.innerAudioContext.play();
          this.soundPathArray[0].splice(0,1); //切除第1个
        }else{
          // console.log("开始切除一个式子：")
          // console.log(this.soundPathArray[0]);
          this.data.indexNumberArray.push(1);

          setTimeout(function(){
            //切除第一个式子
            that.soundPathArray.splice(0, 1);
            if (that.soundPathArray.length != 0) {
              that.innerAudioContext.src = "/Sound/" + that.soundPathArray[0][0] + ".mp3"
              that.innerAudioContext.play();
              that.soundPathArray[0].splice(0, 1); //切除第1个
              that.setData({
                numberArray: that.data.indexNumberArray,
                numberArray_all: that.data.indexNumberArray,
                flag: 0
              })
            } else {
              that.data.btnText = "显示答案";
              that.data.indexNumberArray = [];
              that.setData({
                start_next_text: that.data.btnText,
                btnDisabled: false,
                online_disable: false
                // quesDisabled: false,
                // ansDisable: true
              })
            }
          }, that.data.curDurationSecond*1000)
          
        }
      }else{
        //自动播放声音
        this.data.indexNumberArray.push(1);
        setTimeout(function () { 
          //设置view
          // console.log(that.data.curDurationSecond, 111,2)
          if (that.data.soundBaiduStringArray.length != 0) {
            that.innerAudioContext.src = "http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=" + app.globalData.baidutoken['access_token'] + "&tex=" + encodeURI(encodeURI(that.data.soundBaiduStringArray[0])) + "&vol=9&per=0&spd=5&pit=5&aue=3";
            that.innerAudioContext.play();
            that.data.soundBaiduStringArray.splice(0, 1);
            that.setData({
              numberArray: that.data.indexNumberArray,
              numberArray_all: that.data.indexNumberArray,
              flag: 0
            })
          } else {
            clearInterval(that.data.myTimerHandler);

            that.data.btnText = "显示答案";
            that.data.indexNumberArray = [];
            that.setData({
              start_next_text: that.data.btnText,
              btnDisabled: false,
              online_disable:false
              // quesDisabled: false,
              // ansDisable: true
            })
          }
        }, that.data.curDurationSecond*1000)
      }
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
    app.checkUpdate();

    app.globalData.scene = 1;
    app.globalData.autoBaiduVoice = 1;

    this.registerAudioContext();

    this.data.numberArrayList = [];
    this.data.indexNumberArray = [];
    this.data.indexNumberArray_tr = [];
    this.data.soundBaiduStringArray = [];
    this.soundPathArray = []
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