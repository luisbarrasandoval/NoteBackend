import HttpException from './HttpException';

class WrongCredentialsException extends HttpException {
  constructor(message = 'providers') {
    super(401, `Wrong credentials ${message}`);
  }
}
export default WrongCredentialsException;
