const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'SuperMan';

function generateToken(user) {
    // We only store essential, non-sensitive information in the token payload.
    const payload = {
        _id: user._id,
        email: user.email,
        fname: user.fname,
    };
    return jwt.sign(payload, secret, { expiresIn: '1d' }); // Token expires in 1 day
}

function verifyToken(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null; // Token is invalid or expired
    }
}

module.exports = {
    generateToken,
    verifyToken,
};
