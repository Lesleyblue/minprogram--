// pages/person-page/person-page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fansNums:10,
    concernNums:22,
    id:0,
    swiperCurrent:0,
    message:[],
    nickname:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id:options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    wx.cloud.callFunction({
      name:"getPerson",
      data:{
        id:this.data.id
      },
      success(res){
        console.log("获取用户列表成功",res.result.custom.data)
        console.log("获取用户列表成功",res.result.user.data)
        that.setData({
          num:res.result.custom.data.length,
          list:res.result.custom.data,
          message:res.result.user.data,
          fansNums:res.result.fans.data.length,
          concernNums:res.result.concern.data.length,
          nickname:res.result.user.data[0].nickname
        })
        wx.setNavigationBarTitle({
          title: res.result.user.data[0].nickname+'的个人主页',
        })
      },fail(res){
        console.log("获取失败",res)
      },
    })
  },
  yearSwiperChange(e) {
    let current = e.detail.current;
    console.log(current)
    let that = this;
    that.setData({
    swiperCurrent: current,
    })
    },
  concern(){
    wx.cloud.callFunction({
      name:"concern",
      data:{
        concern_id:this.data.id
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
  showList(e){
    let type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/record/record?id='+this.data.id+"&type="+type+"&name="+this.data.nickname
    })
  }
})