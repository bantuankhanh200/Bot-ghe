const axios = require('axios');
const canh = async () => {
  var { data } = await axios.get(`https://api-0703.0703-opa.repl.co/images/canh`);
  return data
};
const thinh = async () => {
  var { data } = await axios.get(`https://api-0703.0703-opa.repl.co/thinh`);
  return data
};
const cosplay = async () => {
  var { data } = await axios.get(`https://api-0703.0703-opa.repl.co/video/cosplay`);
  return data
};
const cadao = async () => {
  var { data } = await axios.get(`https://api-0703.0703-opa.repl.co/cadao`);
  return data
};
const mp3 = async () => {
  var { data } = await axios.get(`https://api-0703.0703-opa.repl.co/images/mp3`);
  return data
};
const anime = async () => {
  var { data } = await axios.get(`https://api-0703.0703-opa.repl.co/images/anime`);
  return data
};
//////////////////////////////////////
const imgur = async (url) => {
  var { data } = await axios(`https://api-0703.0703-opa.repl.co/imgur?url=${url}`);
  return data
};

module.exports = {
  canh,
  cosplay, 
  thinh,
  cadao, 
  mp3, 
  anime, 
  imgur
}
//aaaaaaa