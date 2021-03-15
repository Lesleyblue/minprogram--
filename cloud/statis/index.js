// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 获取用户的总习惯数量
  let num = await db.collection('user-accustom').where({
    user_id:wxContext.OPENID
  }).get()
  let nums =  num.data.length  // nums是用户坚持习惯的总数量
  // 初始化完成数量为0
  let finish=0 
  // 查询clock 遍历查询的用户习惯表数据，根据习惯名和用户id 当前时间 查询习惯今日有无打卡
  for(let i=0;i<nums;i++){
    let res = await db.collection('clock').where({
      data:event.time,
      user_id:num.data[i]._id,
      accustom_name:num.data[i].accustom_name
    }).get()
    finish = finish + res.data.length
  }
  // fail是未完成的数量
  let fail = nums-finish
  // 完成比例，tofixed是四舍五入
  let por = ((finish/nums)*100).toFixed(0)
  return {
    nums,finish,fail,por
  }
}