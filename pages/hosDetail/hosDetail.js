// pages/hosDetail/hosDetail.js
import { Patient } from "./hosDetail_modle"
let patientInfo = new Patient();
var utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: "",
    hospital: "",
    createTime: "",
    goodsName: "",
    feedbackMan: "",
    content: "",
    feedList: [],
    replyContent: "",
    replyPhotos: [],
    replyId: "",
    message: "",
    imageList: [],
  },
  // 上传图片
  upload: function () {
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res);

        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths
        // console.log(tempFilePaths);

        that.setData({
          imageList: that.data.imageList.concat(res.tempFilePaths)
        })
      }
    })
  },
  bindEdit: function (e) {
    this.setData({
      message: e.detail.value
    })

  },
  // 点击回复按钮
  replyBtn: function (e) {
    let that = this
    console.log(e);
    patientInfo.replayInfo(this.data.replyId, this.data.message,this.data.imageList, (res) => {
      console.log(res);
      wx.switchTab({
        url: '/pages/patient/index',
      })
    });
  },
  // 预览图片
  preViewImg: function (e) {
    var url = utils.getDataSet(e, "url");
    var urls = [];
    urls.push(url);
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  // 获取详情
  getDetail: function () {
    patientInfo.getUserInfo(this.data.replyId, (res) => {
      this.setData({
        hospital: res.data.hospital,
        createTime: res.data.createTime,
        goodsName: res.data.goodsName,
        feedbackMan: res.data.userType,
        content: res.data.content,
        feedList: res.data.feedbackPhotos,
        replyContent: res.data.replyContent,
        replyPhotos: res.data.replyPhotos
      })

    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      state: options.state,
      replyId: options.id
    })
    this.getDetail()
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