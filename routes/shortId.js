const express=require('express')
const {HandelPostingUrl}=require('../controllers/shortId')
const router=express.Router()
router.get('/:shortId',HandelPostingUrl)
module.exports=router