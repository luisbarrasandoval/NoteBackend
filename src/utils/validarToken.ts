import jwt from 'jsonwebtoken';

const validarToken = (token: string) => {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret as string);
};

export default validarToken;
