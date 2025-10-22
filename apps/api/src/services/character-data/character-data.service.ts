import type { Application } from '../../declarations';
import { db } from '../../knex';

export class CharacterDataService {
  async find(params: any) {
    const query = db('character_data').select('*');

    if (params.query?.character_id) {
      query.where({ character_id: params.query.character_id });
    }

    if (params.query?.data_type) {
      query.where({ data_type: params.query.data_type });
    }

    const data = await query;
    return {
      total: data.length,
      data
    };
  }

  async get(id: number, params: any) {
    const item = await db('character_data')
      .where({ id })
      .first();

    if (!item) {
      throw new Error('Character data not found');
    }

    return item;
  }

  async create(data: any, params: any) {
    const [item] = await db('character_data')
      .insert({
        character_id: data.character_id,
        data_type: data.data_type,
        data: JSON.stringify(data.data)
      })
      .returning('*')
      .onConflict(['character_id', 'data_type'])
      .merge(['data', 'updated_at']);

    return item;
  }

  async patch(id: number, data: any, params: any) {
    const updateData: any = {};
    if (data.data) updateData.data = JSON.stringify(data.data);

    const [item] = await db('character_data')
      .where({ id })
      .update(updateData)
      .returning('*');

    if (!item) {
      throw new Error('Character data not found');
    }

    return item;
  }

  async remove(id: number, params: any) {
    const [item] = await db('character_data')
      .where({ id })
      .delete()
      .returning('*');

    if (!item) {
      throw new Error('Character data not found');
    }

    return item;
  }
}

export const characterData = (app: Application) => {
  app.use('character-data', new CharacterDataService());
};
