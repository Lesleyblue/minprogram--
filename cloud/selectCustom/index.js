// 云函数入口文件
// 查询习惯表里有无重复的
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let db = cloud.database().collection("user-accustom")
  let result = db.where({
    accustom_name:event.accustom_name
  }).get()
  return result
}