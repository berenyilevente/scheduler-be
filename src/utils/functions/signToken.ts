import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export function signToken(
  email: string,
  _id: mongoose.Types.ObjectId,
  secret: string,
  expiration: string
): string {
  return jwt.sign(
    {
      email: email,
      id: _id,
    },
    secret,
    { expiresIn: expiration }
  );
}
