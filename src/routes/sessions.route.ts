import {Router} from 'express';
import UserAction from '../actions/user.actions';
import LoginDTO from '../dto/login.dto';
import authenticationMiddleWare from '../middleware/authentication.middleware';
import validateMiddleware from '../middleware/validate.middleware';
import bodyParser from 'body-parser';
import doubleCheckMiddleware from '../middleware/doubleCheck.middleware';
import * as sessionController from '../controllers/sessions.controllers';

const jsonParser = bodyParser.json();
const PATH = '/session';
const router = Router();

/**
 * @openapi
 * /tokens:
 *   get:
 *     tags:
 *       - Tokens
 *     description: Obtiene todos los tokens del usuario
 *     summary: Obtiene todos los tokens del usuario
 *     responses:
 *       200:
 *         description: Lista de tokens
 *       401:
 *        description: No autorizado
 */
router.get(
    `${PATH}`,
    jsonParser,
    validateMiddleware(LoginDTO, UserAction.VERIFY_PASSWORD, true),
    doubleCheckMiddleware,
    sessionController.info,
);

export default router;

router.delete(
    PATH,
    jsonParser,
    doubleCheckMiddleware,
    sessionController.remove,
);
