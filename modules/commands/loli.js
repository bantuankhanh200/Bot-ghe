const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "loli",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "HĐGN",
  description: "Siêu phẩm loli",
  commandCategory: "Nsfw",
  usages: "",
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs": "",
    "axios": ""
  }
};

module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {

let { data } = await axios.get('https://api-nodejsx.miraiofficials123.repl.co/images/v2?type=loli');
 var callback = () => api.sendMessage({body:`✨ Ảnh Loli của bạn ❤`,attachment: fs.createReadStream(__dirname + '/cache/101.jpg')}, event.threadID, () => fs.unlinkSync(__dirname + '/cache/101.jpg'));	
      return request(encodeURI(`${data.data}`)).pipe(fs.createWriteStream(__dirname+'/cache/101.jpg')).on("close",() => callback());
		
		};