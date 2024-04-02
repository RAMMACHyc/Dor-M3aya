const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');



const registerUser = asyncHandler(async (req, res) => {
  const {file, username, tele, email, password } = req.body;
  console.log(req.body);
  if (!username || !email || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide all fields' });
    return;
  }  
 
  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (userExists) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'User already exists' });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    tele,
    username,
    file,
    email: email.toLowerCase(), 
    password: hashedPassword,
  });
  console.log(user);
  if (user) {
    res.status(StatusCodes.CREATED).json({
      _id: user.id,
      tele: user.tele,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid user data' });
  }
});

 const getUsersPosts = async (req, res) => {
  try {
      const usersWithPosts = await User.find().populate('posts');
      res.status(200).json(usersWithPosts);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({user:{
      id: user.id,
      tele: user.tele,
      username: user.username,
      email: user.email, 
    },
    token: generateToken(user._id), 
  });  
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 'Invalid credentials' });
  } 
}); 
 



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}; 

module.exports = {
  registerUser,
  loginUser,
  getUsersPosts
  
};
