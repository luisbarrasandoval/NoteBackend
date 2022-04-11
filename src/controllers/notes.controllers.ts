import { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import FilterNotesDto from '../dto/filter.notes.dto';
import HttpException from '../exceptions/HttpException';
import NoteNotFoundException from '../exceptions/NoteNotFoundException';
import RequestWithUser from '../interfaces/RequestWithUser';
import INotes from '../interfaces/notes.interface';

import * as notesServices from '../services/notes.service';

const getAll = (req: RequestWithUser, res: Response) => {
  const filter = req.query as unknown as FilterNotesDto;
  notesServices.getAll(req.user, filter).then((post) => res.send(post));
};

// cambiar a validateMiddleware
const getById = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const id = req.params.id;

  // valida si el ID es valido
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new HttpException(400, 'ID no valido'));
  }

  notesServices.getById(req.user, id).then((result) => {
    if (!result) {
      // error no se encontreo el id
      return next(new NoteNotFoundException(id));
    }

    res.send(result);
  });
};

const create = (req: RequestWithUser, res: Response) => {
  const data: INotes = req.body;
  notesServices.create(req.user, data).then((todo) => res.send(todo));
};

const remove = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { _id: id }: INotes = req.body;
  const state = notesServices.remove(req.user, id);
  state.then((result) => {
    if (!result) {
      return next(new NoteNotFoundException(id));
    }

    res.send(200);
  });
};

const update = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const { _id: id, ...data }: INotes = req.body;
  const state = notesServices.update(req.user, id, data);

  state.then((result) => {
    if (!result) {
      return next(new NoteNotFoundException(id));
    }
    res.send(result);
  });
};

export default {
  getAll,
  getById,
  create,
  remove,
  update
};
