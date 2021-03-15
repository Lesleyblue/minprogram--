// pages/my-page/my-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansNums:10,  //粉丝
    concernNums:20,  // 关注
    array:[0,1,2],
    swiperCurrent:0,
    message:[],
    list:[],
    num:1   // 坚持的习惯数量

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.cloud.callFunction({
      name:"getMsg",
      success(res){
        console.log("获取用户列表成功",res.result.custom.data)
        console.log("获取用户列表成功",res.result.user.data)
        that.setData({
          num:res.result.custom.data.length,
          list:res.result.custom.data,
          message:res.result.user.data,
          fansNums:res.result.fans.data.length,
          concernNums:res.result.concern.data.length
        })
      },fail(res){
        console.log("获取失败",res)
      },
    })
  },

  onShow: function () {

  },
  yearSwiperChange(e) {
    let current = e.detail.current;
    console.log(current)
    let that = this;
    that.setData({
    swiperCurrent: current,
    })
    },
  showList(e){
    let that = this;
    let type = e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name:"getOpenid",
      success(res){
        console.log("获取成功",res.result.openid)
        wx.navigateTo({
          url: '/pages/record/record?id='+res.result.openid+"&type="+type+"&name="+that.data.message[0].nickname
        })
      },fail(res){
        console.log("获取失败",res)
      }
    })
    
  }

})