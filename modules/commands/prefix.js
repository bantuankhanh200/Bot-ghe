module.exports.config = {
  name: "prefix",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Khanh Shado",
  description: "Xem prefix của BOT",
  commandCategory: "Thành viên",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {
  var { threadID, messageID, body, senderID } = event;
  //if (senderID == global.data.botID) return;
  if ((this.config.credits) != "Khanh Shado") { return api.sendMessage(`Sai credits!`, threadID, messageID)}
  function out(data) {
    api.sendMessage(data, threadID, messageID)
  }
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};

  var arr = ["mpre","mprefix","prefix", "dấu lệnh", "prefix của bot là gì","daulenh", "prefixbot"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
const prefix = threadSetting.PREFIX || global.config.PREFIX;
      if (data.PREFIX == null) {
        return out(`️️️️️️️️️️️️️️️️️️️️️️️️️️️==== PREFIX BOT ====\n⚙️ Prefix Main : >>> ${global.config.PREFIX} <<<\n📌 Prefix Nhóm : >>> ${prefix} <<<\n👥 Tổng Người Dùng : ${global.data.allUserID.length}\n🔰 Tổng Nhóm : ${global.data.allThreadID.length}\n\n📝 Ví dụ : ${prefix}help`)
     }

  });
};

module.exports.run = async({ event, api }) => {
    return api.sendMessage("e", event.threadID)
}
