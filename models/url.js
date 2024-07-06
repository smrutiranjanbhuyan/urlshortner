const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true, // Corrected from "require" to "required"
        unique: true,
    },
    redirectUrl: { // Corrected from "redirctUrl" to "redirectUrl"
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    visitHistory: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});


urlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 * 24 * 60 * 60 });

const URL = mongoose.model("url", urlSchema); 
module.exports = URL;
