
const URL = require("../models/url");
async function HandelStaticPage(req, res) {
    try {
        if(!req.user) return res.render('landingpage')
        const allUrls = await URL.find({createdBy:req.user._id});
        res.render('home',{
            url:allUrls
        });
    } catch (error) {
      res.render('landingpage')
    }
}
module.exports = {
    HandelStaticPage,
  };