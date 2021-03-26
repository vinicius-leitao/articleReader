const Category = require('../models/Category');
const Article = require('../models/Article');
const slugify = require('slugify');

module.exports = {
    new(req,res){
        res.render('admin/categories/new');
    },
    seeCategories(req, res){
        Category.findAll().then( categories => {
            res.render('admin/categories/index', {categories});
        })
        
    },
    async save(req, res){
        let title = req.body.title;
        if(title){
            await Category.create({
                title,
                slug: slugify(title,{lower: true})
            })
            res.redirect('/admin/categories/');
        }else{
            res.redirect('/admin/categories/new');
        }
    },
    async delete(req, res){
        let id = req.body.id;
        if(id && !isNaN(id)){
            await Category.destroy({
                where: {id}
            })
            res.redirect('/admin/categories');
        }else{
            res.redirect('/admin/categories');
        }
       
    },
    seeEdit(req, res){
        let id = req.params.id
        if(!isNaN(id)){
            Category.findByPk(id).then( category => {
                if(category){
                    res.render('admin/categories/edit', {category});
                }else{
                    res.redirect('/admin/categories');
                }
            }).catch(e => {
                console.log(e);
            });
        }else{
            res.redirect('/admin/categories');
        }
    },
    update(req, res){
        let id = req.body.id;
        let title = req.body.title;

        Category.update({title, slug: slugify(title, {lower: true})}, {
            where: {id}
        }).then(() => {
            res.redirect('/admin/categories');
        }).catch(e => {
            console.log('Erro no update!');
            console.log(e);
        })
    },

    async filter(req, res){
        let slug = req.params.slug;
        let category = await Category.findOne({where: {slug}});
        let articles = await Article.findAll({where: {CategoryId: category.id}});
        if(category){
            let categories = await Category.findAll();
            res.render('index', {articles, categories});
        }else{
            res.redirect('/');
        }
    }
}




