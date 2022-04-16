import HttpException from './HttpException';

class AuthenticationExpiredException extends HttpException {
  constructor() {
    super(401, 'Authentication expired');
  }
}