// pages/view-all/view-all.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    learnNums:299,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.cloud.callFunction({
      name:"customRe",
      success(res){
        console.log("获取成功",res.result)
        that.setData({
          list:res.result
        })
      },fail(res){
        console.log("获取失败",res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  entry(e){
    console.log(e.currentTarget.id)
    wx.cloud.callFunction({
      name:"entry",
      data:{
        accustom_name:e.currentTarget.id
      },
      success(res){
        console.log("获取成功",res.result)
        if(res.result==0){
          wx.showToast({
            title: '您已加入',
            icon: 'none',     //默认值是succes
            duration: 2000,      //停留时间
          }) 
        }else{
          wx.showToast({
            title: '加入成功',
            icon: '',     //默认值是succes
            duration: 2000,      //停留时间
          }) 
        }
       
      },fail(res){
        console.log("获取失败",res)
      },
    })
  },
})