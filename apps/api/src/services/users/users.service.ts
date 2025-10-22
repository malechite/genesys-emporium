import type { Application } from '../../declarations';
import { db } from '../../knex';

export class UsersService {
  async find(params: any) {
    const users = await db('users').select('id', 'email', 'username', 'created_at', 'updated_at');
    return {
      total: users.length,
      data: users
    };
  }

  async get(id: number, params: any) {
    const user = await db('users')
      .where({ id })
      .select('id', 'email', 'username', 'created_at', 'updated_at')
      .first();

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async create(data: any, params: any) {
    const [user] = await db('users')
      .insert({
        email: data.email,
        password: data.password, // In production, this should be hashed
        username: data.username
      })
      .returning(['id', 'email', 'username', 'created_at', 'updated_at']);

    return user;
  }

  async patch(id: number, data: any, params: any) {
    const updateData: any = {};
    if (data.email) updateData.email = data.email;
    if (data.username) updateData.username = data.username;
    if (data.password) updateData.password = data.password;

    const [user] = await db('users')
      .where({ id })
      .update(updateData)
      .returning(['id', 'email', 'username', 'created_at', 'updated_at']);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async remove(id: number, params: any) {
    const [user] = await db('users')
      .where({ id })
      .delete()
      .returning(['id', 'email', 'username']);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export const users = (app: Application) => {
  app.use('users', new UsersService());
};
