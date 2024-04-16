module.exports.config = {
    name: "out",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "DũngUwU",
    description: "out box",
    commandCategory: "Tài khoản",
    usages: "[tid]",
    cooldowns: 3
  };
  
  module.exports.run = async function({ api, event, args }) {
  const axios = require("axios");
    var image = [
"https://i.imgur.com/FOd3rpr.jpg",
"https://i.imgur.com/wwMd3rF.jpg",
"https://i.imgur.com/0xfzAtw.jpg",
"https://i.imgur.com/x9HpJ04.jpg",
"https://i.imgur.com/ZweZwbu.jpg",
"https://i.imgur.com/3R1Xe3H.jpg",
"https://i.imgur.com/rT7xQch.jpg",
"https://i.imgur.com/pN1bX0P.jpg"
    ];
  var imageRd = image[Math.floor(Math.random() * image.length)];
   const attachment = (await axios.get(image, { responseType: "stream"})).data
    const permission = ["100090458979503"];
    if (!permission.includes(event.senderID))
    return api.sendMessage({body:"Xin cái tuổi để out?",attachment},event.threadID, event.messageID);
    var id;
    if (!args.join(" ")) {
      id = event.threadID;
    } else {
      id = parseInt(args.join(" "));
    }
    return api.sendMessage({body:'Đã nhận lệnh out nhóm từ admin!',attachment},id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
  }