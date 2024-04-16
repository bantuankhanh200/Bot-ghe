const axios = require("axios");
module.exports.config = {
    name: "ngủ",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "Kanichi",
    description: "noprefix",
    commandCategory: "không cần dấu lệnh",
    usages: "Chỉ cần nhắn Ngủ",
    cooldowns: 0,
    denpendencies: {
        "axios": "",
        "moment-timezone": ""
    }
}

module.exports.handleEvent = async ({ event, api,Users }) => {
  const res = await axios.get('https://anyagif.thanhha6.repl.co');
  const data = res.data.url;
  let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
  const moment = require("moment-timezone");
  const hours = moment.tz('Asia/Ho_Chi_Minh').format('HHmm');
  const session = (hours > 2401 && hours <= 400 ? "sớm tinh mơ" : hours > 401 && hours <= 700 ? "sáng sớm" : hours > 701 && hours <= 1000 ? "sáng" : hours > 1001 && hours <= 1200 ? "trưa" : hours > 1201 && hours <= 1700 ? "chiều" : hours > 1701 && hours <= 1800 ? "chiều tà" : hours > 1801 && hours <= 2400 ? "tối" : "khuya")
  let name = await Users.getNameUser(event.senderID)
  var msg = {body: `⏰Bây giờ là buổi ${session},🥱Bạn ${name} Muốn được nghỉ ngơi😴 ,Chúc bạn sớm quay lại để chat với anh em trong nhóm 💞`, attachment: download}
  if (event.body.toLowerCase() == "tạm biệt"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "ngủ"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "bai"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "bye"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "baii"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "ngủ đây"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "nghỉ"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "ngủ thôi"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "tam biet"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "pp"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
  if (event.body.toLowerCase() == "paii"){
        return api.sendMessage(msg,event.threadID,event.messageID);}
        };
module.exports.run = async ({ event, api }) => {
return api.sendMessage("𝐃𝐮̀𝐧𝐠 𝐬𝐚𝐢 𝐜𝐚́𝐜𝐡 𝐫𝐨̂̀𝐢 𝐥𝐞̂𝐮 𝐥𝐞̂𝐮",event.threadID)
    }