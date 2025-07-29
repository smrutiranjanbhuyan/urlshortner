const express=require('express')
const {handleRedirect}=require('../controllers/shortId')
const router=express.Router()
router.get("/:shortId", handleRedirect);
module.exports=router