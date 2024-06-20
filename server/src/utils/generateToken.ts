import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

const generateToken = (id:  Types.ObjectId, role: string) => {
  return jwt.sign({ id:id.toString(), role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

export default generateToken;
