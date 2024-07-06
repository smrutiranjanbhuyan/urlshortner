const mongoose = require('mongoose');

async function connectToMongoDb(URI) {
    try {
        await mongoose.connect(URI);
        console.log("Connected Successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = {
    connectToMongoDb,
};
