// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let res = await db.collection("user-concern").where({
    concern_id:event.concern_id
  })
  .get()
  if(res.data.length==0){
    let result = await db.collection('user-concern').add({
      data:{
        user_id : wxContext.OPENID,
        concern_id:event.concern_id
      }
    })
    return 0
  }else{
    return 1
  }
  
}