// pages/search/search.js
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
    let that = this
    wx.cloud.callFunction({
      name:"userRe",
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
    wx.setNavigationBarTitle({
      title: ' 搜索萌友'
   })
  },
  concern(e){
    wx.cloud.callFunction({
      name:"concern",
      data:{
        concern_id:e.currentTarget.id
      },
      success(res){
        console.log("关注成功",res.result)
        if(res.result==0){
          wx.showToast({
            title: '关注成功',
            icon: '',     //默认值是succes
            duration: 2000,      //停留时间
          })
        }else{
          wx.showToast({
            title: '已关注',
            icon: 'none',     //默认值是succes
            duration: 2000,      //停留时间
          }) 
        }
      },fail(res){
        console.log("获取失败",res)
      },
    })
  },
  search(e){
    let that = this
    console.log(e.detail.value)
    wx.cloud.callFunction({
      name:"search",
      data:{
        content:e.detail.value
      },
      success(res){
        console.log("获取成功",res.result)
        that.setData({
          list:res.result
        })
      },fail(res){
        console.log("获取失败",res)
      },

    })
  }
})