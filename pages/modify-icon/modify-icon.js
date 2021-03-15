// pages/modify-icon/modify-icon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // className:"btn",
    className:1,
    day:19,
    icon:"https://pics.images.ac.cn/image/5ef9d99611a03.html",
    list:[],
    name:'看书',
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.accustom_id
    this.setData({
      id:id
    })
    let that = this
    wx.cloud.callFunction({
      name:"getIcon",
      data:{
        accustom_id:id
      },
      success(res){
        console.log("获取成功",res.result)
        that.setData({
          icon:res.result[0].accustom_icon,
          name:res.result[0].accustom_name,
          day:res.result[0].day
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
    var list = this.data.list;
    var fileManager = wx.getFileSystemManager();
    fileManager.readdir({
      dirPath: '/icon/shenghuo/',
      success: (result)=>{
        // return result
        result.files.forEach(function(item,index){
          item = "/icon/shenghuo/"+item;
          list.push({url:item});
        })
        this.setData({
          list:list
        })     
      },
      fail: ()=>{
        console.log("");
      },
    }); 
  },


  changeIcon: function (e) {
    this.setData({
      icon:e.currentTarget.id
    })
  },
  getImage: function (e) {
    this.setData({
      list:[]
    })  
    this.setData({
      className:e.currentTarget.dataset.num
    })
    var url = e.currentTarget.dataset;
    var array = this.data.list;
    var fileManager = wx.getFileSystemManager();
    fileManager.readdir({
      dirPath: url.url,
      // dirPath: '/icon/study/',
      success: (result)=>{
        result.files.forEach(function(item,index){
          item = url.url+item;
          array.push({url:item});
        })
        this.setData({
          list:array
        })     
      },
      fail: ()=>{
        console.log("error");
      },
      complete: ()=>{}
    }); 
  },
  certain(){
    let that = this
    wx.cloud.callFunction({
      name:"changeIcon",
      data:{
        icon:that.data.icon,
        accustom_id:that.data.id,
        name:that.data.name
      },
      success(res){
        console.log("修改成功",res.result)
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
        console.log("修改失败",res)
      },
    })
  }
})