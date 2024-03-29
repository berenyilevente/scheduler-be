import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const secretKey: string = process.env.SECRET || 'secret';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === undefined) {
    return res.status(401).send({
      message: 'Unauthorized: No token provided',
    });
  }

  try {
    const decoded: JwtPayload = jwt.verify(token, secretKey) as JwtPayload;
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).send({
      message: 'Unauthorized, Invalid token',
    });
  }
}
