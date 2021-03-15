// pages/add/add.js
const db = wx.cloud.database()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    custom:'',
    learnNums:5,
    value:1,
    item:[
      {
        name:"学习",
        value:1,
        checked:true
      },
      {
        name:"生活",
        value:2,
        checked:false
      },
      {
        name:"健康",
        value:3,
        checked:false
      },{
        name:"运动",
        value:4,
        checked:false
      },{
        name:"其他",
        value:5,
        checked:false
      },
    ],
    checkSort:"1",
    name:'',
    hotList:[],
    array:[],
    list:[]
  },
  onHide:function(){
    this.setData({
      show:false
    })
  },
  onShow:function(){
    let that = this
    let array=[]
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
  },
  checkSort(e){
    this.setData({
      checkSort:e.detail.value
    })
  },
  getSort(e){
    console.log(e.currentTarget.dataset.num )
    console.log(this.data.name)
  },
  addData(e) {
    // 要查询用户-习惯表里用户是否已经有这个习惯了，若有，则提示 你已经添加
    let flag = 0;
    if(this.data.name==''){
      console.log("输入的习惯不能为空！")
      wx.showToast({
        title: '输入的习惯不能为空',
        icon:"none",
        duration: 2000,      //停留时间
      })
    }else
       wx.cloud.callFunction({
          name:"createAccustom",
          data:{
            accustom_name:this.data.name,
            sort_id:e.currentTarget.dataset.num,
            accustom_icon:"https://pics.images.ac.cn/image/5ef9d28d03667.html",
            clock_date:"0",
            record_word:" ",
            record_date:"0",
            is_clock:0,
            insist_nums:1
          },
          success(res) {
            console.log(res)
            if(res.result==0){  // 习惯不存在用户-习惯表中
              console.log("添加成功",res)
              wx.showToast({
                title: '添加成功',
                icon: '',     //默认值是succes
                duration: 1000,      //停留时间
              }) 
            }else{
              flag=1
              wx.showToast({
                title: '创建的习惯已存在，请重新输入',
                icon:"none",
                duration: 2000,      //停留时间
              })
            }
          },
          fail(res) {
            console.log("添加失败",res)
          }  
      })  
      if(flag){
        this.setData({
          show:true
       })
      }
  },
  handle(e) {
    this.setData({
      name:e.detail.value
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
  
})