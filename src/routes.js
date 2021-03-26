const express = require('express');
const router = express.Router();

const auth = require('./middlewares/auth');

const categoriesController = require('./controllers/categoriesController');
const articlesController = require('./controllers/articlesController');
const commonController =  require('./controllers/commonController');
const usersController = require('./controllers/usersController');


//Categorias
router.get('/admin/categories/new', auth, categoriesController.new);
router.get('/admin/categories',auth, categoriesController.seeCategories);
router.get('/admin/categories/edit/:id',auth, categoriesController.seeEdit);
router.get('/category/:slug', categoriesController.filter);
router.post('/categories/save', categoriesController.save);
router.post('/categories/update', categoriesController.update);
router.post('/categories/delete', categoriesController.delete);

//Articles
router.get('/', articlesController.getArticles);
router.get('/admin/articles', auth,articlesController.articles);
router.get('/admin/articles/new',auth, articlesController.new);
router.get('/admin/articles/edit/:id',auth, articlesController.edit);
router.get('/:slug', articlesController.read);
router.post('/articles/save', articlesController.save);
router.post('/articles/delete', articlesController.delete);
router.post('/articles/update', articlesController.update);

router.get('/articles/page/:num', commonController.pages);


//Users
router.get('/admin/users',auth, usersController.list);
router.get('/admin/users/create',auth, usersController.signUp);
router.post('/users/create', usersController.create);

//Login
router.get('/admin/signin', usersController.signIn);
router.post('/authenticate', usersController.auth)

//Logout
router.get('/admin/logout', usersController.logout);

module.exports = router;