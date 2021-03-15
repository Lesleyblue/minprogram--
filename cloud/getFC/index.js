// 云函数入口文件  fans and concern
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  let list=[]
  const wxContext = cloud.getWXContext()
  if(event.type==0){
    let res = await db.collection('user-concern')
    .where({
      concern_id:event.user_id
    })
    .get()
    for(let i=0; i<res.data.length;i++){
      let r = await db.collection('user')
      .where({
        user_id:res.data[i].user_id
      })
      .get()
      list.push(r.data)
    }
    return list
  }else{  // 关注
    let res = await db.collection('user-concern')
    .where({
      user_id:event.user_id
    })
    .get()
    for(let i=0; i<res.data.length;i++){
      let r = await db.collection('user')
      .where({
        user_id:res.data[i].concern_id
      })
      .get()
      list.push(r.data)
    }
    return list
  }
}