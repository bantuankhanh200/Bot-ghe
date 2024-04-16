module.exports.config = {
	name: "dating",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Henry",
	description: "Tìm một người và xem xem có nên hẹn hò với họ không?",
	commandCategory: "khác",
	usages: "[info/breakup]",
	cooldowns: 5
};

function msgBreakup() {
    var msg = ['Thật sự 2 người không thể làm lành được sao?', 'Cứ như vậy mà buông tay nhau?', 'Không đau sao? Có chứ? Vậy sao còn muốn buông?', 'Vì một lí do nào đó... 2 người có thể cố gắng được không? ^^', 'Tình yêu là khi hai người quan tâm, chăm sóc lẫn nhau. Bây giờ cả 2 bạn đã hiều điều gì đã xảy ra, 2 bạn có thể quay về bên nhau được không', 'Giận để biết yêu nhau nhiều hơn phải không, cả 2 làm lành nhé vì khi giận nhau mới biết đối phương không thể sống thiếu nhau']
    return msg[Math.floor(Math.random() * msg.length)];
}

function getMsg() {
    
    return `Chúc mừng hai vị đã kết thành đạo lữ 👫,chúc hai bạn mãi hạnh phúc\n\LƯU Ý:Cả 2 không thể chia tay trong 1 ngày yêu nhau\n- 𝐊𝐲́ 𝐭𝐞̂𝐧 : 天気`
}

module.exports.handleReaction = async function({ api, event, Threads, Users, Currencies, handleReaction }) {
    var { threadID, userID, reaction,messageID } = event;
    var { turn } = handleReaction;
    switch (turn) {
        case "match":
            api.unsendMessage(handleReaction.messageID);
            var { senderID, coin, senderInfo, type } = handleReaction;
            if (senderID != userID) return;
            await Currencies.setData(senderID, { money: coin - 10000 });
            var data = await Threads.getInfo(threadID);
            var { userInfo } = data;
            var doituong = [];
            for (var i of userInfo) {
                var uif = await Users.getInfo(i.id);
                var gender = '';
                if (uif.gender == 1) gender = "Nữ";
                if (uif.gender == 2) gender = "Nam"; 
                if (uif.dating && uif.dating.status == true) continue;
                if (gender == type) doituong.push({ ID: i.id, name: uif.name });
            }
            if (doituong.length == 0) return api.sendMessage(`Rất tiếc không có đạo hữu nào phù hợp với các hạ`, threadID);
            var random = doituong[Math.floor(Math.random() * doituong.length)];
            var msg = {
                body: `[💏] ${senderInfo.name} - Bot chọn cho bạn là: ${random.name}\n[💌] Phù hợp: ${Math.floor(Math.random() * (80 - 30) + 30)}%\n\nNếu 2 vị chấp nhận hẹn hò thì hãy thả ♥️ vào tin nhắn này để đến với nhau nha 💘💞`,
                mentions: [ { tag: random.name, id: random.ID }, { tag: senderInfo.name, id: senderID } ]
            }
            return api.sendMessage(msg, threadID, (error, info) => {
                global.client.handleReaction.push({ name: this.config.name, messageID: info.messageID, turn: "accept", user_1: { ID: senderID, name: senderInfo.name, accept: false }, user_2: { ID: random.ID, name: random.name, accept: false } });
            });
        case "accept":
            var { user_1, user_2 } = handleReaction;
            if (reaction != '❤') return;
            if (userID == user_1.ID) user_1.accept = true;
            if (userID == user_2.ID) user_2.accept = true;
            if (user_1.accept == true && user_2.accept == true) {
                api.unsendMessage(handleReaction.messageID);
                var infoUser_1 = await Users.getData(user_1.ID);
                var infoUser_2 = await Users.getData(user_2.ID);
                infoUser_1.data.dating = { status: true, mates: user_2.ID, time: { origin: Date.now(), fullTime: global.client.getTime('fullTime') } };
                infoUser_2.data.dating = { status: true, mates: user_1.ID, time: { origin: Date.now(), fullTime: global.client.getTime('fullTime') } };
                return api.sendMessage(`Cả 2 đã chấp nhận tiến hành hẹn hò 💓`, threadID, async (error, info) => {
                    await Users.setData(user_1.ID, infoUser_1);
                    await Users.setData(user_2.ID, infoUser_2);
                    api.changeNickname(`${user_2.name} - Đạo lữ ${user_1.name}`, threadID, user_2.ID);
                    api.changeNickname(`${user_1.name} - Đạo lữ ${user_2.name}`, threadID, user_1.ID);
                    api.sendMessage({ body: getMsg(), attachment: await this.canvas(user_1.ID, user_2.ID)}, threadID);
                });
            }
            break;
        case 'breakup':
            var { userInfo, userMates, user_1, user_2 } = handleReaction;
            if (userID == user_1.ID) user_1.accept = true;
            if (userID == user_2.ID) user_2.accept = true;
            if (user_1.accept == true && user_2.accept == true) {
                api.unsendMessage(handleReaction.messageID);
                userInfo.data.dating.status = false;
                userMates.data.dating.status = false;
                return api.sendMessage(`𝐁𝐞̂𝐧 𝐧𝐡𝐚𝐮 𝐯𝐚̀𝐨 𝐧𝐡𝐮̛̃𝐧𝐠 𝐥𝐮́𝐜 𝐠𝐢𝐨̂𝐧𝐠 𝐛𝐚̃𝐨, 𝐧𝐡𝐮̛𝐧𝐠 𝐥𝐚̣𝐢 𝐜𝐡𝐚̆̉𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐜𝐨́ 𝐧𝐡𝐚𝐮 𝐯𝐚̀𝐨 𝐥𝐮́𝐜 𝐦𝐮̛𝐚 𝐭𝐚𝐧 🙁\n𝐇𝐚̃𝐲 𝐯𝐮𝐢 𝐥𝐞̂𝐧 𝐧𝐡𝐞́, 𝐜𝐨́ 𝐧𝐡𝐮̛̃𝐧𝐠 𝐥𝐮́𝐜 𝐡𝐨̛̣𝐩 𝐫𝐨̂̀𝐢 𝐥𝐚̣𝐢 𝐭𝐚𝐧 𝐦𝐨̛́𝐢 𝐤𝐡𝐢𝐞̂́𝐧 𝐛𝐚̉𝐧 𝐭𝐡𝐚̂𝐧 𝐦𝐢̀𝐧���� 𝐦𝐚̣𝐧𝐡 𝐦𝐞̃ 𝐡𝐨̛𝐧 𝐧𝐮̛̃𝐚 𝐜𝐡𝐮̛́`, threadID, async () => {
                    await Users.setData(user_1.ID, userInfo);
                    await Users.setData(user_2.ID, userMates);
                    api.changeNickname("", threadID, user_1.ID);
                    api.changeNickname("", threadID, user_2.ID);
                   // khi chia tay nó sẽ xóa biệt danh của 2 người//
                })
            }
            break;
        default:
            break;
    }
}
 
module.exports.run = async function({ api, event, args, Users, Currencies }) {
    var { threadID, messageID, senderID } = event;
    var senderInfo = await Users.getData(senderID);
    var type = ''
    switch (args[0]) {
        case "Nam":
        case "nam":
            if (senderInfo.data.dating && senderInfo.data.dating.status == true) return api.sendMessage(`Làm gì đó đừng có đi trêu hoa ghẹo nguyệt là sao , có đạo lữ rồi còn tìm cái gì 👹`, threadID, messageID);
            type = "Nam";
            break;
        case "Nữ":
        case "nữ":
        case "nu":
        case "Nu":
            if (senderInfo.data.dating && senderInfo.data.dating.status == true) return api.sendMessage(`Làm gì đó đừng có đi trêu hoa ghẹo nguyệt là sao , có đạo lữ rồi còn tìm cái gì 👹`, threadID, messageID);
            type = "Nữ";
            break;
        case "breakup":
            var userInfo = await Users.getData(senderID);
            if (!userInfo.data.dating || userInfo.data.dating && userInfo.data.dating.status == false) return api.sendMessage(`𝐁𝐚̣𝐧 𝐜𝐡𝐮̛𝐚 𝐡𝐞̣𝐧 𝐡𝐨̀ 𝐯𝐨̛́𝐢 𝐚𝐢 𝐭𝐡𝐢̀ 𝐜𝐡𝐢𝐚 𝐭𝐚𝐲 𝐜𝐚́𝐢 𝐠𝐢̀ ?`, threadID, messageID);
            if (Date.now() - userInfo.data.dating.time.origin < 86400 ) return api.sendMessage(`𝐂𝐨̀𝐧 𝐜𝐡𝐮̛𝐚 𝐭𝐨̛́𝐢 1 𝐧𝐠𝐚̀𝐲 𝐦𝐚̀ 𝐦𝐮𝐨̂́𝐧 𝐜𝐡𝐢𝐚 𝐭𝐚𝐲 𝐥𝐚̀ 𝐬𝐚𝐨? 🥺\n\n${msgBreakup()}\n\n𝐇𝐚̃𝐲 𝐜𝐮̛́ 𝐛𝐢̀𝐧𝐡 𝐭𝐢̃𝐧𝐡 𝐬𝐮𝐲 𝐧𝐠𝐡𝐢̃, 𝐜𝐡𝐨 𝐦𝐨̣𝐢 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐝𝐚̂̀𝐧 𝐥𝐚̆́𝐧𝐠 𝐱𝐮𝐨̂́𝐧𝐠 𝐫𝐨̂̀𝐢 𝐠𝐢𝐚̉𝐢 𝐪𝐮𝐲𝐞̂́𝐭 𝐜𝐮̀𝐧𝐠 𝐧𝐡𝐚𝐮 𝐧𝐡𝐞́ 𝐯𝐢̀ 𝐭𝐢̀𝐧𝐡 𝐲𝐞̂𝐮 𝐤𝐡𝐨̂𝐧𝐠 𝐩𝐡𝐚̉𝐢 𝐚𝐢 𝐜𝐮̃𝐧𝐠 𝐦𝐚𝐲 𝐦𝐚̆́𝐧 𝐭𝐢̀𝐦 𝐭𝐡𝐚̂́𝐲 𝐧𝐡𝐚𝐮 𝐦𝐚̀ ^^`, threadID, messageID);
            var userMates = await Users.getData(userInfo.data.dating.mates);
            return api.sendMessage(`𝐂𝐚̉ 𝟐 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐭𝐡𝐚̣̂𝐭 𝐬𝐮̛̣ 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐢𝐞̂́𝐩 𝐭𝐮̣𝐜 𝐧𝐮̛̃𝐚 𝐡𝐚𝐲 𝐬𝐚𝐨 ?\n𝐍𝐞̂́𝐮 𝐜𝐨́ 𝐱𝐞𝐦 𝐭𝐡𝐚̂́𝐲 𝐝𝐨̀𝐧𝐠 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲, 𝐡𝐚̃𝐲 𝐜𝐮̛́ 𝐜𝐡𝐨 𝐦𝐨̣𝐢 𝐜𝐡𝐮𝐲𝐞̣̂𝐧 𝐥𝐚̆́𝐧𝐠 𝐱𝐮𝐨̂́𝐧𝐠...𝐘𝐞̂𝐧 𝐥𝐚̣̆𝐧𝐠 𝐦𝐨̣̂𝐭 𝐜𝐡𝐮́𝐭, 𝐬𝐮𝐲 𝐧𝐠𝐡𝐢̃ 𝐜𝐡𝐨 𝐤𝐢̃ 𝐧𝐚̀𝐨...\n𝐂𝐨́ 𝐧𝐡𝐢𝐞̂̀𝐮 𝐭𝐡𝐮̛́...𝐌𝐨̣̂𝐭 𝐤𝐡𝐢 𝐦𝐚̂́𝐭 đ𝐢 𝐭𝐡𝐢̀ 𝐬𝐞̃ 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐢̀𝐦 𝐥𝐚̣𝐢 𝐧𝐮̛̃𝐚. ^^\n\n𝐂𝐨̀𝐧 𝐧𝐞̂́𝐮...𝐕𝐚̂̃𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐭𝐢𝐞̂́𝐩 𝐭𝐮̣𝐜 𝐜𝐮̀𝐧𝐠 𝐧𝐡𝐚𝐮 𝐧𝐮̛̃𝐚...𝐂𝐚̉ 𝟐 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐡𝐚̃𝐲 𝐭𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 𝐯��̀𝐨 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐧𝐡𝐞́ !`, threadID, (error, info) => {
                global.client.handleReaction.push({ name: this.config.name, messageID: info.messageID, userInfo: userInfo, userMates: userMates, turn: 'breakup', user_1: { ID: senderID, accept: false }, user_2: { ID: userInfo.data.dating.mates, accept: false } })
            }, messageID);
        case "info":
            var userInfo = await Users.getData(senderID);
            if (!userInfo.data.dating || userInfo.data.dating && userInfo.data.dating.status == false) return api.sendMessage(`𝐁𝐚̣𝐧 𝐅.𝐀 𝐬𝐦𝐥 𝐫𝐚 𝐦𝐚̀ 𝐱𝐞𝐦 𝐢𝐧𝐟𝐨 𝐜𝐚́𝐢 𝐠𝐢̀ 𝐳𝐚̣̂𝐲 𝐡𝐮̛̉ ?`, threadID, messageID);
            var infoMates = await Users.getData(userInfo.data.dating.mates);
            console.log(userInfo.data.dating.time)
            var fullTime = userInfo.data.dating.time.fullTime;
            console.log(fullTime)
            fullTime = fullTime.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/);
            fullTime = fullTime[0].replace(/\//g, " ").split(' ');
            var date = fullTime[0], month = fullTime[1] - 1, year = fullTime[2];
            var dateNow = global.client.getTime('date'), monthNow = global.client.getTime('month') - 1, yearNow = global.client.getTime('year');
            var date1 = new Date(year, month, date);
            var date2 = new Date(yearNow, monthNow, dateNow);
            var msg = `💓==『 𝐁𝐞𝐞𝐧 𝐓𝐨𝐠𝐞𝐭𝐡𝐞𝐫 』==💓\n\n` +
            `[🖤] Đạo hữu: ${userInfo.name}\n` +
            `[🤍] Đạo lữ: ${infoMates.name}\n` +
            `[💌] Kết duyên 💍 vào lúc : \n${userInfo.data.dating.time.fullTime}\n` +
            `[📆] 𝐘𝐞̂𝐮 𝐍𝐡𝐚𝐮: ${parseInt((date2 - date1) / 86400000)} 𝐧𝐠𝐚̀𝐲\n`
            return api.sendMessage({ body: msg, attachment: await this.canvas(senderID, userInfo.data.dating.mates)}, threadID, messageID);
        default:
            return api.sendMessage(`Hãy nhập giới tính người bạn muốn kết duyên [𝐧𝐚𝐦/𝐧𝐮̛̃]`, threadID, messageID);
    }
  
    var { money } = await Currencies.getData(senderID);
    if (money < 10000) return api.sendMessage(`𝐁𝐚̣𝐧 𝐜𝐚̂̀𝐧 1𝟎𝟎𝟎𝟎 💎 𝐭𝐢𝐞̂̀𝐧 𝐩𝐡𝐢́ 𝐦𝐮𝐚 𝐧𝐡𝐚̂̃𝐧 𝐏𝐍𝐉 💍 𝐭𝐚̣̆𝐧𝐠 đạo lữ của  𝐛𝐚̣𝐧 `, threadID, messageID);
    return api.sendMessage(`𝐁𝐚̣𝐧 𝐬ẽ 𝐛𝐢̣ 𝐭𝐫𝐮̛̀ 1𝟎𝟎𝟎𝟎 💎 𝐭𝐢𝐞̂̀𝐧 𝐩𝐡𝐢́ 𝐦𝐮𝐚 𝐧𝐡𝐚̂̃𝐧 𝐏𝐍𝐉 💍 𝐭𝐚̣̆𝐧𝐠 đạo lữ của 𝐛𝐚̣𝐧\n𝐒𝐨̂́ 𝐭𝐢𝐞̂̀𝐧 𝐧𝐚̀𝐲 𝐬𝐞̃ 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨𝐚̀𝐧 𝐭𝐫𝐚̉ 𝐧𝐞̂́𝐮 𝟏 𝐭𝐫𝐨𝐧𝐠 𝟐 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐡𝐚̂́𝐩 𝐧𝐡𝐚̣̂𝐧 𝐭𝐢𝐞̂́𝐧 𝐯𝐚̀𝐨 𝐭𝐫𝐚̣𝐧𝐠 𝐭𝐡𝐚́𝐢 𝐃𝐚𝐭𝐢𝐧𝐠 🖤\n\n𝐓𝐡𝐚̉ 𝐜𝐚̉𝐦 𝐱𝐮́𝐜 𝐯𝐚̀𝐨 𝐭𝐢𝐧 𝐧𝐡𝐚̆́𝐧 𝐧𝐚̀𝐲 𝐧𝐞̂́𝐮 𝐜𝐡𝐚̂́𝐩 𝐧𝐡𝐚̣̂𝐧 𝐭𝐢̀𝐦 𝐤𝐢𝐞̂́𝐦 𝐦𝐨̣̂𝐭 𝐧𝐠𝐮̛𝐨̛̀𝐢.`, threadID, (error, info) => {
        global.client.handleReaction.push({ name: this.config.name, messageID: info.messageID, senderID: senderID, senderInfo: senderInfo, type: type, coin: money, turn: 'match' })
    }, messageID);
}
module.exports.circle = async (image) => {
  const jimp = require('jimp')
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.canvas = async function (idOne, idTwo) {
    const fs = require('fs')
    const axios = require('axios')
    const { loadImage, createCanvas } = require("canvas");
    let path = __dirname + "/cache/ghep.png";
    let pathAvata = __dirname + `/cache/avtghep2.png`;
    let pathAvataa = __dirname + `/cache/avtghep.png`;
    let getAvatarOne = (await axios.get(`https://graph.facebook.com/${idOne}/picture?height=250&width=250&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: 'arraybuffer' })).data;
    let getAvatarTwo = (await axios.get(`https://graph.facebook.com/${idTwo}/picture?height=250&width=250&access_token=1073911769817594|aa417da57f9e260d1ac1ec4530b417de`, { responseType: 'arraybuffer' })).data;
    let bg = ( await axios.get(`https://i.imgur.com/CwSqhsA.jpg`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
    fs.writeFileSync(pathAvataa, Buffer.from(getAvatarTwo, 'utf-8'));
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
    avataruser = await this.circle(pathAvata);
    avataruser2 = await this.circle(pathAvataa);
    let imgB = await loadImage(path);
    let baseAvata = await loadImage(avataruser);
    let baseAvataa = await loadImage(avataruser2);
    let canvas = createCanvas(imgB.width, imgB.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(imgB, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseAvata, 82, 95, 129, 129);
    ctx.drawImage(baseAvataa, 443, 95, 129, 129);
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(path, imageBuffer);
    return fs.createReadStream(path)
};