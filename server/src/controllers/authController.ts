import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';
import generateToken from '../utils/generateToken';

const registerUser = async (req: Request, res: Response) => {
    const { username, password, name ,email} = req.body;
    console.log(username)
    try {
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        password: hashedPassword,
        name,
        email
      });
      
      if (user) {
        res.status(201).json({
          _id: user._id.toString(), 
          email:user.email, // Ensure _id is returned as a string
          username: user.username,
          role: user.role,
          token: generateToken(user._id, user.role),
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error:any) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const authUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};

export { registerUser, authUser };
