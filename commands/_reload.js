/*CMD
  command: /reload
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
if (!params) {
  //reset admin
  Bot.setProperty("admininstrations" + request.chat.id, "", "string")
  Api.getChatAdministrators({
    chat_id: request.chat.id,
    on_result: "/reload " + request.chat.id
  })
} else {
  //get new admins
  var current_chat_id = params
  var add = Bot.getProperty("admininstrations" + current_chat_id, { list: {} })
  var co_admin = ""
  var owner = ""
  var admin = ""
  for (var ind in options.result) {
    var user_id = options.result[ind].user.id
    add.list[user_id] = user_id
    Bot.setProperty("admininstrations" + current_chat_id, add, "json")
    var user_first_name = options.result[ind].user.first_name
    var realname = GetRealName()
    var user_username = options.result[ind].user.username
    var user_name = Getuser_name()
    //creator
    if (options.result[ind].status == "creator") {
      var owner = owner + user_name
    }
    //find co founder and admin
    if (options.result[ind].status == "administrator") {
      //create title 
      var title = GetTitle() 
      var can_promote_members = options.result[ind].can_promote_members
      if (can_promote_members) {
        var co_admin = co_admin + "\n ├ " + user_name + title
      } else {
        var admin = admin + "\n ├ " + user_name + title
      }
    }
  }
  if (!co_admin) {
    var co_founder = ""
  } else {
    var co_founder = "\n\n⚜️ <b>Co-founder</b>" + co_admin
  }
  if (!admin) {
    var admins = ""
  } else {
    var admins = "\n\n👮🏼 <b>Admin</b> " + admin
  }
  Api.sendMessage({
    text:
      "<b>GROUP STAFF\n\n👑 Founder</b>\n └ " +
      owner +
      "" +
      [co_founder] +
      [admins],
    parse_mode: "html"
  })
}
//Function
function GetRealName(){
if (user_first_name) {
return options.result[ind].user.first_name
}
      var user_last_name = options.result[ind].user.last_name
      if (user_last_name) {
        return options.result[ind].user.last_name
      }
        return "Deleted Account"
}
//Get user name
function Getuser_name(){
if (!user_username) {
      return 
        "<a href='tg://user?id=" +
        options.result[ind].user.id +
        "'>" +
        realname +
        "</a>"
    } 
      return "@" + options.result[ind].user.username
}
//Get title
function GetTitle(){
if (options.result[ind].custom_title) {
        return " » " + options.result[ind].custom_title
      } 
  return " » Admin"
}
