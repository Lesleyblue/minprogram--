// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //1.  添加打卡记录 : 在clock表添加信息
  let result =await db.collection("clock").add({
    data:{
      user_id:event.user_id,
      accustom_name:event.accustom_name,
      data:event.data,
      is_clock:1
    }
  }); 
  // 2. 坚持人数加一： 先查询表中坚持人数，然后取值加一，再更新列表
  let day = await db.collection('user-accustom').where({
    user_id:event.id,
    accustom_name:event.accustom_name
  }).get()
  day = day.data[0].day+1  // 天数加一
  // 更新列表
  let res = await db.collection('user-accustom').where({
    user_id:event.id,
    accustom_name:event.accustom_name
  })
  .update({
    data: {
      day:day
    },
  })
  // 3. 用户能量要加1：先查询能量数，能量数自加，更新列表
  // 查询能量
  let r = await db.collection('user').where({
    user_id:wxContext.OPENID
  })
  .get()
  // 能量+1
  let energy = r.data[0].energy+1
  // 更新列表
  let re = await db.collection('user').where({
    user_id:wxContext.OPENID
  })
  .update({
    data: {
      energy:energy
    },
  })
  return res
  
}