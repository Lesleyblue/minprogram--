// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let res = await db.collection('user-accustom').where({
    user_id:wxContext.OPENID,
    _id:event.accustom_id
  })
  .update({
    data: {
      accustom_icon:event.icon
    },
  })
  let re = await db.collection('accustom').where({
    accustom_name:event.name
  })
  .update({
    data: {
      accustom_icon:event.icon
    },
  })
  return res
  
}