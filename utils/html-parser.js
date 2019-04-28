const {exhentai,nhentai,TAG_MAP_DB} = require('../config/config.server')
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

        });

        return allData;
    }

    static parseNhDetail(html){
        let $ = cheerio.load(html);
        let allData = {};
        $('.tag-container').each(function (index,item) {
            let tag_name = $(item.children[0]).text().replace(/[\n\t:]+/ig,'');
            let tag_a = $(item).find('span>a');
            let tag_val = [];
            tag_a.each((index,item)=>{
                tag_val.push($(item).attr('href').split('/')[2])
            });
            allData[TAG_MAP_DB[tag_name]]=tag_val

        });
        let thumb_img = [];
        $('.thumb-container>a').each((index,item)=>{
            thumb_img.push($(item).attr('href'))
        });
        allData['ThumbImages'] = thumb_img;
        return allData;

    }
}

module.exports = HtmlParser;

