import {Router} from 'express';
import HttpAction from '../actions/http.actions';
import todoController from '../controllers/notes.controllers';
import NotesDTO from '../dto/notes.dto';
import authenticationMiddleWare from '../middleware/authentication.middleware';
import validateMiddleware from '../middleware/validate.middleware';
import bodyParser from 'body-parser';
import FilterNotesDto from '../dto/filter.notes.dto';

const PATH = '/notes';
const router = Router();

const jsonParser = bodyParser.json();

router.get(
    `${PATH}`,
    authenticationMiddleWare,
    validateMiddleware(FilterNotesDto, undefined, false, 'query'),
    todoController.getAll,
);

router.get(`${PATH}/:id`, authenticationMiddleWare, todoController.getById);

router.post(
    `${PATH}`,
    jsonParser,
    authenticationMiddleWare,
    validateMiddleware(NotesDTO, HttpAction.CREATE),
    todoController.create,
);

router.delete(
    `${PATH}`,
    jsonParser,
    authenticationMiddleWare,
    validateMiddleware(NotesDTO, HttpAction.DELETE, true),
    todoController.remove,
);

router.put(
    `${PATH}`,
    jsonParser,
    authenticationMiddleWare,
    validateMiddleware(NotesDTO, HttpAction.UPDATE, true),
    todoController.update,
);

export default router;
