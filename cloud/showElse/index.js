// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let id = wxContext.OPENID
  let result =  await db.collection("accustom")
  .where({
    sort_id:"5"
  })
  .orderBy('insist_nums','desc')
  .limit(9)
  .get()
  return result
}