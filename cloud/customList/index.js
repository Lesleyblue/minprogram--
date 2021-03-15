// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let id = wxContext.OPENID // 获取当前用户id
  // 查询当前用户的习惯
  let result =  await db.collection("user-accustom").where({
    user_id: id
  }).get()
  // 遍历数组，查询每一项的习惯名
  for(let i=0; i<result.data.length;i++){
    let user_accustom_id = result.data[i]._id
    // 根据习惯名、用户id、当前时间
    let r = await db.collection('clock').where({
      data:event.data,
      user_id:user_accustom_id,
      accustom_name:result.data[i].accustom_name
    }).get()
    // 查询习惯在当天有无打卡，有则设置is_clock为1 
    if(r.data.length==0){
      result.data[i].is_clock=0
    }else{
      result.data[i].is_clock=1
    }
  }
  return result
}