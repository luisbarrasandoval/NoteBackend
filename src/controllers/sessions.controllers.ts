import {Request, Response, NextFunction} from 'express';
import RequestWithUser from '../interfaces/RequestWithUser';
import sessionsModel from '../models/sessions.model';

// r de resultado motomami motomami motomami jsjs LA ROSALIA AJJSJ
// refractor this

const info = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
) => {
  const r = await sessionsModel.find({user: req.user, status: true});

  // vertify expired and change status
  const n = r.filter((item) => {
    if (item.expiresIn < Date.now()) {
      item.status = false;
      item.save();
      return;
    }

    return item;
  });

  // search this token in n
  const idThis = n.find((item) => item.token === req.token);

  const result = {
    token: n,
    length: n.length,
    this: idThis?._id,
  };

  res.json(result);
};

// error de diseno, no puedo permitir eliminar el token del usuario que hizo
// la peticion
// solucion: $and token != req.token -> no implementado aun
const remove = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
) => {
  const idToken = req.body.id;
  // de rosalia
  const r = await sessionsModel.findOneAndDelete({_id: idToken});

  if (!r) {
    res.status(404).json({
      message: 'Token not found',
    });
  }

  res.json({
    message: 'Token deleted',
  });
};

export {info, remove};
