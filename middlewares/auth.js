const { verifyToken } = require("../service/auth");

function restrictToLoggedinUserOnly(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.redirect("/login");
        }

        const user = verifyToken(token);

        if (!user) {
            return res.redirect("/login");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.redirect("/login");
    }
}

function checkAuth(req, res, next) {
    try {
        const token = req.cookies?.token;
        const user = verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        req.user = null;
        next();
    }
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};
