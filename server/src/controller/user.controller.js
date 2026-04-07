import UserModel from '../model/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    const alreadyExists = await UserModel.findOne({ email });

    if (alreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong while creating a new user',
      });
    }

    res.status(201).json({
      success: true,
      message: 'New user created successfully',
      body: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    const foundUser = await UserModel.findOne({ email });
    if (!foundUser) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: foundUser._id, email: foundUser.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    res.cookie('auth', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      body: {
        _id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email,
        token, 
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('auth').status(200).json({
    success: true,
    message: 'User logged out successfully',
  });
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, body: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
  finally{
    console.log("Get me working perfectly")
  }
};
