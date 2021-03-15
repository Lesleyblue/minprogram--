// 云函数入口文件
// 先查询有无重复
// 没有就添加
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let id = wxContext.OPENID
  let result =  await db.collection("user")
  .where({
    user_id:id
  })
  .get()
  if(result.data.length==0){
    let res =await db.collection("user").add({
      data:{
        user_id:id,
        icon:event.icon,
        nickname:event.nickname,
        des:"遇见更好的自己",
        energy:1
      }
    }); 
    return res
  }
  return 1
  
}