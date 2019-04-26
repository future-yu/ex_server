let {exlogin,HEADER,nhsearch} = require('../config/config.server');
const iconv = require('iconv-lite');
const HtmlParser = require('../utils/html-parser')
let request = require('request');
function get(url,data){
    //https://nhentai.net/search/?q=chinese++fuusen+club
    return new Promise((resolve,reject)=>{
        request({
            url:url,
            method:'GET',
            headers:HEADER,
            gzip:true,
            qs:data,
            useQuerystring:true
        },function (error, response, body) {
            if(error){
                reject(error)
            } else {
                resolve(body.toString());
            }
        })
    })
}
async function exLogin(){
    //UserName,PassWord
    try {
        let res = await get(nhsearch,{
            q:'chinese'
        });
        HtmlParser.parseNHentai(res)


    }catch (e) {
        throw e;
    }
}
async function getExHtml() {

}
exLogin();

module.exports = {exLogin}