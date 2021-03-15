// pages/person/person.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    energy:1,
    des:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShow: function () {
    let that = this
    wx.cloud.callFunction({
      name:"getMsg",
      success(res){
        console.log("获取成功",res.result.user.data)
        that.setData({
          energy:res.result.user.data[0].energy,
          des:res.result.user.data[0].des
        })
      },fail(res){
        console.log("获取失败",res)
      }
    })
  },

  toMyPage: function () {
    wx.navigateTo({
      url: '/pages/my-page/my-page',
    })
  },
  toStatis: function () {
    wx.navigateTo({
      url: '/pages/statis/statis',
    })
  },
  toModifyDes: function () {
    wx.navigateTo({
      url: '/pages/modify-des/modify-des',
    })
  },
  toMethod: function () {
    wx.navigateTo({
      url: '/pages/method/method',
    })
  },
  getUserInfo(e){
    console.log(e.detail.userInfo);
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  
})