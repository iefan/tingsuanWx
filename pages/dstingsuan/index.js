// pages/dstingsuan/index.js
const myaudio = wx.createInnerAudioContext();
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
    flag : 1

  },

  // switch: function (e) {
  //   const length = this.data.objectArray.length
  //   for (let i = 0; i < length; ++i) {
  //     const x = Math.floor(Math.random() * length)
  //     const y = Math.floor(Math.random() * length)
  //     const temp = this.data.objectArray[x]
  //     this.data.objectArray[x] = this.data.objectArray[y]
  //     this.data.objectArray[y] = temp
  //   }
  //   this.setData({
  //     objectArray: this.data.objectArray
  //   })
  // },
  // addToFront: function (e) {
  //   const length = this.data.objectArray.length
  //   this.data.objectArray = [{ id: length, unique: 'unique_' + length }].concat(this.data.objectArray)
  //   this.setData({
  //     objectArray: this.data.objectArray
  //   })
  // },

 
  StartListen: function(e){
    var tmpshizi, tmpnum, num1, num2, now, exitTime;
    var tmplst = []
    // const myaudio = wx.createInnerAudioContext();
    // myaudio.autoplay=true;
    myaudio.src = "/Sound/1.mp3";//链接到音频的地址
    myaudio.play();
    // myaudio.onPlay(() => {  // 监听音频播放事件
      // console.log('开始播放')
    // })

    // myaudio.autoplay = true;
    // myaudio.obeyMuteSwitch = false;

    this.data.numberArray = []
    this.data.flag = 0;
    
    for (let i = 0; i < 10; ++i) {
      num1 = Math.floor(Math.random() * 100);
      num2 = Math.floor(Math.random() * 100);
      if (Math.floor(Math.random() * 10) % 2 == 1) //奇数为-，偶数为+
      {
        if (num1 < num2) { tmpnum = num1; num1 = num2; num2 = tmpnum; }
        tmpshizi = num1.toString() + "-" + num2.toString() + "=" + (num1 - num2).toString();
      } else {
        tmpshizi = num1.toString() + "+" + num2.toString() + "=" + (num1 + num2).toString();
      }

      now = new Date();
      exitTime = now.getTime() + 1000;
      while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
          break;
      }
      // console.log(i)

      this.data.numberArray = this.data.numberArray.concat([tmpshizi])
      this.setData({
        numberArray: this.data.numberArray,
        flag: this.data.flag
      });
    }
    

    // this.setData({
    //     numberArray: this.data.numberArray,
    //     flag: this.data.flag
    //   });
    
    // myaudio.src = "./Sound/1.mp3";//链接到音频的地址
    // myaudio.play();
    
  },

  DisplayAnswer: function (e) {    
    // tmp = GenQuestions();
    // this.data.numberArray.concat(tmp)
    this.data.flag = 1;
    this.setData({
      numberArray: this.data.numberArray,
      flag : this.data.flag
      // numberArray: [1,2,3]
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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