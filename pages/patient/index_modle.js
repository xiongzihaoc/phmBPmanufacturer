import { Comm } from "../../utils/Common.js"
class Patient extends Comm {
  constructor() {
    super();
  }
  getUserInfo(pageNum, pageSzie, parameterObj, callback) {
    console.log(parameterObj);

    let props = {
      url: "/api/vendor/list",
      contentType: 'application/json',
      data: {
        "pageNum": pageNum,
        "pageSize": pageSzie,
        "hospital": parameterObj.hospital,
        "goodsModelIdStr": parameterObj.goodsModelIdStr,
        "status": parameterObj.status,
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res);
      },
      eCallBack: err => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }
  // 医院科室
  getHospitalList(callback) {
    var id = wx.getStorageSync('vendorId');
    let props = {
      url: "/api/vendor/getCooperateHospital",
      contentType: 'application/json',
      data: {
        id: id
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res);
      },
      eCallBack: err => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }
  // 器械
  getInstrumentList(callback) {
    var id = wx.getStorageSync('vendorId');
    let props = {
      url: "/api/vendor/getVendorGoods ",
      contentType: 'application/json',
      data: {
        id: id
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res);
      },
      eCallBack: err => {
        console.log(err);
        wx.hideLoading();
        wx.showToast({
          title: '请求出错,请稍后重试!!!',
          icon: 'none'
        })
      }
    }
    this.request(props);
  }
}
export { Patient };