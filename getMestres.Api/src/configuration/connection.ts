import { Customer } from '../entity/Customer';
import { Question } from './../entity/Question';
import { SubCategory } from './../entity/SubCategory';
import { Category } from './../entity/Category';
import { User } from './../entity/User';
import { createConnection } from "typeorm";
import { ServiceProvider } from '../entity/ServiceProvider';
import { RequestOrder } from '../entity/RequestOrder';
import { RequestOrderAnswer } from '../entity/RequestOrderAnswer';

const cfg = require('../../ormconfig.json');

export default {
  createConnection: async () => {
    await createConnection(
      {
        type: cfg.type,
        host: cfg.host,
        port: cfg.port,
        username: cfg.username,
        password: cfg.password,
        database: cfg.database,
        synchronize: true,
        logging: false,
        entities: [
          User,
          Category,
          SubCategory,
          Question,
          Customer, 
          ServiceProvider,
          RequestOrder,
          RequestOrderAnswer
        ]
      }
    );
    console.log('Database connected');
  }
}