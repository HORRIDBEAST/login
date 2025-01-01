const { loginUser } = require('../services/login');
//const { generateRefreshToken } = require('../utils/jwt');
const loginUserHandler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, user } = await loginUser(email, password); // Destructure token and user
      //  const refreshToken = generateRefreshToken(user); // Generate a refresh token
        res.status(200).json({
            token,         // Access token
               // Refresh token
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            message: err.message + ' Login failed due to invalid credentials',
        });
    }
};

// const refreshTokenHandler = async (req, res) => {
//     const { oldRefreshToken } = req.body;  // Expecting refresh token here
//     if (!oldRefreshToken) {
//         return res.status(400).json({ message: 'Refresh token is required' });
//     }
//     try {
//         const { token } = await refreshToken(oldRefreshToken); // Use the refreshToken function
//         res.status(200).json({
//             token,         // New access token
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({
//             message: err.message + ' Login failed due to invalid refresh token',
//         });
//     }
// };

module.exports = { loginUser: loginUserHandler };
