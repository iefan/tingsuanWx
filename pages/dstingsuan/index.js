// pages/dstingsuan/index.js
// const myaudio = wx.createInnerAudioContext();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // time: (new Date()).toString(),
    // a:10,
    // length: 10,
    // array: [{}],

    // objectArray: [
    //   { id: 5, unique: 'unique_5' },
    //   { id: 4, unique: 'unique_4' },
    //   { id: 3, unique: 'unique_3' },
    //   { id: 2, unique: 'unique_2' },
    //   { id: 1, unique: 'unique_1' },
    //   { id: 0, unique: 'unique_0' },
    // ],
    numberArray: [],
    // indexNumberArray:1,    
    // soundPathArray : []
  },

  
  StartListen: function (e) {
    // var  now, exitTime;
    var number, shi, ge, start_next_text, flagSet;
    this.soundPathArray = []
    flagSet = 23;//儿子的学号

    if (this.data.numberArray.length===2){
      // ansDisabled = false;
      // quesDisabled = true;
      start_next_text = "显示答案";
    }
    else{
      // ansDisabled = true;
      // quesDisabled = false;
      if (start_next_text === "显示答案"){
        start_next_text = "显示答案";
        flagSet = 1;
      }else{
        start_next_text = "下一题";
      }
    }

    this.NextQuestion(); //产生下一个题目
    // number = 23;
    for (let i=0; i<4; i++){
      number = this.data.numberArray[this.data.numberArray.length - 1][i];  
      if (typeof(number) === typeof(1)){
        // bai = Math.floor(number / 100)
        shi = Math.floor(number / 10);
        ge = number % 10;
        if (shi !== 0) {
          if (shi === 1) {
            this.soundPathArray.push("SHI");
          } else {
            this.soundPathArray.push(shi);
            this.soundPathArray.push("SHI");
          }
        }
        if (ge !== 0) {
          this.soundPathArray.push(ge);
        }
        if (shi===0 && ge===0){
          this.soundPathArray.push(ge);
        }
      }else{
        if (number=="+"){
          this.soundPathArray.push("JIA");
        }
        if (number == "-") {
          this.soundPathArray.push("JIAN");
        }
        if (number == "=") {
          this.soundPathArray.push("DENGYU");
        }
      }
    }
    
    this.innerAudioContext.src = "/Sound/" + this.soundPathArray[0] + ".mp3";
    this.soundPathArray.splice(0, 1);
    this.innerAudioContext.play();

    this.data.flag = 0;    

    // //延时1秒
    // now = new Date();
    // exitTime = now.getTime() + 1000;
    // while (true) {
    //   now = new Date();
    //   if (now.getTime() > exitTime)
    //     break;
    // }
    
    // btn = 
    if (start_next_text === "显示答案"  && flagSet === 1){
      this.setData({
        numberArray: this.data.numberArray,
        flag: 1,
        // ansDisabled : ansDisabled,
        // quesDisabled: quesDisabled,
        start_next_text: "开始听题"
      })
      this.data.numberArray = [];
    }else{
      flagSet = 1;// 设置文本成功
      this.setData({
        numberArray: this.data.numberArray,
        flag: 0,
        // ansDisabled : ansDisabled,
        // quesDisabled: quesDisabled,
        start_next_text: start_next_text
      })
    }
    // this.setData({
    //   numberArray: this.data.numberArray,
    //   flag:0,
    //   // ansDisabled : ansDisabled,
    //   // quesDisabled: quesDisabled,
    //   start_next_text: start_next_text
    // })

  },

  NextQuestion: function(e){
    var tmpshizi, tmpnum, num1, num2, fuhao;
    fuhao = Math.floor(Math.random() * 10) % 2;
    num1 = Math.floor(Math.random() * 100);
    if (fuhao == 0){
      num2 = Math.floor(Math.random() * (100-num1));
    }else{
      num2 = Math.floor(Math.random() * 100);
    }
    if (fuhao == 1) //奇数为-，偶数为+
    {
      if (num1 < num2) { tmpnum = num1; num1 = num2; num2 = tmpnum; }
      // tmpshizi = num1.toString() + "-" + num2.toString() + "=" + (num1 - num2).toString();
      tmpshizi = [num1, '-', num2, '=', num1-num2];
    } else {
      // tmpshizi = num1.toString() + "+" + num2.toString() + "=" + (num1 + num2).toString();
      tmpshizi = [num1, '+', num2, '=', num1+num2];
    }
    this.data.numberArray.push(tmpshizi);
    // this.data.numberArray = this.data.numberArray.concat([tmpshizi])

  },
 

  DisplayAnswer: function (e) {    
    // tmp = GenQuestions();
    // this.data.numberArray.concat(tmp)    
    // this.data.indexNumberArray = 0;
    // this.data.numberArray = []
    this.setData({
      numberArray: this.data.numberArray,
      flag : 1,
      quesDisabled:false,
      ansDisable:true
      // numberArray: [1,2,3]
    });
    this.data.numberArray = [];
  },

  registerAudioContext: function(e){
    this.innerAudioContext = wx.createInnerAudioContext(); 
    this.innerAudioContext.onEnded((res) => { 
      // this.data.indexNumberArray += 1;   
      // console.log("over");
      if (this.soundPathArray.length > 0){
        this.innerAudioContext.src = "/Sound/" + this.soundPathArray[0] + ".mp3"
        this.innerAudioContext.play();
        this.soundPathArray.splice(0,1); //切除第1个
      }
      // if (this.data.indexNumberArray < 5){
      //   this.innerAudioContext.src = "/Sound/" + this.data.indexNumberArray + ".mp3"
      //   this.innerAudioContext.play();
      // }
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
    this.registerAudioContext();
    this.setData(
      {
        start_next_text:"开始听题",
        quesDisabled:false,
        // ansDisable: true
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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