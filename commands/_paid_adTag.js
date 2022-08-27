/*CMD
  command: /paid_adTag
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

if (chat.chat_type == "private") {
  return
}
//paid_tadTag #mytag user.telegramid 
//only for group
//admininstration only
var current_chat_id = request.chat.id
var admininstration = Bot.getProperty("admininstrations" + current_chat_id, {
  list: {}
})
var tgID = user.telegramid
if (params && admininstration.list[tgID]) {
  var adTag = params.split(" ")[0]
  var owner = params.split(" ")[1]
  var paid_adTag = Bot.getProperty("adTags" + current_chat_id, [])
  var adTagOwners = Bot.getProperty("adTags-owner" + current_chat_id, {
    list: {}
  })
  paid_adTag.push(adTag)
  Bot.setProperty("adTags" + current_chat_id, paid_adTag, "json")
  //set owner
  adTagOwners.list[adTag] = owner
  Bot.setProperty("adTags-owner" + current_chat_id, adTagOwners, "json")
  Bot.sendMessage("paid Tag : " + adTag + "\nOwnership : " + owner)
}else{
Bot.sendMessage(
    "*Hey, use /paid_adTag [adTag name] [user telegramid]\nExample: /free_adTag #Love 123456789*"
  )
}

