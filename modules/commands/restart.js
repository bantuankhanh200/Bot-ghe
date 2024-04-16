module.exports.config = {
	name: "restart",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "manhIT",
	description: "Khởi động lại Bot",
	commandCategory: "Hệ Thống",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  if (event.senderID != 100090458979503) return api.sendMessage(`Bạn không đủ quyền hạn để sử dụng lệnh này`, threadID, messageID);
	const { threadID, messageID } = event;
	return api.sendMessage(`𝐑𝐞𝐬𝐭𝐚𝐫𝐭𝐞𝐝 𝐋𝐚̣𝐢 𝐁𝐨𝐭 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 💋`, threadID, messageID, () => process.exit(1));
}