const userService = require('../services/signup');

const createUser = async (req, res) => {
    console.log(req.body)
  try {
    const userData = req.body; // We're using req.body directly, as it was sent properly
    const user = await userService.createUser(userData); // Pass the user data to the service
    res.status(201).json({
      message: "User created",
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createUser };
