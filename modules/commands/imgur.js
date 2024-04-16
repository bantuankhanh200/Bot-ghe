const axios = require("axios");

function stringify(Obj, t) {
  let box = [];
  for (let i in Obj) {
    if (Obj.hasOwnProperty(i)) {
      let a = t ? t + "[" + i + "]" : i;
      let n = Obj[i];
      let enc = null !== n && "object" == typeof n ? stringify(n, a) : encodeURIComponent(a) + "=" + encodeURIComponent(n);
      box.push(enc);
    }
  }
  return box.join("&");
}

module.exports.config = {
  name: "imgur",
  version: "1.0.0",
  hasPermssion: 0,
  description: "lấy url imgur trên message",
  credits: "Sam & API Imgur",
  commandCategory: "Phương Tiện",
  usages: "[reply]",
  cooldowns: 5
}

function imgurVideoCreateURL(url) {
  var cb;
  var returnPromise = new Promise(function (resolve, reject) {
    cb = function (err, resData) {
      if (err) reject(err);
      resolve(resData);
    }
  });
  axios({
    method: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: 'Client-ID fc9369e9aea767c'
    },
    data: stringify({
      video: url,
      type: "URL",
      name: Date.now() + ".mp4"
    })
  })
    .then(async function ({ data }) {
      var ticket = data.data.ticket;
      var opt = {
        method: "GET",
        url: "https://imgur.com/upload/poll?tickets[]=" + ticket,
        headers: {
          Authorization: 'Client-ID fc9369e9aea767c'
        }
      };
      await axios(opt);
      const { data: res } = await axios(opt);
      cb(null, `https://i.imgur.com/${res.data.done[ticket]}.mp4`);
    })
    .catch((err) => {
      cb(err);
    });
  return returnPromise;
}

function imgurCreateURL(url) {
  var cb;
  var returnPromise = new Promise(function (resolve, reject) {
    cb = function (err, resData) {
      if (err) reject(err);
      resolve(resData);
    }
  });
  axios({
    method: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: 'Client-ID fc9369e9aea767c'
    },
    data: stringify({
      image: url
    })
  })
    .then(function ({ data }) {
      cb(null, data.data.link);
    })
    .catch((err) => {
      cb(err);
    });
  return returnPromise;
}

module.exports.run = async function ({ api, event, args }) {
  const { type, messageReply, threadID, messageID } = event;
  let msg = "";

  try {
    if (type == "message_reply") {
      if (messageReply.attachments.length < 1) msg += "Vui long chi reply anh/video";
      else for (let Obj of messageReply.attachments) {
        var imgurURL = (Obj.type == "photo" || Obj.type == "animated_image") ? await imgurCreateURL(Obj.url) : Obj.type == "video" ? await imgurVideoCreateURL(Obj.url) : "[Function: imgurError]";
        msg += `"${imgurURL}",\n`;
      }
    }
    else msg += "Bạn phải reply một ảnh hoặc video nào đó";
    
    return api.sendMessage(msg, threadID, messageID);
  } catch (e) {
    console.log(e);
    return api.sendMessage(`Đã xảy ra lỗi\n${e}`, threadID);
  }
}
