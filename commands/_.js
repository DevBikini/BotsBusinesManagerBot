/*CMD
  command: *
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

//reload to get admininstrations
var admininstration = Bot.getProperty("admininstrations", { list: {} })
var tgID = user.telegramid
var admin = admininstration.list[tgID]
if (admin) {
  //admininstration run
  return
}
var adTag = Bot.getProperty("adTags")
if (adTag) {
  if (adTag.includes(message)) {
    //valid Adtag run
    return
  }
}
var detect_Link = Bot.getProperty("detect_Links")
if (detect_Link) {
  if (detect_Link.includes(message)) {
    //delete invalid Adtag
  }
}

