/*CMD
  command: /free_adTag
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
//only for group
//admininstration only
var current_chat_id = request.chat.id
var admininstration = Bot.getProperty("admininstrations" + current_chat_id, {
  list: {}
})
var tgID = user.telegramid
if (params && admininstration.list[tgID]) {
  //set free adtag
  var Free_adtag = Bot.getProperty("FREE-adTags" + current_chat_id, [])
  var adTag = params.split(" ")
  for (var index in adTag) {
    Free_adtag.push(adTag[index])
    Bot.setProperty("FREE-adTags" + current_chat_id, Free_adtag, "json")
  }
  Bot.sendMessage(inspect(Free_adtag))
} else {
  Bot.sendMessage(
    "*Hey, use /free_adTag [adTag name]\nExample: /free_adTag #free*"
  )
}
