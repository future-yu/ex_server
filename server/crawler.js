let {Image} = require('../models');
let {Op} = require('sequelize');
let HtmlParser = require('../utils/html-parser');
const puppeteer = require('puppeteer');
const {PROXY} = require('../config/config.server')

class HtmlInfo {
    constructor(html, headers) {
        this.html = html;
        this.headers = headers
    }
}


async function getAllFullImg() {
    try {
        let all_target_db = await Image.findAll({
            attributes: ['target_url', 'id'],
            where: {
                target_url: {
                    [Op.not]: null,
                },
                full_url: {
                    [Op.eq]: null,
                }
            }
        });
        let all_target = all_target_db.map(item => {
            return {
                url: item['dataValues']['target_url'],
                id: item['dataValues']['id']
            }
        });


    } catch (e) {

    }
}

async function getHtmlInfos() {
    //创建浏览器
    let browser = await puppeteer.launch({
        ignoreHTTPSErrors:true,
        headless: true,
        args: [
            `--proxy-server=http://58.218.200.228:5472`
        ]
    });

    const page = await browser.newPage();
    // await page.authenticate({ username:PROXY.auth.username, password:PROXY.auth.password });
    let response = await page.goto('https://nhentai.net');
    let content = await response.text();
    await browser.close();
}

getHtmlInfos()

