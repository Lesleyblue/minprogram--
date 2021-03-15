// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let myDate = new Date()
  let data =  myDate.toLocaleDateString()
  let res = await db.collection('user-accustom').where({
    user_id:wxContext.OPENID,
    accustom_name:event.name
  })
  .update({
    data: {
      record_word:event.content,
      record_date:data
    },
  })
  return res
  
}