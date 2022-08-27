/*CMD
  command: /reason
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 
  answer: Enter your message text rrason why mute
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
  Bot.setProperty("Reason" + current_chat_id, message, "text")
  Bot.sendMessage("*Reason*: " + message)
}

