import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import config from "../configuration/config";

export default async (req: Request, res: Response, next: Function) => {

  let token = req.body.token || req.query.token || req.headers['x-token-access'];

  if (token) {
    try {
      let _userAuth = verify(token, config.secretyKey);
      req.userAuth = _userAuth;
      next();
    } catch (error) {
      res.status(401).send({ message: 'Token informado é inválido' });
      return;
    }
  } else {
    res.status(401).send({ message: 'Para acessar esse recurso você precisa estar autenticado' });
    return;
  }

}