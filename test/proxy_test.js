let axios = require('axios');
let request = require('request')
const {PROXY} = require('../config/config.server');
let url = `https://${encodeURIComponent(PROXY.auth.username)}:${PROXY.auth.password}@${PROXY.host}:${PROXY.port}`;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const distEx = 'https://e-hentai.org';
request({
    url:distEx,
    method:'GET',
    proxy:url,
    gzip:true
},function (err,res,data) {
    if(err) throw err;
    debugger
})