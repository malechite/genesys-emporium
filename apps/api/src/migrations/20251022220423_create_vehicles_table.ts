import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('vehicles', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.string('name').notNullable();
    table.jsonb('data').notNullable(); // Store all vehicle data as JSONB
    table.specificType('read_access', 'integer[]').defaultTo('{}');
    table.specificType('write_access', 'integer[]').defaultTo('{}');
    table.timestamps(true, true);
    table.index('user_id');
    table.index('name');
  });

  await knex.schema.createTable('vehicle_data', (table) => {
    table.increments('id').primary();
    table.integer('vehicle_id').unsigned().references('id').inTable('vehicles').onDelete('CASCADE').notNullable();
    table.string('data_type').notNullable(); // vehicleType, currentHullTrauma, currentSystemStrain, vehicleNotes
    table.jsonb('data').notNullable();
    table.timestamps(true, true);
    table.unique(['vehicle_id', 'data_type']);
    table.index('vehicle_id');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('vehicle_data');
  await knex.schema.dropTable('vehicles');
}

