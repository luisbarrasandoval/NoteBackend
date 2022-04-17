import HttpException from './HttpException';

class WrongPasswordException extends HttpException {
  constructor(email: string) {
    super(401, `Wrong password for user ${email}`);
  }
}

export default WrongPasswordException;
