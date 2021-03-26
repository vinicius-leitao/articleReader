function auth(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/admin/signin');
    }
}

module.exports = auth;