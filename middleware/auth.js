const jwt = require('jsonwebtoken');
const { authConfig } = require('../configs/auth.config');
const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/index.js');
const supabase = createClient(supabaseUrl, supabaseKey)

const secretKey = authConfig.secretKey;

const generateToken = (payload, tokenExperiyTime) => {
    const options = { expiresIn: tokenExperiyTime };
    return jwt.sign(payload, secretKey, options);
};

const verifyToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

const authenticateToken =  (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        console.log("token", token)
        if (!token) return res.status(401).json({ success: false, message: 'Token required' })
        jwt.verify(token, secretKey, (err, user) => {
            if (err) return res.status(401).json({ success: false, message: 'Invalid token' });
            req.user = user;
            // console.log("req.us------------------", req.user)
            next();
        });
    } catch (error) {
        console.log(error)

    }
};



module.exports = {
    generateToken,
    verifyToken,
    authenticateToken,
};
