//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    hidden:false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[]
  },
  onLoad: function () {
   
  },
 
  onShow: function () { 
    this.setData({
      hidden:app.globalData.hidden
    })
    let that=this
    let myDate = new Date()
    let time = myDate.toLocaleDateString()
    wx.cloud.callFunction({
      name:"customList",
      data:{
        data:time
      },
      success(res){
        console.log("获取list成功",res.result)
        that.setData({
          list:res.result.data
        })
      },fail(res){
        console.log("获取list失败",res)
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo.nickname)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toAdd: function() {
    wx.navigateTo({
      url: '/pages/add/add',
    })
  },
  toCustom: function(e) {
    console.log(e.currentTarget.id)
    let id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/custom/custom?_id='+id,
    })
  },
  confirm(){
    console.log("这是confirm函数")
  },
  select(e){
    let that = this
    wx.showActionSheet({
      itemList: ['修改习惯图标', '删除习惯'],
      success(res) {
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url:'/pages/modify-icon/modify-icon?accustom_id='+e.currentTarget.id
          })
          console.log(e.currentTarget.id)
        } else if(res.tapIndex == 1) {
          wx.cloud.callFunction({
            name:"delete",
            data:{
              id:e.currentTarget.id
            },
            success(res){
              console.log("删除成功",res)
              that.onShow()
            },fail(res){
              console.log("删除失败",res)
            },

          })
          console.log(e.currentTarget.id)
        }
      },
    })
  },
  get(){
    console.log(this.data.id)
  }
})
