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
  var current_chat_id = chat.chatid
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
  if (adTag | Free_adtag) {
    if (Free_adtag.includes(message)) {
      //free adtag
      return
    }
    if (adTag.includes(message)) {
      //valid Adtag run
      for (var index in adTagOwners.list) {
        if (adTagOwners.list[index] == tgID) {
          //owner of adtag run
          return
        }
      }
    }
  }
  var detect_Link = Bot.getProperty("detect_Links" + current_chat_id)
  if (detect_Link) {
    if (detect_Link.includes(message)) {
      var my_warn = Bot.getProperty("warn" + current_chat_id, {
        list: {}
      })
      var Reason = Bot.getProperty("Reason" + current_chat_id)
      if (Reason) {
        var reason = Reason
      } else {
        var reason = "Please. Use (valid AdTag) and dont use (other AdTag)"
      }
      var new_warn = my_warn[tgID] + 1
      if (my_warn[tgID] > 2) {
        //reset warn
        my_warn[tgID] = 0
        Bot.setProperty("warn" + current_chat_id, my_warn, "json")
        Api.restrictChatMember({
          chat_id: current_chat_id,
          user_id: tgID
        })
        Bot.sendMessage(Valid_name + " has been mute\n*Reason*: " + reason)
      }
      //delete message link
      Bot.sendMessage(
        Valid_name +
          " has been warned " +
          new_warn +
          " / 3\n*Reason*: " +
          reason
      )
      Api.deleteMessage({
        chat_id: current_chat_id,
        message_id: request.message_id
      })
      //add warn
      my_warn[tgID] = new_warn
      Bot.setProperty("warn" + current_chat_id, my_warn_at, "json")
    }
  }
}
