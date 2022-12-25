import { Request, Response, NextFunction } from 'express';
import { ServerError } from '../errors/server.error';

export default (
  err: ServerError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { code, message } = err;
  res.status(code || 500).send({
    error: message,
  });
};
