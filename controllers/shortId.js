const URL = require("../models/url");

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry || !entry.redirectUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
module.exports = {
  handleRedirect,
};
