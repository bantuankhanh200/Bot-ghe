const axios = require("axios")
const os = require('os');
const moment = require('moment-timezone');
const fs = require('fs').promises; // Added for asynchronous file reading

module.exports.config = {
  name: "upt",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Khanh Shado",
  description: "Xem thời gian bot hoạt động và thông tin hệ thống của bot",
  commandCategory: "Hệ Thống",
  usages: "upt",
  usePrefix: false,
  cooldowns: 5
};

async function getDependencyCount() {
  try {
    const packageJsonString = await fs.readFile('package.json', 'utf8');
    const packageJson = JSON.parse(packageJsonString);
    const depCount = Object.keys(packageJson.dependencies || {}).length;
    const devDepCount = Object.keys(packageJson.devDependencies || {}).length;
    return { depCount, devDepCount };
  } catch (error) {
    console.error('Không thể đọc file package.json:', error);
    return { depCount: -1, devDepCount: -1 };
  }
}

function getStatusByPing(ping) {
  if (ping < 200) {
    return 'Tốt';
  } else if (ping < 800) {
    return 'Bình thường';
  } else {
    return 'Delay';
  }
}
function getPrimaryIP() {
  const interfaces = os.networkInterfaces();
  for (let iface of Object.values(interfaces)) {
    for (let alias of iface) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return '127.0.0.1'; 
}

module.exports.run = async ({ api, event, Users }) => {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const uptime = process.uptime(); + global.config.UPTIME

  const { depCount, devDepCount } = await getDependencyCount();
  let name = await Users.getNameUser(event.senderID);
  const primaryIp = getPrimaryIP();
  const botStatus = getStatusByPing(Date.now() - event.timestamp);
  const uptimeHours = Math.floor(uptime / (60 * 60));
  const uptimeMinutes = Math.floor((uptime % (60 * 60)) / 60);
  const uptimeSeconds = Math.floor(uptime % 60);

  const uptimeString = `${uptimeHours.toString().padStart(2, '0')}:${uptimeMinutes.toString().padStart(2, '0')}:${uptimeSeconds.toString().padStart(2, '0')}`;  
  
  // Formatted message including CPU and RAM details, similar to Replit's standards.

  function random(arr) {
  var rd = array[Math.floor(Math.random() * array.length)];
      return rd;
          };
  const res1 = await axios.get(`https://api-dthdev.dthdev.repl.co/avtsang`);
  const res2 = await axios.get(`https://api-dthdev.dthdev.repl.co/avtsang`);
  const res3 = await axios.get(`https://api-dthdev.dthdev.repl.co/avtsang`);
  var data1 = res1.data.url;
  var array = [];
  var data2 = res2.data.url;
  var data3 = res3.data.url;
  var downloadfile1 = (await axios.get(data1, {responseType: 'stream'})).data;
  var downloadfile2 = (await axios.get(data2, {responseType: 'stream'})).data;
  var downloadfile3 = (await axios.get(data3, {responseType: 'stream'})).data;
  array.push(downloadfile1);
  array.push(downloadfile2);    
  array.push(downloadfile3);

  return api.sendMessage({body: `====[ UPTIME ]====
━━━━━━━━━━━━━━━━━━━ 
[⏰] → Bây Giờ Là: ${moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss')} || ${moment().tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY')}
[⏳] → Thời Gian Đã Hoạt Động: ${uptimeString}
[🤖] → Tên Bot: ${global.config.BOTNAME}
[🔧] → Prefix mặc định: ${global.config.PREFIX}
[🌐] → Địa Chỉ IP: ${primaryIp}
[💻] → Tổng Số Dependencies: ${depCount}
[🛠️] → Tình Trạng Bot: ${botStatus}
⚙️ - Thông Tin Hệ Thống - ⚙️
      - Hệ điều hành: ${os.type()} ${os.release()} (${os.arch()})
      - CPU: ${os.cpus().length} core(s) - ${os.cpus()[0].model.trim()} @ ${os.cpus()[0].speed}MHz
      - RAM: ${(usedMemory / 1024 / 1024 / 1024).toFixed(2)}GB/${(totalMemory / 1024 / 1024 / 1024).toFixed(2)}GB
      - Dung lượng trống: ${(freeMemory / 1024 / 1024 / 1024).toFixed(2)}GB
[📌] → Ping: ${Date.now() - event.timestamp}ms
[🍒] → Yêu cầu bởi: ${name}`, attachment: (array)}, event.threadID, event.messageID);
         }