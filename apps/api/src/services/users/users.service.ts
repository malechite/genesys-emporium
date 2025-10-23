import { KnexService } from '@feathersjs/knex';
import type { Application } from '../../declarations';
import { db } from '../../knex';

export class UsersService extends KnexService {
  constructor() {
    super({
      Model: db,
      name: 'users',
      id: 'id',
      paginate: {
        default: 10,
        max: 50
      }
    });
  }
}

export const users = (app: Application) => {
  app.use('users', new UsersService());
};
