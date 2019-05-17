const HEADER = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.108 Safari/537.36'
};
const TAG_MAP_DB = {
    Parodies: 'Parodies',
    Characters: 'Characters',
    Tags: 'PostTags',
    Artists: 'Artists',
    Groups: 'Groups',
    Languages: 'Languages',
    Categories: 'Categories'
};

const PROXY = {
    host: 'k2jyb.com',
    port: 443,
    auth: {
        username: '984cc2c57988f6be#sygreencoder@163.com',
        password: 'd4e4a0bcacf99b57ae5dbada0dcb3c6e'
    }
};
const PROXY_URL = `https://${PROXY.auth.username}:${PROXY.auth.password}@${PROXY.host}:${PROXY.port}`;
const FNNAME = ['Parodies', 'Characters', 'PostTags', 'Artists', 'Groups', 'Languages', 'Categories', 'FemaleDes', 'MaleDes', 'Misc']
module.exports = {
    exhentai: 'https://exhentai.org',
    nhentai: 'https://nhentai.net',
    nhsearch: 'https://nhentai.net/search/',
    exlogin: 'https://forums.e-hentai.org/index.php?act=Login&CODE=01',
    expires: 6000 * 60 * 24 * 12 * 100,
    HEADER,
    TAG_MAP_DB,
    FNNAME,
    USERNAME: 'shiyu',
    PASSWORD: '123456',
    PROXY,
    PROXY_URL
};