import type { Application } from '../../declarations';
import { db } from '../../knex';

export class VehiclesService {
  async find(params: any) {
    const query = db('vehicles').select('*');

    if (params.query?.user_id) {
      query.where({ user_id: params.query.user_id });
    }

    if (params.query?.name) {
      query.where('name', 'ilike', `%${params.query.name}%`);
    }

    const data = await query;
    return {
      total: data.length,
      data
    };
  }

  async get(id: number, params: any) {
    const vehicle = await db('vehicles')
      .where({ id })
      .first();

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    return vehicle;
  }

  async create(data: any, params: any) {
    const [vehicle] = await db('vehicles')
      .insert({
        user_id: data.user_id,
        name: data.name,
        data: JSON.stringify(data.data),
        read_access: data.read_access || [],
        write_access: data.write_access || []
      })
      .returning('*');

    return vehicle;
  }

  async patch(id: number, data: any, params: any) {
    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.data) updateData.data = JSON.stringify(data.data);
    if (data.read_access) updateData.read_access = data.read_access;
    if (data.write_access) updateData.write_access = data.write_access;

    const [vehicle] = await db('vehicles')
      .where({ id })
      .update(updateData)
      .returning('*');

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    return vehicle;
  }

  async remove(id: number, params: any) {
    const [vehicle] = await db('vehicles')
      .where({ id })
      .delete()
      .returning('*');

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    return vehicle;
  }
}

export class VehicleDataService {
  async find(params: any) {
    const query = db('vehicle_data').select('*');

    if (params.query?.vehicle_id) {
      query.where({ vehicle_id: params.query.vehicle_id });
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
    const item = await db('vehicle_data')
      .where({ id })
      .first();

    if (!item) {
      throw new Error('Vehicle data not found');
    }

    return item;
  }

  async create(data: any, params: any) {
    const [item] = await db('vehicle_data')
      .insert({
        vehicle_id: data.vehicle_id,
        data_type: data.data_type,
        data: JSON.stringify(data.data)
      })
      .returning('*')
      .onConflict(['vehicle_id', 'data_type'])
      .merge(['data', 'updated_at']);

    return item;
  }

  async patch(id: number, data: any, params: any) {
    const updateData: any = {};
    if (data.data) updateData.data = JSON.stringify(data.data);

    const [item] = await db('vehicle_data')
      .where({ id })
      .update(updateData)
      .returning('*');

    if (!item) {
      throw new Error('Vehicle data not found');
    }

    return item;
  }

  async remove(id: number, params: any) {
    const [item] = await db('vehicle_data')
      .where({ id })
      .delete()
      .returning('*');

    if (!item) {
      throw new Error('Vehicle data not found');
    }

    return item;
  }
}

export const vehicles = (app: Application) => {
  app.use('vehicles', new VehiclesService());
};

export const vehicleData = (app: Application) => {
  app.use('vehicle-data', new VehicleDataService());
};
