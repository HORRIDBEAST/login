const jwt = require('jsonwebtoken');
const seckey = "Rajas_is_legend";
const refreshSecret = "Rajas_refresh_secret"; // Use a separate secret for refresh token

// Generate access token
const generateToken = (user) => {
    const payload = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, seckey, { expiresIn: '1h' });  // 1 hour expiry for access token
    return payload;
};

// Generate refresh token
// const generateRefreshToken = (user) => {
//     const payload = jwt.sign({ id: user._id, email: user.email }, refreshSecret, { expiresIn: '7d' });  // 7 days expiry for refresh token
//     return payload;
// };

// Authenticate token middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized : Missing token" });
    }
    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    jwt.verify(token, seckey, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if the token is expired or invalid
        }
        req.user = user;
        next();
    });
};

// Verify token (use this function for checking both access and refresh tokens)
// const verifyToken = (token) => {
//     try {
//         return jwt.verify(token, seckey); // Verify access token
//     } catch (err) {
//         // If the token is expired, throw an error
//         throw new Error('Token expired');
//     }
// };

module.exports = { generateToken, authenticateToken  };
