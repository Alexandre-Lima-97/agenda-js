
exports.checkCsrfError = (err, req, res, next) => {
        if(err){
                console.log(err);
                return res.render("erro404");
        }
        
        next();
};

exports.csrfMiddleware = (req, res, next) => {
        res.locals.errors = req.flash("errors");
        res.locals.success = req.flash("success");
        res.locals.user = req.session.user;
        res.locals.csrfToken = req.csrfToken();
        next();
}
