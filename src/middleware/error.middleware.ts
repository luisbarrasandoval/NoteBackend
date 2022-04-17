import {NextFunction, Request, Response} from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    // Next: NextFunction es necesario para que el middleware pueda manejar los errores
  next: NextFunction // eslint-disable-line
) {
  const status = error.status || 500;
  const message = error.message || 'Error desconocido en el servidor';

  res.status(status).send({status, message, messages: error.messages});
}

export default errorMiddleware;
