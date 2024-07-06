const express = require("express");
const dotenv = require("dotenv");
const { connectToMongoDb } = require("./connect");
const path = require("path");

const  cookieParser=require('cookie-parser')
const URL = require("./models/url");

const { restrictToLoggedinUserOnly,cheakAuth}=require('./middlewares/auth')

const urlRoute = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const shortUrlRoute=require("./routes/shortId")
const userRoute=require('./routes/user')

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use(express.static(path.resolve("./public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.set("public" ,path.resolve("./public"))
app.use("/url", restrictToLoggedinUserOnly,urlRoute);
app.use("/user", userRoute);
app.use("/",cheakAuth, staticRouter);
app.use("/",shortUrlRoute);




const PORT = process.env.PORT || 3000;
const URI = process.env.URI;
connectToMongoDb(URI);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
