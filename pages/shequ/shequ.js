// pages/shequ/shequ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    let that = this
    wx.cloud.callFunction({
      name:"showRecord",
      success(res){
        console.log("获取成功",res.result)
        that.setData({
          list:res.result
        })
      },fail(res){
        console.log("获取失败",res)
      }
    })
  }

})