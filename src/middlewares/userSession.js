const userSession = (req, res, next) => {

    if (req.session && req.session.passport && req.session.passport.user) {
    res.locals.user = req.session.passport.user;
    }
    next();
}

export default userSession;