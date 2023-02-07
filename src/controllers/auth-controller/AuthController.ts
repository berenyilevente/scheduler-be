import { UserModel, RefreshTokenModel } from '@/models';
import { RegisterArgs, LoginArgs, signToken, UserArgs } from '@/utils';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

dotenv.config();
const secret: string = process.env.SECRET || 'secret';

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

    //TODO Use a client secret in the future, its safer
    const accessToken = signToken(
      existingUser!.email,
      existingUser!._id,
      secret,
      '15m'
    );

    const refreshToken = signToken(
      existingUser!.email,
      existingUser!._id,
      secret,
      '7d'
    );

    const refreshTokenDoc = new RefreshTokenModel({
      userId: existingUser._id,
      token: refreshToken,
    });

    await refreshTokenDoc.save();

    return res.status(200).json({
      user: existingUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
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

    const accessToken = signToken(newUser.email, newUser._id, secret, '15m');

    return res.status(200).json({ result: newUser, accessToken });
  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user: UserArgs | null = await UserModel.findById(id);

    if (user === null) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Please provide a refresh token' });
  }

  let decoded: any;

  try {
    decoded = jwt.verify(refreshToken, secret);
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const refreshTokenDoc = await RefreshTokenModel.findOne({
    userId: decoded.id,
    token: refreshToken,
  });

  if (!refreshTokenDoc) {
    return res.status(401).json({ message: 'Invalid refresh token' });
  }

  const accessToken = signToken(decoded.emial, decoded.id, secret, '1h');
  try {
    return res.json({ accessToken });
  } catch (error) {
    return res.status(500).json({ message: 'Somthing went wrong' });
  }
};
