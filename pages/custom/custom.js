// pages/custom/custom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:"https://pics.images.ac.cn/image/5ef9d3802543c.html",
    isClock:0,
    hidden:true,
    show:false,
    id:'',
    data:'',
    day:0,
    time:'',
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options._id)
    this.setData({
      id:options._id
    })
    let myDate = new Date()
    let time = myDate.toLocaleDateString()
    this.setData({
      time
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
    var time = this.data.time
    wx.cloud.callFunction({
      name:"getCustom",
      data:{
        id:this.data.id,
        accustom_name:this.data.name,
        time:time
      },
      success(res){
        console.log("获取clock成功",res.result)
        that.setData({
          day:res.result.res.data[0].day,
          name:res.result.res.data[0].accustom_name,
          isClock:res.result.r
        })
        wx.setNavigationBarTitle({
          title: res.result.res.data[0].accustom_name
        })
        if(res.result.r==1){
          that.setData({
            imageUrl:"https://pics.images.ac.cn/image/5ef9d31d7e8af.html",
            hidden:false
          })
        }
      },fail(res){
        console.log("获取失败",res)
      }
    })
    // 查询习惯今天时间是否有记录
  },

  //  点击签到
  modify:  function () {
      let that = this
      var isClock = this.data.isClock;
      var id = this.data.id //习惯id
      var name = this.data.name // 习惯名
      var time = this.data.time
      var url = "https://pics.images.ac.cn/image/5ef9d31d7e8af.html"; // 打卡后的图标
      if(!isClock){
        wx.cloud.callFunction({
          name:"clock",
          data:{
            user_id:id,
            accustom_name:name,
            data:time,
            is_clock:1
          },
          success(res){
            console.log("打卡成功",res)
            that.setData({
              imageUrl:url
            })
            that.onShow()
          },fail(res){
            console.log("打卡失败",res)
          }
        })
      }
      if(!isClock){
        wx.showToast({
          title: '打卡成功',
          icon: '',     //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
          duration: 2000,      //停留时间
        })
        this.setData({
          isClock:1,
          hidden:false
        })
      }
      
  },
  toRecord: function () {
   this.setData({
     show:true
   })
  }
})