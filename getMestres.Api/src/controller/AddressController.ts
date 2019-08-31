import { Response, Request } from 'express';
const db = require('../shared/statesCities.json');

export class AddressController {

  getAllStates = (_: Request, res: Response) => {
    const map = db.estados.map(({ sigla, nome }) => {
      return { sigla, nome };
    });
    return res.status(200).send(map);
  }

  getAllCities = (req: Request, res: Response) => {
    let { state } = req.params;
    const stateFound = db.estados.filter(x => x.sigla === state.toUpperCase())[0]
    if (stateFound)
      return res.status(200).send(stateFound.cidades);
    else
      return res.status(404).send(`Estado ${state} não encontrado`);
  }
}