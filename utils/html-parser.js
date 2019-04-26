const {exhentai,nhentai} = require('../config/config.server')
const cheerio = require('cheerio');
class HtmlParser{

    static parseExHentai(html){


    }

    static parseNHentai(html){
        let $ = cheerio.load(html);
        let all_item = $('.gallery>a');
        let allData=[];
        all_item.each(function (index,item) {
            let thumb_url = $(item.children[0]).attr('data-src');
            let title = $(item.children[2]).text();
            allData.push({
                href:nhentai+$(item).attr('href'),
                thumb_url,
                title
            });

        })
        debugger
    }
}

module.exports = HtmlParser;

