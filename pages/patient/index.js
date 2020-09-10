import { Patient } from "./index_modle"
let patientInfo = new Patient();
Page({

  /**
 * 页面的初始数据
 */
  data: {
    name: "",
    startDate: "",
    endDate: "",
    loadmoreShow: "false",
    loadmoreType: "end",
    healthPageSize: "",
    feedbackList: [],
    healthList: [],
    healthTotal: 1,
    healthPageNum: 1,
    healthPageSize: 6,
    isLogin: false,
  },
  // 点击单个患者查看详情
  replay: function (e) {
    // const id = e.currentTarget.dataset.patientmessage.patientUuid
    // wx.setStorageSync('patientUuid', id)
    wx.navigateTo({
      url: '/pages/hosDetail/hosDetail',
    })
  },
  // 获取所有患者列表
  getUserInfo: function () {
    let that = this
    wx.showLoading({
      title: '加载中...',
    });
    patientInfo.getUserInfo(this.data.name, this.data.healthPageNum, this.data.healthPageSize, (res) => {
      console.log(res);
      this.setData({
        feedbackList: res
      })
      var num = Math.round(res.count / this.data.healthPageSize);
      if (num % that.data.healthPageSize > 0) {
        num++;
      }
      if (num == 0) {
        num++;
      }
      that.setData({
        healthList: that.data.healthList.concat(res.data),
        healthTotal: num
      });
      console.log(that.data.healthTotal);

    });
  },
  bindDateChange: function (e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      startDate: e.detail.value,
    })
    // this.getMaintInfo()
  },
  bindDateChange2: function (e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      endDate: e.detail.value,
    })
    // this.getMaintInfo()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var info = new Date()
    var y = info.getFullYear()
    // 当前月份
    var m = info.getMonth() + 1
    var d = info.getDate()
    if (m < 10) {
      m = "0" + m;
    }
    if (d < 10) {
      d = "0" + d;
    }
    var starttime = `${y}-${m}-${d}`
    var endtime = `${y}-${m}-${d}`
    that.setData({
      endDate: endtime,
      startDate: starttime
    })
    this.getUserInfo();
  },
  timeChange() {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    let that = this;
    let openId = wx.getStorageSync('openId');
    let isExist  = wx.getStorageSync('isExist');
    if (openId) {
      this.setData({
        isLogin: true
      });
      if(isExist == "0") {
        wx.navigateTo({
          url: '../bindNum/bindNum',
        })
      }else {
        wx.showLoading({
          title: '加载中...',
        })
        this.getUserInfo();
      }

    } else {
      wx.clearStorage();
      wx.nextTick(() => {
        wx.navigateTo({
          url: '/pages/Authorization/index',
        })
      });
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */onUnload: function () {

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
    let that = this;
    if (this.data.healthTotal > this.data.healthPageNum) {
      this.setData({
        loadmoreShow: "true",
        loadmoreType: "loading",
        healthPageNum: that.data.healthPageNum + 1
      });
      this.getUserInfo();
    } else {
      this.setData({
        loadmoreShow: "true",
        loadmoreType: "end"
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})