let {Image} = require('../models');
let {Op} = require('sequelize');
let HtmlParser = require('../utils/html-parser');
async function getAllFullImg(){
    try {
        let all_target_db = await Image.findAll({
            attributes:['target_url','id'],
            where:{
                target_url:{
                    [Op.not]: null,
                },
                full_url:{
                    [Op.eq]: null,
                }
            }
        });
        let all_target = all_target_db.map(item=>{
            return {
                url:item['dataValues']['target_url'],
                id:item['dataValues']['id']
            }
        });


    }catch (e) {

    }
}

getAllFullImg()

