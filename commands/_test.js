/*CMD
  command: /test
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

var paid_adTag = Bot.getProperty("adTags" + request.chat.id)
//Bot.setProperty("adTags" + request.chat.id, "", "string")
Bot.inspect(paid_adTag)

