import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import ValidationException from '../exceptions/ValidationException';

const validateMiddleware = <T>(
  type: ClassConstructor<T>,
  action: string | undefined,
  skipMissingProperties = false,
  body_or_query: 'body' | 'query' = 'body',
  excludeExtraneousValues=false
): RequestHandler => {
  return (res, req, next) => {
    const v_object = plainToInstance(type, res[body_or_query], {
      excludeExtraneousValues,
    });
    validate(Object(v_object), {
      skipMissingProperties,
      groups: [action]
    }).then((error: ValidationError[]) => {
      if (error.length > 0) {
        const errores = error.map((e) => {
          return {
            propery: e.property,
            message: Object.values(
              e.constraints || { erorr: 'Error desconocido' }
            ).join(',')
          };
        });
        next(new ValidationException(errores));
      } else {

        if (body_or_query === 'body') {
          res.body = v_object;
        } else {
          res.query = v_object as any; // TODO: fix this
        }

        next();
      }
    });
  };
};

export default validateMiddleware;
