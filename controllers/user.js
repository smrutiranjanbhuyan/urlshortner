const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
    try {
        const { fname, lname, email, password } = req.body;

        const user = await User.create({
            fname,
            lname,
            email,
            password, 
        });

        // Redirect to the login page after successful signup
        return res.redirect('/login');
    } catch (error) {
        console.error('Error during signup:', error);
        // It's better to re-render the signup page with an error message
        return res.render('signup', {
            error: "Email already in use. Please try another.",
        });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
           
        if (!user) {
            return res.status(401).render('login', { error: "Invalid email or password" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).render('login', { error: "Invalid email or password" });
        }

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie("uid", sessionId);
        return res.redirect('/');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).render('login', { error: "An unexpected error occurred." });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
