const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const { generateToken, verifyToken } = require('../utils/jwt');

// Login user and return token
const loginUser = async (email, password) => {
    try {
        const user = await userModel.findOne({ email }); // Find user by email
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // Validate password
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = generateToken({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }); // Generate JWT token

        return { token, user }; // Return token and user
    } catch (err) {
        throw new Error(err.message);
    }
};

// Refresh access token using the refresh token
// const refreshToken = async (refreshToken) => {
//     try {
//         const decoded = verifyToken(refreshToken); // Verify refresh token
//         const user = await userModel.findById(decoded.id); // Correct user retrieval

//         if (!user) {
//             throw new Error('User not found');
//         }

//         const token = generateToken({
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//         }); // Generate new access token

//         return { token, user };
//     } catch (err) {
//         throw new Error('Invalid or expired refresh token');
//     }
// };

module.exports = { loginUser };
