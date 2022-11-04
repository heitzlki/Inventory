import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../errors/server.error';

export default async (
  err: ServerError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.headers.authorization) {
    const [bearerToken, token] = req.headers.authorization.split(' ');
    console.log(bearerToken);
    if (bearerToken === 'Bearer') {
      try {
        const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
        return next();
      } catch (err) {
        next(new ServerError(401, 'Invalid jwt token'));
      }
    }
    next(new ServerError(401, 'Invalid bearer token'));
  }
  next(new ServerError(400, 'Authorization header is not present'));
};
