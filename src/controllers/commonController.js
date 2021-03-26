const Article = require('../models/Article');
const Category = require('../models/Category');

module.exports = {
    
    async pages(req, res){
        let page = req.params.num;
        let next, result;


        if(isNaN(page) || page== 0 || page == 1){
            offset = 0;
        }else{
            offset = (parseInt(page) - 1) * 4;
        }
        let articles = await Article.findAndCountAll({
            limit: 4,
            offset,
            order: [['id', 'DESC']]
        });
        if(offset + 4 > articles.count){
            next = false;
        }else{
            next = true;
        }
        result = {page, articles, next}

        let categories = await Category.findAll();

        res.render('admin/articles/page', {result, categories});

    }
}
