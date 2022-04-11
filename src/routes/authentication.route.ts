import { Router } from 'express';
import UserAction from '../actions/user.actions';
import { login, register } from '../controllers/authentication.contollers';
import LoginDTO from '../dto/login.dto';
import UserDTO from '../dto/user.dto';
// import authenticationMiddleWare from '../middleware/authentication.middleware';
import validateMiddleware from '../middleware/validate.middleware';
import bodyParser from 'body-parser';

const router = Router();
const jsonParser = bodyParser.json();

router.post(
  '/login',
  jsonParser,
  validateMiddleware(LoginDTO, UserAction.LOGIN),
  login
);
router.post(
  `/register`,
  jsonParser,
  validateMiddleware(UserDTO, UserAction.REGISTER),
  register
);

export default router;
