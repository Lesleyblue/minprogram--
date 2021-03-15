// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let res = await db.collection('user-accustom').where({
    _id:event.id
  }).get()
  let r = await db.collection('clock').where({
    data:event.time,
    user_id:event.id,
    accustom_name:res.data[0].accustom_name
  }).get()
  if(r.data.length==0){
    return {
      res,
      r:0
    }
  }else{
    return {
      res,
      r:1
    }
  }
  
}