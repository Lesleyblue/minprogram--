// 云函数入口文件
//1. 先判断用户习惯表中有没有重复
//2. 没有重复则添加数据且习惯表坚持人数加一，有则返回0
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 查询列表
  let res = await db.collection("user-accustom").where({
    accustom_name:event.accustom_name
  }).get()
  // 若查询到的结果的长度不为0则说明已加入过了，提示用户已加入
  if(res.data.length!=0)  //提示已加入
     return 0
  // 为0 则表示还没有加入，则添加数据到用户习惯表
  if(res.data.length==0){
    let result =await db.collection("user-accustom").add({
      data:{
        user_id:wxContext.OPENID,
        accustom_name:event.accustom_name,
        clock_date:"0",
        record_word:"",
        record_date:"0",
        is_clock:0,
        accustom_icon:"https://pics.images.ac.cn/image/5ef9d28d03667.html", // 默认图标
        day:0
      }
    }); 
    // 查询习惯表，并更新习惯表的坚持人数加一
    let add = await db.collection("accustom").where({
      accustom_name:event.accustom_name
    }).get()
    let num = add.data[0].insist_nums + 1
    await db.collection('accustom').where({
      accustom_name:event.accustom_name
    })
    .update({
      data: {
        insist_nums:num
      },
    })
    return 1  // 返回1 则说明加入成功
  }
}
