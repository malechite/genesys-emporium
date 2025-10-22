import type { Application } from '../../declarations';
import { db } from '../../knex';

// Generic service for all custom content tables
export class CustomContentService {
  constructor(private tableName: string) {}

  async find(params: any) {
    const query = db(this.tableName).select('*');

    if (params.query?.user_id) {
      query.where({ user_id: params.query.user_id });
    }

    if (params.query?.name) {
      query.where('name', 'ilike', `%${params.query.name}%`);
    }

    // Filter by read access
    if (params.query?.readable_by) {
      query.where(function() {
        this.where({ user_id: params.query.readable_by })
          .orWhereRaw('? = ANY(read_access)', [params.query.readable_by]);
      });
    }

    const data = await query;
    return {
      total: data.length,
      data
    };
  }

  async get(id: number, params: any) {
    const item = await db(this.tableName)
      .where({ id })
      .first();

    if (!item) {
      throw new Error(`${this.tableName} item not found`);
    }

    return item;
  }

  async create(data: any, params: any) {
    const [item] = await db(this.tableName)
      .insert({
        user_id: data.user_id,
        name: data.name,
        data: JSON.stringify(data.data),
        read_access: data.read_access || [],
        write_access: data.write_access || []
      })
      .returning('*');

    return item;
  }

  async patch(id: number, data: any, params: any) {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.data) updateData.data = JSON.stringify(data.data);
    if (data.read_access) updateData.read_access = data.read_access;
    if (data.write_access) updateData.write_access = data.write_access;

    const [item] = await db(this.tableName)
      .where({ id })
      .update(updateData)
      .returning('*');

    if (!item) {
      throw new Error(`${this.tableName} item not found`);
    }

    return item;
  }

  async remove(id: number, params: any) {
    const [item] = await db(this.tableName)
      .where({ id })
      .delete()
      .returning('*');

    if (!item) {
      throw new Error(`${this.tableName} item not found`);
    }

    return item;
  }
}

// Export service setup functions for each custom content type
export const customArchetypes = (app: Application) => {
  app.use('custom-archetypes', new CustomContentService('custom_archetypes'));
};

export const customArchetypeTalents = (app: Application) => {
  app.use('custom-archetype-talents', new CustomContentService('custom_archetype_talents'));
};

export const customArmor = (app: Application) => {
  app.use('custom-armor', new CustomContentService('custom_armor'));
};

export const customCareers = (app: Application) => {
  app.use('custom-careers', new CustomContentService('custom_careers'));
};

export const customGear = (app: Application) => {
  app.use('custom-gear', new CustomContentService('custom_gear'));
};

export const customMotivations = (app: Application) => {
  app.use('custom-motivations', new CustomContentService('custom_motivations'));
};

export const customSettings = (app: Application) => {
  app.use('custom-settings', new CustomContentService('custom_settings'));
};

export const customSkills = (app: Application) => {
  app.use('custom-skills', new CustomContentService('custom_skills'));
};

export const customTalents = (app: Application) => {
  app.use('custom-talents', new CustomContentService('custom_talents'));
};

export const customVehicles = (app: Application) => {
  app.use('custom-vehicles', new CustomContentService('custom_vehicles'));
};

export const customWeapons = (app: Application) => {
  app.use('custom-weapons', new CustomContentService('custom_weapons'));
};
