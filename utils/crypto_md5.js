let  crypto = require('crypto');

function getDigest(str) {
    let md5 = crypto.createHash('md5');

    let result = md5.update(str).digest('hex');

    return result;
}


module.exports={
    getDigest
}