import { Router } from 'express';
import authenticationMiddleWare from '../middleware/authentication.middleware';

const PATH = '/tokens';
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
router.get(`${PATH}`, authenticationMiddleWare);

export default router;
