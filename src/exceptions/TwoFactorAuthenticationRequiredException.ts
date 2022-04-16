import HttpException from './HttpException';

class TwoFactorAuthenticationRequiredException extends HttpException {
    constructor() {
        super(401, "Two factor authentication required");
    }
}

export default TwoFactorAuthenticationRequiredException;