// pages/modify-des/modify-des.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:''
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


  change: function (){
    wx.cloud.callFunction({
      name:"changeDes",
      data:{
        content:this.data.content
      },
      success(res){
        console.log("获取成功",res),
        wx.showToast({
          title: '修改成功',
          icon: '',     //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
          duration: 2000,      //停留时间
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
          })
        }, 1000)
      },fail(res){
        console.log("获取失败",res)
      }
    })
    
  },
  getContent(e){
    this.setData({
      content:e.detail.value
    })
    // console.log(this.data.content)
  }
})