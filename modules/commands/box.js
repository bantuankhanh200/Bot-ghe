const totalPath = __dirname + '/cache/totalChat.json';
const _24hours = 86400000;
const fs = require("fs-extra");
const request = require("request");
module.exports.config = {
  name: "box",
  version: "2.2.0",
  hasPermssion: 0,
  credits: "Hung Cho (Khánh Milo Fix) mod thêm by TrúcCute",//sản phẩm có tham khảo 1 ít code của mdl avt D-Jukie 
  description: "Xem thông tin thread/user",
  commandCategory: "Nhóm",
  usages: "[thread/user]",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "request": ""
  }
}

module.exports.handleEvent = async ({ api, event, args }) => {
  if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
  let totalChat = JSON.parse(fs.readFileSync(totalPath));
  if (!totalChat[event.threadID]) return;
  if (Date.now() - totalChat[event.threadID].time > (_24hours * 2)) {
    let sl = (await api.getThreadInfo(event.threadID)).messageCount;
    totalChat[event.threadID] = {
      time: Date.now() - _24hours,
      count: sl,
      ytd: sl - totalChat[event.threadID].count
    }
      fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
  }
}

module.exports.run = async function({ api, event, args, Users, Threads }) {
  var token = `6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const { threadID, messageID, senderID, type, mentions, messageReply } = event;
  const moment = require("moment-timezone");
  const gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  const threadSetting = (await Threads.getData(String(threadID))).data || {};
		  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  if (args.length == 0) {
    return api.sendMessage(` === [ 𝗖𝗔̀𝗜 Đ𝗔̣̆𝗧 𝗡𝗛𝗢́𝗠 ] ===\n = [ 𝗤𝗨𝗔̉𝗡 𝗧𝗥𝗜̣ 𝗩𝗜𝗘̂𝗡 𝗕𝗢𝗧 ] =\n${prefix}${this.config.name} me setqtv → Bot sẽ thêm bạn làm Quản trị viên nhóm\n${prefix}${this.config.name} setqtv < tag > → Thêm người dùng làm Quản trị viên nhóm\n== [ 𝗡𝗚𝗨̛𝗢̛̀𝗜 𝗗𝗨̀𝗡𝗚 𝗕𝗢𝗧 ] ==\n${prefix}${this.config.name} id → Lấy ID nhóm\n${prefix}${this.config.name} name → Lấy tên nhóm\n${prefix}${this.config.name} setnamebox < tên > → Đổi tên nhóm\n${prefix}${this.config.name} info → Xem thông tin nhóm\n${prefix}${this.config.name}emoji < icon > → Đổi biểu tượng nhóm\n${prefix}${this.config.name} image < phản hồi ảnh > → Đổi ảnh bìa nhóm\n${prefix}${this.config.name} new < tag > → Tạo nhóm mới với thành viên được tag\n${prefix}${this.config.name} taobinhchon → Tạo bình chọn trong nhóm\n${prefix}${this.config.name} setname < tag/phản hồi > < biệt danh > → Đặt biệt danh thành viên nhóm\n${prefix}${this.config.name} setnameall < biệt danh > → Đặt biệt danh đồng bộ tất cả thành viên nhóm\n${prefix}${this.config.name} rdcolor → Thiết lập chủ đề nhóm ngẫu nhiên\n`, threadID);
  }
  if (args[0] == "info") {
    try {
      if (!fs.existsSync(totalPath)) fs.writeFileSync(totalPath, JSON.stringify({}));
      let totalChat = JSON.parse(fs.readFileSync(totalPath));
      let threadInfo = await Threads.getInfo(args[1] || threadID); 
      let timeByMS = Date.now();
      var memLength = threadInfo.participantIDs.length;
      let threadMem = threadInfo.participantIDs.length;
      var nameMen = [];
      var gendernam = [];
      var gendernu = [];
      var nope = [];
      for (let z in threadInfo.userInfo) {
        var gioitinhone = threadInfo.userInfo[z].gender;
        var nName = threadInfo.userInfo[z].name;
        if (gioitinhone == "MALE") {
          gendernam.push(z + gioitinhone)
        } else if (gioitinhone == "FEMALE") {
          gendernu.push(gioitinhone)
        } else {
          nope.push(nName)
        }
      };
      var { adminIDs } = await api.getThreadInfo(args[1] || threadID);
      var adminName = [];
      for (arrayAdmin of adminIDs) {
        const name = await Users.getNameUser(arrayAdmin.id)
        adminName.push(name)
      }
      var nam = gendernam.length;
      var nu = gendernu.length;
      let sl = threadInfo.messageCount;
      let u = threadInfo.nicknames;
      let icon = threadInfo.emoji;
      let threadName = threadInfo.name;
      let color = threadInfo.color;
      let id = threadID;
      let sex = threadInfo.approvalMode;
      var pd = sex == false ? 'tắt' : sex == true ? 'bật' : 'không';
      if (!totalChat[args[1] || threadID]) {
        totalChat[args[1] || threadID] = {
          time: timeByMS,
          count: sl,
          ytd: 0
        }
          fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
      }
      let mdtt = Math.floor(Math.random() * 101);
      let preCount = totalChat[args[1] || threadID].count || 0;
      let ytd = totalChat[args[1] || threadID].ytd || 0;
      let hnay = (ytd != 0) ? (sl - preCount) : "chưa có thống kê";
      let hqua = (ytd != 0) ? ytd : "chưa có thống kê";
      if (timeByMS - totalChat[args[1] || threadID].time > _24hours) {
        if (timeByMS - totalChat[args[1] || threadID].time > (_24hours * 2)) {
          totalChat[args[1] || threadID].count = sl;
          totalChat[args[1] || threadID].time = timeByMS - _24hours;
          totalChat[args[1] || threadID].ytd = sl - preCount;
          fs.writeFileSync(totalPath, JSON.stringify(totalChat, null, 2));
        }
        getHour = Math.ceil((timeByMS - totalChat[args[1] || event.threadID].time - _24hours) / 3600000);
        if (ytd == 0) mdtt = 100;
          else mdtt = ((((hnay) / ((hqua / 24) * getHour))) * 100).toFixed(0);
        mdtt += "%";
      }
      var callback = () =>
        api.sendMessage({
          body: ` == [ 𝗧𝗛𝗢𝗡𝗚 𝗧𝗜𝗡 𝗡𝗛𝗢́𝗠 ] ==\nTên nhóm: ${threadName || "không có"}\nID: ${id}\nPhê duyệt: ${pd}\nMã giao diện: ${color}\nDấu lệnh hệ thống: ${prefix}\nCảm xúc: ${icon || "👍"}\n\nTổng số Thành viên: ${threadMem}\nNam: ${nam}\nNữ: ${nu} thành viên\nQuản Trị Viên: ${adminName.join(', ')}\n\nTổng số tin nhắn: ${sl}\nTin nhắn hôm qua: ${hqua}\nTin nhắn hôm nay: ${hnay}\nMức tương tác: ${mdtt}\nDữ liệu được khởi tạo lúc: ${gio}`,
          attachment: fs.createReadStream(__dirname + `/cache/${threadID}.png`)
        },
                        threadID,
                        () => fs.unlinkSync(__dirname + `/cache/${threadID}.png`),
                        messageID
                        );
      return request(encodeURI(`${threadInfo.imageSrc}`))
        .pipe(fs.createWriteStream(__dirname + `/cache/${threadID}.png`))
        .on('close', () => callback());
    } catch (e) {
      return (
        console.log(e),
        api.sendMessage(`Không thể lấy thông tin nhóm của bạn!\n${e}`, threadID, messageID)
      )
    }
  }
  if (args[0] == "id") {
    return api.sendMessage(`${event.threadID}`, event.threadID, event.messageID);
  }

  if (args[0] == "name") {
    var nameThread = global.data.threadInfo.get(event.threadID).threadName || ((await Threads.getData(event.threadID)).threadInfo).threadName;
    return api.sendMessage(nameThread, event.threadID, event.messageID);
  }

  if (args[0] == "setnamebox") {
    var content = args.join(" ");
    var c = content.slice(7, 99) || event.messageReply.body;
    api.setTitle(`${c} `, event.threadID);
  }

  if (args[0] == "emoji") {
    const name = args[1] || event.messageReply.body;
    api.changeThreadEmoji(name, event.threadID)

  }

  if (args[0] == "me") {
    if (args[1] == "setqtv") {
      const threadInfo = await api.getThreadInfo(event.threadID)
      const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
      if (!find) api.sendMessage("Cần quyền Quản trị viên nhóm cho Bot để thực hiện lệnh", event.threadID, event.messageID)
      else if (!global.config.SUPERADMIN.includes(event.senderID)) api.sendMessage("Cần quyền SUPER ADMIN để thực hiện lệnh", event.threadID, event.messageID)
      else api.changeAdminStatus(event.threadID, event.senderID, true);
    }
  }

  if (args[1] == "setqtv") {
    if (args.join().indexOf('@') !== -1) {
      namee = Object.keys(event.mentions)
    } else namee = args[1]
    if (event.messageReply) {
      namee = event.messageReply.senderID
    }

    const threadInfo = await api.getThreadInfo(event.threadID)
    const findd = threadInfo.adminIDs.find(el => el.id == namee);
    const find = threadInfo.adminIDs.find(el => el.id == api.getCurrentUserID());
    const finddd = threadInfo.adminIDs.find(el => el.id == event.senderID);

    if (!finddd) return api.sendMessage("Bạn cần quyền Quản trị viên nhóm để thực hiện lệnh", event.threadID, event.messageID);
    if (!find) {
      api.sendMessage("Cần quyền Quản trị viên nhóm cho Bot để thực hiện lệnh", event.threadID, event.messageID)
    }
    if (!findd) {
      api.changeAdminStatus(event.threadID, namee, true);
    } else api.changeAdminStatus(event.threadID, namee, false)
  }

  if (args[0] == "image") {
    if (event.type !== "message_reply") return api.sendMessage("Bạn phải phản hồi một audio, video, ảnh nào đó", event.threadID, event.messageID);
    if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("Bạn phải phản hồi một audio, video, ảnh nào đó", event.threadID, event.messageID);
    if (event.messageReply.attachments.length > 1) return api.sendMessage(`Vui lòng phản hồi chỉ một audio, video, ảnh`, event.threadID, event.messageID);
    var callback = () => api.changeGroupImage(fs.createReadStream(__dirname + "/cache/1.png"), event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
    return request(encodeURI(event.messageReply.attachments[0].url)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
  };
 if (args[0] == "taobinhchon") {
    const { threadID, messageID, senderID } = event;
    let options = args.splice(1).join(" ").split("|");
    let obj = {}
    for(let item of options) obj[item] = false;
    api.sendMessage(`Tạo thành công các bình chọn ${options.join(",")}\nHãy phản hồi tin nhắn này để tạo tiêu đề`, event.threadID, (err, info) => {
        if(err) return console.log(err);
        else {
            global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: senderID,
                obj
            })
        }
    });
  }
  if (args[0] == "setname") {
if (event.type == "message_reply") {
    const name = args.splice(1).join(" ")
    return api.changeNickname(`${name}`, event.threadID, event.messageReply.senderID);
  }
  else {
    const name = args.splice(1).join(" ")
	const mention = Object.keys(event.mentions)[0];
	if (!mention) return api.changeNickname(`${name}`, event.threadID, event.senderID);
	if (mention[0]) return api.changeNickname(`${name.replace(event.mentions[mention], "")}`, event.threadID, mention);
  }
  }
  if (args[0] == "rdcolor") {
    var color = ['196241301102133', '169463077092846', '2442142322678320', '234137870477637', '980963458735625', '175615189761153', '2136751179887052', '2058653964378557', '2129984390566328', '174636906462322', '1928399724138152', '417639218648241', '930060997172551', '164535220883264', '370940413392601', '205488546921017', '809305022860427'];
    api.changeThreadColor(color[Math.floor(Math.random() * color.length)], event.threadID)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  if (args[0] == "setnameall") {
    var threadInfo = await api.getThreadInfo(event.threadID)
  var idtv = threadInfo.participantIDs
  console.log(threadInfo)
  const name = args.splice(1).join(" ")
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  for (let setname of idtv) {
    await delay(3000)
    api.changeNickname(`${name}`, event.threadID, setname);
  }
  }
}
module.exports.handleReply = function({ api, event, handleReply }) {
    const { threadID, senderID, body } = event;
    if(senderID != handleReply.author) return;
    return api.createPoll(body, event.threadID, handleReply.obj, (err, info) => {
        if(err) return console.log(err);
        else {
            api.sendMessage(`Bình chọn ${body} đã được tạo`, threadID);
            api.unsendMessage(handleReply.messageID);
            global.client.handleReply.splice(global.client.handleReply.indexOf(handleReply), 1);
        }
    });
}//// getName