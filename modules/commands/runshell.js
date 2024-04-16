module.exports.config = {
	name: "runshell",
	version: "7.3.1",
	hasPermssion: 2,
	credits: "Nguyen Dz Vcl",
	description: "running shell",
	commandCategory: "System",
	usages: "[shell]",
	cooldowns: 0,
	dependencies: {
		"child_process": ""
	}
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {    
const { exec } = require("child_process");
var name = global.data.userName.get(event.senderID)
var threadInfo = await api.getThreadInfo(event.threadID);
var nameBox = threadInfo.threadName;
  var time = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)");
	if (!permissions.includes(event.senderID)) return api.sendMessage("Box : " + nameBox + "\n" + name + " đã dùng lệnh " + this.config.name + "\nLink Facebook : https://www.facebook.com/profile.php?id=" + event.senderID + "\nTime : " + time, idad);
let text = args.join(" ")
exec(`${text}`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`Lỗi: \n${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`lỗi chuẩn:\n ${stderr}`, event.threadID, event.messageID);
        return;
    }
    api.sendMessage(`thiết bị xuất chuẩn:\n ${stdout}`, event.threadID, event.messageID);
});
}