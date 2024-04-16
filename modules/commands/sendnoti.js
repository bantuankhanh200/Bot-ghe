let request = require("request")
let fs = require('fs')
let axios = require('axios')
let cc = require("moment-timezone")
module.exports.config = {
  name: "sendnoti",
  version: "1.0.5",
  hasPermssion: 2,
  credits: "Mirai",
  description: "Gửi tin nhắn tới các nhóm(reply vào ảnh/video cần gửi kèm)!\nPhiên bản xịn hơn của sendnotiUwU",
  commandCategory: "Dành Cho Admin",
  usages: "[Text]",
  cooldowns: 0,
  dependencies: {
    "fs": "",
    "axios": "",
    "request": ""
  }
}

module.exports.run = async ({ api, event, args, Users, Threads, handleReply }) => {
  let { senderID, messageReply, threadID, messageID, type } = event;
  let name = await Users.getNameUser(senderID)
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("HH:mm:s");
  if (type == "message_reply") {
    if (messageReply.attachments[0].type == "audio") {
      path = __dirname + `/cache/1.m4a` ||  __dirname + `/cache/1.mp3`
    }
    if (messageReply.attachments[0].type == "photo") {
      path = __dirname + `/cache/1.jpg`
    }
    if (messageReply.attachments[0].type == "video") {
      path = __dirname + `/cache/1.mp4`
    }
    if (messageReply.attachments[0].type == "animated_image") {
      path = __dirname + `/cache/1.gif`
    }
    let abc = messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, {
      responseType: 'arraybuffer'
    })).data
    fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
    let allThread = global.data.allThreadID || []
    let count = 1, cantSend = [];
    for (idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == threadID) ""
      else {
        try {
          api.sendMessage({body: `➩ Thông Báo Từ Admin\n➩ Nơi gửi : ${event.isGroup == true ? 'Nhóm ' + global.data.threadInfo.get(event.threadID).threadName: 'Từ cuộc trò chuyện riêng với bot'}\n➩ Admin : ${name}\n➩ Thời gian : ${gio}\n➩ Nội dung : ${args.join(" ")}\n➩ Tid : ${event.threadID}\n➩ Người gửi : Facebook.com/${event.senderID}`, attachment: fs.createReadStream(path) }, idThread, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              });
          if (e) cantSend.push(idThread)
        })
        count++;
        }
        catch(e) {
          continue
        }
      await new Promise(resolve => setTimeout(resolve, 500));
      }
    } 
    api.sendMessage(`➩ Đã thông báo thành công ${count} nhóm\n➩ Đã Thông báo thất bại ${cantSend.length} nhóm`, threadID)
  }
  else {
    let allThread = global.data.allThreadID || [];
    let count = 1, cantSend = [];
    for (idThread of allThread) {
      if (isNaN(parseInt(idThread)) || idThread == threadID) ""
      else {
        api.sendMessage(`➩ Thông Báo Từ Admin\n➩ Nơi gửi : ${event.isGroup == true ? 'Nhóm ' + global.data.threadInfo.get(event.threadID).threadName: 'Từ cuộc trò chuyện riêng với bot'}\n➩ Admin : ${name}\n➩ Thời gian : ${gio}\n➩ Nội Dung : ${args.join(" ")}\n➩ Tid : ${event.threadID}\n➩ Người gửi : Facebook.com/${event.senderID}`, idThread, (error, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              });
          if (error) cantSend.push(idThread)
        });
        count++;
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } api.sendMessage(`Đã thông báo thành công đến ${count} nhóm\nThất bại ${cantSend.length} nhóm`, threadID)
  }
}

module.exports.handleReply = async ({ api, event, handleReply, Users, Threads }) => {
  let { body, threadID, senderID, messageID } = event;
  let index = body.split(" ")
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  let BotID = await api.getCurrentUserID();
  let threadName = await Threads.getName(threadID) || await Users.getNameUser(senderID)
  switch(handleReply.type) {
    case "callad": {
      let name = await Users.getNameUser(senderID)
      if (BotID == senderID) return
      else {
      if (event.attachments.length != 0) {
        if (event.attachments[0].type == "audio") {
    path = __dirname + `/cache/1.m4a` ||  __dirname + `/cache/1.mp3`
  }
  if (event.attachments[0].type == "photo") {
    path = __dirname + `/cache/1.jpg`
  }
  if (event.attachments[0].type == "video") {
    path = __dirname + `/cache/1.mp4`
  }
  if (event.attachments[0].type == "animated_image") {
    path = __dirname + `/cache/1.gif`
  }
        let abc = event.attachments[0].url;
  let getdata = (await axios.get(`${abc}`, {
    responseType: 'arraybuffer'
  })).data
  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'))
        api.sendMessage({body: `➩ Nhóm : ${threadName}\n➩ Tên : ${name}\n➩ Nội dung : ${index.join(" ")}\n➩ Thời gian : ${gio}\n➩ Tid : ${event.threadID}\n➩ Người gửi : Facebook.com/${event.senderID}`, attachment: fs.createReadStream(path)}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              });
        }, handleReply.ID)
      } else if (index.length != 0) {
        api.sendMessage({body: `➩ Nhóm : ${threadName}\n➩ Tên : ${name}\n➩ Nội dung : ${index.join(" ")}\n➩ Thời gian : ${gio}\n➩ Tid : ${event.threadID}\n➩ Người gửi : Facebook.com/${event.senderID}`}, handleReply.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              });
        }, handleReply.ID)
      }
    }
    }
  }
}

module.exports.handleReaction = async ({ api, event, handleReaction, Users, Threads }) => {
  let { threadID, senderID, messageID, reaction, userID } = event;
  let gio = cc.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  let threadName = await Threads.getName(threadID) || await Users.getNameUser(senderID);
  switch(handleReaction.type) {
    case "callad": {
      let name = await Users.getNameUser(userID);
      api.sendMessage({body: `➩ Nhóm : ${threadName}\n➩ Tên : ${name}\n➩ Đã thả cảm xúc : ${reaction}\n➩ Thời gian : ${gio}\n➩ Tid : ${event.threadID}\n➩ Người gửi : Facebook.com/${event.userID}`}, handleReaction.author, (e, info) => {
          global.client.handleReply.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
              })
          global.client.handleReaction.push({
                type: "callad",
                name: this.config.name,
                author: threadID,
                ID: messageID,
                messageID: info.messageID
          })
      }, handleReaction.ID)
    }
  }
}

