const bcrypt = require('bcrypt');
const userModel = require('../models/user');

const createAdmin = async () => {
    try {
        const existingAdmin = await userModel.findOne({ email: 'admin@test.com' }); // Corrected email
        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin', salt);

        const adminUser = await userModel.create({
            name: 'admin',
            email: 'admin@test.com', // Corrected email
            password: hashedPassword,
            role: 'admin',
        });

        console.log('Admin user created:', adminUser);
    } catch (err) {
        console.error('Error creating admin user:', err.message);
    }
};

// Automatically invoke when the script is required

module.exports = createAdmin;