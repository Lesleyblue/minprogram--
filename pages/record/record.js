// pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:'',
    type:'',
    list:[]
  },
  onLoad: function (option) {
    this.setData({
      user_id:option.id,
      type:option.type,
      nickname:option.name
    })
    if(option.type==0){
      wx.setNavigationBarTitle({
        title:this.data.nickname+"的粉丝"
      })
    }else{
      wx.setNavigationBarTitle({
        title:this.data.nickname+"的关注"
      })
    }
    
  },
  onShow: function () {
    let that = this
    console.log(this.data.type)
    // 请求粉丝列表
    if(this.data.type==0){
      wx.cloud.callFunction({
        name:"getFC",
        data:{
          type:0,
          user_id:that.data.user_id
        },
        success(res){
          console.log("显示成功",res.result)
          that.setData({
            list:res.result
          })
        },fail(res){
          console.log("获取失败",res)
        },
      })
    }else{  // 请求关注列表
      wx.cloud.callFunction({
        name:"getFC",
        data:{
          type:1,
          user_id:that.data.user_id
        },
        success(res){
          console.log("显示成功",res.result)
          that.setData({
            list:res.result
          })
        },fail(res){
          console.log("获取失败",res)
        },
      })
    }
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})