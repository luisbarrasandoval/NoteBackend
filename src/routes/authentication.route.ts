import {Router} from 'express';
import UserAction from '../actions/user.actions';
import {login, logout, register} from '../controllers/authentication.contollers';
import LoginDTO from '../dto/login.dto';
import UserDTO from '../dto/user.dto';
import validateMiddleware from '../middleware/validate.middleware';
import bodyParser from 'body-parser';
import authenticationMiddleWare from '../middleware/authentication.middleware';

const router = Router();
const jsonParser = bodyParser.json();

router.post(
    '/login',
    jsonParser,
    validateMiddleware(LoginDTO, UserAction.LOGIN),
    login,
);

router.post('/logout', logout);

router.post(
    `/register`,
    jsonParser,
    validateMiddleware(UserDTO, UserAction.REGISTER),
    register,
);

export default router;
