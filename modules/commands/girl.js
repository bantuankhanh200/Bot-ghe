module['exports']['config'] = {
    name: 'girl',
    version: '2.0.0',
    hasPermssion: 0,
    credits: 'mod',
    description: 'spam ảnh gái',
    commandCategory: 'other',
    usages: '',    cooldowns: 5 
}, module['exports']['run'] = async ({
    api: a,
    event: e
}) => {
    const _0x2f9fx1 = require('axios'),
        _0x2f9fx2 = require('request'),
        _0x2f9fx3 = require('fs-extra'),
        _0x2f9fx4 = (await _0x2f9fx1['get']('https://raw.githubusercontent.com/ledingg1997/ledingg-/main/datathinh.json'))['data']['data'],
        _0x2f9fx5 = Object['values'](_0x2f9fx4),
        _0x2f9fx6 = _0x2f9fx5    [Math['floor'](Math['random']() * _0x2f9fx5['length'])],
        _0x2f9fx7 = await _0x2f9fx1['get']('https://API-NodeJSX.miraiofficials123.repl.co/images/v2?type=girl');
    var _0x2f9fx8 = _0x2f9fx7['data']['data']['substring'](_0x2f9fx7['data']['data']['lastIndexOf']('.') + 1);
    _0x2f9fx2(_0x2f9fx7['data']['data'])['pipe'](_0x2f9fx3['createWriteStream'](__dirname + `${'/cache/thathinh.'}${_0x2f9fx8}${''}`))['on']('close', (function() {
        a['sendMessage']({
            body: `${''}${_0x2f9fx6}${' '}`,
            attachment: _0x2f9fx3['createReadStream'](__dirname + `${'/cache/thathinh.'}${_0x2f9fx8}${''}`)
        }, e['threadID'], (() => {
            return _0x2f9fx3['unlinkSync'](__dirname + `${'/cache/thathinh.'}${_0x2f9fx8}${''}`)
        }), e['messageID'])
    }))
}