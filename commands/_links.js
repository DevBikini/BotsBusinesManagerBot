/*CMD
  command: /links
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
  var detect_Links = Bot.getProperty("detect_Links" + current_chat_id, [])
  var adTag = params.split(" ")
  for (var index in adTag) {
    detect_Links.push(adTag[index])
    Bot.setProperty("detect_Links" + current_chat_id, detect_Links, "json")
  }
  Bot.sendMessage(inspect(detect_Links))
}

