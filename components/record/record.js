// components/record/record.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal弹窗
    show: {
      type: Boolean,
      value: false
    },
    //控制底部是一个按钮还是两个按钮，默认两个
    single: {
      type: Boolean,
      value: false 
    },
    name:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
  // 点击取消按钮的回调函数
    cancel() {
      this.setData({ show: false })
      this.triggerEvent('cancel')  //triggerEvent触发事件
    },
    // 点击确定按钮的回调函数
    confirm() {
      this.setData({ show: false })
      this.triggerEvent('confirm')
      wx.cloud.callFunction({
        name:"record",
        data:{
          name:this.properties.name,
          content:this.data.content
        },
        success(res){
          console.log("记录成功",res.result)
        },fail(res){
          console.log("记录失败",res)
        }
      })
    },
    getUserInfo(e) {
      wx.cloud.callFunction({
        name:"getUser",
        data:{
          nickname:e.detail.userInfo.nickName,
          icon:e.detail.userInfo.avatarUrl
        },
        success(res){
          console.log("添加成功",res)
          wx.showToast({
            title: '发布成功',
            icon: '',     //默认值是succes
            duration: 1500,      //停留时间
          }) 
        },fail(res){
          console.log("添加失败",res)
          wx.showToast({
            title: '发布失败',
            icon: 'none',     //默认值是succes
            duration: 1500,      //停留时间
          }) 
        }
      })
    },
    change(e){
      // console.log(e.detail.value)
      this.setData({
        content:e.detail.value
      })
    }
  }
})
