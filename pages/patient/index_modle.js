import { Comm } from "../../utils/Common.js"
class Patient extends Comm {
  constructor() {
    super();
  }
  getUserInfo(name, pageNum, pageSzie, callback) {
    // var doctorUuid = wx.getStorageSync('openId');
    let props = {
      url: "/api/vendor/list",
      contentType: 'application/json',
      data: {
        "pageNum": 1,
        "pageSize": 10
      },
      sCallBack: res => {
        wx.hideLoading();
        callback(res.data);
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