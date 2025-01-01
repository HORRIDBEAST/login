const userService = require('../services/user');
const User =require('../models/user');
const getUsers= async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }
    try {
        const users = await userService.getUsers(); // Pass the user data to the service
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};
const getProfile = async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: 'no req.user exists' });
      }
      // Find the user by email (req.user.email comes from the token)
      const user = await User.findOne({ email: req.user.email }); // Find by email instead of ID

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ name: user.name, email: user.email ,id:user._id , role:user.role}); ;
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
};


  const deleteUser = async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }
  
    try {
      const userId = req.params.userId;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };  
module.exports = {  getUsers,getProfile ,deleteUser};