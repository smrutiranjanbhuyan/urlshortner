const shortid= require("shortid");
const URL = require("../models/url");

async function HandelGenerateNewShortURL(req, res) {
  const body = req.body;
// console.log(req.body.url);
  if (!body || !body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = shortid()

  try {
    await URL.create({
      shortId: shortId,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy:req.user._id
    });
    

    return res.status(200).redirect('/');
   
  } catch (error) {
    console.error("Error generating new short URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  HandelGenerateNewShortURL,
};
