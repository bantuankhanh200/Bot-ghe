module.exports.config = {
  name: '',
  version: '2.0.0',
  hasPermssion: 0,
  credits: 'Thanh Xuân, Lê Định',
  description: 'Thính',
  commandCategory: 'other',
  usages: 'thathinh',
  cooldowns: 0,
}
module.exports.run = async ({ api: a, event: e }) => {
  const _0x2f9fx1 = require('axios'),
    _0x2f9fx2 = require('request'),
    _0x2f9fx3 = require('fs-extra'),
    _0x2f9fx4 = (
      await _0x2f9fx1.get(
        'https://raw.githubusercontent.com/ledingg1997/ledingg-/main/datathinh.json'
      )
    ).data.data,
    _0x2f9fx5 = Object.values(_0x2f9fx4),
    _0x2f9fx6 = _0x2f9fx5[Math.floor(Math.random() * _0x2f9fx5.length)],
    _0x2f9fx7 = await _0x2f9fx1.get(
      'https://API-NodeJSX.miraiofficials123.repl.co/images/v2?type=ahegao'
    )
  var _0x2f9fx8 = _0x2f9fx7.data.data.substring(
    _0x2f9fx7.data.data.lastIndexOf('.') + 1
  )
  _0x2f9fx2(_0x2f9fx7.data.data)
    .pipe(
      _0x2f9fx3.createWriteStream(
        __dirname + `${'/cache/thathinh.'}${_0x2f9fx8}${''}`
      )
    )
    .on('close', function () {
      a.sendMessage(
        {
          body: `${'Hãy dùng /menu\nVì mày ngu\n\n >\uD835\uDD4B\uD835\uDD59\uD835\uDD5Á\uD835\uDD5F\uD835\uDD59: '}${_0x2f9fx6}${' '}`,
          attachment: _0x2f9fx3.createReadStream(
            __dirname + `${'/cache/thathinh.'}${_0x2f9fx8}${''}`
          ),
        },
        e.threadID,
        () => {
          return _0x2f9fx3.unlinkSync(
            __dirname + `${'/cache/thathinh.'}${_0x2f9fx8}${''}`
          )
        },
        e.messageID
      )
    })
}
