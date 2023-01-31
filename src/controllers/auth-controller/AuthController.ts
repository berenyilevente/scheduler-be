import { UserModel } from '@/models';
import { RegisterArgs, LoginArgs, signToken } from '@/utils';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const secret: string = process.env.SECRET || 'secret';
const expiration: string = '1h';

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password }: LoginArgs = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User doesn´t exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser!.password
    );

    if (isPasswordCorrect === false) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = signToken(
      existingUser!.email,
      existingUser!._id,
      secret,
      expiration
    );

    res.status(200).json({ user: existingUser, accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const userRegisterController = async (req: Request, res: Response) => {
  const { email, password, confirmPassword }: RegisterArgs = req.body;

  //console.log(email, password, confirmPassword);
  try {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exist' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords don´t match' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await UserModel.create({
      email: email,
      password: hashedPassword,
    });

    const accessToken = signToken(
      newUser.email,
      newUser._id,
      secret,
      expiration
    );

    res.status(200).json({ result: newUser, accessToken });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
  return;
};
