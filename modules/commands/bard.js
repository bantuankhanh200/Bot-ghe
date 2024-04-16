module.exports.config = {
    name: "bard",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Heo Rừng",
    description: "Hỏi bard",
    commandCategory: "công cụ",
    usages: "/bard <nội dung>",
    cooldowns: 0
};


module.exports.run = async ({ event, api, args }) => {
	const { threadID, messageID, senderID } = event;
	var question = args.join(" ");

  url = `https://miraiapi.tranminh20.repl.co/api/v1/bard/?key=${module.exports.config.credits}&question=${question}`;
  
	const axios = require('axios');

	let config = {
     method: 'get',
     maxBodyLength: Infinity,
     url: url,
  	headers: { 
  	  'Content-Type': "application/json",
      '1PSIDCC': "APoG2W9jqXvOc8t_CI2jszaF5em7xIzjsLSXeJPpSt51iiMJnuZAjm_vMwT8D9zmPqrXS71oig", 
      '1PSID': "ZghGMoV3_mjGZf0IOc49Zp-1iqo3HUUq_ABsxHOQNH1SaUwyQypdop_u7oFznnojwj2xeg", 
      '1PSIDTS': "sidts-CjEBSAxbGSPydO3wtTPFWCYPfLxgbYOEPIJ3a7WNkzoWGx0N-SvmwezublsOUxaLjN53EAA"
 	 }
	};

	axios.request(config)
	.then((response) => {
		data = response.data;

		api.sendMessage("𝘽𝙖𝙧𝙙 𝙩𝙧𝙖̉ 𝙡𝙤̛̀𝙞: \n" + data.content,threadID);
	})
	.catch((error) => {
  		console.log(error);
	});

}