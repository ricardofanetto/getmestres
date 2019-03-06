import { Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import config from "../configuration/config";
import { getRepository, Repository } from 'typeorm';
import { User } from '../entity/User';

export default async (req: Request, res: Response, next: Function) => {

  let token = req.body.token || req.query.token || req.headers['x-token-access'];
  let publicRoutes = <Array<String>>config.publicRoutes;
  let isPublicRoute: boolean = false;
  let _userRepository: Repository<User> = getRepository(User);

  publicRoutes.forEach(url => {
    let isPublic = req.url.includes(url);
    if (isPublic)
      isPublicRoute = true;
  });

  if (isPublicRoute)
    next();
  else
    if (token) {
      try {
        
        let _userAuth = verify(token, config.secretyKey);
        req.userAuth = _userAuth;

        let _userDB = await _userRepository.findOne({ where: { uid: _userAuth.uid } });
        req.IsRoot = _userDB.isRoot;

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