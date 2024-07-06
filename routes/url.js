const express=require('express')
const {HandelGenerateNewShortURL}=require('../controllers/url')
const router=express.Router()
router.post('/',HandelGenerateNewShortURL)
module.exports=router