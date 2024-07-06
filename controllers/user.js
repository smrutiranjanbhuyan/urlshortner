const User = require('../models/user');
const {v4:uuidv4}=require('uuid')
const {getUser,setUser}=require('../service/auth')
async function handleUserSignup(req, res) {
    try {
        console.log('Received signup request:', req.body);

        const { fname, lname, email, password } = req.body;

        const user = await User.create({
            fname,
            lname,
            email,
            password, 
        });

        console.log('User created:', user);

        res.status(201).redirect('/');
       
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).redirect('/signup');
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        // console.log('Received signup request:', req.body);

        const user = await User.findOne({ email, password });
           
        if (!user) {
            // If user is not found, redirect to login with error message
            return res.status(401).render('login', { error: "Invalid email or password" });
        }

        // If user is found, redirect to home page
        const sessinId=uuidv4();
        
        setUser(sessinId,user)
        res.cookie("uid",sessinId)
        res.status(200).redirect('/');
       
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).redirect('/login');
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
