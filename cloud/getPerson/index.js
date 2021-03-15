// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  let list=[]
  const wxContext = cloud.getWXContext()
  let user = await db.collection("user").where({
    user_id:event.id
  })
  .get()
  let custom = await db.collection("user-accustom").where({
    user_id:event.id
  }).get()
  //统计粉丝数量——统计concern_id等于当前openid的有几条数据
  let fans = await db.collection("user-concern").where({
    concern_id:event.id
  })
  .get()
  //统计关注数量——统计user_id等于当前openid的有几条数据
  let concern = await db.collection("user-concern").where({
    user_id:event.id
  })
  .get()
  return {
    custom,
    user,
    fans,
    concern
  }
  
}