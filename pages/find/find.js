// pages/find/find.js
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    donghua:"",
    "bnrUrl": [{
      "url": "https://s3.ax1x.com/2021/03/12/6UFyfH.png"
    }, {
        "url": "https://s3.ax1x.com/2021/03/12/6UFv7T.png"
    }
   ],
   result:[{
     "page":0
    }, {
     "page":1
    }, {
      "page":2
    }
   ],
  right:" ",
  paddingLeft:"0",
  start:"center",
  left:"37%",
  list:[],
  hotList:[], 
  array:[],  //热门榜单的数据
  study:[], //学习榜单
  sport:[],
  health:[],
  life:[],
  Else:[],
  user:[]
  },

  /**
   * 生命周期函数-
   */
  onShow: function (options) {
    let array=[],study=[],sport=[],health=[],life=[],Else=[]
    let that=this
    // 显示用户列表
    wx.cloud.callFunction({
      name:"showUser",
      success(res){
        console.log("获取用户列表成功",res.result.data)
        that.setData({
          user:res.result.data
        })
      },fail(res){
        console.log("获取失败",res)
      },
    })
    // 显示热门榜单
    wx.cloud.callFunction({
      name:"showHot",
      success(res){
        console.log("获取hotlist成功",res.result.data)
        that.setData({
          list:res.result.data
        })
        for(let i=0; i<3; i++){
          for(let j=i*3,k=0; k<3&&j<9; j++,k++){
            that.data.hotList.push(that.data.list[j])
          }
          array.push(that.data.hotList)
          that.setData({
            hotList:[]
          })
        }   
         that.setData({
          array:array
        })
      },fail(res){
        console.log("获取list失败",res)
      },
    })
    // 显示健康榜单 
    let a=[]//辅助数组
    wx.cloud.callFunction({
      name:"showHealth",
      success(res){
        console.log("获取healthlist成功",res.result.data)
        that.setData({
          list:res.result.data
        })
        for(let i=0; i<3; i++){
          for(let j=i*3,k=0; k<3&&j<9; j++,k++){
            a.push(that.data.list[j])
          }
          health.push(a)
          a=[]
        }   
         that.setData({
          health
        })
      },fail(res){
        console.log("获取list失败",res)
      },
    })
    // 学习榜单
    let b=[]//辅助数组
    wx.cloud.callFunction({
      name:"showStudy",
      success(res){
        console.log("获取studylist成功",res.result.data)
        that.setData({
          list:res.result.data
        })
        for(let i=0; i<3; i++){
          for(let j=i*3,k=0; k<3&&j<9; j++,k++){
            b.push(that.data.list[j])
          }
          study.push(b)
          b=[]
        }   
         that.setData({
          study
        })
      },fail(res){
        console.log("获取list失败",res)
      },
    })
    // 运动榜单
    let c=[]//辅助数组
    wx.cloud.callFunction({
      name:"showSport",
      success(res){
        console.log("获取sportlist成功",res.result.data)
        that.setData({
          list:res.result.data
        })
        for(let i=0; i<3; i++){
          for(let j=i*3,k=0; k<3&&j<9; j++,k++){
            c.push(that.data.list[j])
          }
          sport.push(c)
          c=[]
        }   
         that.setData({
          sport 
        })
      },fail(res){
        console.log("获取list失败",res)
      },
    })
    // 生活榜单
    let d=[]//辅助数组
    wx.cloud.callFunction({
      name:"showStudy",
      success(res){
        console.log("获取lifelist成功",res.result.data)
        that.setData({
          list:res.result.data
        })
        for(let i=0; i<3; i++){
          for(let j=i*3,k=0; k<3&&j<9; j++,k++){
            d.push(that.data.list[j])
          }
          life.push(d)
          d=[]
        }   
         that.setData({
          life
        })
      },fail(res){
        console.log("获取list失败",res)
      },
    })
    // 其他榜单
    let e=[]//辅助数组
    wx.cloud.callFunction({
      name:"showElse",
      success(res){
        console.log("获取Elselist成功",res.result.data)
        that.setData({
          list:res.result.data
        })
        for(let i=0; i<3; i++){
          for(let j=i*3,k=0; k<3&&j<9; j++,k++){
            e.push(that.data.list[j])
          }
          Else.push(e)
          e=[]
        }   
         that.setData({
          Else
        })
      },fail(res){
        console.log("获取list失败",res)
      },
    })
  },
  // 页面滚动触发事件的处理函数
  onPageScroll: function () {
    this.setData({
      paddingLeft:"8px",
      start:"start",
      left:"auto",
      right:"-40px"
     })
  },


  // 跳转到搜索好友页面 
  toSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 跳转到查看全部页面 
  toViewAll(){
    wx.navigateTo({
      url: '/pages/view-all/view-all',
    })
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
  toPage(e){
    console.log(e.currentTarget.dataset.id)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/person-page/person-page?id='+id,
      success: function(res){
        console.log("跳转成功")
      },
      fail: function(res) {
        console.log("跳转失败")
      }
    })
  }
})
