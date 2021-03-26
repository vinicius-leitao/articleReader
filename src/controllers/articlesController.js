const Article = require('../models/Article');
const Category = require('../models/Category');
const slugify = require('slugify');

module.exports = {
    async articles(req,res){
        let articles = await Article.findAll({
            include: [{model: Category}]
        });
        res.render('admin/articles/index', {articles});
    },
    async new(req, res){
        let categories = await Category.findAll({raw: true});
        res.render('admin/articles/new', {categories});
    },
    async save(req, res){
        let {title, body, category} = req.body;
        console.log(category);
        await Article.create({
            title,
            slug: slugify(title, {lower: true}),
            body, 
            categoryId: category
        });
        res.redirect('/admin/articles');
    },
    async delete(req, res){
        let id = req.body.id;

        if(id && !isNaN(id)){
            await Article.destroy({where: {id}});
            res.redirect('/admin/articles');
        }else{
            res.redirect('/admin/articles');
        }

        
    },
    async getArticles(req, res){
        let articles = await Article.findAll({orderBy: ['id', 'DESC'], raw: true, limit: 4});
        let categories = await Category.findAll();
        res.render('index', {articles, categories})
    },

    async read(req, res){
        //Recebendo o slug por parâmetro.
        let slug = req.params.slug;
        //Obtendo o artigo com o respectivo slug.
        let article = await Article.findOne({where: {slug: slug}});
        //Obtendo todas as categorias para o menu dinâmico.
        let categories = await Category.findAll();
        if(article){
            res.render('article', {article, categories});
        }else{
            res.redirect('/');
        }
    },
    async edit(req, res){
        let id = req.params.id;
        let categories = await Category.findAll();
        let article = await Article.findOne({where: {id}, include: [{model: Category}]});
        if(article){
            res.render('admin/articles/edit', {article, categories});
        }
        else{
            res.redirect('/');
        }
    }, 

    update(req,res){
        let id = req.body.id;
        let {title, body, category} = req.body;
        Article.update({
            title,
            slug: slugify(title, {lower: true}),
            body,
            categoryId: category
        }, {where: {id}}).then(() => {
            res.redirect('/admin/articles');
        }).catch(e => {
            console.log(e);
        });
    }
}