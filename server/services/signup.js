const userModel = require('../models/user');
const bcrypt = require('bcrypt');

const createUser=async(data)=>{
    const {name,email,password}=data;
    if (!name || !email || !password) {
        throw new Error('Missing required fields');
      }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const createduser = await userModel.create({name,email,password:hashedPassword,role:'user'});
        //res.status(201).json(createduser);
        const savedUser = await createduser.save();
        return savedUser;
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }
}
module.exports={createUser};