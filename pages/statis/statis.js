// pages/statis/statis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    insist:0,
    finish:0,
    fail:0,
    por:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let myDate = new Date()
    let time = myDate.toLocaleDateString()
    wx.cloud.callFunction({
      name:"statis",
      data:{
        time:time
      },
      success(res){
        console.log("获取成功",res.result)
        that.setData({
         insist:res.result.nums,
         finish:res.result.finish,
         fail:res.result.fail,
         por:res.result.por
        })
      },fail(res){
        console.log("获取失败",res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
})