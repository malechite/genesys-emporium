import type { Application } from '../../declarations';
import { db } from '../../knex';

export class CharactersService {
  async find(params: any) {
    const query = db('characters').select('*');

    // Filter by user_id if provided
    if (params.query?.user_id) {
      query.where({ user_id: params.query.user_id });
    }

    const characters = await query;
    return {
      total: characters.length,
      data: characters
    };
  }

  async get(id: number, params: any) {
    const character = await db('characters')
      .where({ id })
      .first();

    if (!character) {
      throw new Error('Character not found');
    }

    return character;
  }

  async create(data: any, params: any) {
    const [character] = await db('characters')
      .insert({
        user_id: data.user_id,
        name: data.name,
        data: JSON.stringify(data.data)
      })
      .returning('*');

    return character;
  }

  async patch(id: number, data: any, params: any) {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.data) updateData.data = JSON.stringify(data.data);

    const [character] = await db('characters')
      .where({ id })
      .update(updateData)
      .returning('*');

    if (!character) {
      throw new Error('Character not found');
    }

    return character;
  }

  async remove(id: number, params: any) {
    const [character] = await db('characters')
      .where({ id })
      .delete()
      .returning('*');

    if (!character) {
      throw new Error('Character not found');
    }

    return character;
  }
}

export const characters = (app: Application) => {
  app.use('characters', new CharactersService());
};
