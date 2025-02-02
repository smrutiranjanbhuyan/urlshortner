const express = require('express');
const {HandelStaticPage}=require('../controllers/staticRouter')
const router = express.Router();

router.get('/',HandelStaticPage);
router.get('/signup',(req,res)=>{
    res.render('signup')
  })
  router.get('/login',(req,res)=>{
    res.render('login')
  })
  router.get('/logout',(req,res)=>{
    res.clearCookie('uid').redirect('/')
  })
module.exports = router;
