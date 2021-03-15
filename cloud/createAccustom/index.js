// 云函数入口文件
// 1. 先查找用户习惯表，若查找得到则说明表中已经存在了，就返回false
// 2. 若查找不到，则查询习惯表里是否已经有这个习惯，
// 3. 若有，则坚持人数加一，若没有，则新建，坚持人数为1
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database() 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // 查询用户表
  let res = await db.collection("user-accustom").where({
    accustom_name:event.accustom_name
  }).get()
  // 若长度不为0 ，则说明表中已经有记录，要提示用户已创建过
  if(res.data.length!=0) // res.data.length 为查询到的数据的长度
     return res.data.length
  // 为0，说明还没添加过   
  if(res.data.length==0){
    let db = cloud.database()
    // 查询习惯表中是否有这个数据
    let res2 =await db.collection("accustom").where({
      accustom_name:event.accustom_name
    }).get()
    // 为0，表示没有创建过，两个表都要加数据
    if(res2.data.length==0){  //找不到，则创建
        let result1 =await db.collection("accustom").add({
          data:{
            accustom_name:event.accustom_name,
            sort_id:event.sort_id,
            accustom_icon:event.accustom_icon,
            insist_nums:event.insist_nums
          }
        });
        let result2 =await db.collection("user-accustom").add({
          data:{
            user_id:wxContext.OPENID,
            accustom_name:event.accustom_name,
            clock_date:event.clock_date,
            record_word:event.record_word,
            record_date:event.record_date,
            is_clock:event.is_clock,
            accustom_icon:event.accustom_icon,
            day:0
          }
        }); 
        return res2.data.length
    }else{
      // 习惯表已经有了记录，则只要用户习惯表添加数据，而且习惯表中的坚持人数要加1
        let num = res2.data[0].insist_nums+1
        if(res2.data.length!=0){//表中有，修改坚持人数加一
          let a = await db.collection("user-accustom").add({
              data:{
                user_id:wxContext.OPENID,
                accustom_name:event.accustom_name,
                clock_date:event.clock_date,
                record_word:event.record_word,
                record_date:event.record_date,
                is_clock:event.is_clock,
                accustom_icon:event.accustom_icon,
                day:0
              }
            }); 
          // 更新习惯表中的坚持人数
          await db.collection('accustom').where({
            accustom_name:event.accustom_name
          })
          .update({
            data: {
              insist_nums:num
            },
          })
          return res.data.length //返回长度 若为0 则提示成功加入 不为0 则提示已加入
      }
    }
  }
  
}