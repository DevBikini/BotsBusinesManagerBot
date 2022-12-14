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

if (request.sender_chat && request.sender_chat.type == "channel") {
  //this is for channel
  return
}
//reload to get list admininstrations
if (chat.chat_type !== "private") {
  var current_chat_id = request.chat.id
  var Valid_name = Libs.commonLib.getNameFor(user)
  var admininstration = Bot.getProperty("admininstrations" + current_chat_id, {
    list: {}
  })
  var tgID = user.telegramid
  var admin = admininstration.list[tgID]
  if (admin) {
    //admininstration run
    return
  }
  var adTag = Bot.getProperty("adTags" + current_chat_id)
  var Free_adtag = Bot.getProperty("FREE-adTags" + current_chat_id)
  var adTagOwners = Bot.getProperty("adTags-owner" + current_chat_id, {
    list: {}
  })
  if (Free_adtag) {
    for (var index in Free_adtag) {
      if (message.includes(Free_adtag[index])) {
        //free adtag
        return
      }
    }
  }
  if (adTag) {
    for (var index in adTag) {
      if (message.includes(adTag[index])) {
        //valid Adtag run
        for (var index in adTagOwners.list) {
          if (adTagOwners.list[index] == tgID) {
            //owner of adtag run
            return
          }
        }
      }
    }
  }
  var detect_Link = Bot.getProperty("detect_Links" + current_chat_id)
  if (detect_Link) {
    for (var index in detect_Link) {
      if (message.includes(detect_Link[index])) {
        var my_warn = Bot.getProperty("warn" + current_chat_id, {
          list: {}
        })
  function getReason(){
        var text_reason = Bot.getProperty("Reason" + current_chat_id)
        if (text_reason) { return text_reason }
       return "Please. Use (valid AdTag) and dont use (other AdTag)"
       }
        var reason = GetReason()
  function MyWarn(){
      if (!my_warn[tgID]) {
          return 1
        } 
        return my_warn[tgID] + 1
       }
        var warns = MyWarn()
        if (warns > 2) {
          //reset warn
          my_warn[tgID] = 0
          Bot.setProperty("warn" + current_chat_id, my_warn, "json")
          Api.restrictChatMember({
            chat_id: current_chat_id,
            user_id: tgID
          })
          Api.sendMessage({
            text: Valid_name + " has been mute\n<b>Reason</b>: " + reason,
            parse_mode: "html"
          })
         Api.deleteMessage({
          chat_id: current_chat_id,
          message_id: request.message_id
        })
          return
        }
        //delete message link
        Api.sendMessage({
          text:
            Valid_name +
            " has been warned " +
            warns +
            " / 3\n<b>Reason</b>: " +
            reason,
          parse_mode: "html"
        })
        Api.deleteMessage({
          chat_id: current_chat_id,
          message_id: request.message_id
        })
        //add warn
        my_warn[tgID] = warns
        Bot.setProperty("warn" + current_chat_id, my_warn, "json")
      }
    }
  }
}

