module.exports.config = {
  name: "time",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TuanDz",
  description: "Xem ngày giờ",
  commandCategory: "Công Cụ",
  usages: "",
  cooldowns: 0,
  dependencies: []
};

module.exports.run = async function ({ api, event, args, Currencies, Users }) {
  const moment = require("moment-timezone");
  var ngay = moment.tz('Asia/Ho_Chi_Minh').format('D/MM/YYYY');
  var gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
  let name = await Users.getNameUser(event.senderID);
  return api.sendMessage(`〘───── •『 𝙏𝙞𝙢𝙚 』• ─────〙\n𝙃𝙚𝙡𝙡𝙤「﹝${name}﹞」\n𝙏𝙝𝙚 𝙥𝙧𝙚𝙨𝙚𝙣𝙩 𝙩𝙞𝙢𝙚 : ${gio} \n𝘿𝙖𝙮 : ${ngay} (${thu})\n〘───── •『 𝙏𝙞𝙢𝙚 』• ─────〙`, event.threadID, event.messageID)
}

