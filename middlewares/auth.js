const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    try {
        const userUid = req.cookies?.uid;
        // console.log("userUid", userUid);
        if (!userUid) {
            // console.log("User null");
            return res.redirect("/login");
        }
        
    
        const user = await getUser(userUid);
        // console.log("user", user);
        if (!user) {
            return res.redirect("/login");
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in restrictToLoggedinUserOnly:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function checkAuth(req, res, next) {
    try {
        const userUid = req.cookies?.uid;
    
        const user = await getUser(userUid);
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in restrictToLoggedinUserOnly:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
};
