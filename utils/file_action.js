const  fs = require('fs');
const path = require('path')
function createDir(dist_path) {
    let path_obj = path.parse(dist_path);
    fs.mkdirSync(path_obj.dir,{ recursive: true })
}

module.exports={
    createDir
}