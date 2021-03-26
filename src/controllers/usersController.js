const User = require('../models/User');
const session = ('express-session');
const bcrypt = require('bcryptjs');

module.exports = {
    async list(req, res){
        let users = await User.findAll();
        res.render('admin/users/index', {users});
    },
    signUp(req, res){
        res.render('admin/users/create');
    },
    async create(req,res){
        let {email, password} = req.body;

        let userExists = await User.findOne({where: {email}})
        
        if(!userExists) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            await User.create({
                email,
                password: hash
            });
            
            res.redirect("/");
        }else{
            res.redirect('/admin/users/create');
        }
        // res.json({email, password});
    },
    signIn(req, res){
        res.render('admin/users/login');
    },
    async auth(req,res){
        let {email, password} = req.body;

        let user = await User.findOne({where: {email}});
        if(user){
            let correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/admin/articles');
            }else{
                res.redirect('/admin/signin');
            }
        }else{
            res.redirect('/admin/signin');
        }
    },
    logout(req, res){
        req.session.user = undefined;
        res.redirect('/');
    }
}