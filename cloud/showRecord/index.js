// 云函数入口文件
// 1.查询用户表的user_id、icon、nickname
// 没有就添加
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  let list=[]
  const wxContext = cloud.getWXContext()
  let user = await db.collection("user")
  .orderBy('user_id','desc')
  .get()
  let custom = await db.collection("user-accustom").get()
  for(let i=0; i<custom.data.length;i++){
    for(let j=0;j<user.data.length;j++){
      if(user.data[j].user_id==custom.data[i].user_id){
        let item={
        user_id:user.data[j].user_id,
        nickname:user.data[j].nickname,
        icon:user.data[j].icon,
        accustom_name:custom.data[i].accustom_name,
        day:custom.data[i].day,
        word:custom.data[i].record_word
        }
        list.push(item)
      }
    }
  }
  return list
  
}