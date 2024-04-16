const fs = require('fs');
module.exports.config = {
	name: "unsend",
	version: "1.0.0",
	hasPermssion: 0, 
	credits: "TruongMini", 
	description: "cũng là unsend nhưng bằng reaction",
	commandCategory: "Nhóm",
	usages: "[on/off]",
	cooldowns: 5, 
};

module.exports.run = async({ api, event, args }) => {
    const { threadID, messageID } = event;
    let path = __dirname + "/cache/unsendReaction.json";
    if(!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify({}));
    let data = JSON.parse(fs.readFileSync(path));
    if(!data[threadID]) data[threadID] = { data: false };
   if (args.join() == "") { 
	  return api.sendMessage(`[✓] Vui lòng thả 😠 vào tin nhắn bot để được gỡ!!!`, event.threadID, event.messageID)} 
    if(args[0] == "on") { 
        data[threadID].data = true; 
        api.sendMessage("[✓] Đã bật chế độ unsendReaction,Bạn hãy dùng icon 😠 trên thanh cảm xúc để gỡ tin nhắn", threadID); 
    } else if(args[0] == "off") { 
        data[threadID].data = false; 
        api.sendMessage("[✓] Đã tắt chế độ unsendReaction,Muốn bật lại hãy dùng lệnh /unsend on để bật lại", threadID);
    }
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
}