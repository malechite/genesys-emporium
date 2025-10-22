import type { Application } from '../../declarations';
import { db } from '../../knex';

export class UserSettingsService {
  async find(params: any) {
    const query = db('user_settings').select('*');

    if (params.query?.user_id) {
      query.where({ user_id: params.query.user_id });
    }

    const data = await query;
    return {
      total: data.length,
      data
    };
  }

  async get(id: number, params: any) {
    const settings = await db('user_settings')
      .where({ id })
      .first();

    if (!settings) {
      throw new Error('User settings not found');
    }

    return settings;
  }

  async create(data: any, params: any) {
    const [settings] = await db('user_settings')
      .insert({
        user_id: data.user_id,
        last_character_id: data.last_character_id,
        preferences: JSON.stringify(data.preferences || {})
      })
      .returning('*')
      .onConflict('user_id')
      .merge(['last_character_id', 'preferences', 'updated_at']);

    return settings;
  }

  async patch(id: number, data: any, params: any) {
    const updateData: any = {};
    if (data.last_character_id !== undefined) updateData.last_character_id = data.last_character_id;
    if (data.preferences) updateData.preferences = JSON.stringify(data.preferences);

    const [settings] = await db('user_settings')
      .where({ id })
      .update(updateData)
      .returning('*');

    if (!settings) {
      throw new Error('User settings not found');
    }

    return settings;
  }

  async remove(id: number, params: any) {
    const [settings] = await db('user_settings')
      .where({ id })
      .delete()
      .returning('*');

    if (!settings) {
      throw new Error('User settings not found');
    }

    return settings;
  }
}

export const userSettings = (app: Application) => {
  app.use('user-settings', new UserSettingsService());
};
