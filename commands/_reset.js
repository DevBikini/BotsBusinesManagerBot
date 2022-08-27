/*CMD
  command: /reset
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
if (admininstration.list[tgID]) {
  Bot.setProperty("detect_Links" + current_chat_id, "", "string")
  Bot.setProperty("adTags" + current_chat_id, "", "string")
  Bot.setProperty("FREE-adTags" + current_chat_id, "", "string")
  Bot.setProperty("adTags-owner" + current_chat_id, "", "string")
Bot.sendMessage("reset.")
}

